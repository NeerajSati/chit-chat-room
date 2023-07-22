import React, { useState } from 'react'
import NoChatImage from './../../assets/EmptyScreen.jpg'
import NoChats from './NoChats'
import ChatOpened from './ChatOpened'

function ActiveChat() {
    const [activeChatId, setActiveChatId] = useState("64b618653d0ed9c6cab4780e")
    const [messageList, setMessageList] = useState([{
        "_id": "64b6e224b7cd8512f89c2f42",
        "senderUserName": "TheVisitor",
        "senderProfilePic": "https://chitchatroomdata.blob.core.windows.net/storage/TheVisitor.png",
        "message": "Hi Sir!",
        "messageTime": "2023-07-18T19:04:04.661Z",
        "sentByUser": true,
        "profileColor": "#eb7272"
    },
    {
        "_id": "64b6e52f910b5264dd7bb16d",
        "senderUserName": "TheVisitor",
        "senderProfilePic": "https://chitchatroomdata.blob.core.windows.net/storage/TheVisitor.png",
        "message": "Hi2 Sir!",
        "messageTime": "2023-07-18T19:17:03.512Z",
        "sentByUser": true,
        "profileColor": "#eb7272"
    },
    {
        "_id": "64b6e577895b8fda607338a6",
        "senderUserName": "TheVisitor",
        "senderProfilePic": "https://chitchatroomdata.blob.core.windows.net/storage/TheVisitor.png",
        "message": "Hi2 Sir!",
        "messageTime": "2023-07-18T19:18:15.075Z",
        "sentByUser": true,
        "profileColor": "#eb7272"
    },
    {
        "_id": "64b6e953ac7e8026e7885bef",
        "senderUserName": "TheVisitor",
        "senderProfilePic": "https://chitchatroomdata.blob.core.windows.net/storage/TheVisitor.png",
        "message": "Hi2 Sir!",
        "messageTime": "2023-07-18T19:34:43.748Z",
        "sentByUser": true,
        "profileColor": "#eb7272"
    },
    {
        "_id": "64b6ea6d1fe973c30c72f54a",
        "senderUserName": "TheVisitor",
        "senderProfilePic": "https://chitchatroomdata.blob.core.windows.net/storage/TheVisitor.png",
        "message": "Hi2 Sir!",
        "messageTime": "2023-07-18T19:39:25.530Z",
        "sentByUser": true,
        "profileColor": "#eb7272"
    },
    {
        "_id": "64b6ea8a3254e8fd3c38e571",
        "senderUserName": "TheVisitor",
        "senderProfilePic": "https://chitchatroomdata.blob.core.windows.net/storage/TheVisitor.png",
        "message": "Hi2 Sir!",
        "messageTime": "2023-07-18T19:39:54.754Z",
        "sentByUser": true,
        "profileColor": "#eb7272"
    },
    {
        "_id": "64b6eaa0e61553d97c7cf59c",
        "senderUserName": "TheVisitor",
        "senderProfilePic": "https://chitchatroomdata.blob.core.windows.net/storage/TheVisitor.png",
        "message": "Hi2 Sir!",
        "messageTime": "2023-07-18T19:40:16.623Z",
        "sentByUser": true,
        "profileColor": "#eb7272"
    },
    {
        "_id": "64b6eb1cbafacb165b519174",
        "senderUserName": "TheVisitor",
        "senderProfilePic": "https://chitchatroomdata.blob.core.windows.net/storage/TheVisitor.png",
        "message": "Hi2 Sir!",
        "messageTime": "2023-07-18T19:42:20.622Z",
        "sentByUser": true,
        "profileColor": "#eb7272"
    },
    {
        "_id": "64b6ec12ad3b14eefbd205e2",
        "senderUserName": "TheVisitor",
        "senderProfilePic": "https://chitchatroomdata.blob.core.windows.net/storage/TheVisitor.png",
        "message": "Hi2 Sir!",
        "messageTime": "2023-07-18T19:46:26.463Z",
        "sentByUser": false,
        "profileColor": "#eb7272"
    },
    {
        "_id": "64b6f470e132d28b6cd656ea",
        "senderUserName": "TheVisitor",
        "senderProfilePic": "https://chitchatroomdata.blob.core.windows.net/storage/TheVisitor.png",
        "message": "Helllldddddd dddd d d d ddddd dddd dddd ddddd dddd dddd ddddd dddd dddd ddddd dddd dddd ddddd dddd dddd ddddd dddd dddd ddddd dddd dddd ddddd dddd dddd ddddd dddd dddd ddddd dddd dddd ddddd dddd dddd ddddd dddd dddd o!!!",
        "messageTime": "2023-07-18T20:22:08.696Z",
        "sentByUser": false,
        "profileColor": "#eb7272"
    },
    {
        "_id": "64b6f4ad686b508c144bdb96",
        "senderUserName": "TheVisitor",
        "senderProfilePic": "https://chitchatroomdata.blob.core.windows.net/storage/TheVisitor.png",
        "message": "Hellllo!!!",
        "messageTime": "2023-07-18T20:23:09.255Z",
        "sentByUser": true,
        "profileColor": "#eb7272"
    },
    {
        "_id": "64b6f4ce0dea47215b0087df",
        "senderUserName": "TheVisitor",
        "senderProfilePic": "https://chitchatroomdata.blob.core.windows.net/storage/TheVisitor.png",
        "message": "Hellllo!!!",
        "messageTime": "2023-07-18T20:23:42.861Z",
        "sentByUser": false,
        "profileColor": "#eb7272"
    },
    {
        "_id": "64b79ebd3a0c388f5e26d91c",
        "senderUserName": "TheVisitor",
        "senderProfilePic": "https://chitchatroomdata.blob.core.windows.net/storage/TheVisitor.png",
        "message": "Hellllo!!!",
        "messageTime": "2023-07-19T08:28:45.038Z",
        "sentByUser": true,
        "profileColor": "#eb7272"
    },
    {
        "_id": "64b79edd3a0c388f5e26d91f",
        "senderUserName": "TheVisitor",
        "senderProfilePic": "https://chitchatroomdata.blob.core.windows.net/storage/TheVisitor.png",
        "message": "Hellllo!!!",
        "messageTime": "2023-07-19T08:29:17.195Z",
        "sentByUser": false,
        "profileColor": "#eb7272"
    },
    {
        "_id": "64b79f323a0c388f5e26d922",
        "senderUserName": "TheVisitor",
        "senderProfilePic": "https://chitchatroomdata.blob.core.windows.net/storage/TheVisitor.png",
        "message": "Hellllo!!!",
        "messageTime": "2023-07-19T08:30:42.996Z",
        "sentByUser": true,
        "profileColor": "#eb7272"
    },
    {
        "_id": "64b79fa96e63c3441dc6a946",
        "senderUserName": "TheVisitor",
        "senderProfilePic": "https://chitchatroomdata.blob.core.windows.net/storage/TheVisitor.png",
        "message": "Hellllo!!!",
        "messageTime": "2023-07-19T08:32:41.797Z",
        "sentByUser": false,
        "profileColor": "#eb7272"
    },
    {
        "_id": "64b594b7cf4bb09df6c7b41a",
        "senderUserName": "TheVisitor",
        "senderProfilePic": "https://chitchatroomdata.blob.core.windows.net/storage/TheVisitor.png",
        "message": "Heya!",
        "messageTime": "2023-07-20T19:21:27.970Z",
        "sentByUser": true,
        "profileColor": "#eb7272"
    },
    {
        "_id": "64b594e3c379ac9fc87ea4ee",
        "senderUserName": "TheVisitor",
        "senderProfilePic": "https://chitchatroomdata.blob.core.windows.net/storage/TheVisitor.png",
        "message": "What you doin!",
        "messageTime": "2023-07-20T19:22:11.106Z",
        "sentByUser": false,
        "profileColor": "#eb7272"
    }
    ])
  return (
    <>
        {
            !activeChatId && (
                <div className='w-full h-full flex items-center justify-center flex-col text-slate-400 font-bold select-none'>
                  Select any chat to see content!
                  <img src={NoChatImage} alt="No Chat selected" className='w-[60%]'></img>
                </div>
            )
        }
        {
            activeChatId && (
                <ChatOpened messageList={messageList} activeChatId={activeChatId}/>
            )
        }
    </>
  )
}

export default ActiveChat