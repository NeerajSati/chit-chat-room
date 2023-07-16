const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    senderId:{
        type:mongoose.ObjectId,
        required:true
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