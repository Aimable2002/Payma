import React, { useEffect, useState } from 'react';

import { Button } from '@nextui-org/react';

import useWithdrowal from '../../hook/wallet/useWithdrowal';
import useDeposite from '../../hook/wallet/useDeposite';

const Lbtn = () => {
    const [focusedInput2, setFocusedInput2] = useState('');
      const [inputValues2, setInputValues2] = useState({
        userName: '',
        Amount: '',
        Email: '',
        Phone_number: ''
    })
    const handleFocus2 = (label) => {
        setFocusedInput2(label);
    };
      const handleChangeLogin = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setInputValues2({
            ...inputValues2,
            [name]: value
        });
    
    };
    const { isDeposited, PostDeposite} = useDeposite()
      const {loading, isWithdrowal, PostWithdrowal} = useWithdrowal()
      const handleWithdrowaleSubmit = async (e) => {
        e.preventDefault();
        const {userName, Email, Phone_number, Amount} = inputValues2
        console.log('inputs :', inputValues2)
        await PostWithdrowal(inputValues2)
    }
    const handleDepositeSubmit = async (e) => {
        e.preventDefault();
        const {userName, Email, Phone_number, Amount} = inputValues2
        console.log('inputs :', inputValues2)
        await PostDeposite(inputValues2)
    }
  return (
    <div className='w-full flex flex-row justify-around align-middle gap-5'>
        <Button className='w-2/5 border-none outline-none bg-base-100 btn btn-outline btn-accent' onClick={()=>document.getElementById('my_modal_4').showModal()}>withdrow</Button>
                <dialog id="my_modal_4" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <form className='flex w-full flex-col align-middle justify-center' onSubmit={handleWithdrowaleSubmit}>
                                    {['userName', 'Amount', 'Email', 'Phone_number'].map((field) => (
                                        <div key={field} className='flex w-full flex-col inputGroup'>
                                            <label htmlFor={field} className={`absolute ${inputValues2[field] ? 'trans2' : (focusedInput2 === field ? 'trans' : '')}`}>
                                                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                                            </label>
                                            <input
                                                id={field}
                                                name={field}
                                                onChange={handleChangeLogin}
                                                type={field.includes('Phone_number' && 'Amount') ? 'number' : 'text'}
                                                onFocus={() => handleFocus2(field)}
                                            />
                                        </div>
                                    ))}
                                    <div className='mt-10'>
                                        <button className="btn btn-outline btn-accent" type='submit'>Withdrow</button>
                                    </div>
                                    <div className='relative mt-20'>
                                        <p>Withdrowaling request {loading ? <span className='loading loading-ring '></span> : isWithdrowal ? <span className='text-fuchsia-500 '> Success</span> : <span className='text-info'> Start</span>}</p>
                                    </div>
                                </form>
                    </div>
                </dialog>
                <Button className='w-2/5 border-none outline-none bg-base-100 btn btn-outline btn-accent' onClick={()=>document.getElementById('my_modal_3').showModal()}>deposite</Button>
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <form className='flex w-full flex-col align-middle justify-center' onSubmit={handleDepositeSubmit}>
                                    {['userName', 'Amount', 'Email', 'Phone_number'].map((field) => (
                                        <div key={field} className='flex w-full flex-col inputGroup'>
                                            <label htmlFor={field} className={`absolute ${inputValues2[field] ? 'trans2' : (focusedInput2 === field ? 'trans' : '')}`}>
                                                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                                            </label>
                                            <input
                                                id={field}
                                                name={field}
                                                onChange={handleChangeLogin}
                                                type={field.includes('Phone_number' && 'Amount') ? 'number' : 'text'}
                                                onFocus={() => handleFocus2(field)}
                                            />
                                        </div>
                        ))}
                    <div className='mt-10'>
                        <button className="btn btn-outline btn-accent" type='submit'>Deposite</button>
                    </div>
                    <div className='relative mt-20'>
                        <p>Depositing {loading ? <span className='loading loading-ring '></span> : isDeposited ? <span className='text-fuchsia-500 '> Success</span> : <span className='text-info'> Start</span>}</p>
                    </div>
                </form>
            </div>
        </dialog>
    </div>
  )
}

export default Lbtn