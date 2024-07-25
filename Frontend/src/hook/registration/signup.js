import axios from 'axios';
import React, { useState } from 'react'

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async ({First_name, Last_name, userName, Title, Email, Phone_number, Password, confirmPassword}) => {
    const Success = handleLoginError(First_name, Last_name, userName, Title, Email, Phone_number, Password, confirmPassword);
    
    if(!Success)return alert('something wrong')
    try{
        setLoading(true)
        const res = await axios.post('/api/authUser/signup', {
            First_name,
            Last_name,
            userName,
            Title,
            Email,
            Password,
            confirmPassword,
            Phone_number
        })

        const data = res.data;

        if(!data){
            throw new Error (data.error)
        }
        localStorage.setItem('on-user', JSON.stringify(data))
        console.log('data :', data)
        window.location = '/'
    }catch(error){
        console.log('error in signup')
        alert('something went wrong')
    }finally{
        setLoading(false)
    }
  }
  return {loading, signup}
}

export default useSignup


function handleLoginError (First_name, Last_name, userName, Title, Email, Phone_number, Password, confirmPassword) {
    if(!First_name || !Last_name || !userName || !Title || !Email || !Phone_number || !Password || !confirmPassword ){
        return false
    }
    return true
}