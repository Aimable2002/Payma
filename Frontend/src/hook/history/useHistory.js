import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useHistory = () => {
  const [loading, setLoading] = useState(false)
  const [isHistory, setIsHistory] = useState([])

  useEffect(() => {
    const getMyHistory = async () => {
        setLoading(true)
        try{
            const token = localStorage.getItem('on-user')
            const res = await axios.get('/api/user/history', {
                headers: {
                    Authorization: `${JSON.parse(token).token}`
                }
            })
            const data = res.data;
            if(!data){
                throw new Error('missing data')
            }
            setIsHistory(data)
        }catch(error){
            console.log('erro:', error.message)

        }finally{
            setLoading(false)
        }
    }
    getMyHistory()
  },[])
  return {loading, isHistory}
}

export default useHistory