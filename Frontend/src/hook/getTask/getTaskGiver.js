import React, {useState, useEffect} from 'react'
import axios from 'axios';

const usegetTaskGiver = () => {
    const [loading, setLoading] = useState(false);

    const [taskGiver, setTaskGiver] = useState([]);
  
    useEffect(() => {
      const getTaskGiver = async () => {
          setLoading(true)
          try{
              const token = localStorage.getItem('on-user')
              const res = await axios.get('/api/task/assigner', {
                  headers: {
                      Authorization: `${JSON.parse(token).token}`
                  }
              })
              const data = res.data;
              if(!data){
                  throw new Error(data.error)
              }
              setTaskGiver(data)
              //console.log('data :', data)
          }catch(error){
              console.log('error :', error.message)
          }finally{
              setLoading(false)
          }
        }
        getTaskGiver()
    },[])
    return {loading, taskGiver}
  }

export default usegetTaskGiver