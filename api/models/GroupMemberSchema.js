const mongoose = require('mongoose');
const { Schema } = mongoose;
const Group = require("../models/GroupSchema");

const groupMemberSchema = new Schema({
    groupId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: Group
    },
    userId:{
        type:Schema.Types.ObjectId,
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