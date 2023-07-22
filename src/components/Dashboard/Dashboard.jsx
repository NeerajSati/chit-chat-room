import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {AiOutlineUsergroupAdd} from 'react-icons/ai';
import {SlOptionsVertical} from 'react-icons/sl';
import {BiMessageSquareAdd, BiArrowBack} from 'react-icons/bi';
import {FaSearch} from 'react-icons/fa';
import Chatlist from '../Chatlist/Chatlist';
import ActiveChat from '../ActiveChat/ActiveChat';

function Dashboard() {
  const [chatList, setChatList] = useState([
    {
        "groupId": "64b60f779f1b489b27830493",
        "lastMessage": "Hellllo!!!",
        "lastMessageAt": "2023-07-19T08:32:41.797Z",
        "lastSeen": "2023-07-19T08:32:41.608Z",
        "isAdmin": true,
        "groupName": "heheisitors Guild",
        "groupDescription": "Meet new people here!",
        "groupProfilePic": "hi",
        "groupCreatedAt": "2023-07-18T04:05:11.694Z",
        "unseenMessages": 3
    },
    {
        "groupId": "64b6cee11d13eb62274ec95c",
        "lastSeen": "2023-07-18T17:41:54.706Z",
        "isAdmin": true,
        "groupName": "heheVisitors Guild",
        "groupDescription": "Meet new people here!",
        "groupProfilePic": "https://chitchatroomdata.blob.core.windows.net/storage/group-profile-9f360ead-d30d-4a89-bfdf-551057483d8a.png",
        "groupCreatedAt": "2023-07-18T17:41:53.805Z"
    },
    {
        "groupId": "64b61b0855eb0896788e1bd0",
        "lastSeen": "2023-07-18T04:54:32.931Z",
        "isAdmin": true,
        "groupName": "hedjVisitors Guild",
        "groupDescription": "Meet some new people here!",
        "groupProfilePic": "hi",
        "groupCreatedAt": "2023-07-18T04:54:32.814Z"
    },
    {
        "groupId": "64b618be3d0ed9c6cab47819",
        "lastSeen": "2023-07-18T04:44:46.708Z",
        "isAdmin": true,
        "groupName": "Visitors Guild",
        "groupDescription": "Meet new people here!",
        "groupProfilePic": "hi",
        "groupCreatedAt": "2023-07-18T04:44:46.537Z"
    }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
      const authToken = JSON.parse(localStorage.getItem('authToken'));
      if(!authToken){
          navigate('/')
      }
  }, []);

  useEffect(() => {
    setChatList((chatList.filter((e)=>e.groupName.includes(searchTerm))))
}, [searchTerm]);

  return (
    <div className='flex flex-row w-full h-screen'>
      <div className='flex-[3.5] bg-[#2B2D31] w-full flex flex-col'>
        <div className='h-[70px] w-full bg-[#111213] flex items-center justify-between'>
          <div className='w-[50px] h-[50px] ml-2 relative cursor-pointer max-md:w-[40px] max-md:h-[40px]'>
            <img alt="profileImage" className='w-full h-full rounded-full' src="https://images.pexels.com/photos/17102422/pexels-photo-17102422/free-photo-of-wood-landscape-water-summer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>  
            <div className='absolute bottom-[-8px] right-[-8px] w-5 h-5 bg-green-400 flex items-center justify-center rounded-lg'>
              <BiMessageSquareAdd/>
            </div>
          </div>
          <div className='h-[70px] flex items-center mr-2'>
            <AiOutlineUsergroupAdd className='text-[25px] mr-4 text-gray-300 cursor-pointer'/>
            <SlOptionsVertical className='text-[20px] text-gray-300 cursor-pointer'/>
          </div>
        </div>
        <div className='py-3 flex items-center justify-center'>
          <div className='bg-[#18191b] text-[15px] text-white rounded-md p-2 py-2 w-[90%] flex flex-row items-center cursor-pointer'>
            {
              searchTerm ? 
              <BiArrowBack className='text-[20px] text-green-400' onClick={() => setSearchTerm("")}/> :
              <FaSearch onClick={() => setSearchTerm("")}/>
            }
            <input placeholder='Search my chats' value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value)}} className='bg-[#18191b] outline-none w-full ml-4'/>
          </div>
        </div>
        <div className='overflow-y-scroll'>
          <Chatlist/>
        </div>
      </div>
      <div className='flex-[6.5] bg-[#323338] w-full'>
        <ActiveChat/>
      </div>
    </div>
  )
}

export default Dashboard