import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useGetUser = (activeButton) => {
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if(activeButton === 'Rank'){
        console.log('active :', activeButton)
        console.log('active true :', activeButton === 'Rank')
        const getUsers = async () => {
            setLoading(true)
            try{
                const token = localStorage.getItem('on-user')
                const res = await axios.get('/api/user/people', {
                    headers: {
                        Authorization: `${JSON.parse(token).token}`
                    }
                })
                const data = res.data;
                if(!data){
                    throw new Error(data.error)
                }
                setUsers(data)
                //console.log('data :', data)
            }catch(error){
                console.log('error :', error.message)
            }finally{
                setLoading(false)
            }
        }
        getUsers()
    }
    
  },[activeButton])
  return {loading, users}
}

export default useGetUser