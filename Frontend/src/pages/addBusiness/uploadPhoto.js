import { useTable } from '@nextui-org/react'
import axios from 'axios'
import React, { useState } from 'react'

const postUploadPhoto = () => {
    const [loading, setLoading] = useState(false);

    const [imgUrl, setImgUrl] = useState(null)

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
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = res.data;
            if (!data) {
                throw new Error('No data sent');
            }
            console.log('data :', data)
            console.log('img url :', data.secure_url)
            setImgUrl(data.secure_url)
        } catch (error) {
            console.log('Error:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, upload, imgUrl };
};

export default postUploadPhoto;