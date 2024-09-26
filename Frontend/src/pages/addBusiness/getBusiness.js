import axios from "axios";

import React, { useEffect, useState } from 'react'

const getBusiness = () => {
  const [loading, setLoading] = useState(false)

  const [business, setBusiness] = useState([])

//   useEffect(() => {
    const getData = async () => {
        setLoading(true)
    
        try{
            const token = localStorage.getItem('on-user');
    
            const res = await axios.get('/api/business/get', {
                headers: {
                    Authorization: `${JSON.parse(token).token}`
                }
            })
    
            const data = res.data
            if(!data){
                throw new err
            }
            setBusiness(data)
        }catch(error){
            console.log(error.message)
            alert(error.message)
        }finally{
            setLoading(false)
        }
      }
    //   getData()
//   },[])
  return {loading, business}

}

export default getBusiness