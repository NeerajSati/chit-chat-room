import React from 'react'
import HeroImage from './../../assets/HeroImage.webp'
import { FaTeamspeak } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';
import 'animate.css';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="w-100 h-[100vh] text-[16px] bg-red-500 text-[#fffd8f] font-[Tektur] font-bold  max-sm:text-[14px]" style={{ backgroundImage: `url(${HeroImage})`, backgroundPosition: 'center'}}>
      <div className='w-100 pl-10 pr-10 pt-5 pb-5 flex flex-row justify-between max-sm:pl-1 max-sm:pr-1'>
        <div className='flex flex-row justify-center items-center'><FaTeamspeak className='text-[50px] max-sm:text-[35px]'/> <span className='tracking-[3px] ml-3'>ChitChat</span></div>
        <div className='flex flex-row justify-center items-center'>
          <Link to="/login" className='ml-5 bg-gray-800 p-2 pl-5 pr-5 rounded-[20px] cursor-pointer tracking-[1px] max-sm:pl-3 max-sm:pr-3 max-sm:ml-3'>Login</Link>
          <Link to="/register" className='ml-5 bg-gray-800 p-2 pl-5 pr-5 rounded-[20px] cursor-pointer tracking-[1px] max-sm:pl-3 max-sm:pr-3 max-sm:ml-3'>Register</Link>
        </div>
      </div>
      <div className='text-white w-100 h-100 mt-[3rem] flex items-center justify-center flex-col text-[30px] font-[Manrope] max-sm:text-[16px]'>
        Chat and Connect with People
        <Typewriter
          options={{
            strings: ['Anytime','Anywhere','On one click'],
            autoStart: true,
            loop: true,
            delay:50,
          }}
        />
      </div>
      <Link to="/login" className='absolute left-[50%] bottom-[10%] translate-x-[-50%] text-white text-[16px] rounded-[20px] bg-[#ffffff26] p-2 pl-5 pr-5 tracking-[1px] max-sm:pl-3 max-sm:pr-3 max-sm:text-[14px]'>Get Started</Link>
    </div>
  )
}

export default LandingPage