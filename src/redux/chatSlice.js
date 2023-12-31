import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getJoinedChatsAPI, getGroupMessagesAPI, getSearchedUsersAPI, postNewGroupAPI, postNewOneToOneChatAPI, getGroupMembersAPI, getGroupDetailsAPI } from '../components/utils/api';
import axios from 'axios'
import { toast } from 'react-toastify';
import {socket} from '../components/utils/socket'

export const getJoinedChats = createAsyncThunk(
  "chat/getGroups",
  async (payload, thunkAPI) => {
      const authToken = JSON.parse(localStorage.getItem('authToken'));
      try {
        const joinedGroups = await axios.get(getJoinedChatsAPI(), {
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

export const searchUsers = createAsyncThunk(
  "chat/searchUsers",
  async (payload, thunkAPI) => {
      const authToken = JSON.parse(localStorage.getItem('authToken'));
      try {
        const {searchUsername} = payload;
        const userList = await axios.get(getSearchedUsersAPI(), {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
          params: { searchName: searchUsername }
        });
        return userList.data;
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
      const groupMessages = await axios.get(getGroupMessagesAPI(groupId), {
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

export const createNewGroup = createAsyncThunk(
  "chat/createNewGroup",
  async (payload, thunkAPI) => {
    const authToken = JSON.parse(localStorage.getItem('authToken'));
    const {formContent} = payload
    try {
      const data = await axios.post(postNewGroupAPI(),formContent, {
        headers: {
          authorization: `Bearer ${authToken}`,
          "content-type": "multipart/form-data",
        }
      });
      toast.success("Group has been created!")
      return data.data;
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

export const getGroupDetails = createAsyncThunk(
  "chat/getGroupDetails",
  async (payload, thunkAPI) => {
    const authToken = JSON.parse(localStorage.getItem('authToken'));
    const {groupId} = payload;
    try {
      const groupDetailsAPI = axios.get(getGroupDetailsAPI(groupId), {
        headers: {
          authorization: `Bearer ${authToken}`,
        }
      });
      const groupMembersAPI = axios.get(getGroupMembersAPI(groupId), {
        headers: {
          authorization: `Bearer ${authToken}`,
        }
      });
      const [groupDetails, groupMembers] = await Promise.all([groupDetailsAPI,groupMembersAPI])

      return {members: groupMembers.data.data, currentUser: groupMembers.data.userData, details: groupDetails.data.data};
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

export const createNewOneToOneChat = createAsyncThunk(
  "chat/createOneToOneChat",
  async (payload, thunkAPI) => {
    const authToken = JSON.parse(localStorage.getItem('authToken'));
    const {userId, userName} = payload
    try {
      const createGroupResponse = await axios.post(postNewOneToOneChatAPI(),{
        friendId: userId, 
        friendUsername: userName},{
        headers: {
          authorization: `Bearer ${authToken}`
        },
      });
      toast.success("Chat has been started!")
      return createGroupResponse.data.groupId;
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

const initialState = {
  chats: [],
  chatMessagesMap: {},
  chatDetailsMap: {},
  newChatMessagesIdx: {},
  activeChatId: "",
  isChatBoxOpen: false,
  searchedUsers: [],
  activeGroupDetails: {},
  isGroupListLoading: false
};

const handleUpdateActiveChatId = (state,action) => {
  state.activeChatId = action.payload;
  const chatIdx = state.chats.findLastIndex((chat)=>chat.groupId === state.activeChatId)
  if(chatIdx >= 0 && state.chats[chatIdx].unseenMessages > 0){
    state.chats[chatIdx].unseenMessages = 0;
    const authToken = JSON.parse(localStorage.getItem('authToken'));
    socket.emit("message_read_ack",{
      "groupId": state.activeChatId,
      "auth": authToken
    })
  }
}

export const chat = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    updateActiveChatId: handleUpdateActiveChatId,
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

      // current group received a message set unseencount to 0
      if(state.chats[0].groupId === state.activeChatId){
        state.chats[0].unseenMessages = 0;
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        socket.emit("message_read_ack",{
          "groupId": state.activeChatId,
          "auth": authToken
        })
      }
    },
    setChatBoxOpenState: (state, action) => {
      const position = action.payload;
      state.isChatBoxOpen = position;
    },
    setGroupListLoading: (state, action) => {
      state.isGroupListLoading = action.payload;
    },
    resetStates: () => initialState,
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
          groupCreatedAt: chat.groupCreatedAt,
          isOneToOneGroup: chat.isOneToOne
        }
      })
      state.isGroupListLoading = false;
    })
    .addCase(getJoinedChats.rejected, (state, action) => {
      console.log("Error occured",action.error)
    })
    .addCase(getAllMessages.pending, (state, action) => {
    })
    .addCase(getAllMessages.fulfilled, (state, action) => {
      state.chatMessagesMap[action.payload.groupId] = action.payload.messages.messageList;
      state.newChatMessagesIdx[action.payload.groupId] = action.payload.messages.newMessagesIdx;
    })
    .addCase(getAllMessages.rejected, (state, action) => {
      console.log("Error occured",action.error)
    })
    .addCase(searchUsers.fulfilled, (state, action) => {
      state.searchedUsers = action.payload.data;
    })
    .addCase(searchUsers.rejected, (state, action) => {
      console.log("Error occured",action.error)
    })
    .addCase(createNewGroup.fulfilled, (state, action) => {
    })
    .addCase(createNewGroup.rejected, (state, action) => {
      console.log("Error occured",action.error)
    })
    .addCase(getGroupDetails.fulfilled, (state, action) => {
      state.activeGroupDetails = {
        userData: action.payload.currentUser,
        ...action.payload.details,
        members: action.payload.members
      }
    })
    .addCase(getGroupDetails.rejected, (state, action) => {
      console.log("Error occured",action.error)
    })
    .addCase(createNewOneToOneChat.fulfilled, (state, action) => {
      handleUpdateActiveChatId(state, action);
      state.isChatBoxOpen = true;
    })
    .addCase(createNewOneToOneChat.rejected, (state, action) => {
      console.log("Error occured",action.error)
    })
  },
})

export const chatActions = {...chat.actions, getAllMessages, getJoinedChats, searchUsers, createNewGroup, getGroupDetails, createNewOneToOneChat};

export default chat.reducer