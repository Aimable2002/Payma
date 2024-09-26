import axios from 'axios'
import React, { useState } from 'react'

const postBusinessProduct = () => {

    const [loading, setLoading] = useState(false);
   
    const postBusiness = async (
        Business_Category,
        Business_Name, 
        Business_Description, 
        Business_email, 
        Business_phone, 
        Product_name, 
        Amount, 
        Quantity, 
        Product_Description,
        photo 
    ) => {
        console.log('data :', Business_Category)
        console.log('photo :', Business_Category.photo)
        console.log('photo 2 :', photo)
            const Business_Category1 = Business_Category.Business_Category
            const Business_Name1 = Business_Category.Business_Name
            const Business_Description1 = Business_Category.Business_Description
            const Business_email1 = Business_Category.Business_email
            const Business_phone1 = Business_Category.Business_phone
        const Success = handleError(
            Business_Category1,
            Business_Name1, 
            Business_Description1,
            Business_email1, 
            Business_phone1
        )
        if(!Success) return alert('fill the field')
        setLoading(true);
        try {
            const token = localStorage.getItem('on-user');
            
            const res = await axios.post('/api/business/uploadProduct', {
                Business_Category: Business_Category1,
                Business_Name: Business_Name1, 
                Business_Description: Business_Description1, 
                Business_email: Business_email1, 
                Business_phone: Business_phone1, 
            }, {
                headers: {
                    Authorization: `${JSON.parse(token).token}`,
                },
            });

            const responseData = res.data;
            if (!responseData) {
                throw new Error('No data sent');
            }
            window.location = '/product'
            return responseData;
            
        } catch (error) {
            console.log('Error:', error.message);
            alert('something went wrong')
        } finally {
            setLoading(false);
        }
    };

    return { loading, postBusiness };
};

export default postBusinessProduct



function handleError(
    Business_Category1,
    Business_Name1, 
    Business_Description1, 
    Business_email1, 
    Business_phone1, 
){
    if(
        !Business_Category1 || !Business_Name1 || !Business_Description1 || !Business_email1 ||
        !Business_phone1 
    ){
        return false
    }else{
        return true
    }
    
}






