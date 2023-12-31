const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new Schema({
    groupName:{
        type:String,
        required:true
    },
    groupDescription:{
        type:String,
        required:true,
    },
    groupProfilePic:{
        type:String,
        required:true,
    },
    isOneToOne:{
        type: Boolean,
        default: false
    }
},{timestamps:true});

module.exports = mongoose.model("Groups",groupSchema);