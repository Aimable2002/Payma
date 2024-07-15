import axios from 'axios'
import React, { useEffect, useState } from 'react'

const inviteData = () => {
      const [loading, setLoading] = useState(false)
      const [inviteTaskDash, setInviteTaskDash] = useState([])
    
      useEffect(() => {
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
                    setInviteTaskDash(data)
                    console.log('data :', data)
                }catch(error){
                    console.log('error :', error.message)
                    alert('something went wrong refresh')
                }finally{
                    setLoading(false)
                }
            }
            getInviteTask()
      },[])
      return {loading, inviteTaskDash}
}

export default inviteData