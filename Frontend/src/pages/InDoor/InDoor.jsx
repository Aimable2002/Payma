// import { Button } from '@mui/material'
// import React, {useState, useEffect} from 'react'
// import { Link } from 'react-router-dom'

// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// const InDoor = () => {

//     const [isScrolled, setIsScrolled] = useState(false)

//     const handleScrol = () => {
//         if(window.scrollY > 0){
//             setIsScrolled(true)
//         }else{
//             setIsScrolled(false)
//         }
//     }
//     useEffect(() => {
//         window.addEventListener('scroll', handleScrol)
//         return () => {
//             window.removeEventListener('scroll', handleScrol)
//         }
//     },[])

//     const [currentSlide, setCurrentSlide] = useState(0);
//     const images = [
//         'https://nextui.org/images/card-example-6.jpeg',
//         'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
//     ];

//     const nextSlide = () => {
//         setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
//     };

//     const prevSlide = () => {
//         setCurrentSlide((prevSlide) =>
//             prevSlide === 0 ? images.length - 1 : prevSlide - 1
//         );
//     };

//     const handleImageClick = (index) => {
//         setCurrentSlide(index);
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };

//     useEffect(() => {
//         window.addEventListener('scroll', handleScrol);
//         return () => {
//             window.removeEventListener('scroll', handleScrol);
//         };
//     }, []);

//     return (
//         <div className='w-full flex flex-col'>
//             <div className='w-full flex fixed'>
//                 <div className='w-11/12 flex align-middle justify-between'
//                     style={{
//                         backgroundImage: isScrolled ? 'none' : `url(${images[currentSlide]})`,
//                     }}
//                 >
//                     <Link to='/'><h1>Go Back</h1></Link>
//                     <h1>Menu</h1>
//                 </div>
//             </div>
//             <div className='w-full flex justify-center '>
//                 <div 
//                     className='w-full h-[300px] bg-slate-50 flex items-center justify-center overflow-hidden'
//                     style={{ backgroundImage: `url(${images[currentSlide]})`, 
//                     borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}
//                 >
//                     <img 
//                         src={images[currentSlide]}
//                         className='max-w-full max-h-full'
//                         alt='Example'
//                         onClick={()=>document.getElementById('my_modal_300').showModal()}
//                     />
//                     <div className='absolute left-4' onClick={prevSlide}><ArrowBackIosIcon /></div>
//                     <div className='absolute right-4' onClick={nextSlide}><ArrowForwardIosIcon /></div>
                    
//                     <dialog id="my_modal_300" className="modal">
//                         <div className="modal-box">
//                             <form method="dialog">
//                                 {/* if there is a button in form, it will close the modal */}
//                                 <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
//                             </form>
//                             <img 
//                             src='https://nextui.org/images/card-example-6.jpeg'
//                             className='max-w-full max-h-full'
//                             alt='Example'
//                             />
//                         </div>
//                     </dialog>
//                 </div>   
//             </div>
            
//             <div className='w-full flex flex-col'>
//                 <div className='flex flex-col'>
//                     <h1 className='font-bold'>Description</h1>
//                     <p>
//                         Your development work will be backend-centric, 
//                         involving APIs, databases, and logic handling, 
//                         rather than traditional frontend technologies like HTML, CSS, or JavaScript.
//                     </p>
//                 </div>
//                 <div className='flex flex-col py-4'>
//                     <h1 className='font-bold'>Production Company</h1>
//                     <p>
//                         Yello Group
//                     </p>
//                 </div>
//                 <div className='flex flex-row justify-between'>
//                     <div className='flex flex-col py-4'>
//                         <h1 className='font-bold'>Cost</h1>
//                         <p>
//                             460,000 RWF
//                         </p>
//                     </div>
//                     <div className='flex align-middle'>
//                         <Button>Order Now</Button>
//                     </div>
//                 </div>
//             </div> 

