import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useInviteHistory = () => {
  const [loading, setLoading] = useState(false)
  const [isInviteHistory, setIsInviteHistory] = useState([])

  useEffect(() => {
    const getMyHistory = async () => {
        setLoading(true)
        try{
            const token = localStorage.getItem('on-user')
            const res = await axios.get('/api/user/history/invitee', {
                headers: {
                    Authorization: `${JSON.parse(token).token}`
                }
            })
            const data = res.data;
            if(!data){
                throw new Error('missing data')
            }
            setIsInviteHistory(data)
        }catch(error){
            console.log('erro:', error.message)

        }finally{
            setLoading(false)
        }
    }
    getMyHistory()
  },[])
  return {loading, isInviteHistory}
}

export default useInviteHistory