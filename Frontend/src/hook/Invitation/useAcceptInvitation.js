import axios from 'axios'
import React, { useState } from 'react'

const useAcceptInvitation = (inviteeId, TakerId, Approval) => {
  const [loading, setLoading] = useState(false)

  const [tractAcceptInvite, setTractInvite] = useState(null)

  const postAccept = async (inviteeId, TakerId, Approval) => {
    setLoading(true)
    try{
        const token = localStorage.getItem('on-user')
        const res = await axios.post('/api/task/accept-invitation', {
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
        setTractInvite((prevStatus) => ({
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
  return {loading, tractAcceptInvite, postAccept}
}

export default useAcceptInvitation