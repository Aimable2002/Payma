import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useGetUserTask = () => {
  const [loading, setLoading] = useState(false);

  const [usersTask, setUsersTask] = useState([]);

  useEffect(() => {
    const getUsersTask = async () => {
        setLoading(true)
        try{
            const token = localStorage.getItem('on-user')
            //console.log('token :', token)
            const res = await axios.get('/api/user/users-task', {
                headers: {
                    Authorization: `${JSON.parse(token).token}`
                }
            })
            const data = res.data;
            if(!data){
                throw new Error(data.error)
            }
            setUsersTask(data)
            //console.log('data :', data)
        }catch(error){
            console.log('error :', error.message)
        }finally{
            setLoading(false)
        }
      }
      getUsersTask()
  },[])
  return {loading, usersTask}
}

export default useGetUserTask