import React, { useState } from 'react'

import {Card, CardHeader, CardBody, CardFooter, Avatar, Image, Button} from "@nextui-org/react";
import { Link, useNavigate } from 'react-router-dom';

const OtherButton = ({ products = [] }) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
console.log('imgUrl :', products)
const navigate = useNavigate()
const handleVisitBtn = (pro) => {
  console.log('pro select :', pro)
  localStorage.setItem('selected', JSON.stringify(pro.ownerId) || null)
  navigate(`/indoor/${pro.ownerId}there&wego`)
}
  return (
    <>
      {products.length !== 0 ? (
        products.map((pro, idx) => (
          <div className='grid grid-cols-3 gap-4 px-2 w-full'>
        <Card isFooterBlurred className="mb-5 w-full h-[300px] col-span-12 sm:col-span-5">
              <CardHeader className="absolute z-10 top-1 gap-1 flex-col items-start" style={{zIndex: '1'}}>
                <p className="text-tiny text-[#13a993] uppercase font-bold bg-base-100 rounded-full px-1">New</p>
                {/* <h4 className="text-black font-medium text-2xl bg-base-100 rounded-full px-1">{pro.product_name}</h4> */}
              </CardHeader>
              <Image
                removeWrapper
                alt="Card example background"
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                src={pro.product_img_url}
              />
              <CardFooter style={{zIndex: '1'}} className="absolute w-full bg-white/50 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <div className="w-3/4"> 
                  <p className="text-black text-tiny">Available for sale</p>
                  <p className="text-black text-tiny">{pro.stock} for {pro.price}</p>
                </div>
                {/* <Button className="text-tiny bg-base-100 outline-none border-none text-accent" color="primary" radius="full" size="sm" 
                  onClick={()=>document.getElementById('my_modal_3').showModal()}
                >
                  Order Now
                </Button> */}
                {/* <Link to='/indoor'> */}
                <div>
                  <Button 
                    className="text-tiny bg-base-100 outline-none border-none text-accent" color="primary" radius="full" size="sm"
                    onClick={() => handleVisitBtn(pro)}
                    >
                    Visit page
                  </Button>
                  </div>
                {/* </Link> */}
                <div className='px-2'>
                  <Button className="text-tiny bg-base-100 outline-none border-none text-accent" color="primary" radius="full" size="sm"
                    onClick={()=> document.getElementById(pro.productId).showModal()}
                  >
                    Order Now
                  </Button>
                </div>
              </CardFooter>
            </Card>
          

            <dialog id={pro.productId} className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <div className="flex  gap-5">
                  <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                  <div className="flex flex-col gap-1 items-start justify-center ">
                    <h4 className="text-small font-semibold leading-none text-default-600">{pro.product_category}</h4>
                    <h5 className="text-small tracking-tight text-default-400">@username</h5>
                  </div>
                </div>
                <div className='mt-4 w-full flex justify-center'>
                  <div 
                    className='w-3/6 h-[100px] bg-slate-50 flex items-center justify-center overflow-hidden'
                    style={{ backgroundImage: `url(${pro.product_img_url})` }}
                  >
                    <img 
                      src={pro.product_img_url}
                      className='max-w-full max-h-full'
                      alt='Example'
                      onClick={()=>document.getElementById(`${pro.productId}-image-modal`).showModal()}
                    />
                    <dialog id={`${pro.productId}-image-modal`} className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <img 
                          src={pro.product_img_url}
                          className='max-w-full max-h-full'
                          alt='Example'
                        />
                      </div>
                    </dialog>
                  </div>
                </div>
                <div className='w-full flex flex-col mt-4'>
                  <h1 className='text-info'>Description</h1>
                  <p>{pro.description}</p>
                </div>
                <div className='w-full flex flex-row justify-around mt-4'>
                  <div className='flex align-middle flex-col'>
                    <h2 className='text-info'>Quantity</h2>
                    <h3>{pro.stock}</h3>
                  </div>
                  <div className='flex align-middle flex-col'>
                    <h2 className='text-info'>Amount</h2>
                    <h3>{pro.price}</h3>
                  </div>
                </div>
                <div className='w-full flex flex-col justify-center mt-4'>
                  <h2 className='text-info'>Product Address</h2>
                  <h3>Kicukiro</h3>
                </div>
                <div className='w-full flex flex-col mt-4'>
                  <h1 className='text-info'>Contact me</h1>
                  <h3>078745673</h3>
                  <h3>example@gmail.com</h3>
                </div>
                <div className='w-full mt-4 flex justify-center'>
                  <Button className="text-tiny bg-base-100 outline-none border-none text-accent" color="primary" radius="full" size="sm" onClick={()=>document.getElementById('my_modal_3').showModal()}>
                    Order Now
                  </Button> 
                </div>
              </div>
            </dialog>
            </div>
          ))
          ): null}
          
    </>
  )
}

export default OtherButton