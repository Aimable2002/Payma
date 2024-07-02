import axios from 'axios';
import React, { useState } from 'react'

const useDeposite = () => {
  const [loading, setLoading] = useState(false);
const [isDeposited, setIsDeposited] = useState(null)
  const PostDeposite = async ({userName, Email, Amount, Phone_number}) => {
    const success = handleError(userName, Email, Amount, Phone_number)
    if(!success)return
    setLoading(true)
    try{
        const token = localStorage.getItem('on-user')

        const res = await axios.post('/api/A/C/deposite', {
            userName,
            Email,
            Amount,
            Phone_number
        }, {
            headers: {
                Authorization: `${JSON.parse(token).token}`
            }
        })
        const data = res.data
        if(!data){
            throw new Error
        }
        setIsDeposited(data.status)
        console.log('data :', data)
    }catch(error){
        console.log('error :', error.message)
        alert('something went wrong')
    }finally{
        setLoading(false)
    }
  }
  return {loading, isDeposited, PostDeposite}
}

export default useDeposite

function handleError (userName, Email, Amount, Phone_number){
    if(!userName || !Email || !Amount || !Phone_number){
        return false
    }else{
        return true
    }
}
