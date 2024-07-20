import axios from 'axios'
import React, { useEffect, useState } from 'react'

const invitationSent= (activeButton) => {
  const [loading, setLoading] = useState(false)
  const [inviteTaskPending, setInviteTaskPending] = useState([])

  useEffect(() => {
    if(activeButton === 'Notification') {
        console.log('active Notification :', activeButton)
        console.log('isNotification active :', activeButton === 'Notification')
        const getInviteTaskPending = async () => {
            setLoading(true)
            try{
                const token = localStorage.getItem('on-user')
                const res = await axios.get('/api/task/get-Invite-Pending_view', {
                    headers: {
                        Authorization: `${JSON.parse(token).token}`
                    }
                })
                const data = res.data
                //console.log('reserver data :', data)
                if(!data){
                    throw new Error ('missing data')
                }
                setInviteTaskPending(data)
            }catch(error){
                console.log('error :', error.message)
                alert('something went wrong refresh')
            }finally{
                setLoading(false)
            }
        }
        getInviteTaskPending()
    }
  },[activeButton])
  return {loading, inviteTaskPending}
}

export default invitationSent