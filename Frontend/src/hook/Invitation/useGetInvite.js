import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useGetInvite = (activeButton) => {
  const [loading, setLoading] = useState(false)
  const [inviteTask, setInviteTask] = useState([])

  useEffect(() => {
    if(activeButton === 'Tasks') {
        const getInviteTask = async () => {
            setLoading(true)
            try{
                const token = localStorage.getItem('on-user')
                const res = await axios.get('/api/task/get-Invite-task', {
                    headers: {
                        Authorization: `${JSON.parse(token).token}`
                    }
                })
                const data = res.data
                if(!data){
                    throw new Error ('missing data')
                }
                setInviteTask(data)
                console.log('data :', data)
            }catch(error){
                console.log('error :', error.message)
                alert('something went wrong refresh')
            }finally{
                setLoading(false)
            }
        }
        getInviteTask()
    }
  },[activeButton])
  return {loading, inviteTask}
}

export default useGetInvite