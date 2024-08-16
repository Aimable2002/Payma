import axios from 'axios';
import React, { useState } from 'react'

const useWithdrowal = () => {
  const [loading, setLoading] = useState(false);
const [isWithdrowal, setIsWithdrowal] = useState(null)
  const PostWithdrowal = async ({Amount, Phone_number}) => {
    const success = handleError(Amount, Phone_number)
    if(!success)return
    setLoading(true)
    try{
        const token = localStorage.getItem('on-user')

        const res = await axios.post('/api/A/C/withdrow', {
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
        setIsWithdrowal(data.status)
        console.log('data :', data)
    }catch(error){
        console.log('error :', error.message)
        alert('something went wrong')
    }finally{
        setLoading(false)
    }
  }
  return {loading, isWithdrowal, PostWithdrowal}
}

export default useWithdrowal

function handleError (Amount, Phone_number){
    if(!Amount || !Phone_number){
        return false
    }else{
        return true
    }
}
