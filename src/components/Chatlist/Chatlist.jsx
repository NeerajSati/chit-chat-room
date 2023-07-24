import React, { useState, useEffect } from 'react'
import ListItem from './ListItem'
import { useDispatch, useSelector } from 'react-redux'
import {chatActions} from '../../redux/chatSlice'
import ListItemLoading from './ListItemLoading';

function Chatlist({chatList}) {
  const [activeChatId, setActiveChatId] = useState("");
  const isGroupListLoading = useSelector((state) => state.chat.isGroupListLoading);
  const dispatch = useDispatch();
  useEffect(()=>{
      if(activeChatId){
          dispatch(chatActions.updateActiveChatId(activeChatId))
          dispatch(chatActions.setChatBoxOpenState(true))
      }
  },[activeChatId])

  return (
    <>
    {
        isGroupListLoading ? (
          [...Array(8).keys()].map(((key)=>{
            return (
              <div key={key}>
                <ListItemLoading/>
              </div>
            )
        }))
        ) :
        (chatList && chatList.map((chat)=>{
            return (
              <div key={chat.groupId} onClick={()=>{setActiveChatId(chat.groupId)}}>
                <ListItem chat={chat}/>
              </div>
            )
        }))
    }
    </>
  )
}

export default Chatlist