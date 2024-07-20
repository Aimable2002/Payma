import axios from 'axios';
import React, { useState } from 'react'

const useConfirm = () => {
  const [loading, setLoading] = useState(false);

  const [trackConfirm, setTrackConfirm] = useState(null)

  const confirmTask = async (taskId) => {
    console.log('taskId :', taskId.taskId)
    console.log('applying user :', taskId.APPLYING_USERNAME)
    const task_id = taskId.taskId
    const applying_user = taskId.APPLYING_USERNAME
    // const Success = handleErr(taskId.taskId, taskId.APPLYING_USERNAME)
    // if(!Success)return
    setLoading(true)
    try{
        const token = localStorage.getItem('on-user')
        const res = await axios.post('/api/task/take-task', {
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
        setTrackConfirm(data.status)
    }catch(error){
        console.log('error :', error.message)
        alert('something went wrong')
    }finally{
        setLoading(false)
    }
  }
  return {loading, trackConfirm, confirmTask }
}

export default useConfirm

// function handleErr (){
//     if(!taskId.taskId || !taskId.APPLYING_USERNAME){
//         console.log('task in handle err :', taskId.taskId)
//         console.log('user in handle err :', taskId.APPLYING_USERNAME)
//         return false
//     }else{
//         return true
//     }
// }


///take-task