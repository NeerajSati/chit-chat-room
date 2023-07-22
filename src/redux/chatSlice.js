import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getGroupsJoined, getGroupMessages } from '../components/utils/api';
import axios from 'axios'
import { toast } from 'react-toastify';

export const getJoinedChats = createAsyncThunk(
  "chat/getGroups",
  async (payload, thunkAPI) => {
      const authToken = JSON.parse(localStorage.getItem('authToken'));
      try {
        const joinedGroups = await axios.get(getGroupsJoined(), {
          headers: {
            authorization: `Bearer ${authToken}`,
          }
        });
        return joinedGroups.data;
      } catch (err) {
        if(err?.response?.data?.msg){
          toast.error(err?.response?.data?.msg);
        } else{
          toast.error("Something went wrong");
        }
        throw err;
      }
  }
);

export const getAllMessages = createAsyncThunk(
  "chat/getMessages",
  async (payload, thunkAPI) => {
    const authToken = JSON.parse(localStorage.getItem('authToken'));
    const {groupId} = payload;
    try {
      const groupMessages = await axios.get(getGroupMessages(groupId), {
        headers: {
          authorization: `Bearer ${authToken}`,
        }
      });
      return {messages: groupMessages.data.data, groupId};
    } catch (err) {
      if(err?.response?.data?.msg){
        toast.error(err?.response?.data?.msg);
      } else{
        toast.error("Something went wrong");
      }
      throw err;
    }
  }
);

export const chat = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    chatMessagesMap: {},
    chatDetailsMap: {},
    newChatMessagesIdx: {},
    activeChatId: ""
  },
  reducers: {
    updateActiveChatId: (state, action) => {
      state.activeChatId = action.payload;
      const chatIdx = state.chats.findLastIndex((chat)=>chat.groupId === state.activeChatId)
      if(chatIdx >= 0){
        state.chats[chatIdx].unseenMessages = 0;
      }
    },
    sendMessagePending: (state, action) => {
      const {message,temporaryId} = action.payload;
      state.chatMessagesMap[state.activeChatId].push({
        "_id": temporaryId,
        "temporaryId": temporaryId,
        "messageTime": String(new Date()),
        "sentByUser": true,
        "messageStatus": "pending",
        "profileColor": "#507dff",
        message,
      })
      const chatIdx = state.chats.findLastIndex((chat)=>chat.groupId === state.activeChatId)
      if(chatIdx >= 0){
        let recentChat = state.chats.splice(chatIdx, 1);
        recentChat[0].lastMessage = message;
        recentChat[0].lastMessageAt = String(new Date());
        recentChat[0].unseenMessages = 0;

        state.chats.unshift(recentChat[0])
      }
    },
    markMessageSent: (state, action) => {
      const {groupId,tempMessageId} = action.payload;
      const msgIdx = state.chatMessagesMap[groupId].findLastIndex((chat)=>chat.temporaryId === tempMessageId)
      if(msgIdx >= 0){
        state.chatMessagesMap[groupId][msgIdx].messageStatus="send"
      }
    },
    receiveNewMessage: (state, action) => {
      const {groupId, message} = action.payload;

      if(state.chatMessagesMap[groupId]){
        state.chatMessagesMap[groupId].push(message);
      }
      const chatIdx = state.chats.findLastIndex((chat)=>chat.groupId === groupId)
      // when we get a message in existing group, just append message there
      if(chatIdx >= 0){
        let recentChat = state.chats.splice(chatIdx, 1);
        recentChat[0].lastMessage = message.message;
        recentChat[0].lastMessageAt = String(new Date());
        recentChat[0].unseenMessages = recentChat[0].unseenMessages + 1;
        state.chats.unshift(recentChat[0])
      } else{
        // if message on new group, create a new group
        state.chats.unshift({
          groupId,
          lastMessage: message.message,
          lastMessageAt: message.messageTime,
          groupName: message.groupName,
          groupProfilePic: message.groupProfilePic,
          unseenMessages: 1
        })
      }
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getJoinedChats.pending, (state, action) => {
    })
    .addCase(getJoinedChats.fulfilled, (state, action) => {
      state.chats = action.payload.data;
      state.chats.forEach((chat)=>{
        state.chatDetailsMap[chat.groupId] = {
          groupName: chat.groupName,
          groupDescription: chat.groupDescription,
          groupProfilePic: chat.groupProfilePic,
          groupCreatedAt: chat.groupCreatedAt
        }
      })
    })
    .addCase(getJoinedChats.rejected, (state, action) => {
      throw action.error;
    })
    .addCase(getAllMessages.pending, (state, action) => {
    })
    .addCase(getAllMessages.fulfilled, (state, action) => {
      state.chatMessagesMap[action.payload.groupId] = action.payload.messages.messageList;
      state.newChatMessagesIdx[action.payload.groupId] = action.payload.messages.newMessagesIdx;
    })
    .addCase(getAllMessages.rejected, (state, action) => {
      throw action.error;
    })
  },
})

export const chatActions = {...chat.actions, getAllMessages, getJoinedChats};

export default chat.reducer