import React,{useState} from 'react'
import Background from '../../assets/Login.jpg'
import {RxCross2} from 'react-icons/rx'
import { Link } from 'react-router-dom';

function Login({perform}) {
    const [page, setPage] = useState(perform);
  return (
    <div className="w-100 h-[100vh] flex items-center justify-center text-[16px] bg-red-500 text-[#d7d7d7] font-[Manrope] font-bold  max-sm:text-[14px] overflow-hidden" style={{ backgroundImage: `url(${Background})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
        {
            page === 'Login' ? 
        <div className='bg-[#2f2f2f] py-7 px-10 flex flex-col items-center justify-center animate__animated animate__flipInX animate__faster max-sm:w-full max-sm:px-5'>
            <div className='text-[25px] max-sm:text-[20px]'>Welcome Back!</div>
            <div className='mt-2'>We are excited to see you again!</div>
            <div className='mt-5 flex flex-col items-start justify-start max-sm:w-full'>
                <div className='text-[14px]'>Email</div>
                <input className='rounded-sm mt-2 py-3 px-5 bg-[#1c1c1c] text-[gray] w-[450px] max-sm:w-full'/>
            </div>
            <div className='mt-5 flex flex-col items-start justify-start max-sm:w-full'>
                <div className='text-[14px]'>Password</div>
                <input className='rounded-sm mt-2 py-3 px-5 bg-[#1c1c1c] text-[gray] w-[450px] max-sm:w-full'/>
            </div>
            <button className='w-full rounded-sm mt-5 py-2 px-2 bg-[#0FD345] text-black'>Log In</button>
            <button className='w-full rounded-sm mt-3 py-2 px-2 bg-[#006FA2]'>Continue as Guest</button>
            <div onClick={()=>setPage('Register')} className='cursor-pointer mt-5 text-[#13A67D]'>Need an account? Register</div>
            <Link to="/" className='cursor-pointer absolute right-[2rem] top-[1.5rem] bg-[#ff000040] p-3 rounded-full text-[22px] max-sm:text-[16px] max-sm:right-[1rem]'><RxCross2/></Link>
        </div> : 
        <div className='bg-[#2f2f2f] py-7 px-10 flex flex-col items-center justify-center animate__animated animate__flipInY animate__faster max-sm:w-full max-sm:px-5'>
            <div className='text-[25px] max-sm:text-[20px]'>Create an Account!</div>
            <div className='mt-5 flex flex-col items-start justify-start max-sm:w-full'>
                <div className='text-[14px]'>Email</div>
                <input className='rounded-sm mt-2 py-3 px-5 bg-[#1c1c1c] text-[gray] w-[450px] max-sm:w-full'/>
            </div>
            <div className='mt-5 flex flex-col items-start justify-start max-sm:w-full'>
                <div className='text-[14px]'>Username</div>
                <input className='rounded-sm mt-2 py-3 px-5 bg-[#1c1c1c] text-[gray] w-[450px] max-sm:w-full'/>
            </div>
            <div className='mt-5 flex flex-col items-start justify-start max-sm:w-full'>
                <div className='text-[14px]'>Password</div>
                <input className='rounded-sm mt-2 py-3 px-5 bg-[#1c1c1c] text-[gray] w-[450px] max-sm:w-full'/>
            </div>
            <button className='w-full rounded-sm mt-5 py-2 px-2 bg-[#006FA2]'>Continue</button>
            <div onClick={()=>setPage('Login')} className='cursor-pointer mt-5 text-[#13A67D]'>Already have an account?</div>
            <Link to="/" className='cursor-pointer absolute right-[2rem] top-[1.5rem] bg-[#ff000040] p-3 rounded-full text-[22px] max-sm:text-[16px] max-sm:right-[1rem]'><RxCross2/></Link>
        </div>
        }
    </div>
  )
}

export default Login