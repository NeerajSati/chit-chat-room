const {constants} = require("../utils/constants")
const Group = require("../models/GroupSchema");
const GroupMember = require("../models/GroupMemberSchema");
const Message = require("../models/MessageSchema");
const {uploadImage} = require("../utils/AzureUpload")
const { v4: uuidv4 } = require('uuid');

const isUserMemberOfGroup = async(req,res,next) =>{
    const userId = req.userId;
    const groupId = req.params.id;

    const getUserGroupMemberData = await GroupMember.findOne({userId, groupId},'lastSeen');
    if(!getUserGroupMemberData){
        return res.status(200).json({success: false, msg: "You cannot access this group!"})
    };
    req.groupLastSeen = getUserGroupMemberData.lastSeen
    req.groupMemberId = getUserGroupMemberData._id
    next();
}

const getAllMessages = async(req,res)=>{
    try{
        const groupId = req.params.id
        const groupLastSeen = req.groupLastSeen
        const groupMemberId = req.groupMemberId
        const userId = req.userId

        const allMessages = await Message.find({groupId},'message createdAt').populate("senderId",'username profilePic');
        allMessages.sort((a,b)=>a.createdAt-b.createdAt)

        let messageList = []
        allMessages.forEach((message)=>{
            messageList.push({
                _id: message._id,
                senderUserName: message.senderId.username,
                senderProfilePic: message.senderId.profilePic,
                message: message.message,
                messageTime: message.createdAt,
                sentByUser: message.senderId._id.equals(userId)
            })
        })

        let newMessagesIdx = messageList.findIndex(x => new Date(x.messageTime).getTime() > new Date(groupLastSeen).getTime());

        //after seeing all messages if there are any new messages
        // update the last seen time (doesn't need to wait for its updation)
        if(newMessagesIdx !== -1){
            GroupMember.findByIdAndUpdate(groupMemberId,{lastSeen: new Date()}).exec();
        }
        
        return res.status(200).json({success:true, msg:"Messages Fetched successfully!", data: {messageList, newMessagesIdx}})
    } catch(err){
        console.log("getAllMessages Error", err)
        return res.status(400).json({success: false, msg: constants.genericError, error: err})
    }
}

const sendMessageViaSocket = async(userId, groupId, message)=>{
    try{
        const getUserGroupMemberData = await GroupMember.findOneAndUpdate({userId, groupId},{lastSeen: new Date()});
        if(!getUserGroupMemberData){
            return;
        };

        const createMessage = new Message({
            senderId: userId,
            groupId,
            message
        })
        const savedMessage = await createMessage.save();
        return savedMessage
    } catch(err){
        console.log("sendMessageViaSocket Error", err)
        return;
    }
}

const updateGroupLastSeen = async(userId, groupId)=>{
    try{
        await GroupMember.findOneAndUpdate({userId, groupId},{lastSeen: new Date()});
    } catch(err){
        console.log("updateGroupLastSeen Error", err)
        return;
    }
}

module.exports = {
    isUserMemberOfGroup,
    getAllMessages,
    sendMessageViaSocket,
    updateGroupLastSeen
}