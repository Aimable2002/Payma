import { Button} from '@mui/material'
import React, {useState, useEffect} from 'react'
import {Card, CardHeader, CardBody, CardFooter, Avatar, Image} from "@nextui-org/react";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';
import getProduct from '../addBusiness/getProduct';

const InDoorOrder= () => {

    const [isScrolled, setIsScrolled] = useState(false)
    const handleScrol = () => {
        if(window.scrollY > 0){
            setIsScrolled(true)
        }else{
            setIsScrolled(false)
        }
    }

    const {loading, products} = getProduct()

    useEffect(() => {
        window.addEventListener('scroll', handleScrol)
        return () => {
            window.removeEventListener('scroll', handleScrol)
        }
    },[])

    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [
        'https://nextui.org/images/card-example-6.jpeg',
        'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp', // You can add more images here
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

    return (
        <div className='w-full flex flex-col fixed'>
                <div className='w-full left-0 top-0 h-14 flex fixed' style={{borderBottom: ' 2px solid #00aaff'}}>
                    <div className='w-11/12 flex items-center justify-between'>
                        <div className='cursor-pointer px-4 text-3xl font-bold'>
                                <Link to='/'>
                                <div className='flex flex-row w-full cursor-pointer'>
                                    <img 
                                        width="40px" 
                                        height="40px" 
                                        className="flex items-center"
                                        src='https://res.cloudinary.com/djwl0uwtj/image/upload/v1727640905/KONNECT_LOGO_1_ln7aew.png' />
                                    <h4 className="flex align-middle self-center mb-3">Konnect</h4>
                                </div>
                            </Link>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <Link to='/'><h1 className='cursor-pointer'>Home</h1></Link>
                            <Link to='dasboard'><h1 className='cursor-pointer'>Dashboard</h1></Link>
                        </div>
                    </div>
                </div>
            <div className='w-full flex flex-row mt-12 '>
                <div className='flex px-1 h-screen overflow-y-auto w-3/12 flex-col'>
                    <div className='w-full flex flex-col justify-center '>
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
                            
                        </div> 
                            <div className='w-full flex align-middle justify-center gap-10 py-1'>
                                <div className=' left-4 cursor-pointer' onClick={prevSlide}><ArrowBackIosIcon /></div>
                                <div className='left-50 cursor-pointer' onClick={nextSlide}><ArrowForwardIosIcon /></div>  
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
                                <Button>Order Now</Button>
                            </div>
                        </div>
                    </div> 
                    </CardHeader>
                    </Card>
                    <div className='mb-40'></div>
                </div>
                <div className='flex w-3/4 h-screen overflow-y-auto flex-col'>
                    <div className='w-11/12 flex flex-col'>
                        <h1 className='font-bold mb-2 px-4'>Recommended</h1>
                        <div className='px-4'>
                            <div className='w-full grid grid-cols-4 gap-4'>
                                {!loading && products.length !== 0 ? (
                                    products.map((img, index) => (
                                        <div key={index} className='flex w-full flex-col  border-gray-300 shadow-lg' 
                                            style={{
                                                borderRadius: '10px', border: '2px solid #00aaff'
                                            }}
                                        >
                                            <div 
                                                className='w-full h-[200px] bg-slate-50 flex flex-col items-center justify-center overflow-hidden'
                                                style={{ backgroundImage: products.length > 0 
                                                    ? `url(${products.product_img_url})` 
                                                    : 'none',
                                                borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}
                                            >
                                                <img 
                                                    src={img.product_img_url}
                                                    className='max-w-full max-h-full cursor-pointer'
                                                    alt='Example'
                                                    onClick={() => handleImageClick(index)}
                                                />
                                            </div>
                                            <div className='w-full flex px-1 flex-col'>
                                                <h2 className='text-sm font-bold'>{img.product_name}</h2>
                                                <div className='flex flex-row justify-between'>
                                                    <h4 className='text-sm '>Amount</h4>
                                                    <h4 className='text-sm text-info'>{img.price} RWF</h4>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )) : ''}
                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default InDoorOrder