import axios from 'axios'
import React, { useEffect, useState } from 'react'

const approveTask = () => {
  const [loading, setLoading] = useState(false)
    const [isTaskToApprove, setIsTaskToApprove] = useState([])
  useEffect(() => {
    const getTaskToApprove = async () => {
        setLoading(true)
        try{
            const token = localStorage.getItem('on-user')
            const res = await axios.get('/api/approval/apprval-statue', {
                headers: {
                    Authorization: `${JSON.parse(token).token}`
                }
            })
            const data = res.data
            if(!data){
                throw new Error ( 'no data available')
            }
            setIsTaskToApprove(data)
        }catch(error){
            console.log('error :', error.message)
            alert('something went wrong')
        }finally{
            setLoading(false)
        }
    }
    getTaskToApprove()
  },[])
  return {loading, isTaskToApprove}
}

export default approveTask