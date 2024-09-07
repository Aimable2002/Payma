import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Button } from '@nextui-org/react';
import useGetUserOn from '../../hook/getUsers/getOnUser';
import {Card, CardHeader, CardBody, CardFooter,} from "@nextui-org/react";
import usegetTaskGiver from '../../hook/getTask/getTaskGiver';
import useDeposite from '../../hook/wallet/useDeposite.js'
import useWithdrowal from '../../hook/wallet/useWithdrowal.js';
import usegetTaskView from '../../hook/getTask/useTaskView.js';
import usegetTaskTaker from '../../hook/getTask/getTaskTaker.js';
import useGetInvite from '../../hook/Invitation/useGetInvite.js';
import inviteData from '../../hook/Invitation/inviteData.js';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import DragHandleTwoToneIcon from '@mui/icons-material/DragHandleTwoTone';

import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AddTaskIcon from '@mui/icons-material/AddTask';

import { getCurrentTheme } from '../../utilities/themeToggle.js';

import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';

const dashboard = () => {
    const [isHome, setIsHome] = useState(true)
  const [isTask, setIsTask] = useState(false);
  const [isReport, setIsReport] = useState(false)
  const [isHistory, setIsHistory] = useState(false);
const [isScrolled, setIsScrolled] = useState(false)


  const [activeButton, setActiveButton] = useState('Home');

  const handleButtonClick = (e) => {

    setIsHome(false)
    setIsTask(false)
    setIsReport(false)
    setIsHistory(false);
    // setIsAlert(false)

    setActiveButton(e);
    switch (e) {
      case 'Home':
        setIsHome(true);
        break;
      case 'Tasks':
        setIsTask(true);
        break;
      case 'Report':
        setIsReport(true);
        break;
      case 'History':
        setIsHistory(true);
        break;
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const data = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 4567, amt: 2400 },
    { name: 'Page C', uv: 200, pv: 1398, amt: 2400 },
    { name: 'Page D', uv: 278, pv: 3908, amt: 2400 },
    { name: 'Page E', uv: 189, pv: 4800, amt: 2400 },
    { name: 'Page F', uv: 239, pv: 3800, amt: 2400 },
    { name: 'Page G', uv: 349, pv: 4300, amt: 2400 }
  ];

  const [IsButton, setIsButton] = useState(false);
  const [isAssignerDisabled, setIsAssignerDisabled] = useState(false);
  const handletaskButton = () => {
    setIsButton(!IsButton);
    // setIsAssignerDisabled(true);
    setIsAssignerDisabled(!isAssignerDisabled) 
  };
  const handleAssignerClick = () => {
    setIsAssignerDisabled(!isAssignerDisabled); // Disable the Assigner button
  };
  const {loading, usersOn} = useGetUserOn(activeButton);
  const {taskGiver} = usegetTaskGiver();
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

const { isDeposited, PostDeposite } = useDeposite();

const handleDepositeSubmit = async (e) => {
    e.preventDefault();
    const { Phone_number, Amount} = inputValues2;
    console.log('inputs :', inputValues2);
    await PostDeposite(inputValues2);
};


const { isWithdrowal, PostWithdrowal} = useWithdrowal();

const handleWithdrowaleSubmit = async (e) => {
    e.preventDefault();
    const {Phone_number, Amount} = inputValues2
    console.log('inputs :', inputValues2)
    await PostWithdrowal(inputValues2)
}
const {task} = usegetTaskView();
//console.log('task :', task)
const {taskTaker} = usegetTaskTaker();
//console.log('taskToker :', taskTaker)

const getRowStyle = (item) => {
    if (item.Approval === 'Approved') {
      return { backgroundColor: '#2563eb', color: 'white' };
    }
    return {};
  };
  const {inviteTaskDash} = inviteData(activeButton)
  //console.log('invitee task :', inviteTaskDash)

  const [theme, setTheme] = useState(getCurrentTheme());

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(getCurrentTheme());
    };

    //Listen for changes in the data-theme attribute
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      observer.disconnect();
    };
  }, []);

  const bgColorClass = theme === 'light' ? 'bg-white' : 'bg-base-100';
  const menuItems = [
    { name: 'Your Business', leftIcon: <BusinessCenterIcon className="text-info" />, rightIcon: <DragHandleTwoToneIcon/>},
    { name: 'Add Task', leftIcon: <AddTaskIcon className="text-info" />, link: '/job'},
    { name: 'Add Product', leftIcon: <AddTaskIcon className="text-info" />, link: '/product'},
    { name: 'Fees Ref', leftIcon: <AddTaskIcon className="text-info" />},
  ];
  const [isMenu, setIsMenu] = useState(false)
  const handleMenu = (e) => {
    e.preventDefault()
    setIsMenu(!isMenu)
  }
  return (
    <div className="w-full flex flex-col overflow-auto">
        <div className=" w-full">
            <div className=" fixed flex flex-row justify-between px-2 align-middle" style={{width: 'calc(100% - 32px)', zIndex: '2'}}>
                <Link to='/'><div className='text-info'>{!isScrolled ? 'web Application' : ''}</div></Link>
                <div className='text-info' onClick={handleMenu}>menu</div>
            </div>
        </div>

        {isMenu && (
                    <div style={{zIndex: '10'}} className={`drp-ctnt1 flex flex-col justify-between h-screen ${bgColorClass}`}>
                        <div>
                            <div className='flex flex-row justify-between'>
                              <h1>Business Name</h1>
                              <div className="flex justify-end" onClick={handleMenu}>
                                  <ClearTwoToneIcon />
                              </div>
                            </div>
                            {menuItems.map(({ name, leftIcon, rightIcon, onClick, link }) => (
                              <Link to={link || '#'} key={name}> 
                                <div key={name} className="flex flex-row justify-between items-center mt-5" onClick={onClick}>
                                      <div className="flex flex-row items-center">
                                      <span className="mr-2">{leftIcon}</span> 
                                      {name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                                      </div>
                                      <span>{rightIcon}</span>
                                  </div>
                              </Link> 
                            ))} 

                        </div>
                    </div>
                )}
        {/* <div className="mt-8 py-2 gap-4 overflow-x-auto w-full flex flex-row hide-scrollbar">
            <div className={`${activeButton === 'Home' ? 'btn2' : 'btn1'}`} onClick={() => handleButtonClick('Home')}>All</div>
            <div className={`${activeButton === 'Report' ? 'btn2' : 'btn1'}`} onClick={() => handleButtonClick('Report')}>Report</div>
            <div className={`${activeButton === 'Tasks' ? 'btn2' : 'btn1'}`} onClick={() => handleButtonClick('Tasks')}>Tasks</div>
            <div className={`${activeButton === 'History' ? 'btn2' : 'btn1'}`} onClick={() => handleButtonClick('History')}>History</div>
        </div> */}
        {/* <div className='w-full mt-3'>
            <h1></h1>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="name" stroke="#8884d8" />
                    <YAxis orientation="right"/>
                    <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                    <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Bar dataKey="uv" fill="#8884d8" barSize={30} />
                </BarChart>
            </ResponsiveContainer>
        </div> */}
        <div className='w-full flex flex-col  justify-center mt-5'>
            {usersOn.map((user) => (
                <>
            <div className='w-full px-2 py-2'>
                <div className='w-full flex justify-center align-middle text-center mb-2'>Wallet</div>
                <div className='w-full justify-between gap-1  flex flex-row'>
                    <div className='flex w-2/6 flex-col bg-base-100 p-2 px-3' style={{borderRadius: '15px'}}>
                        <div className='flex justify-center text-small tracking-tight'>Bal</div>
                        <div className='flex justify-center'><span className='text-small tracking-tight text-default-400'>FRW </span> {user.Balance}</div>
                    </div>
                    <div className='flex w-2/6 flex-col bg-base-100 p-2 px-5' style={{borderRadius: '15px'}}>
                        <div className='flex justify-center text-small tracking-tight '>Deposite</div>
                        <div className='flex justify-center'><span className='text-small tracking-tight text-default-400'>FRW </span> {user.Deposite}</div>
                    </div>
                    <div className='flex w-2/6 flex-col bg-base-100 p-2 px-5' style={{borderRadius: '15px'}}>
                        <div className='flex justify-center text-small tracking-tight'>Withdrow</div>
                        <div className='flex justify-center'><span className='text-small tracking-tight text-default-400'>FRW </span> {user.WITHDROWAL}</div>
                    </div>
                </div>
            </div>

            <div className='w-full px-2 py-2'>
                <div className='w-full justify-center gap-1  flex flex-row'>
                    <div className='flex flex-col bg-base-100 p-2 px-5' style={{borderRadius: '15px'}}>
                        <div className='flex justify-center text-small tracking-tight '>Earned Amount</div>
                        <div className='flex justify-center'><span className='text-small tracking-tight text-default-400'>FRW </span> {user.Earnings}</div>
                    </div>
                </div>
            </div>

            <div className='w-full flex flex-row mt-4 justify-center gap-4 py-2'>
                <Button className='w-2/5 border-accent text-tiny text-accent outline-none bg-base-100' onClick={()=>document.getElementById('my_modal_3').showModal()}>Cash IN</Button>
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Cash IN! In FRW</h3>
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
                                            />  */}
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
                                        <p>Cash In {loading ? <span className='loading loading-ring '></span> : isDeposited ? <span className='text-fuchsia-500 '> Success</span> : <span className='text-info'> Start</span>}</p>
                                    </div>
                                </form>
                    </div>
                </dialog>
                <Button className='w-2/5 border-accent outline-none bg-base-100 text-tiny text-accent' onClick={()=>document.getElementById('my_modal_4').showModal()}>Cash Out</Button>
                <dialog id="my_modal_4" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Cash Out! In FRW</h3>
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
                                                type={field.includes('Phone_number' || 'Amount') ? 'number' : 'text'}
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
                                                    className='bg-base-100'
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
            </div>
            {/* <div className='w-full px-2 mt-4'>
                <div className='w-full justify-between flex flex-row'>
                    <div className='flex flex-row bg-indigo-700 p-2' style={{borderRadius: '15px'}}>
                        <div>Task earning : </div>
                        <div> $ 334.00</div>
                    </div>
                </div>
            </div> */}
            </>
            ))}
        </div>
        <div className='w-full mt-3'>
            <h1>Task I publish</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Task Name</th>
                            <th scope="col">Assigneer</th>
                            {/* <th scope="col">Assignee</th> */}
                            <th scope="col">onHold FRW</th>
                        </tr>
                    </thead>
                    {task.map((user) => (
                            <tbody key={user.taskId}>
                                <tr className={user.Approval === 'Approved' ? 'bg-indigo-500' : ''}>
                                    <th scope="row">{user.Agreement}</th>
                                    <td>{user.userName}</td>
                                    {/* <td>--</td> */}
                                    <td>{user.Amount}</td>
                                </tr>
                            </tbody>
                    ))}
                    
                </table>
        </div>
        <div className='w-full mt-3'>
            <h1>Task I doing</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Task Name</th>
                            <th scope="col">Assignee</th>
                            {/* <th scope="col">Assignee</th> */}
                            <th scope="col">Pending FRW</th>
                        </tr>
                    </thead>
                    {taskTaker.map((user) => (
                        <tbody key={user.taskId}>
                            <tr className={user.Approval === 'Approved' ? 'bg-info' : ''}>
                                <th scope="row">{user.Agreement}</th>
                                <td>{user.userName}</td>
                                {/* <td>--</td> */}
                                <td>{user.Amount}</td>
                            </tr>
                        </tbody>
                    ))}
                    {!loading && inviteTaskDash.length !== 0 ? (
                        inviteTaskDash.map((user) => (
                            <tbody key={user.inviteeId}>
                                <tr className={user.Approval === 'Approved' ? 'bg-info' : ''}>
                                    <th scope="row">{user.Agreement}</th>
                                    <td>{user.inviter}</td>
                                    {/* <td>--</td> */}
                                    <td>{user.Amount}</td>
                                </tr>
                            </tbody>
                        ))):(
                            ''
                        )}
                </table>
        </div>
    </div>
        
    );
}

export default dashboard