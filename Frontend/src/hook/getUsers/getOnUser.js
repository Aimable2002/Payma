import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useGetUserOn = () => {
  const [loading, setLoading] = useState(false);

  const [usersOn, setUsersOn] = useState([]);

  useEffect(() => {
    const getUsersOn = async () => {
        setLoading(true)
        try{
            const token = localStorage.getItem('on-user')
            const res = await axios.get('/api/user/onPeople', {
                headers: {
                    Authorization: `${JSON.parse(token).token}`
                }
            })
            const data = res.data;
            if(!data){
                throw new Error(data.error)
            }
            setUsersOn(data)
            //console.log('data :', data)
        }catch(error){
            console.log('error :', error.message)
        }finally{
            setLoading(false)
        }
      }
      getUsersOn()
  },[])
  return {loading, usersOn}
}

export default useGetUserOn