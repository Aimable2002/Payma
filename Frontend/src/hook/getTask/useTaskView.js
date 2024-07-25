import React, {useState, useEffect} from 'react'
import axios from 'axios';

const usegetTaskView = () => {
    const [loading, setLoading] = useState(false);

    const [task, setTask] = useState([]);
  
    useEffect(() => {
      const getTask = async () => {
          setLoading(true)
          try{
              const token = localStorage.getItem('on-user')
              const res = await axios.get('/api/task/task-view', {
                  headers: {
                      Authorization: `${JSON.parse(token).token}`
                  }
              })
              const data = res.data;
              if(!data){
                  throw new Error(data.error)
              }
              setTask(data)
          }catch(error){
              console.log('error :', error.message)
          }finally{
              setLoading(false)
          }
        }
        getTask()
    },[])
    return {loading, task}
  }

export default usegetTaskView