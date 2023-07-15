import React from 'react'
import HeroImage from './../../assets/HeroImage.webp'
import { FaTeamspeak } from 'react-icons/fa';
import 'animate.css';

function LandingPage() {
  return (
    <div className="w-100 h-[100vh] text-[16px] bg-red-500 text-[#fffd8f] font-[Tektur] font-bold  max-sm:text-[14px]" style={{ backgroundImage: `url(${HeroImage})`, backgroundPosition: 'center'}}>
      <div className='w-100 pl-10 pr-10 pt-5 pb-5 flex flex-row justify-between max-sm:pl-1 max-sm:pr-1'>
        <div className='flex flex-row justify-center items-center'><FaTeamspeak className='text-[50px] max-sm:text-[35px]'/> <span className='tracking-[3px] ml-3'>ChitChat</span></div>
        <div className='flex flex-row justify-center items-center'>
          <button className='ml-5 bg-gray-800 p-2 pl-5 pr-5 rounded-[20px] cursor-pointer tracking-[1px] max-sm:pl-3 max-sm:pr-3 max-sm:ml-3'>Login</button>
          <button className='ml-5 bg-gray-800 p-2 pl-5 pr-5 rounded-[20px] cursor-pointer tracking-[1px] max-sm:pl-3 max-sm:pr-3 max-sm:ml-3'>Register</button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage