import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useGetUser = () => {
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState('');

  useEffect(() => {
    const getUsers = async () => {
        setLoading(true)
        try{
            const res = await axios.get('http://localhost:5000')
            const data = res.data;
            if(!data){
                throw new Error(data.error)
            }
            setUsers(data)
            console.log('data :', data)
        }catch(error){
            console.log('error :', error.message)
        }finally{
            setLoading(false)
        }
      }
      getUsers()
  },[])
  return {loading, users}
}

export default useGetUser