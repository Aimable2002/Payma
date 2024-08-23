// import { useTable } from '@nextui-org/react'
// import axios from 'axios'
// import React, { useState } from 'react'

// const PostAddBusiness = () => {
//     const [loading, setLoading] = useState(false);

//     const postBusiness = async (formData) => {
//         setLoading(true);
//         try {
//             const token = localStorage.getItem('on-user');
//             console.log('form data :', formData.get('Add_photo')); // This checks if the file is included
//             formData.forEach((value, key) => {
//                 console.log(`${key}:`, value);
//             });
            
//             const res = await axios.post('/api/business/uploadProduct', formData, {
//                 headers: {
//                     Authorization: `${JSON.parse(token).token}`,
//                     'Content-Type': 'multipart/form-data', // Required for handling file uploads
//                 },
//             });

//             const responseData = res.data;
//             if (!responseData) {
//                 throw new Error('No data sent');
//             }

//             return responseData;
//         } catch (error) {
//             console.log('Error:', error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { loading, postBusiness };
// };

// export default PostAddBusiness;




import axios from 'axios'
import React, { useState } from 'react'

const PostAddBusiness = () => {
    const [loading, setLoading] = useState(false);

    const postBusiness = async (Business_Category, Description, Quantity, Amount, District, Product) => {
        
        const Business_Category1 = Business_Category.Business_Category
        const Description1 = Business_Category.Description
        const Quantity1 = Business_Category.Quantity
        const Amount1 = Business_Category.Amount
        const District1 = Business_Category.District
        const Product1 = Business_Category.Product
        console.log('Business_Category:', Business_Category1)

        console.log('Description:', Description1)
        console.log('Quantity:', Quantity1)
        console.log('Amount:', Amount1)
        console.log('District:', District1)
        console.log('Product:', Product1)
        const Success = handleError(Business_Category1, Description1, Quantity1, Amount1, District1, Product1)
        if(!Success) return alert('fill the field')
        setLoading(true);
    

        try {
            const token = localStorage.getItem('on-user');
            
            const res = await axios.post('/api/business/uploadProduct', {
                Business_Category: Business_Category1,
                Product: Product1,
                Description: Description1,
                Quantity: Quantity1,
                Amount: Amount1,
                District: District1
            }, {
                headers: {
                    Authorization: `${JSON.parse(token).token}`,
                },
            });

            const responseData = res.data;
            if (!responseData) {
                throw new Error('No data sent');
            }

            return responseData;
        } catch (error) {
            console.log('Error:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, postBusiness };
};

export default PostAddBusiness;

function handleError(Business_Category1, Description1, Quantity1, Amount1, District1, Product1){
    if(!Business_Category1 || !Description1 || !Quantity1 || !Amount1 || !District1 || !Product1){
        return false
    }else{
        return true
    }
    
}


