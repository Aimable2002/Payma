import axios from 'axios';
import React, { useState } from 'react'

const useDecline = () => {
  const [loading, setLoading] = useState(false);

  const [trackDecline, setTrackDecline] = useState(null)

  const declineTask = async (taskId) => {
    console.log('taskId :', taskId.taskId)
    console.log('applying user :', taskId.APPLYING_USERNAME)
    const task_id = taskId.taskId
    const applying_user = taskId.APPLYING_USERNAME
    setLoading(true)
    try{
        const token = localStorage.getItem('on-user')
        const res = await axios.post('/api/task/decline/task', {
            taskId: task_id , 
            APPLYING_USERNAME: applying_user
        }, {
            headers: {
                Authorization: `${JSON.parse(token).token}`
            }
        })
        const data = res.data
        if(!data){
            throw new Error('error')
        }
        setTrackDecline((prevStatus) => ({
            ...prevStatus,
            [taskId] : data.status
        }))
    }catch(error){
        console.log('error :', error.message)
        alert('something went wrong')
    }finally{
        setLoading(false)
    }
  }
  return {loading, trackDecline, declineTask }
}

export default useDecline