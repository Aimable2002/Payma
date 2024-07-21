import axios from 'axios'
import React, { useState } from 'react'

const useDeclineInvite = () => {
  const [loading, setLoading] = useState(false)

  const [tractDeclineInvite, setTractInviteDecline] = useState(null)

  const postDecline = async (inviteeId) => {
    setLoading(true)
    try{
        const token = localStorage.getItem('on-user')
        const res = await axios.post('/api/task/decline/invitation', {
            inviteeId: inviteeId.inviteeId,
            TakerId: inviteeId.TakerId,
            Approval: inviteeId.Approval
        }, {
            headers: {
                Authorization: `${JSON.parse(token).token}`
            }
        })
        const data = res.data
        if(!data){
            alert('missing data')
        }
        setTractInviteDecline((prevStatus) => ({
            ...prevStatus,
            [inviteeId]: data.status
          }));
    }catch(error){
        console.log('error :', error.message)
        alert('something went wrong')
    }finally{
        setLoading(false)
    }
  }
  return {loading, tractDeclineInvite, postDecline }
}

export default useDeclineInvite