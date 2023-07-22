import React, { useRef, useState, useEffect } from 'react'
import Message from './Message'

function ChatOpened({messageList, activeChatId}) {
    const [activeChatName, setActiveChatName] = useState("Money Heist Discussion")
    const [activeChatProfilePic, setActiveChatProfilePic] = useState("https://img.freepik.com/free-icon/avatar_318-178064.jpg")
    const [activeChatDescription, setActiveChatDescription] = useState("Please meet at Bank of Spain")

    const messageRef = useRef(null);
    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    },[messageList])

  return (
    <div className='w-full h-screen flex flex-col justify-between'>
        <div className='w-full bg-blue-950 h-[70px]'>

        </div>
        <div ref={messageRef} className='bg-[#212326] h-full overflow-y-scroll'>
            {messageList && messageList.length ? (
                messageList.map((message)=>{
                    return <Message messageContent={message} key={message._id}/>
                })
            ) : (
                <div className='w-full h-full flex items-center justify-center flex-col text-gray-400 font-bold select-none'>
                  No Messages Yet!
                </div>
            )}
        </div>
        <div className='h-[90px] bg-white w-full'>

        </div>
    </div>
  )
}

export default ChatOpened