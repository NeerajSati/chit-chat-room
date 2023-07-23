import React, { useEffect, useState } from 'react'
import {RiImageAddFill} from 'react-icons/ri'
import {FaSearch} from 'react-icons/fa';
import {MdOutlineRemoveCircle} from 'react-icons/md';
import { toast } from 'react-toastify';
import {chatActions} from '../../redux/chatSlice'
import { useDispatch, useSelector } from 'react-redux'
import {RxCross2} from 'react-icons/rx'

function SearchUsers({setViewSearchUserModal}) {
    const [searchUsername, setSearchUsername] = useState("");
    const searchedUsers = useSelector((state) => state.chat.searchedUsers);
    const allChats = useSelector((state) => state.chat.chats);
    const dispatch = useDispatch();

    useEffect(()=>{
        searchUsernameHandler()
    })

    const searchUsernameHandler = async() =>{
        await dispatch(chatActions.searchUsers({searchUsername}))
    }

    const chatWithUserHandler = async(userId, userName) =>{
        let existingOneToOneChat = allChats.find((chat)=>chat.friendId === userId);
        if(allChats && existingOneToOneChat){
            dispatch(chatActions.updateActiveChatId(existingOneToOneChat.groupId))
            dispatch(chatActions.setChatBoxOpenState(true))
            setViewSearchUserModal(false)
        } else{
            await dispatch(chatActions.createNewOneToOneChat({userId, userName}))
            await dispatch(chatActions.getJoinedChats())
            setViewSearchUserModal(false)
        }
    }

  return (
    <div onClick={(e)=>{e.stopPropagation()}} className='py-2 px-2 w-[600px] max-h-[90vh] max-md:w-screen max-md:h-screen max-md:max-h-screen bg-[#ffffff] overflow-y-auto relative'>
        <div className='py-2 pb-5 font-bold w-full text-center text-[20px]'>Search Users!</div>
        <div className='px-5 font-semibold'>Search with username:
            <div className='mt-2 w-full h-[50px] rounded-lg px-4 pr-2 py-2 flex flex-row justify-between items-center border-2 border-gray-700'>
                <input placeholder='Type username!' 
                value={searchUsername} 
                onChange={(e)=>{setSearchUsername(e.target.value)}} 
                onKeyDown={(e) => {if (e.key === "Enter") {searchUsernameHandler()}}}
                className='outline-none w-[90%] pr-5'></input>
                <div onClick={searchUsernameHandler} className='bg-[#0a73ab] cursor-pointer w-[40px] h-[40px] rounded-full flex items-center justify-center mr-3'>
                    <FaSearch className='text-[25px] text-white'/>
                </div>
            </div>
        </div>
        <div className='w-full bg-white rounded-md px-5 searchedMemberList max-h-[400px] overflow-y-auto'>
            {
                searchedUsers && searchedUsers.map((member)=>{
                    return <div className='w-full h-[45px] bg-[#e2e3e397] border-2 border-gray-300 mt-2 rounded-sm px-2 flex flex-row items-center justify-between' key={member._id}>
                        <div className='flex flex-row items-center justify-center'>
                            <img alt="profileImage" 
                                className='rounded-full border-2 border-gray-500 w-[40px] h-[40px]' 
                                onError={(e)=>{e.target.onerror = null; e.target.src=process.env.REACT_APP_FALLBACK_IMAGE}}
                                src={member.profilePic}
                            ></img>
                            <div className='pl-2 font-bold'>@{member.username}</div>
                        </div>
                        <div className='flex flex-row items-center justify-center'>
                            <button onClick={()=>{chatWithUserHandler(member._id, member.username)}} className='px-2 bg-[#84e881] rounded-sm ml-3 text-[14px] font-semibold'>Chat!</button>
                        </div>
                    </div>
                })
            }
        </div>
        <div onClick={()=>{setViewSearchUserModal(false)}} className='absolute top-[20px] right-[20px] text-[25px] cursor-pointer text-[#861a1a]'><RxCross2/></div>
    </div>
  )
}

export default SearchUsers