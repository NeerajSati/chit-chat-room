import React,{useState} from 'react'
import Background from '../../assets/Login.jpg'
import {GrFormPreviousLink} from 'react-icons/gr'

function Login() {
    const [page, setPage] = useState('Login');
  return (
    <div className="w-100 h-[100vh] flex items-center justify-center text-[16px] bg-red-500 text-[#d7d7d7] font-[Manrope] font-bold  max-sm:text-[14px] overflow-hidden" style={{ backgroundImage: `url(${Background})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
        {
            page === 'Login' ? 
        <div className='bg-[#2f2f2f] py-7 px-10 flex flex-col items-center justify-center animate__animated animate__flipInX animate__faster'>
            <div className='text-[25px]'>Welcome Back!</div>
            <div className='mt-2'>We are excited to see you again!</div>
            <div className='mt-5 flex flex-col items-start justify-start'>
                <div className='text-[14px]'>Email</div>
                <input className='rounded-sm mt-2 py-3 px-5 bg-[#1c1c1c] text-[gray] w-[450px]'/>
            </div>
            <div className='mt-5 flex flex-col items-start justify-start'>
                <div className='text-[14px]'>Password</div>
                <input className='rounded-sm mt-2 py-3 px-5 bg-[#1c1c1c] text-[gray] w-[450px]'/>
            </div>
            <button className='w-full rounded-sm mt-5 py-2 px-2 bg-[#0FD345] text-black'>Log In</button>
            <button className='w-full rounded-sm mt-3 py-2 px-2 bg-[#006FA2]'>Continue as Guest</button>
            <div onClick={()=>setPage('Register')} className='cursor-pointer mt-5 text-[#13A67D]'>Need an account? Register</div>
        </div> : 
        <div className='bg-[#2f2f2f] py-7 px-10 flex flex-col items-center justify-center animate__animated animate__flipInY animate__faster'>
            <div className='text-[25px]'>Create an Account!</div>
            <div className='mt-5 flex flex-col items-start justify-start'>
                <div className='text-[14px]'>Email</div>
                <input className='rounded-sm mt-2 py-3 px-5 bg-[#1c1c1c] text-[gray] w-[450px]'/>
            </div>
            <div className='mt-5 flex flex-col items-start justify-start'>
                <div className='text-[14px]'>Username</div>
                <input className='rounded-sm mt-2 py-3 px-5 bg-[#1c1c1c] text-[gray] w-[450px]'/>
            </div>
            <div className='mt-5 flex flex-col items-start justify-start'>
                <div className='text-[14px]'>Password</div>
                <input className='rounded-sm mt-2 py-3 px-5 bg-[#1c1c1c] text-[gray] w-[450px]'/>
            </div>
            <button className='w-full rounded-sm mt-5 py-2 px-2 bg-[#006FA2]'>Continue</button>
            <div onClick={()=>setPage('Login')} className='cursor-pointer mt-5 text-[#13A67D]'>Already have an account?</div>
        </div>
        }
        <div className='cursor-pointer absolute left-[10%] top-[10%] bg-[white] p-3 rounded-full text-[30px]'><GrFormPreviousLink/></div>
    </div>
  )
}

export default Login