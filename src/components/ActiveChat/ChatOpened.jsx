import React, { useRef, useState, useEffect } from 'react'
import {BiSend} from 'react-icons/bi'
import Message from './Message'
import {BiMessageSquareAdd} from 'react-icons/bi';
import {AiOutlineUsergroupAdd, AiOutlineInfoCircle} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux'
import {chatActions} from '../../redux/chatSlice'
import {socket} from '../utils/socket'

function ChatOpened() {
    const [sendMessageQuery, setSendMessageQuery] = useState("");
    const [activeChatMessages, setActiveChatMessages] = useState([]);
    const [activeChatDetails, setActiveChatDetails] = useState({});
    const messageListMap = useSelector((state) => state.chat.chatMessagesMap);
    const chatDetailsMap = useSelector((state) => state.chat.chatDetailsMap);
    const activeChatId = useSelector((state) => state.chat.activeChatId);
    // const chatListNewMsgIdx = useSelector((state) => state.chat.newChatMessagesIdx);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(activeChatId){
          loadActiveChatMessages();
          if(Object.keys(chatDetailsMap).includes(activeChatId)){
            setActiveChatDetails(chatDetailsMap[activeChatId]);
          }
        }
    }, [activeChatId])

    useEffect(() => {
      if(Object.keys(messageListMap).includes(activeChatId)){
        setActiveChatMessages(messageListMap[activeChatId]);
      }
    },[messageListMap])

    useEffect(() => {
      if(Object.keys(chatDetailsMap).includes(activeChatId)){
        setActiveChatDetails(chatDetailsMap[activeChatId]);
      }
    },[chatDetailsMap])

    const messageRef = useRef(null);
    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    },[activeChatMessages])

    const loadActiveChatMessages = async() => {
        //if we already have loaded chat data
        if(Object.keys(messageListMap).includes(activeChatId)){
          setActiveChatMessages(messageListMap[activeChatId]);
        } else{
          try {
            await dispatch(
              chatActions.getAllMessages({ groupId: activeChatId })
            );
          } catch (e) {
            console.log(e);
          }
        }
    }

    const sendMessageHandler = async() => {
      const authToken = JSON.parse(localStorage.getItem('authToken'));
      if(sendMessageQuery && authToken){
        const tempMessageId = String(Date.now());
        await dispatch(chatActions.sendMessagePending({
          temporaryId: tempMessageId,
          message: sendMessageQuery
        }))
        socket.emit("send_message",{
          "groupId": activeChatId, 
          "message": sendMessageQuery, 
          "tempMessageId":tempMessageId, 
          "auth":authToken
        })
        setSendMessageQuery("")
      }
    }

  return (
    <div className='bg-[#212326] w-full h-screen flex flex-col justify-between'>
        <div className='w-full bg-gradient-to-r from-[#00070b60] to-[#00325660] bg-[#111213] h-[90px] cursor-pointer flex justify-between items-center'>
          <div className='ml-2 flex flex-row items-center'>
            <img alt="profileImage" 
            className='w-[50px] h-[50px] rounded-full border-2' 
            onError={(e)=>{e.target.onerror = null; e.target.src=process.env.REACT_APP_FALLBACK_IMAGE}}
            src={activeChatDetails.groupProfilePic}
            ></img>
            <div className='flex flex-col pl-4'>
                <div className='text-[18px] font-bold text-[#e1e1e1]'>{activeChatDetails.groupName}</div>
                <div className='text-[12px] font-semibold text-[#888888]'>{activeChatDetails.groupDescription}</div>
            </div>
          </div>
          <div className='h-[70px] flex items-center mr-5'>
            <AiOutlineInfoCircle className='text-[20px] text-gray-200 cursor-pointer'/>
          </div>
        </div>
        <div ref={messageRef} className='h-full overflow-y-scroll'>
            {activeChatMessages && activeChatMessages.length ? (
                activeChatMessages.map((message)=>{
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
                <input placeholder='Type Hey!' 
                value={sendMessageQuery} 
                onChange={(e)=>{setSendMessageQuery(e.target.value)}} 
                onKeyDown={(e) => {if (e.key === "Enter") {sendMessageHandler()}}}
                className='text-white bg-transparent outline-none w-[90%] pr-5'></input>
                {sendMessageQuery && <div onClick={sendMessageHandler} className='bg-[#212326] cursor-pointer w-[40px] h-[40px] rounded-full flex items-center justify-center mr-3'>
                    <BiSend className='text-[25px] text-[#2eb99f]'/>
                </div>}
            </div>
        </div>
    </div>
  )
}

export default ChatOpened