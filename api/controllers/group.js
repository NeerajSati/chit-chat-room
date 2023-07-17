const {constants} = require("../utils/constants")
const Group = require("../models/GroupSchema");
const GroupMember = require("../models/GroupMemberSchema");
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
        console.log("updateUser Error", err)
        return res.status(400).json({success: false, msg: constants.genericError, error: err})
    }
}

module.exports = {
    createGroupValidate,
    createGroup
}