import axios from 'axios';
import React, { useState } from 'react'

const useTakeTask = () => {
  const [loading, setLoading] = useState(false);

  const [trackEvent, setTrackEvent] = useState(null)

  const takeTask = async (values) => {
    console.log('values error :', values)
    const Success = handleErr(values)
    if(!Success)return
    setLoading(true)
    try{
        const token = localStorage.getItem('on-user')
        const res = await axios.post(`/api/task/apply_task/${values}`, {
            values 
        }, {
            headers: {
                Authorization: `${JSON.parse(token).token}`
            }
        })
        const data = res.data
        if(!data){
            throw new Error('error')
        }
        setTrackEvent(data.status)
    }catch(error){
        console.log('error :', error.message)
        alert('something went wrong')
    }finally{
        setLoading(false)
    }
  }
  return {loading, trackEvent, takeTask}
}

export default useTakeTask

function handleErr (values){
    if(!values){
        return false
    }else{
        return true
    }
}


///take-task