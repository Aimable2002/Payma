import React, {useState, useEffect} from 'react'
import axios from 'axios';

const usegetTaskTaker = () => {
    const [loading, setLoading] = useState(false);

    const [taskTaker, setTaskTaker] = useState([]);
  
    useEffect(() => {
      const getTaskTaker = async () => {
          setLoading(true)
          try{
            console.log('called')
              const token = localStorage.getItem('on-user')
              const res = await axios.get('/api/task/task-taker', {
                  headers: {
                      Authorization: `${JSON.parse(token).token}`
                  }
              })
              const data = res.data;
              if(!data){
                  throw new Error(data.error)
              }
              setTaskTaker(data)
              //console.log('data :', data)
          }catch(error){
              console.log('error :', error.message)
          }finally{
              setLoading(false)
          }
        }
        getTaskTaker()
    },[])
    return {loading, taskTaker}
  }

export default usegetTaskTaker