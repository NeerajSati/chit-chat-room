import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ActiveChat from '../ActiveChat/ActiveChat';
import { useDispatch, useSelector } from 'react-redux'
import {chatActions} from '../../redux/chatSlice'
import {socket} from '../utils/socket'
import ChatNavigator from '../ChatNavigator/ChatNavigator';

function Dashboard() {
  const authToken = useSelector((state) => state.auth.authToken);
  const isChatBoxOpen = useSelector((state) => state.chat.isChatBoxOpen);
  const activeChatId = useSelector((state) => state.chat.activeChatId);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [displayLogoutPanel, setDisplayLogoutPanel] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem('authToken'));
    if(!authToken){
        navigate('/')
    } else{
      dispatch(chatActions.getJoinedChats())
    }
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setScreenWidth(window.innerWidth);
      });
    };
  }, []);

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

  return (
    <>
      {
        screenWidth < 768 ? (
          <div className='flex flex-col w-full h-screen select-none' onClick={()=>{setDisplayLogoutPanel(false)}}>
            {
              isChatBoxOpen ? 
              <ActiveChat/> : 
              <ChatNavigator setDisplayLogoutPanel={setDisplayLogoutPanel} displayLogoutPanel={displayLogoutPanel}/>
            }      
          </div>
        ) : (
          <div className='flex flex-row w-full h-screen select-none' onClick={()=>{setDisplayLogoutPanel(false)}}>
            <ChatNavigator setDisplayLogoutPanel={setDisplayLogoutPanel} displayLogoutPanel={displayLogoutPanel}/>
            <ActiveChat/>
          </div>
        )
      }
      
    </>
  )
}

export default Dashboard