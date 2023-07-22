import React, { useRef, useState, useEffect } from 'react'
import {BiSend} from 'react-icons/bi'
import Message from './Message'

function ChatOpened({messageList, activeChatId}) {
    const [sendMessageQuery, setSendMessageQuery] = useState("");
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
    <div className='bg-[#212326] w-full h-screen flex flex-col justify-between'>
        <div className='w-full bg-blue-950 h-[70px]'>

        </div>
        <div ref={messageRef} className='h-full overflow-y-scroll'>
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
        <div className='bg-[#202C33] h-[90px] w-full flex items-center justify-center'>
            <div className='bg-[#505257] w-[90%] h-[50px] rounded-lg px-4 pr-2 py-2 flex flex-row justify-between'>
                <input placeholder='Type Hey!' value={sendMessageQuery} onChange={(e)=>{setSendMessageQuery(e.target.value)}} className='text-white bg-transparent outline-none w-[90%] pr-5'></input>
                {sendMessageQuery && <div className='bg-[#212326] cursor-pointer w-[40px] h-[40px] rounded-full flex items-center justify-center mr-3'>
                    <BiSend className='text-[25px] text-[#2eb99f]'/>
                </div>}
            </div>
        </div>
    </div>
  )
}

export default ChatOpened