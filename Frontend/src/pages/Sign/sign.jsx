// import React, { useState } from 'react'
// import './home.css'
// const home = () => {

//     const [isFocus, setIsFocus] = useState(false);
//     const [isFirst, setIsFirst] = useState(false)
//     const [isLast, setIsLast] = useState(false)
//     const [isUser, setIsUser] = useState(false)
//     const [isEmail, setIsEmail] = useState(false)
//     const [isP, setIsP] = useState(false)
//     const [isPCo, setIsPCo] = useState(false)
// const handleConfirm = (input) => {
//     setIsFocus(input)

//     const [isFirst, setIsFirst] = useState(false)
//     const [isLast, setIsLast] = useState(false)
//     const [isUser, setIsUser] = useState(false)
//     const [isEmail, setIsEmail] = useState(false)
//     const [isP, setIsP] = useState(false)
//     const [isPCo, setIsPCo] = useState(false)

//     switch (input) {
//         case 'first':
//             setIsFirst(true)
//             break;
//         case 'last' :
//             setIsLast(true)
//             break;
//         case 'user' :
//             setIsUser(true)
//             break;
//         case 'email' :
//             setIsEmail(true)
//             break;
//         case 'password' :
//             setIsP(true)
//             break;
//         case 'confirm' :
//             setIsPCo(true)
//             break;
//     }
// }
//   return (
//     <div className=''>
//         <h1>Welcome to webApllication</h1>
//         <div className='frm'>
//             <form className='flex w-full flex-col align-middle justify-center'>
//                 <div className='flex w-full flex-col inputGroup'>
//                     <label 
//                         className={`absolute ${isFocus === 'first' ? 'trans' : 'absolute'}`}>
//                             First Name
//                     </label>
//                     <input 
//                         onClick={() => handleConfirm('first')} type="text" />
//                 </div>
//                 <div className='flex w-full flex-col inputGroup'>
//                     <label 
//                         className={`absolute ${isFocus === 'last' ? 'trans' : 'absolute'}`}>
//                             Last Name
//                     </label>
//                     <input 
//                         onClick={() => handleConfirm('last')} type="text" />
//                 </div>
//                 <div className='flex w-full flex-col inputGroup'>
//                     <label 
//                         className={`absolute ${isFocus === 'user' ? 'trans' : 'absolute'}`}>
//                             userName
//                     </label>
//                     <input 
//                     onClick={() => handleConfirm('user')} type="text" />
//                 </div>
//                 <div className='flex w-full flex-col inputGroup'>
//                     <label 
//                         className={`absolute ${isFocus === 'email' ? 'trans' : 'absolute'}`}>
//                             Enter Email
//                     </label>
//                     <input 
//                         onClick={() => handleConfirm('email')} type="email" />
//                 </div>
//                 <div className='flex w-full flex-col inputGroup'>
//                     <label 
//                         className={`absolute ${isFocus === 'password' ? 'trans' : 'absolute'}`}>
//                             Create Password
//                     </label>
//                     <input 
//                         type="password" 
//                         onClick={() => handleConfirm('password')}/>
//                 </div>
//                 <div className='flex w-full flex-col inputGroup'>
//                     <label 
//                         className={`absolute ${isFocus === 'confirm' ? 'trans' : 'absolute'}`}>
//                             Confirm Password
//                     </label>
//                     <input 
//                         onClick={() => handleConfirm('confirm')} type="password" />
//                 </div>
//                     <div className='mt-10'>
//                         <button>Next</button>
//                     </div>
//             </form>
//         </div>
//     </div>
//   )
// }

// export default home




import React, { useState } from 'react';
import './sign.css';
import useLogin from '../../hook/registration/login';
import useSignup from '../../hook/registration/signup';

