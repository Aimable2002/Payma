import React, {useState, useEffect} from 'react'
import axios from 'axios';

const usegetApplyView = (activeButton) => {
    const [loading, setLoading] = useState(false);

    const [applyView, setApplyView] = useState([]);
  
    useEffect(() => {
        if(activeButton === "Notification"){
            console.log('active Notification :', activeButton)
            console.log('isNotification active :', activeButton === 'Notification')
            const getApplyView = async () => {
                setLoading(true)
                try{
                    const token = localStorage.getItem('on-user')
                    const res = await axios.get('/api/task/apply_list', {
                        headers: {
                            Authorization: `${JSON.parse(token).token}`
                        }
                    })
                    const data = res.data;
                    if(!data){
                        throw new Error(data.error)
                    }
                    setApplyView(data)
                }catch(error){
                    console.log('error :', error.message)
                }finally{
                    setLoading(false)
                }
            }
            getApplyView ()
        }
      
    },[activeButton])
    return {loading, applyView}
  }

export default usegetApplyView