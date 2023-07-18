const {constants} = require("../utils/constants")
const Group = require("../models/GroupSchema");
const GroupMember = require("../models/GroupMemberSchema");
const Message = require("../models/MessageSchema");
const {uploadImage} = require("../utils/AzureUpload")
const { v4: uuidv4 } = require('uuid');

const createGroupValidate = async(req,res,next)=>{
    const {groupName} = req.fields;
    const {groupProfilePic} = req.files;
    if(!groupName){
        return res.status(400).json({success: false, msg: "Group Name is Required!"});
    }
    if(!groupProfilePic){
        return res.status(400).json({success: false, msg: "Group Profile Image is Required!"});
    }
    next()
}

const createGroup = async(req,res)=>{
    try{
        const userId = req.userId;
        const {groupName, groupDescription, memberIds} = req.fields;
        // memberIds = [{userId: "123",isAdmin:false}]
        const {groupProfilePic} = req.files;
        const groupProfilePicUrl = await uploadImage("group-profile-"+uuidv4(), groupProfilePic);

        const createGroup = new Group({
            groupName, groupDescription, groupProfilePic: groupProfilePicUrl
        })
        const savedGroup = await createGroup.save();
        // Add members to the created group
        let memberIdArr = JSON.parse(memberIds)
        memberIdArr.forEach(function (element) {
            element.lastSeen = new Date();
            element.groupId = savedGroup._id;
        });
        //insert self as admin
        memberIdArr.push({userId, isAdmin: true, lastSeen:new Date(), groupId: savedGroup._id})
        
        await GroupMember.insertMany(memberIdArr)
        return res.status(200).json({success:true, msg:"Group Created successfully!"})
    } catch(err){
        console.log("createGroup Error", err)
        return res.status(400).json({success: false, msg: constants.genericError, error: err})
    }
}

const joinedGroups = async(req,res)=>{
    try{
        const userId = req.userId;
        const groupsJoined = await GroupMember.find({userId}, 'groupId lastSeen isAdmin createdAt').populate("groupId");
        const groupIds = groupsJoined.map(obj=>obj.groupId._id)
        const latestMessages = await Message.aggregate([
                { $match : 
                    { groupId : {$in: groupIds} } 
                },
                {
                    $group:
                    {
                        _id: { groupId: "$groupId" },
                        groupId: {"$last": '$groupId'},
                        message: {"$last": '$message'},
                        messageAt: {"$last": '$createdAt'}
                    }
                },
                {
                    $sort : { createdAt: -1 }
                }
        ])
        //accumulate both arrays based on groupId
        let groupsList = []
        let unseenMessageInGroupsList = [];
        let groupsWithoutMessage = []
        groupsJoined.forEach((group)=>{
            const latestMessage = latestMessages.find((message)=>message.groupId.equals(group.groupId._id));
            //if latest message present for given group
            if(latestMessage){
                //check number of unseen messages
                unseenMessageInGroupsList.push(Message.count({
                    "groupId": group.groupId._id,
                    "createdAt": {
                      $gt: group.lastSeen
                    }
                }))
                groupsList.push({
                    groupId: group.groupId._id,
                    lastMessage : latestMessage.message,
                    lastMessageAt : latestMessage.messageAt,
                    lastSeen: group.lastSeen,
                    isAdmin: group.isAdmin,
                    groupName: group.groupId.groupName,
                    groupDescription: group.groupId.groupDescription,
                    groupProfilePic: group.groupId.groupProfilePic,
                    groupCreatedAt: group.groupId.createdAt
                })
            } else{
                groupsWithoutMessage.push({
                    groupId: group.groupId._id,
                    lastSeen: group.lastSeen,
                    isAdmin: group.isAdmin,
                    groupName: group.groupId.groupName,
                    groupDescription: group.groupId.groupDescription,
                    groupProfilePic: group.groupId.groupProfilePic,
                    groupCreatedAt: group.groupId.createdAt
                })
            }
        })

        const unseenMessages= await Promise.allSettled(unseenMessageInGroupsList)
        for(let i=0;i<unseenMessages.length;i++){
            if(unseenMessages[i] && unseenMessages[i].status === 'fulfilled'){
                groupsList[i] = {...groupsList[i], unseenMessages: unseenMessages[i].value}
            }
        }

        // sort group with messages on lastMessageAt
        // sort group without messages on groupCreatedAt
        groupsList.sort((a,b)=>b.lastMessageAt-a.lastMessageAt)
        groupsWithoutMessage.sort((a,b)=>b.groupCreatedAt-a.groupCreatedAt)

        // Merge groups with messages on top and empty groups in last
        groupsList.push(...groupsWithoutMessage)

        return res.status(200).json({success:true, msg:"Groups Fetched successfully!", data: groupsList})
    } catch(err){
        console.log("joinedGroups Error", err)
        return res.status(400).json({success: false, msg: constants.genericError, error: err})
    }
}

module.exports = {
    createGroupValidate,
    createGroup,
    joinedGroups
}