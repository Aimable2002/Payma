import React, {useState} from 'react'

import { Button } from '@nextui-org/react'
import CallIcon from '@mui/icons-material/Call';
import useLogin from '../../hook/registration/login';
import useSignup from '../../hook/registration/signup';
import googleReg from './googleReg';

const Lsign = () => {

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
    const handleFocus = (label) => {
      setFocusedInput(label);
    };
    const handleFocus2 = (label) => {
      setFocusedInput2(label);
    };
    const [isLogin, setIsLogin] = useState(false)
    const handleLoginState = () => {
        setIsLogin(!isLogin)
    }
    const {loading, login} = useLogin();
    const handleLoginSubmit = async (e) => {
      e.preventDefault();
      const {userName, Password} = inputValues2
      console.log('inputs :', inputValues2)
      await login(inputValues2)
  }
  const {signup} = useSignup();
    const handleSignUpSubmit = async (e) => {
      e.preventDefault();
      const {First_name, Last_name, Email, Title, userName, Password, confirmPassword, Phone_number} = inputValues
      console.log('inputs :', inputValues)
      await signup(inputValues)
    }
    const {LogGoo} = googleReg()
    const handleGoogle = async () => {
      await LogGoo()
    }
  return (
    <div className='w-full flex flex-col'>
      <div className='w-full flex justify-between'>
        <div className='w-3/6 flex'>Web App</div>
        <div className='w-3/6 flex flex-row gap-4 justify-end'>
          <p className='flex align-middle self-center'>{!isLogin ? 'Already have account' : 'Create account'}</p>
          <div><button className="btn btn-outline btn-info" onClick={handleLoginState}>{isLogin ? 'Sign UP' : 'Sign IN'}</button></div>
        </div>
      </div>
      <div className='w-full flex flex-row mt-5'>
        <div className='w-3/6 flex justify-center flex-col'>
          {!isLogin ? (
            <>
          <div className='w-full flex gap-2 flex-row justify-around'>
            <div className='w-full'>
              <h1 className='text-center text-info mb-5'>Web Focus</h1>
              <p className='text-center'>Welcome to [Your Website Name], <br /> where efficiency meets opportunity! We are <br /> a streamlined platform designed <br /> for seamless transactions and task management:</p>
              <ul className='mt-5 text-center'>
                <li>Publish Tasks: Easily list tasks needing completion and specify requirements.</li>
                <li>Deposit Funds: Securely transfer funds to ensure task completion and payment.</li>
                <li>Earn Rewards: Task completers receive swift payments upon task approval.</li>
              </ul>
            </div>
            {/* <div className='w-2/5'>
              <h1 className='text-center text-info mb-5'>Our Goal</h1>
              <li>
                Secure The world remoting jobs
              </li>
            </div> */}
          </div>

          <div className='w-full flex flex-col mt-10'>
            <h1 className='text-center text-info'>Contact Us</h1>
            <div className='flex justify-center  gap-2 flex-row'>
              <div><CallIcon /></div>
              <div>(255) 755 5555</div>
            </div>
          </div>
            </>
            ) : (
              <>
                <div className='w-full flex flex-col'>
                  <p className='text-center'>Welcome back</p>
                </div>
                <div className='w-full flex flex-col mt-10'>
                  <h1 className='text-center text-info'>Contact Us</h1>
                  <div className='flex justify-center  gap-2 flex-row'>
                    <div><CallIcon /></div>
                    <div>(255) 755 5555</div>
                  </div>
                </div>
              </>
            )}
        </div>
        <div className='w-3/6 flex justify-center'>
          <div className='w-full flex flex-col justify-center align-middle'>
            {!isLogin ? (
              <form className='flex w-3/4 flex-col self-center align-middle justify-center' onSubmit={handleSignUpSubmit}>
                    {['First_name', 'Last_name', 'userName', 'Title', 'Email', 'Phone_number', 'Password', 'confirmPassword'].map((field) => (
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
                    <button className="btn btn-outline btn-accent" type='submit'>Signup</button>
                    </div>
                    <div className='relative mt-5'>
                        <p>Terms and condition <span className='text-info cursor-pointer'> here</span></p>
                        <p>signup with google <span className='text-info cursor-pointer' onClick={handleGoogle}> here</span></p>
                    </div>
                </form>
            ) : (
              <form className='flex w-3/4 flex-col self-center align-middle justify-center' onSubmit={handleLoginSubmit}>
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
                  <button className="btn btn-outline btn-accent" type='submit'>Login</button>
                  </div>
                  <div className='relative mt-20'>
                      <p>Forget Password <span className='text-info cursor-pointer'> here</span></p>
                  </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lsign