import axios from 'axios';
import React, { useState } from 'react'

const useLogout = () => {
  const [loading, setLoading] = useState(false)

  const logout = async () => {
    try{
        setLoading(true);
        const res = await axios.post('/api/authUser/logout')
        const data = res.data;
        if(!data){
            throw new Error(data.error)
        }
        localStorage.removeItem('on-user')
        console.log('logged out')
        window.location = '/sign'
    }catch(error){
        alert('something went wrong')
        console.log('error in logout')
    }finally{
        setLoading(false)
    }
  }
  return {loading, logout}
}

export default useLogout