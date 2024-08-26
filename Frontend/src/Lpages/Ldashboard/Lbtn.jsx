import React, { useEffect, useState } from 'react';

import { Button } from '@nextui-org/react';

import useWithdrowal from '../../hook/wallet/useWithdrowal';
import useDeposite from '../../hook/wallet/useDeposite';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

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
    //   const handleChangeLogin = (e) => {
    //     e.preventDefault()
    //     const { name, value } = e.target;
    //     setInputValues2({
    //         ...inputValues2,
    //         [name]: value
    //     });
    
    // };

    const handleChangeLogin = (eventOrValue) => {
        let name, value;
    
        if (eventOrValue && eventOrValue.target) {
            // Standard input event
            name = eventOrValue.target.name;
            value = eventOrValue.target.value;
        } else {
            // PhoneInput or other components providing direct values
            name = 'Phone_number'; // Adjust if needed
            value = eventOrValue;
        }
    
        setInputValues2(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const { isDeposited, PostDeposite} = useDeposite()
      const {loading, isWithdrowal, PostWithdrowal} = useWithdrowal()
      const handleWithdrowaleSubmit = async (e) => {
        e.preventDefault();
        const {Phone_number, Amount} = inputValues2
        console.log('inputs :', inputValues2)
        await PostWithdrowal(inputValues2)
    }
    const handleDepositeSubmit = async (e) => {
        e.preventDefault();
        const {Phone_number, Amount} = inputValues2
        console.log('inputs :', inputValues2)
        await PostDeposite(inputValues2)
    }
  return (
    <div className='w-full flex flex-row justify-around align-middle gap-5'>
        <Button className='w-2/5 border-accent text-tiny text-accent outline-none bg-base-100 btn btn-outline btn-accent' onClick={()=>document.getElementById('my_modal_4').showModal()}>Cash Out</Button>
                <dialog id="my_modal_4" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Cash Out!</h3>
                        <form className='flex w-full flex-col align-middle justify-center' onSubmit={handleWithdrowaleSubmit}>
                                    {['Amount', 'Phone_number'].map((field) => (
                                        <div key={field} className='flex w-full flex-col inputGroup'>
                                            <label htmlFor={field} className={`absolute ${inputValues2[field] ? 'trans2' : (focusedInput2 === field ? 'trans' : '')}`}>
                                                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                                            </label>
                                            {/* <input
                                                id={field}
                                                name={field}
                                                className="bg-transparent"
                                                onChange={handleChangeLogin}
                                                type={field.includes('Phone_number' && 'Amount') ? 'number' : 'text'}
                                                onFocus={() => handleFocus2(field)}
                                            /> */}

                                            {field === 'Phone_number' ? (
                                                <PhoneInput
                                                    country={'rw'} // Default country code
                                                    value={inputValues2[field]} // Your state value
                                                    onChange={(phone) => handleChangeLogin({ target: { name: field, value: phone } })} // Handle change
                                                    inputProps={{
                                                        name: field,
                                                        required: true,
                                                        autoFocus: focusedInput2 === field
                                                    }}
                                                    inputClass="bg-transparent"
                                                    className='bg-base-100 w-full'
                                                />
                                            ) : (
                                                <input
                                                id={field}
                                                name={field}
                                                className="bg-transparent"
                                                onChange={handleChangeLogin}
                                                type='number'
                                                onFocus={() => handleFocus2(field)}
                                            />
                                            )}
                                        </div>
                                    ))}
                                    <div className='mt-10'>
                                        <Button className='border-none outline-none bg-base-100 btn btn-outline btn-accent' type='submit'>Cash Out</Button>
                                    </div>
                                    <div className='relative mt-20'>
                                        <p>Cash Out request {loading ? <span className='loading loading-ring '></span> : isWithdrowal ? <span className='text-fuchsia-500 '> Success</span> : <span className='text-info'> Start</span>}</p>
                                    </div>
                                </form>
                    </div>
                </dialog>
                <Button className='w-2/5 border-accent text-tiny text-accent outline-none bg-base-100 btn btn-outline btn-accent' onClick={()=>document.getElementById('my_modal_3').showModal()}>Cash In</Button>
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Cash In!</h3>
                        <form className='flex w-full flex-col align-middle justify-center' onSubmit={handleDepositeSubmit}>
                                    {['Amount', 'Phone_number'].map((field) => (
                                        <div key={field} className='flex w-full flex-col inputGroup'>
                                            <label htmlFor={field} className={`absolute ${inputValues2[field] ? 'trans2' : (focusedInput2 === field ? 'trans' : '')}`}>
                                                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                                            </label>
                                            {/* <input
                                                id={field}
                                                name={field}
                                                className="bg-transparent"
                                                onChange={handleChangeLogin}
                                                type={field.includes('Phone_number' && 'Amount') ? 'number' : 'text'}
                                                onFocus={() => handleFocus2(field)}
                                            /> */}

                                            {field === 'Phone_number' ? (
                                                <PhoneInput
                                                    country={'rw'} // Default country code
                                                    value={inputValues2[field]} // Your state value
                                                    onChange={(phone) => handleChangeLogin({ target: { name: field, value: phone } })} // Handle change
                                                    inputProps={{
                                                        name: field,
                                                        required: true,
                                                        autoFocus: focusedInput2 === field
                                                    }}
                                                    inputClass="bg-transparent"
                                                    className='bg-transparent'
                                                />
                                            ) : (
                                                <input
                                                    id={field}
                                                    name={field}
                                                    className="bg-transparent"
                                                    onChange={handleChangeLogin}
                                                    type={field === 'Amount' ? 'number' : 'text'}
                                                    onFocus={() => handleFocus2(field)}
                                                />
                                            )}
                                        </div>
                        ))}
                    <div className='mt-10'>
                        <Button className='border-none outline-none bg-base-100 btn btn-outline btn-accent' type='submit'>Cash In</Button>
                    </div>
                    <div className='relative mt-20'>
                        <p>Cash In request {loading ? <span className='loading loading-ring '></span> : isDeposited ? <span className='text-fuchsia-500 '> Success</span> : <span className='text-info'> Start</span>}</p>
                    </div>
                </form>
            </div>
        </dialog>
    </div>
  )
}

export default Lbtn