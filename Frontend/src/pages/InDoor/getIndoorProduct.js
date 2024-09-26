
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useProductContext } from '../../context/productContext/productContext.jsx'

const getIndoorProduct = () => {
      const [loading, setLoading] = useState(false)
    
      const [products, setProducts] = useState([])
      const { isProductPublished } = useProductContext()
    
      useEffect(() => {
        // if (isProductPublished) {
        const getProdView = async () => {
            setLoading(true)
    
            try{
                const token = localStorage.getItem('on-user');
                const selectedUser = localStorage.getItem('selected')
                console.log('selected user:', selectedUser)
                const res = await axios.get(`/api/business/viewPro/${selectedUser}`, {
                    headers: {
                        Authorization: `${JSON.parse(token).token}`
                    }
                })
        
                const data = res.data
                if(!data){
                    throw new err
                }
                setProducts(data)
            }catch(error){
                console.log(error.message)
                alert(error.message)
            }finally{
                setLoading(false)
            }
        }
        getProdView()
        // }
      },[])
      return {loading, products}
}

export default getIndoorProduct