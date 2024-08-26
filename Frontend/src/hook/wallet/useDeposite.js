import axios from 'axios';
import React, { useState } from 'react'

const useDeposite = () => {
  const [loading, setLoading] = useState(false);
const [isDeposited, setIsDeposited] = useState(null)
  const PostDeposite = async ({Amount, Phone_number}) => {
    const success = handleError(Amount, Phone_number)
    if(!success)return
    setLoading(true)
    try{
        const token = localStorage.getItem('on-user')

        const res = await axios.post('/api/A/C/cash-in', {
            Amount,
            Phone_number
        }, {
            headers: {
                Authorization: `${JSON.parse(token).token}`
            }
        })
        const data = res.data;
        console.log('data:', data);
        if (!data) {
            throw new Error('No data received from payment initiation');
        }
        if (data.meta && data.meta.authorization && data.meta.authorization.redirect) {
            console.log('Redirecting to:', data.meta.authorization.redirect);
            window.location.href = data.meta.authorization.redirect;
        } else {
            alert('An error occurred. Please try again.');
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

function handleError (Amount, Phone_number){
    if(!Amount || !Phone_number){
        return false
    }else{
        return true
    }
}
