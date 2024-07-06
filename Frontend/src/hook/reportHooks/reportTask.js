import axios from 'axios'
import React, { useState } from 'react'

const reportTask = () => {
  const [trackReport, setTrackReport] = useState(null)
  const [loading, setLoading] = useState(false)

  const postReport = async ({Agreement, taskId}) => {
    const success = handleErr (Agreement, taskId)
    if(!success)return
    setLoading(true);
    try{
        const token = localStorage.getItem('on-user')
        const res = await axios.post('/api/report/report', {
            Agreement,
            taskId
        }, {
            headers: {
                Authorization: `${JSON.parse(token).token}`
            }
        })
        const data = res.data;
        if(!data){
            throw new Error ('no data')
        }
        console.log('data :', data)
        setTrackReport(data)
    }catch(error){
        console.log('error :', error.message)
        alert('something went wrong')
    }finally{
        setLoading(false)
    }
  }
  return {loading, trackReport, postReport}
}

export default reportTask

function handleErr (Agreement, taskId) {
    if(!Agreement || !taskId){
        return false
    }else{
        return true
    }
}