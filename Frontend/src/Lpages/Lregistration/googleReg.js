import axios from 'axios'
import React, { useState } from 'react'

const googleReg = () => {
  const [loading, setLoading] = useState(false)

  const LogGoo = async () => {
    setLoading(true)
    try{
        const res = await axios.get('/api/authUser/auth/google')
        const data = res.data
        if(!data){
            alert('missing data')
        }
        localStorage.setItem('on-user', JSON.stringify(data))
        console.log('data :', data)
        window.location = '/'
    }catch(error){
        console.log('error :', error.message)
        alert('something went wrong')
    }finally{
        setLoading(false)
    }
  }
  return {loading, LogGoo}
}

export default googleReg