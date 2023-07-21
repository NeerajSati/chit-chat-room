import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
      const authToken = JSON.parse(localStorage.getItem('authToken'));
      if(!authToken){
          navigate('/')
      }
  }, []);

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard