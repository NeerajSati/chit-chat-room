import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getGroupsJoined, getGroupMessages } from '../components/utils/api';
import axios from 'axios'
import { toast } from 'react-toastify';

export const getJoinedChats = createAsyncThunk(
  "chat/getGroups",
  async (payload, thunkAPI) => {
      const authToken = JSON.parse(localStorage.getItem('authToken'));
      try {
        const joinedGroups = await axios.post(getGroupsJoined(), {
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
      const groupMessages = await axios.post(getGroupMessages(groupId), {
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
    chatMessages: {},
    newChatMessagesIdx: {},
    activeChatId: ""
  },
  reducers: {
    updateActiveChatId: (state, action) => {
      state.activeChatId = action.payload;
    },
    sendMessagePending: (state, action) => {
      const {message,temporaryId} = action.payload;
      state.chatMessages[state.activeChatId].push({
        "temporaryId": temporaryId,
        "messageTime": String(new Date()),
        "sentByUser": true,
        "messageStatus": "pending",
        "profileColor": "#507dff",
        message,
      })
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getJoinedChats.pending, (state, action) => {
    })
    .addCase(getJoinedChats.fulfilled, (state, action) => {
      state.chats = action.payload.data;
    })
    .addCase(getJoinedChats.rejected, (state, action) => {
      throw action.error;
    })
    .addCase(getAllMessages.pending, (state, action) => {
    })
    .addCase(getAllMessages.fulfilled, (state, action) => {
      state.chatMessages[action.payload.groupId] = action.payload.messages.messageList;
      state.newChatMessagesIdx[action.payload.groupId] = action.payload.messages.newMessagesIdx;
    })
    .addCase(getAllMessages.rejected, (state, action) => {
      throw action.error;
    })
  },
})

export const chatActions = chat.actions;

export default chat.reducer