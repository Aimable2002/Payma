import axios from 'axios'
import React, { useState } from 'react'

const postApproval = () => {
  const [loading, setLoading] = useState(false)
  const [trackApprove, setTrackApprove] = useState(null)

  const makePostAppr = async ({Status, taskId}) => {
    setLoading(true)
    try{
        const token = localStorage.getItem('on-user')
        const res = await axios.post('/api/approval/appove', {
            Status,
            taskId
        }, {
            headers: {
                Authorization: `${JSON.parse(token).token}`
            }
        })
        const data = res.data
    }catch(error){
        console.log('error :', error.message)
        alert('something went wrong')
    }finally{
        setLoading(false)
    }
  }
  return {loading, trackApprove, makePostAppr}
}

export default postApproval