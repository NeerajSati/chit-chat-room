import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {AiOutlineUsergroupAdd} from 'react-icons/ai';
import {SlOptionsVertical} from 'react-icons/sl';
import {BiMessageSquareAdd, BiArrowBack} from 'react-icons/bi';
import {FaSearch} from 'react-icons/fa';
import Chatlist from '../Chatlist/Chatlist';
import NoChatImage from './../../assets/EmptyScreen.jpg'

function Dashboard() {
  const [chatList, setChatList] = useState([]);
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
            <input placeholder='Search my chats' value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value)}} className='bg-[#18191b] outline-none w-full ml-4' onFoc/>
          </div>
        </div>
        <div className='overflow-y-scroll'>
          <Chatlist chatList={chatList}/>
        </div>
      </div>
      <div className='flex-[6.5] bg-[#323338] w-full'>
        <div className='w-full h-full flex items-center justify-center flex-col text-slate-400 font-bold select-none'>
          Select any chat to see content!
          <img src={NoChatImage} alt="No Chat selected" className='w-[60%]'></img>
        </div>
      </div>
    </div>
  )
}

export default Dashboard