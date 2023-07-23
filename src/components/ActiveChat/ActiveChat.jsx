import React, { useState } from 'react'
import NoChatImage from './../../assets/EmptyScreen.jpg'
import NoChats from './NoChats'
import ChatOpened from './ChatOpened'
import { useSelector } from 'react-redux'

function ActiveChat() {
    const activeChatId = useSelector((state) => state.chat.activeChatId);
  return (
    <>
      <div className='flex-[6.5] bg-[#323338] w-full'>
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
                <ChatOpened/>
            )
        }
      </div>
    </>
  )
}

export default ActiveChat