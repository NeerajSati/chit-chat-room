import React, {useState} from 'react'
import {RxCross2} from 'react-icons/rx'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {authActions} from '../../redux/authSlice';

function Login({switchPage}) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [disableAuthActions,setDisableAuthActions] = useState(false);
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateLoginData = () =>{
        if(!email){
            toast.error('Please enter email!',{autoClose: 2000, theme: "dark"});
            return true;
        }
        if(!password){
            toast.error('Please enter password!',{autoClose: 2000, theme: "dark"});
            return true;
        }

        const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if(!regex.test(email)){
            toast.error('This email is invalid!',{autoClose: 2000, theme: "dark"});
            return true;
        }
    }

    const loginUserInit = async() => {
        try{
            if(validateLoginData()){
                return;
            }
            setDisableAuthActions(true);
            await dispatch(authActions.loginUser({email,password}))
            toast.success("Successfully Logged in!")
            navigate('/chat')
            setDisableAuthActions(false);
        } catch(err){
            setDisableAuthActions(false);
            console.log(err)
        }
    }

    const loginUserAsGuest = async() => {
        try{
            setDisableAuthActions(true);
            await dispatch(authActions.loginUser({email : process.env.REACT_APP_GUEST_EMAIL,password: process.env.REACT_APP_GUEST_PASSWORD}))
            toast.success("Successfully Logged in!")
            navigate('/chat')
            setDisableAuthActions(false);
        } catch(err){
            setDisableAuthActions(false);
            console.log(err)
        }
    }

  return (
        <div className='bg-[#2f2f2f] py-7 px-10 flex flex-col items-center justify-center animate__animated animate__flipInX animate__faster max-sm:w-full max-sm:px-5'>
            <div className='w-full text-center text-[25px] max-sm:text-[20px]'>Welcome Back!</div>
            <div className='mt-2'>We are excited to see you again!</div>
            <div className='mt-5 flex flex-col items-start justify-start max-sm:w-full'>
                <div className='text-[14px]'>Email</div>
                <input
                    onChange={(e) => setEmail(e.target.value)} 
                    className='rounded-sm mt-2 py-3 px-5 bg-[#1c1c1c] text-[gray] w-[450px] max-sm:w-full'/>
            </div>
            <div className='mt-5 flex flex-col items-start justify-start relative max-sm:w-full'>
                <div className='text-[14px]'>Password</div>
                <input 
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"} 
                    className='rounded-sm mt-2 py-3 pr-10 px-5 bg-[#1c1c1c] text-[gray] w-[450px] tracking-wider max-sm:w-full'/>
                <div onClick={()=>setShowPassword(visible => !visible)} className='absolute bottom-[14px] right-3 cursor-pointer text-[20px]'>
                {showPassword ? <AiFillEye/> : <AiFillEyeInvisible/>}
                </div>
            </div>
            <button disabled={disableAuthActions} onClick={loginUserInit} className='w-full rounded-sm mt-5 py-2 px-2 bg-[#0FD345] text-black disabled:opacity-50 disabled:cursor-not-allowed'>Log In</button>
            <button disabled={disableAuthActions} onClick={loginUserAsGuest} className='w-full rounded-sm mt-3 py-2 px-2 bg-[#006FA2] disabled:opacity-50 disabled:cursor-not-allowed'>Continue as Guest</button>
            <div onClick={()=>switchPage('Register')} className='cursor-pointer mt-5 text-[#13A67D]'>Need an account? Register</div>
            <Link to="/" className='cursor-pointer absolute right-[2rem] top-[1.5rem] bg-[#ff000040] p-3 rounded-full text-[22px] max-sm:text-[16px] max-sm:right-[1rem]'><RxCross2/></Link>
        </div>
  )
}

export default Login