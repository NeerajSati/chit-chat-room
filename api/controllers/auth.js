const router = require("express").Router();
const {constants} = require("./../utils/constants")
const User = require("../models/UserSchema");
const jwtVerify = require("../utils/jwtVerify");
const {multerUpload} = require("../utils/multer")
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const multerSaveImage = multerUpload.single('profilePic')

const registerUser = async(req,res)=>{
    try{
        let {username, email, password} = req.body;
        let profilePic = req.file && req.file.url ? req.file.url : null;
        if(!profilePic){
            profilePic = constants.templateProfilePic[Math.floor(Math.random() * constants.templateProfilePic.length)];
        }
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profilePic
        })
        const savedUser = await newUser.save();
        res.status(200).json({success:true, token:jwtVerify.generateToken(savedUser)})
    } catch(err){
        console.log("registerUser Error", err)
        res.status(400).json({success: false, msg: constants.genericError, error: err})
    }
}

module.exports = {
    registerUser,
    multerSaveImage
}