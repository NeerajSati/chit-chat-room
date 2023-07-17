const router = require("express").Router();
const {constants} = require("./../utils/constants")
const User = require("../models/UserSchema");
const jwtVerify = require("../utils/jwtVerify");
const {multerUpload} = require("../utils/multer")
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const multerSaveImage = multerUpload.single('profilePic')

const registerUserValidate = async(req,res,next)=>{
    let {username, email, password} = req.body;
    if(!username){
        return res.status(400).json({success: false, msg: "Username is Required!"})
    }
    if(!email){
        return res.status(400).json({success: false, msg: "Email is Required!"})
    }
    if(!password || password.length < 8){
        return res.status(400).json({success: false, msg: "Password should have atleast 8 characters!"})
    }
    next()
}

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
        let savedUser = await newUser.save();
        savedUser.password = undefined
        return res.status(200).json({success:true, token:jwtVerify.generateToken(savedUser)})
    } catch(err){
        console.log("registerUser Error", err)
        if(err && err.code === 11000){ // duplicate key encountered
            if(err.keyPattern.email){
                return res.status(400).json({success: false, msg: "Email already exists!", error: err})
            }
            if(err.keyPattern.username){
                return res.status(400).json({success: false, msg: "Username already exists!", error: err})
            }
        }
        return res.status(400).json({success: false, msg: constants.genericError, error: err})
    }
}

const loginUserValidate = async(req,res,next)=>{
    let {email, password} = req.body;
    if(!email){
        return res.status(400).json({success: false, msg: "Email is Required!"})
    }
    if(!password){
        return res.status(400).json({success: false, msg: "Password is required!"})
    }
    next()
}

const loginUser = async(req,res)=>{
    try{
        let {email, password} = req.body;
        const userData= await User.findOne({email});
        if(!userData){
            return res.status(400).json({success: false, msg: "Email Id does not exist!"})
        }
        const hashedPassword = userData.password;
        const validatePassword = bcrypt.compareSync(password, hashedPassword);
        if(validatePassword){
            userData.password = undefined
            return res.status(200).json({success:true, token:jwtVerify.generateToken(userData)})
        }
        return res.status(400).json({success: false, msg: "Password is incorrect!"})
    } catch(err){
        console.log("registerUser Error", err)
        return res.status(400).json({success: false, msg: constants.genericError, error: err})
    }
}

module.exports = {
    registerUser,
    registerUserValidate,
    loginUserValidate,
    loginUser,
    multerSaveImage
}