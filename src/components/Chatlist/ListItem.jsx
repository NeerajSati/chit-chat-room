import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {chatActions} from '../../redux/chatSlice'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

function ListItem({chat}) {

  return (
    <div className='flex w-full border-b-2 border-gray-400 pb-2 text-gray-200 cursor-pointer'>
                <div className='w-[70px] flex items-center justify-between pl-2'>
                    <img className='w-[50px] h-[50px] rounded-full border-2 border-gray-400' 
                    src={chat.groupProfilePic} 
                    alt="Group Profile"
                    onError={(e)=>{e.target.onerror = null; e.target.src=process.env.REACT_APP_FALLBACK_IMAGE}}></img>
                </div>
                <div className='my-4 flex flex-col pr-4 pl-2 w-full'>
                    <div className='flex items-center justify-between pt-2'>
                        <div className='font-bold'>{chat.groupName}</div>
                        {
                        chat.lastMessageAt &&
                        <div>{timeAgo.format(new Date(chat.lastMessageAt), 'twitter')}</div>
                        }
                    </div>
                    <div className='flex items-center justify-between pt-1'>
                        {
                            chat.lastMessage ?
                            <div className='text-[14px]'>{chat.lastMessage}</div> :
                            <div className='text-[14px]'>{chat.groupDescription}</div>
                        }
                        <div className='flex'>
                            {chat.isAdmin && 
                            <div className='px-3 h-5 font-bold text-[14px] bg-[#62c16297] flex items-center justify-center rounded-full mr-2 text-black'>Admin</div>}
                            {chat.unseenMessages ?
                            <div className='px-1 h-5 bg-green-500 text-black font-bold flex items-center justify-center rounded-full'>{chat.unseenMessages}</div>:<></>
                            }
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default ListItem