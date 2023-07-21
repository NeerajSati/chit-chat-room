const socketIo = require("socket.io")
const {authenticateSocketConnection} = require("./utils/jwtVerify");
const {sendMessageViaSocket, updateGroupLastSeen} = require("./controllers/message")

const socketHelper = async(server) => {
    const io = socketIo(server, {
        cors: {
          origin: "*",
        },
    });
    io.use(authenticateSocketConnection);
    io.on('connection', (socket) => {
        socket.emit("hello", "world");

        console.log(socket.user.username,"Just Connected!");

        socket.on('send_message', async (data) => {
            const {groupId, message, tempMessageId} = data;
            if(!groupId || !message || !tempMessageId){
                return;
            }
            const messageSentData = await sendMessageViaSocket(socket.user._id, groupId, message);
            if(messageSentData){
                let receivedMessage = {
                    _id: messageSentData._id,
                    message: messageSentData.message,
                    messageTime: messageSentData.createdAt,
                    senderUserName: socket.user.username,
                    senderProfilePic: socket.user.profilePic
                }

                socket.emit("message_sent", {
                    groupId: messageSentData.groupId,
                    message: receivedMessage,
                    tempMessageId
                });
                socket.broadcast.emit("message_received", {
                    groupId: messageSentData.groupId,
                    message: receivedMessage
                });
            }
        });

        socket.on('message_read_ack', async (data) => {
            const {groupId} = data;
            if(!groupId){
                return;
            }
            await updateGroupLastSeen(socket.user._id, groupId);
        });
    });
}
module.exports = {socketHelper}