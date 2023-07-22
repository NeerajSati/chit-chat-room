import React from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { BsCheckAll } from 'react-icons/bs';
import { FiClock } from 'react-icons/fi';
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

function Message({messageContent}) {
  return (
        messageContent.sentByUser ? (
            <div className='w-full flex flex-row items-center justify-end pr-5 pb-2'>
                <div className='max-w-[60%] pl-3 pr-2 py-1 bg-[#005C4B] text-[15px] text-white mt-2 rounded-lg rounded-br-none flex flex-row text-justify'>
                    <div>{messageContent.message}</div>
                    <div className='text-[10px] text-[#d5d5d5] flex items-end justify-end ml-3'>{timeAgo.format(new Date(messageContent.messageTime), 'twitter')}</div>
                    <div className='text-[16px] text-[#37f2ff] flex items-end justify-end ml-1'>{!messageContent.temporaryId ? <BsCheckAll/> : <FiClock className='text-[12px] text-[#e2f53e]'/>}</div>
                </div>
            </div>) : (
            <div className='w-full flex flex-row items-center pl-5 pb-2'>
                <div className='pr-2'>
                    <img className='w-[40px] h-[40px] rounded-full border-2'
                    style={{borderColor: messageContent.profileColor}}
                    src={messageContent.senderProfilePic} 
                    alt="Group Profile"
                    onError={(e)=>{e.target.onerror = null; e.target.src=process.env.REACT_APP_FALLBACK_IMAGE}}></img>
                </div>
                <div className='max-w-[60%] pl-3 pr-2 py-1 bg-[#ffffff38] text-[15px] text-white mt-2 rounded-lg rounded-tl-none'>
                    <div style={{color: messageContent.profileColor}} className='font-bold text-[14px] pb-1'>@{messageContent.senderUserName}</div>
                    <div className='flex flex-row text-justify'>
                        <div>{messageContent.message}</div>
                        <div className='text-[10px] text-[#d5d5d5] flex items-end justify-end ml-3'>{timeAgo.format(new Date(messageContent.messageTime), 'twitter')}</div>
                    </div>
                </div>
            </div>)
  )
}

export default Message