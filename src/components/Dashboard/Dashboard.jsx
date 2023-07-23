import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {AiOutlineUsergroupAdd} from 'react-icons/ai';
import {SlOptionsVertical} from 'react-icons/sl';
import {BiMessageSquareAdd, BiArrowBack} from 'react-icons/bi';
import {FaSearch} from 'react-icons/fa';
import Chatlist from '../Chatlist/Chatlist';
import ActiveChat from '../ActiveChat/ActiveChat';
import { useDispatch, useSelector } from 'react-redux'
import {chatActions} from '../../redux/chatSlice'
import {authActions} from '../../redux/authSlice';
import {socket} from '../utils/socket'
import { toast } from 'react-toastify';
import CreateGroup from '../CreateGroup/CreateGroup';

function Dashboard() {
  const chatList = useSelector((state) => state.chat.chats);
  const authToken = useSelector((state) => state.auth.authToken);
  const userProfileImg = useSelector((state) => state.auth.userProfileImg);
  const activeChatId = useSelector((state) => state.chat.activeChatId);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [displayLogoutPanel, setDisplayLogoutPanel] = useState(false);
  const [selectedChats, setSelectedChats] = useState([]);
  const [viewCreateGroupModal, setViewCreateGroupModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem('authToken'));
    if(!authToken){
        navigate('/')
    } else{
      dispatch(chatActions.getJoinedChats())
    }
  }, []);

  useEffect(() => {
    setSelectedChats(chatList)
  }, [chatList]);

  useEffect(() => {
    setSelectedChats(chatList.filter((e)=>e.groupName.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [chatList, searchTerm]);

  useEffect(() => {
      socket.on('connect', () => {
        console.log("connected");
      });
      socket.on('message_sent', (data) => {
        messageSentHandler(data);
      });
      socket.on('message_received', (data) => {
        messageReceivedHandler(data);
      });
      return () => {
        socket.off('connect');
        socket.off('message_received');
        socket.off('message_sent');
      };
  }, [authToken]);

  const messageSentHandler = async(data) =>{
    await dispatch(chatActions.markMessageSent(data))
  }
  const messageReceivedHandler = async(data) =>{
    await dispatch(chatActions.receiveNewMessage(data))
  }
  const logoutHandler = async() =>{
    setDisplayLogoutPanel(false)
    localStorage.removeItem("authToken");
    await dispatch(authActions.resetStates())
    await dispatch(chatActions.resetStates())
    toast.success("You have been logged out!")
    navigate('/');
  }

  return (
    <>
      <div className='flex flex-row w-full h-screen select-none'>
        <div className='flex-[3.5] bg-[#2B2D31] w-full flex flex-col'>
          <div className='h-[70px] w-full bg-[#111213] flex items-center justify-between'>
            <div className='w-[50px] h-[50px] ml-2 relative cursor-pointer max-md:w-[40px] max-md:h-[40px]'>
              <img alt="profileImage" 
              className='w-full h-full rounded-full' 
              onError={(e)=>{e.target.onerror = null; e.target.src=process.env.REACT_APP_FALLBACK_IMAGE}}
              src={userProfileImg}
              ></img>  
              <div className='absolute bottom-[-8px] right-[-8px] w-5 h-5 bg-green-400 flex items-center justify-center rounded-lg'>
                <BiMessageSquareAdd/>
              </div>
            </div>
            <div className='h-[70px] flex items-center mr-2'>
              <AiOutlineUsergroupAdd onClick={()=>{setViewCreateGroupModal(true)}} className='text-[25px] mr-4 text-gray-300 cursor-pointer'/>
              <div className='flex flex-col'>
              <SlOptionsVertical onClick={()=>{setDisplayLogoutPanel(status=>!status)}} className='text-[20px] text-gray-300 cursor-pointer'/>
              {
                displayLogoutPanel && <div onClick={logoutHandler} className='w-[90px] bg-[#ffffff] float-left fixed top-[55px] rounded-sm text-center font-semibold text-[14px] py-1 cursor-pointer select-none'>Logout</div>
              }
              </div>
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
          <div className='overflow-y-auto'>
            <Chatlist chatList={selectedChats}/>
          </div>
        </div>
        <div className='flex-[6.5] bg-[#323338] w-full'>
          <ActiveChat/>
        </div>
      </div>
        {
          viewCreateGroupModal && (
            <div onClick={()=>{setViewCreateGroupModal(false)}} className='fixed top-0 right-0 left-0 bottom-0 w-screen h-screen bg-[#173a2963] flex items-center justify-center'>
              <CreateGroup setViewCreateGroupModal={setViewCreateGroupModal}/>
          </div>
        )
      }
    </>
  )
}

export default Dashboard