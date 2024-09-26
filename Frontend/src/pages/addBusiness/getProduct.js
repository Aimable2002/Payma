import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useProductContext } from '../../context/productContext/productContext.jsx'

const getProduct = () => {
  const [loading, setLoading] = useState(false)

  const [products, setProducts] = useState([])
  const { isProductPublished } = useProductContext()

  useEffect(() => {
    // if (isProductPublished) {
    const getProd = async () => {
        setLoading(true)

        try{
            const token = localStorage.getItem('on-user');
    
            const res = await axios.get('/api/business/get_product', {
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
    getProd()
    // }
  },[])
  return {loading, products}
}

export default getProduct