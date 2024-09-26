


// import axios from 'axios'
// import React, { useState } from 'react'

// const postBusinessProduct = () => {

//     const [loading, setLoading] = useState(false);
   
//     const postBusiness = async (photo, inputData) => {
//         console.log('photo :', photo.photo)
//         console.log('photo 2 :', photo)
//         setLoading(true);
//         try {
//             const token = localStorage.getItem('on-user');
            
//         } catch (error) {
//             console.log('Error:', error.message);
//             alert('something went wrong')
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { loading, postBusiness };
// };

// export default postBusinessProduct





import axios from 'axios'
import React, { useState } from 'react'
import { useProductContext } from '../../context/productContext/productContext.jsx';

const PostAddBusiness = () => {
    const [loading, setLoading] = useState(false);

    const { setIsProductPublished } = useProductContext()

    const postBusiness = async (photo, Description, Quantity, Amount, Product) => {
        
        const Business_Category1 = photo.Business_Category
        const Description1 = photo.Description
        const Quantity1 = photo.Quantity
        const Amount1 = photo.Amount
        const Product1 = photo.Product
        const photo1 = photo.photo

        const Success = handleError(Business_Category1, Description1, Quantity1, Amount1,  Product1)
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
                imgUrl: photo1
            }, {
                headers: {
                    Authorization: `${JSON.parse(token).token}`,
                },
            });

            const data = res.data;
            if (!data) {
                throw new Error('No data sent');
            }

            if(data.status === true){
                alert('product published')
                setIsProductPublished(true);
            }else{
                alert('product publish fail, try again')
            }
        } catch (error) {
            console.log('Error:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, postBusiness };
};

export default PostAddBusiness;

function handleError(Business_Category1, Description1, Quantity1, Amount1,  Product1){
    if(!Business_Category1 || !Description1 || !Quantity1 || !Amount1 || !Product1){
        return false
    }else{
        return true
    }
    
}


