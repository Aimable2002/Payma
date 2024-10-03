import { Button } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Card, CardHeader, CardBody, CardFooter, Avatar, Image} from "@nextui-org/react";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import getIndoorProduct from './getIndoorProduct';

const InDoor = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScrol = () => {
        if (window.scrollY > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    const {loading, products} = getIndoorProduct()

    useEffect(() => {
        window.addEventListener('scroll', handleScrol);
        return () => {
            window.removeEventListener('scroll', handleScrol);
        };
    }, []);

    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [
        'https://nextui.org/images/card-example-6.jpeg',
        'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
    ];

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % products.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? products.length - 1 : prevSlide - 1
        );
    };
    

    const handleImageClick = (index) => {
        setCurrentSlide(index);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const navigate = useNavigate()
    const handleBack = () => {
        localStorage.removeItem('selected')
        navigate('/')
    }
    const [isOrder, setIsOrder] = useState(false)
    const onButtonClick = (products) => {
        setIsOrder(!isOrder)
    }
    return (
        <div className='w-full flex flex-col'>
            <div className='w-full flex top-0 left-0 fixed'>
                <div className='w-[100%] flex align-middle justify-between'
                    // style={{
                    //     backgroundImage: isScrolled ? 'none' : `url(${images[currentSlide]})`,
                    // }}
                >
                    {!isScrolled ? (
                        <div onClick={() => handleBack()} className='flex flex-row'>
                                <img 
                                    width="40px" 
                                    height="40px" 
                                    className="flex items-center"
                                    src='https://res.cloudinary.com/djwl0uwtj/image/upload/v1727640905/KONNECT_LOGO_1_ln7aew.png' />
                                <h1 className="flex align-middle self-center mb-2">Konnect</h1>
                            </div>
                        ) : (
                            <div onClick={() => handleBack()} className='flex flex-row bg-white w-full'>
                                <img 
                                    width="40px" 
                                    height="40px" 
                                    className="flex items-center"
                                    src='https://res.cloudinary.com/djwl0uwtj/image/upload/v1727640905/KONNECT_LOGO_1_ln7aew.png' />
                                    <h1 className="flex align-middle self-center mb-2">Konnect</h1>
                            </div>
                        )}
                </div>
            </div>
            <div className='w-full mt-6 flex justify-center '>
                <div 
                    className='w-full h-[300px] bg-slate-50 flex items-center justify-center overflow-hidden'
                    style={{ backgroundImage: products.length > 0 
                            ? `url(${products[currentSlide]?.product_img_url})` 
                            : 'none', 
                    borderRadius: '10px'}}
                >
                    <img 
                        src={products[currentSlide]?.product_img_url}
                        className='max-w-full max-h-full'
                        alt='Example'
                    />
                    <div className='absolute left-4' onClick={prevSlide}><ArrowBackIosIcon /></div>
                    <div className='absolute right-4' onClick={nextSlide}><ArrowForwardIosIcon /></div>
                    
                </div>   
            </div>
            <Card className='mt-4'>
            <CardHeader>
            <div className='w-full flex flex-col'>
                <div className='flex flex-col'>
                    <h1 className='font-bold'>Description</h1>
                    <p>
                        {products[currentSlide]?.description}
                    </p>
                </div>
                <div className='flex flex-col py-4'>
                    <h1 className='font-bold'>Production Company</h1>
                    <p>
                        Yello Group
                    </p>
                </div>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-col py-4'>
                        <h1 className='font-bold'>Cost</h1>
                        <p>
                            {products[currentSlide]?.price} RWF
                        </p>
                    </div>
                    <div className='flex align-middle'>
                        <Button onClick={() => onButtonClick(products[currentSlide])}>Order Now</Button>
                    </div>
                </div>
            </div> 
            </CardHeader>
            </Card>
            {isOrder ? (
            <Card>
                <CardHeader>
                    <div className='w-full flex flex-row'>
                        <div className='w-full flex flex-col'>
                            <h1></h1>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        ) : null}
            <div className='w-full flex flex-col'>
                <h1 className='font-bold mb-2'>Recommended</h1>
                <div className='w-full grid grid-cols-2 gap-4'>
                    {!loading && products.length !== 0 ? (
                        products.map((img, index) => (
                        <div key={index} className='flex w-full flex-col'>
                            <div 
                                className='w-full h-[200px] bg-slate-70 border-black border-bg-slate-100 flex flex-col items-center justify-center overflow-hidden'
                                style={{ backgroundImage: products.length > 0 
                                    ? `url(${products?.product_img_url})` 
                                    : 'none',
                                    borderRadius: '10px', border: '2px solid #00aaff'}}
                            >
                                <img 
                                    src={img.product_img_url}
                                    className='max-w-full max-h-full'
                                    alt='Example'
                                    onClick={() => handleImageClick(index)}
                                />
                            </div>
                            <div className='w-full flex px-1 flex-col'>
                                <h2>{img.product_name}</h2>
                                <div className='flex flex-row justify-between'>
                                    <h4>Amount</h4>
                                    <h4 className='text-info'>{img.price} RWF</h4>
                                </div>
                            </div>
                        </div>
                        )
                    )) : ''}
                </div>

            </div>
            <div className='mb-20'></div>
        </div>
    )
}

export default InDoor;


