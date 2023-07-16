const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupMemberSchema = new Schema({
    groupId:{
        type:mongoose.ObjectId,
        required:true
    },
    userId:{
        type:mongoose.ObjectId,
        required:true
    },
    lastSeen:{
        type:Date,
        required:true
    },
    isAdmin:{
        type:String,
        required:true,
    }
},{timestamps:true});

module.exports = mongoose.model("Members",groupMemberSchema);