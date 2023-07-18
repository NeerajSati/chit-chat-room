const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require("../models/UserSchema");

const messageSchema = new Schema({
    senderId:{
        type:mongoose.ObjectId,
        required:true,
        ref: User
    },
    groupId:{
        type:mongoose.ObjectId,
        required:true
    },
    message:{
        type:String,
        required:true,
    }
},{timestamps:true});

module.exports = mongoose.model("Messages",messageSchema);