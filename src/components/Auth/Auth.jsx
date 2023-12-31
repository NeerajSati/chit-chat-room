import React,{useState, useEffect} from 'react'
import Background from '../../assets/Login.jpg'
import Register from './Register';
import Login from './Login';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Auth({perform}) {
    const [page, setPage] = useState(perform);
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        if(authToken){
            navigate('/chat')
        }
    }, []);

  return (
    <div className="w-100 h-[100vh] flex items-center justify-center text-[16px] bg-black text-[#d7d7d7] font-[Manrope] font-bold  max-sm:text-[14px] overflow-hidden" style={{ backgroundImage: `url(${Background})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
        {
            page === 'Login' ? 
                <Login switchPage={setPage}/> : 
                <Register switchPage={setPage}/>
        }
    </div>
  )
}

export default Auth