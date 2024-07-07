import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useTakeTaskView = (activeButton) => {
  const [loading, setLoading] = useState(false);
  const [isData, setIsDate] = useState([])
  useEffect(() => {
    if(activeButton === 'Tasks') {
        console.log('active :', activeButton)
        console.log('is Task active :', activeButton === 'Tasks')
        const getMyTask = async () => {
            setLoading(true)
            try{
                const token = localStorage.getItem('on-user')
                const res = await axios.get('/api/task/task-taker', {
                    headers: {
                        Authorization: `${JSON.parse(token).token}`
                    }
                })
                const data = res.data
                if(!data){
                    throw new Error('no data')
                }
                setIsDate(data)
            }catch(error){
                console.log('error :', error.message)
                alert('something went wrong')
            }finally{
                setLoading(false)
            }
        }
        getMyTask()
    }
    
  },[activeButton])
  return {loading, isData}
}

export default useTakeTaskView