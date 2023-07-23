import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { chatActions } from '../../redux/chatSlice';
import {RxCross2} from 'react-icons/rx'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

function GroupDetails({setViewGroupDetailsModal}) {
    const activeChatId = useSelector((state) => state.chat.activeChatId);
    const activeGroupDetails = useSelector((state) => state.chat.activeGroupDetails);
    const dispatch = useDispatch();

    useEffect(()=>{
        loadGroupDetails();
    },[activeChatId])

    const loadGroupDetails = async() =>{
        await dispatch(chatActions.getGroupDetails({groupId: activeChatId}))
    }

  return (
    <div onClick={(e)=>{e.stopPropagation()}} className='py-2 px-2 w-[600px] max-h-[90vh] max-md:w-screen max-md:h-screen max-md:max-h-screen bg-[#ffffff] overflow-y-auto relative'>
        <div className='py-2 pb-5 font-bold w-full text-center text-[20px]'>{activeGroupDetails.groupName}</div>
        <div className='grid grid-cols-6'>
            <div className='col-start-1 col-end-3 flex items-center justify-center'>
                <img alt="profileImage" 
                    className='rounded-full border-2 border-gray-500 w-[150px] h-[150px] max-md:w-[90px] max-md:h-[90px]' 
                    onError={(e)=>{e.target.onerror = null; e.target.src=process.env.REACT_APP_FALLBACK_IMAGE}}
                    src={activeGroupDetails.groupProfilePic}
                ></img>
            </div>
            <div className='col-start-3 col-end-7 flex flex-col items-start justify-center'>
                <div className='py-2 font-semibold text-[12px]'>Group Name: <span className='font-bold text-[16px]'>{activeGroupDetails.groupName}</span>
                </div>
                <div className='py-2 font-semibold text-[12px]'>Group Description: <span className='font-bold text-[16px]'>{activeGroupDetails.groupDescription}</span>
                </div>
            </div>
        </div>
        <div>
            {
                activeGroupDetails && activeGroupDetails.userData &&
                (<div className='px-5'>
                    <div className='w-full h-[55px] bg-[#9af3c597] border-2 border-gray-300 mt-2 rounded-sm px-2 flex flex-row items-center justify-between'>
                        <div className='flex flex-row items-center justify-center'>
                            <img alt="profileImage" 
                                className='rounded-full border-2 border-gray-500 w-[40px] h-[40px]' 
                                onError={(e)=>{e.target.onerror = null; e.target.src=process.env.REACT_APP_FALLBACK_IMAGE}}
                                src={activeGroupDetails.userData.profilePic}
                            ></img>
                            <div className='pl-2 font-bold flex flex-col'>
                                <div>@{activeGroupDetails.userData.username}</div>
                                <div className='font-normal text-[12px]'>You</div>
                            </div>
                        </div>
                        <div className='flex flex-row items-center justify-center'>
                            {activeGroupDetails.userData.isAdmin && <button className='px-2 bg-[#80e27c] rounded-sm ml-3 text-[14px] font-semibold'>Admin</button>}
                        </div>
                    </div>
                </div>)
            }
            <div className='w-full bg-white rounded-md px-5'>
                {
                    activeGroupDetails && activeGroupDetails.members && activeGroupDetails.members.map((member)=>{
                        return <div className='w-full h-[55px] bg-[#e2e3e397] border-2 border-gray-300 mt-2 rounded-sm px-2 flex flex-row items-center justify-between' key={member.userId}>
                            <div className='flex flex-row items-center justify-center'>
                                <img alt="profileImage" 
                                    className='rounded-full border-2 border-gray-500 w-[40px] h-[40px]' 
                                    onError={(e)=>{e.target.onerror = null; e.target.src=process.env.REACT_APP_FALLBACK_IMAGE}}
                                    src={member.profilePic}
                                ></img>
                                <div className='pl-2 font-bold flex flex-col'>
                                    <div>@{member.username}</div>
                                    <div className='font-normal text-[12px]'>Last online: {timeAgo.format(new Date(member.lastSeen), 'mini')}</div>
                                </div>
                            </div>
                            <div className='flex flex-row items-center justify-center'>
                                {member.isAdmin && <button className='px-2 bg-[#84e881] rounded-sm ml-3 text-[14px] font-semibold'>Admin</button>}
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
        <div onClick={()=>{setViewGroupDetailsModal(false)}} className='absolute top-[20px] right-[20px] text-[25px] cursor-pointer text-[#861a1a]'><RxCross2/></div>
    </div>
  )
}

export default GroupDetails