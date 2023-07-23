import React, { useState, useEffect } from 'react'
import ListItem from './ListItem'
import { useDispatch, useSelector } from 'react-redux'
import {chatActions} from '../../redux/chatSlice'

function Chatlist({chatList}) {
  const [activeChatId, setActiveChatId] = useState("");
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
        chatList && chatList.map((chat)=>{
            return (
              <div key={chat.groupId} onClick={()=>{setActiveChatId(chat.groupId)}}>
                <ListItem chat={chat}/>
              </div>
            )
        })
    }
    </>
  )
}

export default Chatlist