const Sign = () => {
    const {loading, login} = useLogin();
    const {signup} = useSignup();
    const [focusedInput, setFocusedInput] = useState('');
    const [focusedInput2, setFocusedInput2] = useState('');
    const [inputValues, setInputValues] = useState({
        First_name: '',
        Last_name: '',
        userName: '',
        Email: '',
        Title: '',
        Password: '',
        confirmPassword: '',
        Phone_number: ''
    });
    const [inputValues2, setInputValues2] = useState({
        userName: '',
        Password: ''
    })
    const handleFocus = (label) => {
        setFocusedInput(label);
    };
    const handleFocus2 = (label) => {
        setFocusedInput2(label);
    };
    const [isNext, setIsNext] = useState(false)
    const handleDirection = (e) => {
        e.preventDefault()
        setIsNext(!isNext)
    }

    const [isLogin, setIsLogin] = useState(false)
    const handleLoginState = () => {
        setIsLogin(!isLogin)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValues({
            ...inputValues,
            [name]: value
        });

    };
    const handleChangeLogin = (e) => {
        const { name, value } = e.target;
        setInputValues2({
            ...inputValues2,
            [name]: value
        });

    };
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const {userName, Password} = inputValues2
        console.log('inputs :', inputValues2)
        await login(inputValues2)
    }
    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        const {First_name, Last_name, Email, Title, userName, Password, confirmPassword, Phone_number} = inputValues
        console.log('inputs :', inputValues)
        await signup(inputValues)
    }
    
    return (
        <div className=''>
            <h1 className='mb-10'>{!isLogin ? 'Welcome to webApplication' : 'Welcome Back'}</h1>
            {!isLogin ? (
                <div className='frm'>
                    {!isNext ? (
                        <form className='flex w-full flex-col align-middle justify-center' onSubmit={handleSignUpSubmit}>
                            {['First_name', 'Last_name', 'userName', 'Title', 'Email', 'Password', 'confirmPassword'].map((field) => (
                                <div key={field} className='flex w-full flex-col inputGroup'>
                                    <label htmlFor={field} className={`absolute ${inputValues[field] ? 'trans2' : (focusedInput === field ? 'trans' : '')}`}>
                                        {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                                    </label>
                                    <input
                                        id={field}
                                        name={field}
                                        onChange={handleChange}
                                        type={field.includes('password') ? 'password' : 'text'}
                                        onFocus={() => handleFocus(field)}
                                    />
                                </div>
                            ))}
                            <div className='mt-10'>
                                <button onClick={handleDirection} type='button'>Next</button>
                            </div>
                            <div className='relative mt-20'>
                                <p>Already have account <span onClick={handleLoginState} className='text-info'>  Login</span></p>
                            </div>
                        </form>
                    ) : (
                        <form className='flex w-full flex-col align-middle justify-center' onSubmit={handleSignUpSubmit}>
                            {['Phone_number'].map((field) => (
                                <div key={field} className='flex w-full flex-col inputGroup'>
                                    <label htmlFor={field} className={`absolute ${inputValues[field] ? 'trans2' : (focusedInput === field ? 'trans' : '')}`}>
                                        {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                                    </label>
                                    <input
                                        id={field}
                                        name={field}
                                        onChange={handleChange}
                                        type={'number'}
                                        onFocus={() => handleFocus(field)}
                                    />
                                </div>
                            ))}
                            <div className='mt-10'>
                                <button type='submit'>Signup</button>
                            </div>
                            <div className='relative mt-20'>
                                <p>Already have account <span onClick={() => setIsNext(!isNext)} className='text-info'> Go Back</span></p>
                            </div>
                        </form>
                    )}
            </div>
        ) : (
            <form className='flex w-full flex-col align-middle justify-center' onSubmit={handleLoginSubmit}>
                {['userName', 'Password'].map((field) => (
                    <div key={field} className='flex w-full flex-col inputGroup'>
                        <label htmlFor={field} className={`absolute ${inputValues2[field] ? 'trans2' : (focusedInput2 === field ? 'trans' : '')}`}>
                            {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <input
                            id={field}
                            name={field}
                            onChange={handleChangeLogin}
                            type={field.includes('password') ? 'password' : 'text'}
                            onFocus={() => handleFocus2(field)}
                        />
                    </div>
                ))}
                <div className='mt-10'>
                <button type='submit'>Login</button>
                </div>
                <div className='relative mt-20'>
                    <p>Dont have account <span onClick={() => setIsLogin(!isLogin)} className='text-info'> Signup</span></p>
                </div>
            </form>
            
        )}
        </div>
    );
};

export default Sign;