//             <div className='w-full flex flex-col'>
//                 <h1 className='font-bold mb-2'>Recommended</h1>
//                 <div className='w-full grid grid-cols-2 gap-4'>
//                     {images.map((img, index) => {
//                         <div key={index} className='flex w-full flex-col'>
//                             <div 
//                                 className='w-full h-[200px] bg-slate-50 flex flex-col items-center justify-center overflow-hidden'
//                                 style={{ backgroundImage: `url(${img})`, 
//                                 borderRadius: '10px'}}
//                             >
//                                 <img 
//                                     src={img}
//                                     className='max-w-full max-h-full'
//                                     alt='Example'
//                                     onClick={() => handleImageClick(index)}
//                                 />
//                             </div>
//                             <div className='w-full flex px-1 flex-col'>
//                                 <h2>AC Camera</h2>
//                                 <div className='flex flex-row justify-between'>
//                                     <h4>Amount</h4>
//                                     <h4>46,000 RWF</h4>
//                                 </div>
//                             </div>
//                         </div>
//                     })}

//                     {/** Duplicate */}

//                     <div className='flex w-full flex-col'>
//                         <div 
//                             className='w-full h-[200px] bg-slate-50 flex flex-col items-center justify-center overflow-hidden'
//                             style={{ backgroundImage: 'url(https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp)', 
//                             borderRadius: '10px'}}
//                         >
//                             <img 
//                                 src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
//                                 className='max-w-full max-h-full'
//                                 alt='Example'
//                                 onClick={handleImageClick}
//                             />
//                         </div>
//                         <div className='w-full flex px-1 flex-col'>
//                             <h2>AC Camera</h2>
//                             <div className='flex flex-row justify-between'>
//                                 <h4>Amount</h4>
//                                 <h4>26,000 RWF</h4>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//   )
// }

// export default InDoor



import { Button } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const InDoor = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScrol = () => {
        if (window.scrollY > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

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
        setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? images.length - 1 : prevSlide - 1
        );
    };
    

    const handleImageClick = (index) => {
        setCurrentSlide(index);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='w-full flex flex-col'>
            <div className='w-full flex top-0 bg-base-300 left-0 fixed'>
                <div className='w-11/12 flex align-middle justify-between'
                    // style={{
                    //     backgroundImage: isScrolled ? 'none' : `url(${images[currentSlide]})`,
                    // }}
                >
                    <Link to='/'>{!isScrolled ? (<h1 className='px-2'>G0 Back</h1>) : (<div className='px-2'><ArrowBackIosIcon /></div>)}</Link>
                </div>
            </div>
            <div className='w-full mt-3 flex justify-center '>
                <div 
                    className='w-full h-[300px] bg-slate-50 flex items-center justify-center overflow-hidden'
                    style={{ backgroundImage: `url(${images[currentSlide]})`, 
                    borderRadius: '10px'}}
                >
                    <img 
                        src={images[currentSlide]}
                        className='max-w-full max-h-full'
                        alt='Example'
                    />
                    <div className='absolute left-4' onClick={prevSlide}><ArrowBackIosIcon /></div>
                    <div className='absolute right-4' onClick={nextSlide}><ArrowForwardIosIcon /></div>
                    
                </div>   
            </div>
            
            <div className='w-full flex flex-col'>
                <div className='flex flex-col'>
                    <h1 className='font-bold'>Description</h1>
                    <p>
                        Your development work will be backend-centric, 
                        involving APIs, databases, and logic handling, 
                        rather than traditional frontend technologies like HTML, CSS, or JavaScript.
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
                            460,000 RWF
                        </p>
                    </div>
                    <div className='flex align-middle'>
                        <Button>Order Now</Button>
                    </div>
                </div>
            </div> 

            <div className='w-full flex flex-col'>
                <h1 className='font-bold mb-2'>Recommended</h1>
                <div className='w-full grid grid-cols-2 gap-4'>
                    {images.map((img, index) => (
                        <div key={index} className='flex w-full flex-col'>
                            <div 
                                className='w-full h-[200px] bg-slate-50 flex flex-col items-center justify-center overflow-hidden'
                                style={{ backgroundImage: `url(${img})`, 
                                borderRadius: '10px'}}
                            >
                                <img 
                                    src={img}
                                    className='max-w-full max-h-full'
                                    alt='Example'
                                    onClick={() => handleImageClick(index)}
                                />
                            </div>
                            <div className='w-full flex px-1 flex-col'>
                                <h2>AC Camera</h2>
                                <div className='flex flex-row justify-between'>
                                    <h4>Amount</h4>
                                    <h4>46,000 RWF</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <div className='mb-20'></div>
        </div>
    )
}

export default InDoor;


