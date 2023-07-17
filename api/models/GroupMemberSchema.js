const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupMemberSchema = new Schema({
    groupId:{
        type:mongoose.ObjectId,
        required:true,
        ref: "groups"
    },
    userId:{
        type:mongoose.ObjectId,
        required:true,
        ref: "users"
    },
    lastSeen:{
        type:Date,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
    }
},{timestamps:true});

module.exports = mongoose.model("Members",groupMemberSchema);