import axios from 'axios'
import React, { useState } from 'react'

const useInvite = () => {
  const [loading, setLoading] = useState(false)
  const [ isInvited, setIsInvited] = useState(null)

  const postInvitation = async ({inviteData, input}) => {
    setLoading(true)

    const {Agreement, Description, Amount, Start_date, End_date } = inviteData;
  
    const { userId, userName } = input;

    const success = handleErr (userId, userName, Agreement, Description, Amount, Start_date, End_date)
    if(!success)return

    const startDate = new Date(Start_date);
    const endDate = new Date(End_date);

    if (isNaN(startDate) || isNaN(endDate)) {
      console.error('Invalid dates');
      alert('Invalid dates');
      return;
    }

    const durationInMs = endDate - startDate;
    const Duration = Math.round(durationInMs / (1000 * 60 * 60 * 24));

    if (Duration < 0) {
      console.error('End date must be after start date');
      alert('End date must be after start date');
      return;
    }

    try{
        const token = localStorage.getItem('on-user')
        const res = await axios.post('/api/task/invitation', {
            TakerId: userId,
            Taker_Name: userName,
            Agreement, 
            Description, 
            Amount, 
            Start_date, 
            End_date
        }, {
            headers: {
                Authorization: `${JSON.parse(token).token}`
            }
        })
        const data = res.data
        if(!data){
            throw new Error('missing data')
        }
        setIsInvited(data.status)
    }catch(error){
        console.log('error :', error.message)
        alert('something went wrong')
    }finally{
        setLoading(false)
    }
  }
  return {loading, isInvited, postInvitation}
}

export default useInvite


function handleErr (userId, userName, Agreement, Description, Amount, Start_date, End_date) {
    if(!userId || !userName || !Agreement || !Description || !Amount || !Start_date || !End_date){
        alert('Fill all the field')
        return false
    }else{
        return true
    }
}