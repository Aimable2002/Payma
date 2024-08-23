import { useTable } from '@nextui-org/react'
import axios from 'axios'
import React, { useState } from 'react'

const postUploadPhoto = () => {
    const [loading, setLoading] = useState(false);

    const upload = async (file) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('on-user');
            const formData = new FormData();
            formData.append('file', file)
            console.log('file :', file)
            
            const res = await axios.post('/api/business/upload', formData, {
                headers: {
                    Authorization: `${JSON.parse(token).token}`,
                    'Content-Type': 'multipart/form-data', //Required for handling file uploads
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

    return { loading, upload };
};

export default postUploadPhoto;