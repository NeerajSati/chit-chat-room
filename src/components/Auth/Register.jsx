import React, {useState} from 'react'
import {RxCross2} from 'react-icons/rx'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {authActions} from '../../redux/authSlice';
import { toast } from 'react-toastify';

function Register({switchPage}) {
    const [showPassword, setShowPassword] = useState(false);
    const [disableAuthActions,setDisableAuthActions] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateRegisterData = () =>{
        if(!email){
            toast.error('Please enter email!',{autoClose: 2000, theme: "dark"});
            return true;
        }
        if(!username){
            toast.error('Please enter username!',{autoClose: 2000, theme: "dark"});
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

    const registerUserInit = async() => {
        try{
            if(validateRegisterData()){
                return;
            }
            setDisableAuthActions(true);
            const formContent = new FormData();
            formContent.append("email",email)
            formContent.append("username",username)
            formContent.append("password",password)
            await dispatch(authActions.registerUser({formContent}))
            navigate('/chat')
            setDisableAuthActions(false);
        } catch(err){
            setDisableAuthActions(false);
            console.log(err)
        }
    }

  return (
        <div className='bg-[#2f2f2f] py-7 px-10 flex flex-col items-center justify-center animate__animated animate__flipInY animate__faster max-sm:w-full max-sm:px-5'>
            <div className='text-[25px] max-sm:text-[20px]'>Create an Account!</div>
            <div className='mt-5 flex flex-col items-start justify-start max-sm:w-full'>
                <div className='text-[14px]'>Email</div>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    className='rounded-sm mt-2 py-3 px-5 bg-[#1c1c1c] text-[gray] w-[450px] max-sm:w-full'/>
            </div>
            <div className='mt-5 flex flex-col items-start justify-start max-sm:w-full'>
                <div className='text-[14px]'>Username</div>
                <input
                    onChange={(e) => setUsername(e.target.value)} 
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
            <button disabled={disableAuthActions} onClick={registerUserInit} className='w-full rounded-sm mt-5 py-2 px-2 bg-[#006FA2] disabled:opacity-50 disabled:cursor-not-allowed'>Continue</button>
            <div onClick={()=>switchPage('Login')} className='cursor-pointer mt-5 text-[#13A67D]'>Already have an account?</div>
        </div>
  )
}

export default Register