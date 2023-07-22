import React, { useState } from 'react'
import ListItem from './ListItem'

function Chatlist({chatList}) {
  return (
    <>
    {
        chatList && chatList.map((chat)=>{
            return (
            <ListItem chat={chat} key={chat.groupId}/>
            )
        })
    }
    </>
  )
}

export default Chatlist