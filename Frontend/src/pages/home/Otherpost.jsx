import React, { useState } from 'react'

import {Card, CardHeader, CardBody, CardFooter, Avatar, Image, Button} from "@nextui-org/react";

const OtherButton = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full flex flex-col overflow-auto">
        <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5 mb-1">
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">New</p>
                <h4 className="text-black font-medium text-2xl">Acme camera</h4>
              </CardHeader>
              <Image
                removeWrapper
                alt="Card example background"
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                src="https://nextui.org/images/card-example-6.jpeg"
              />
              <CardFooter style={{zIndex: '1'}} className="absolute w-full bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <div className="w-3/4"> 
                  <p className="text-black text-tiny">Available for sale</p>
                  <p className="text-black text-tiny">1 piece for 100K</p>
                </div>
                <Button className="text-tiny bg-base-100 outline-none border-none text-accent" color="primary" radius="full" size="sm" onClick={()=>document.getElementById('my_modal_3').showModal()}>
                  Order Now
                </Button>
              </CardFooter>
            </Card>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <div className="flex  gap-5">
                  <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                  <div className="flex flex-col gap-1 items-start justify-center ">
                    <h4 className="text-small font-semibold leading-none text-default-600">product cathegory</h4>
                    <h5 className="text-small tracking-tight text-default-400">@username</h5>
                  </div>
                </div>
                <div className='mt-4 w-full flex justify-center'>
                  <div 
                    className='w-3/6 h-[100px] bg-slate-50 flex items-center justify-center overflow-hidden'
                    style={{ backgroundImage: 'url(https://nextui.org/images/card-example-6.jpeg)' }}
                  >
                    <img 
                      src='https://nextui.org/images/card-example-6.jpeg'
                      className='max-w-full max-h-full'
                      alt='Example'
                      onClick={()=>document.getElementById('my_modal_300').showModal()}
                    />
                    <dialog id="my_modal_300" className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <img 
                          src='https://nextui.org/images/card-example-6.jpeg'
                          className='max-w-full max-h-full'
                          alt='Example'
                        />
                      </div>
                    </dialog>
                  </div>
                </div>
                <div className='w-full flex flex-col mt-4'>
                  <h1 className='text-info'>Description</h1>
                  <p>Your development work will be backend-centric, involving APIs, databases, and logic handling, rather than traditional frontend technologies like HTML, CSS, or JavaScript.</p>
                </div>
                <div className='w-full flex flex-row justify-around mt-4'>
                  <div className='flex align-middle flex-col'>
                    <h2 className='text-info'>Quantity</h2>
                    <h3>1 piece</h3>
                  </div>
                  <div className='flex align-middle flex-col'>
                    <h2 className='text-info'>Amount</h2>
                    <h3>100,000 FRW</h3>
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
  )
}

export default OtherButton