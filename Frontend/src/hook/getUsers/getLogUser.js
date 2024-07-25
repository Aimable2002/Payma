import axios from 'axios'
import React, { useEffect, useState } from 'react'

const getLogUser = () => {
  const [loading, setLoading] = useState(false)
  const [logUser, setLogUser] = useState([])

  useEffect(() => {
    const getUser = async () => {
        setLoading(true)
        try{
            const token = localStorage.getItem('on-user')
            const res = await axios.get('/api/user/log/user', {
                headers: {
                    Authorization: `${JSON.parse(token).token}`
                }
            })
            const data = res.data
            if(!data){
                alert('missing data')
            }
            setLogUser(data)
        }catch(error){
            console.log('error :', error.message)
            alert('something went wrong')
        }finally{
            setLoading(false)
        }
    }
    getUser()
  },[])
  return {loading, logUser}
}

export default getLogUser