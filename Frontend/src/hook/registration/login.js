import React, { useState } from 'react'
import axios from 'axios'

const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const login = async ({userName, Password}) => {
    const Success = handleLoginError (userName, Password);
    if(!Success) return;
    setLoading(true)
    try{
        console.log('userName :', userName)
        const res = await axios.post('/api/authUser/login', {
            userName, Password
        })
        const data = res.data

        if(!data){
            throw new Error(data.error)
        }
        localStorage.setItem('on-user', JSON.stringify(data))
        console.log('logged user :', data)
        window.location = '/'
    }catch(error){
        alert('somthing went wrong')
        console.log('error in login :', error.message)
    }finally{
        setLoading(false)
    }
  }
  return {loading, login}
}

export default useLogin


function handleLoginError (userName, Password) {
    if(!userName || !Password){
        return false
    }
    return true
}