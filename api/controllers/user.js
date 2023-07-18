const {constants} = require("../utils/constants")
const User = require("../models/UserSchema");
const {uploadImage} = require("../utils/AzureUpload")

const updateUser = async(req,res)=>{
    try{
        const userId = req.userId;
        const userName = req.userName;
        const {deleteImage} = req.fields;
        const { photo } = req.files;
        if(!photo && !deleteImage){
            return res.status(400).json({success: false, msg: "Please provide an image!"})
        }
        
        if(deleteImage){
            // delete image
            await User.findByIdAndUpdate(userId,{profilePic: ""})
            return res.status(200).json({success: true, msg: "Profile Image deleted successfully!"})
        }

        let profilePic = await uploadImage(userName,photo)
        await User.findByIdAndUpdate(userId,{profilePic})

        return res.status(200).json({success:true, msg:"Profile Image updated successfully!"})
    } catch(err){
        console.log("updateUser Error", err)
        return res.status(400).json({success: false, msg: constants.genericError, error: err})
    }
}

const searchUser = async(req,res)=>{
    try{
        const searchName = req.query.searchName;
        if(!searchName){
            return res.status(400).json({success: false, msg: "Please provide a search query!"})
        }

        const usersList = await User.find({
            username: {
              $regex: `${searchName}`,
              $options: "i",
            },
          });

        const data = usersList.map((obj)=>{return {_id: obj._id, username: obj.username,profilePic: obj.profilePic}})

        return res.status(200).json({success:true, msg:"Users fetched successfully!", data:data})
    } catch(err){
        console.log("updateUser Error", err)
        return res.status(400).json({success: false, msg: constants.genericError, error: err})
    }
}

module.exports = {
    updateUser,
    searchUser
}