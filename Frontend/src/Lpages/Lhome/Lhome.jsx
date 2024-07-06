// src/pages/home/home.jsx
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import WalletIcon from '@mui/icons-material/Wallet';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import DragHandleTwoToneIcon from '@mui/icons-material/DragHandleTwoTone';

import '../../pages/home/home.css'
import ContrastIcon from '@mui/icons-material/Contrast';
import { toggleTheme, getCurrentTheme } from "../../utilities/themeToggle";
import useLogout from '../../hook/registration/logout';

import PersonIcon from '@mui/icons-material/Person';
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import useGetUserTask from '../../hook/getUsers/usegetusersTaskl';
import useTakeTask from '../../hook/getTask/useTakeTask';
import approveTask from '../../hook/approveTask/approveTask';
import postApproval from '../../hook/approveTask/postApproval';
import reportTask from '../../hook/reportHooks/reportTask';
import useTakeTaskView from '../../hook/getTask/useTakeTaskView';
import useGetUser from '../../hook/getUsers/useGetUser';
import usepostTask from '../../hook/postTaskReport/postTask';

const Lhome = () => {
    const {loading, logout} = useLogout()
    const [theme, setTheme] = useState(getCurrentTheme());

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(getCurrentTheme());
    };

    // Listen for changes in the data-theme attribute
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      observer.disconnect();
    };
    }, []);
    const [focusedInput, setFocusedInput] = useState(null);
    const [inputValues, setInputValues] = useState({});

    const handleFocus = (name) => {
        setFocusedInput(name);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const bgColorClass = theme === 'light' ? 'bg-white' : 'bg-dark';
    const menuItems = [
        { name: 'transaction', leftIcon: <LinearScaleIcon className="text-info" />, rightIcon: <DragHandleTwoToneIcon />, link: '/Ldashboard'},
        { name: 'wallet', leftIcon: <WalletIcon className="text-info" />, rightIcon: <DragHandleTwoToneIcon />, link: '/Ldashboard' },
        { name: 'task Dashboard', leftIcon: <AssessmentIcon className="text-info"/>, rightIcon: <DragHandleTwoToneIcon />, link: '/Ldashboard' },
        { name: 'Dashboard', leftIcon: <SummarizeIcon className="text-info" />, rightIcon: <DragHandleTwoToneIcon/>, link: '/Ldashboard' },
        { name: 'settings', leftIcon: <SettingsIcon className="text-info" />, rightIcon: <DragHandleTwoToneIcon /> },
        { name: 'Theme', leftIcon: <ContrastIcon className="text-info" />, onClick: toggleTheme },
        { name: 'logout', leftIcon: !loading ? <LogoutTwoToneIcon className="text-error"/> : <span className="loading loading-ring"></span>, rightIcon: '', onClick: logout },
        { name: 'delete_account', leftIcon: <DeleteForeverTwoToneIcon className="text-error" />, rightIcon: '' }
    ];
    const [isMenu, setIsMenu] = useState(false)
    const handleMenu = (e) => {
        e.preventDefault()
        setIsMenu(!isMenu)
    }
    const [isScrolled, setIsScrolled] = useState(false)
    const handleScrol = () => {
        if(window.scrollY > 0){
        setIsScrolled(true)
        }else{
        setIsScrolled(false)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScrol)
        return () => {
            window.removeEventListener('scroll', handleScrol)
        }
    },[])
    const [isHome, setIsHome] = useState(true)
    const [isTask, setIsTask] = useState(false);
    const [isReport, setIsReport] = useState(false)
    const [isRank, setIsRank] = useState(false);
    const [isAlert, setIsAlert] = useState(false)
    const [activeButton, setActiveButton] = useState('Home');

    const handleButtonClick = (e) => {

        setIsHome(false)
        setIsTask(false)
        setIsReport(false)
        setIsRank(false);
        setIsAlert(false)

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
        case 'Rank':
            setIsRank(true);
            break;
        case 'Alert':
            setIsAlert(true);
            break;
        }
    };
    const { users } = useGetUser()
    const {usersTask} = useGetUserTask();

    const {trackEvent, takeTask} = useTakeTask();
    const [TaskStatus, setTaskStatus] = useState({});
    
    const handleApply = async(task) => {
      const values = task.taskId;
      await takeTask(values)
      setTaskStatus((prevStatus) => ({
        ...prevStatus,
        [task.taskId]: !prevStatus[task.taskId], // Toggle report status for the clicked user
      }));
      
    }
    const {isData} = useTakeTaskView();
    const [reportStatus, setReportStatus] = useState({});
    const {trackReport, postReport} = reportTask()
    const handleReport = async(user) => {
    const {Agreement, taskId} = user
    const inputs = {Agreement, taskId}
    console.log('task to report :', inputs)
    await postReport(user)
    setReportStatus((prevStatus) => ({
        ...prevStatus,
        [user.taskId]: !prevStatus[user.taskId], // Toggle report status for the clicked user
    }));
    }
    const [isInvite, setIsInvite] = useState(false)
    const [isFormTo, setIsFormTo] = useState(true)
    const [isInviteDefaulted, setIsInviteDefaulted] = useState('isform')
    const handleIsDefault = (e) => {
    setIsInvite(false)
    setIsFormTo(false)
    setIsInviteDefaulted(e)
    switch (e) {
        case 'invite' :
        setIsInvite(true)
        break;
        case 'isform' :
        setIsFormTo(true)
        break;
    }
    }
    const {isTaskToApprove} = approveTask()
    const {trackApprove, makePostAppr} = postApproval()
    const [approveStatus, setApproveStatus] = useState({});
    const handleApprove = async (user) => {
        console.log('task am approving :', user)
        const {Status, taskId} = user
        const value = {Status, taskId}
        //await makePostAppr(value)
        setApproveStatus((prevStatus) => ({
          ...prevStatus,
          [user.taskId] : !prevStatus[user.taskId]
        }))
    }
    const {isTrue, tasked} = usepostTask()
    const handleTaskSubmit = async(e) => {
        e.preventDefault();
        const {Agreement, Amount, Currency, Start_date, End_date} = inputValues
        await tasked(inputValues)
      }
  return (
    <div className='w-full flex flex-row fixed'>
        <div className={`w-2/12 overflow-y-auto ${bgColorClass}`} style={{zIndex: '2'}}>
            <div className='w-full flex flex-row justify-between'>
                <h1>Web App</h1>
                <div onClick={handleMenu} className="text-info"><PersonIcon /></div>
            </div>
            <div className={`w-full flex flex-col ${bgColorClass}`}>
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
        <div className='flex flex-col h-screen overflow-y-auto' style={{width: '95%'}}>
            <div className='w-full relative' style={{zIndex: '2'}}>
                <div className={`fixed w-5/6 bg-base-300 top-0 flex flex-row justify-between px-2 align-middle`}>
                    {/* <div>{isScrolled ? '' : 'Web Apllication'}</div> */}
                    
                
                <div className="py-2 gap-4 overflow-x-auto w-full flex flex-row hide-scrollbar">
                    <div className={`${activeButton === 'Home' ? 'btn2 cursor-pointer' : 'btn1 cursor-pointer'}`} onClick={() => handleButtonClick('Home')}>Home</div>
                    <div className={`${activeButton === 'Rank' ? 'btn2 cursor-pointer' : 'btn1 cursor-pointer'}`} onClick={() => handleButtonClick('Rank')}>People</div>
                    <div className={`${activeButton === 'Tasks' ? 'btn2 cursor-pointer' : 'btn1 cursor-pointer'}`} onClick={() => handleButtonClick('Tasks')}>Tasks</div>
                    {/* <div className={`${activeButton === 'Report' ? 'btn2' : 'btn1'}`} onClick={() => handleButtonClick('Report')}>Report</div> */}
                    <div className={`${activeButton === 'Alert' ? 'btn2 cursor-pointer' : 'btn1 cursor-pointer'}`} onClick={() => handleButtonClick('Alert')}>Alert</div>
                </div>
                </div>
            </div>
            <div className='relative mt-14'>
                {isTask && (
                    <div className="" style={{width: '95%'}}>
                        <div className="w-full flex justify-end self-end text-info">
                            {/* {!isAddTask ? ( */}
                            <div className='cursor-pointer' onClick={()=>document.getElementById('my_modal_3').showModal()}>
                                <span>+ </span> <span>add New Task</span>
                            </div>
                            {/* ) : (
                                <div>
                                    <span> </span> <span>cancel</span>
                                </div>
                            )} */}
                        </div>
                    </div>
                )}
            <div className='grid grid-cols-3 gap-4 px-2 w-full'>
                {isHome && (
                    <>
                {usersTask.map((task) => (
                    <Card className="max-w-[340px]" style={{zIndex: '1'}}>
                        <CardHeader className="justify-between">
                            <div className="flex gap-5">
                            <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                            <div className="flex flex-col gap-1 items-start justify-center">
                                <h4 className="text-small font-semibold leading-none text-default-600">{task.FULL_NAME}</h4>
                                <h5 className="text-small tracking-tight text-default-400">@{task.userName}</h5>
                            </div>
                            </div>
                            <div className="flex w-2/6">
                                <p>Job: {task.Agreement}</p>
                            </div>
                        </CardHeader>
                        <CardBody className="px-3 py-0 text-small text-default-400">
                            <p>
                            Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
                            </p>
                            <span className="pt-2">
                            #FrontendWithZoey 
                            <span className="py-2" aria-label="computer" role="img">
                                💻
                            </span>
                            </span>
                        </CardBody>
                        <CardFooter className="gap-3 w-full">
                            <div className="flex gap-1 flex-col">
                                <p className="font-semibold text-default-400 text-small">Price</p>
                                <p className=" text-default-400 text-small">FRW {task.Amount}</p>
                            </div>
                            <div className="flex gap-1 flex-col">
                                <p className="font-semibold text-default-400 text-small">Duration</p>
                                <p className="text-default-400 text-small">{task.Duration}</p>
                            </div>
                            <div className="flex gap-1">
                                <button className="btn" onClick={() => handleApply(task)}>
                                    {loading ? <span className="loading loading-ring"></span> :  !loading && TaskStatus[task.taskId] ? 'Taken' : task.Task_status }
                                </button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
                </>
                )}
                {isRank && (
                    <>
                        {users.map((user) => (
                            <Card style={{zIndex: '1', gap: '4px'}} className="mb-1">
                                <CardHeader className="justify-between ">
                                    <div className="flex  gap-5">
                                    <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                                    <div className="flex flex-col gap-1 items-start justify-center w-3/4">
                                        <h4 className="text-small font-semibold leading-none text-default-600">{user.Last_name}</h4>
                                        <h5 className="text-small tracking-tight text-default-400">@{user.userName}</h5>
                                    </div>
                                    </div>
                                    <div className="flex w-2/6">
                                        <p>Title: Manager</p>
                                    </div>
                                </CardHeader>
                                <CardFooter className="gap-3">
                                    <div className="flex gap-1">
                                        <p className="font-semibold text-default-400 text-small">4</p>
                                        <p className=" text-default-400 text-small">Skills</p>
                                    </div>
                                    <div className="flex gap-1">
                                        <p className="font-semibold text-default-400 text-small">97.1K</p>
                                        <p className="text-default-400 text-small">Task Done</p>
                                    </div>
                                    <div className="flex gap-1">
                                        <button className="btn">Approach</button>
                                    </div>
                                </CardFooter>
                                </Card>
                        ))}
                    </>
                )}
                {isAlert && (
                    <>
                        {isTaskToApprove.map((user) => (
                            <Card key={user.taskId} className="w-full mb-1" style={{zIndex: '1'}}>
                                <CardHeader className="justify-between w-full">
                                    <div className="flex w-4/5  gap-5">
                                    {/* <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" /> */}
                                    <div className="flex flex-col gap-1 items-start justify-center w-3/4">
                                        <h4 className="text-small font-semibold leading-none text-default-600">{user.Agreement}</h4>
                                        <h5 className="text-small tracking-tight text-default-400">@{user.userName}</h5>
                                    </div>
                                    </div>
                                    <Button
                                    onClick={()=>document.getElementById(user.taskId).showModal()}
                                    className={!approveStatus[user.taskId] ? " bg-transparent text-foreground border-default-200" : "border-primary"}
                                    color="primary"
                                    radius="full"
                                    size="sm"
                                    // variant={isFollowed ? "bordered" : "solid"}
                                    // onPress={() => setIsFollowed(!isFollowed)}
                                    >
                                        {approveStatus[user.taskId] ? 'Approved' : user.Approval}
                                    </Button>
                                    <dialog id={user.taskId} className="modal">
                                        <div className="modal-box">
                                        <form method="dialog">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>
                                        <div className="w-full flex flex-col">
                                            <h3 className="font-bold text-lg">Approve Task</h3>
                                            <p className="py-4">Details</p>
                                        </div>
                                        <div className="w-full flex gap-5 flex-col">
                                            <div>task_giver: <span>{user.userName}</span></div>
                                            <div>task_taker: <span> {user.task_taker_name}</span></div>
                                            <div>Amount: <span>{user.Amount}</span></div>
                                        </div>
                                        <div className="mt-10">
                                            <Button
                                            onClick={() => handleApprove(user)}
                                            className={!approveStatus[user.taskId] ? " bg-transparent text-foreground border-default-200" : "border-primary"}
                                            color="primary"
                                            radius="full"
                                            size="sm"
                                            >
                                            {approveStatus[user.taskId] ? 'Approved' : user.Approval}
                                            </Button>
                                        </div>
                                        </div>
                                    </dialog>
                                </CardHeader>
                            </Card>
                        ))}
                    </>
                )}
                {isTask && (
                    <>
                        {isData.map((user) => (
                            <Card key={user.taskId} className="w-full mb-1" style={{zIndex: '1'}}>
                                <CardHeader className="justify-between w-full">
                                    <div className="flex w-4/5  gap-5">
                                    {/* <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" /> */}
                                    <div className="flex flex-col gap-1 items-start justify-center w-3/4">
                                        <h4 className="text-small font-semibold leading-none text-default-600">{user.Agreement}</h4>
                                        <h5 className="text-small tracking-tight text-default-400">@{user.userName}</h5>
                                    </div>
                                    </div>
                                    <Button
                                    onClick={() => handleReport(user)}
                                    className={!reportStatus[user.taskId] ? " bg-transparent text-foreground border-default-200" : "border-primary"}
                                    color="primary"
                                    radius="full"
                                    size="sm"
                                    >
                                    {reportStatus[user.taskId] ? 'Reported' : user.Status}
                                    {/* {reportStatus[user.taskId] ? <span>Reported</span> : <span>pending</span>} */}
                                    </Button>
                                </CardHeader>
                            </Card>
                        ))}
                        {/* ) : ( */}
                        <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <div className="w-full gap-4 flex flex-col">
                            <div className={`${isInviteDefaulted === 'isform' ? "  mt-5 flex  h1-color cursor-pointer" : "cursor-pointer"}`} onClick={() => handleIsDefault('isform')}>Form to publish task</div>
                            <div className={`${isInviteDefaulted === 'invite' ? "  mt-5  h1-color cursor-pointer" : "cursor-pointer"}`} onClick={() => handleIsDefault('invite')}>Invite user directly on task</div>
                        </div>
                        {isInvite && (
                            <div className="mt-10">
                            <form className="flex flex-col gap-10 w-full" onSubmit={handleTaskSubmit}>
                                <div className="flex flex-col w-full">
                                <label htmlFor="Agreement" onClick={() => handleFocus('Agreement')}
                                    className={`absolute ${inputValues['Agreement'] ? 'tran2' : (focusedInput === 'Agreement' ? 'tran' : '')}`}>
                                    invited userName
                                </label>
                                <input
                                    id="Agreement"
                                    name="Agreement"
                                    type="text"
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('Agreement')}
                                />
                                </div>
                                <div className="flex flex-col w-full">
                                <label htmlFor="Description" onClick={() => handleFocus('Description')}
                                    className={`absolute ${inputValues['Description'] ? 'tran2' : (focusedInput === 'Description' ? 'tran' : '')}`}>
                                    Agreement Description
                                </label>
                                <input
                                    id="Description"
                                    name="Description"
                                    type="text"
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('Description')}
                                />
                                </div>
                                <div className="flex gap-10 w-full flex-row">
                                <div className="flex flex-col w-2/5">
                                    <label  htmlFor="Amount" onClick={() => handleFocus('Amount')}
                                    className={`absolute ${inputValues['Amount'] ? 'tran2' : (focusedInput === 'Amount' ? 'tran' : '')}`}>
                                        Amount
                                    </label>
                                    <input
                                    id="Amount"
                                    name="Amount"
                                    type="number"
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('Amount')}
                                    />
                                </div>
                                <div className="flex flex-col w-2/5">
                                    <label htmlFor="Currency" onClick={() => handleFocus('Currency')}
                                    className={`absolute ${inputValues['Currency'] ? 'tran2' : (focusedInput === 'Currency' ? 'tran' : '')}`}>
                                        Currency
                                    </label>
                                    <input
                                    id="Currency"
                                    name="Currency"
                                    type="text"
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('Currency')}
                                    />
                                </div>
                                </div>
                                <div className="flex gap-10 w-full flex-row">
                                <div className="flex flex-col w-2/5">
                                    <label htmlFor="Start_date" onClick={() => handleFocus('Start_date')}
                                    className={`absolute tran ${inputValues['Start_date'] ? 'tran2' : (focusedInput === 'Start_date' ? 'tran' : '')}`}>
                                        Start Date
                                    </label>
                                    <input
                                    id="Start_date"
                                    name="Start_date"
                                    type="date"
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('Start_date')}
                                    />
                                </div>
                                <div className="flex flex-col w-2/5">
                                    <label htmlFor="End_date" onClick={() => handleFocus('End_date')}
                                    className={`absolute tran ${inputValues['End_date'] ? 'tran2' : (focusedInput === 'End_date' ? 'tran' : '')}`}>
                                        End Date
                                    </label>
                                    <input
                                    id="End_date"
                                    name="End_date"
                                    type="date"
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('End_date')}
                                    />
                                </div>
                                </div>
                                <div className='mt-10'>
                                <button className='btn btn-outline btn-accent' type='submit'>Invite</button>
                                {/* <button className="mt-1" type='type'>Submit 1</button> */}
                                </div>
                                <div className='relative mt-5'>
                                <p>Submitting {loading ? <span className='loading loading-ring '></span> : isTrue ? <span className='text-fuchsia-500 '> Success</span> : <span className='text-info'> Start</span>}</p>
                                </div>
                            </form>
                            </div>
                        )}
                        {isFormTo && (
                            <div className="mt-10">
                                <form className="flex flex-col gap-10 w-full" onSubmit={handleTaskSubmit}>
                                    <div className="flex flex-col w-full">
                                    <label htmlFor="Agreement" onClick={() => handleFocus('Agreement')}
                                        className={`absolute ${inputValues['Agreement'] ? 'tran2' : (focusedInput === 'Agreement' ? 'tran' : '')}`}>
                                        Agreement Title
                                    </label>
                                    <input
                                        id="Agreement"
                                        name="Agreement"
                                        type="text"
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('Agreement')}
                                    />
                                    </div>
                                    <div className="flex flex-col w-full">
                                    <label htmlFor="Description" onClick={() => handleFocus('Description')}
                                        className={`absolute ${inputValues['Description'] ? 'tran2' : (focusedInput === 'Description' ? 'tran' : '')}`}>
                                        Agreement Description
                                    </label>
                                    <input
                                        id="Description"
                                        name="Description"
                                        type="text"
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('Description')}
                                    />
                                    </div>
                                    <div className="flex gap-10 w-full flex-row">
                                    <div className="flex flex-col w-2/5">
                                        <label  htmlFor="Amount" onClick={() => handleFocus('Amount')}
                                        className={`absolute ${inputValues['Amount'] ? 'tran2' : (focusedInput === 'Amount' ? 'tran' : '')}`}>
                                            Amount
                                        </label>
                                        <input
                                        id="Amount"
                                        name="Amount"
                                        type="number"
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('Amount')}
                                        />
                                    </div>
                                    <div className="flex flex-col w-2/5">
                                        <label htmlFor="Currency" onClick={() => handleFocus('Currency')}
                                        className={`absolute ${inputValues['Currency'] ? 'tran2' : (focusedInput === 'Currency' ? 'tran' : '')}`}>
                                            Currency
                                        </label>
                                        <input
                                        id="Currency"
                                        name="Currency"
                                        type="text"
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('Currency')}
                                        />
                                    </div>
                                    </div>
                                    <div className="flex gap-10 w-full flex-row">
                                    <div className="flex flex-col w-2/5">
                                        <label htmlFor="Start_date" onClick={() => handleFocus('Start_date')}
                                        className={`absolute tran ${inputValues['Start_date'] ? 'tran2' : (focusedInput === 'Start_date' ? 'tran' : '')}`}>
                                            Start Date
                                        </label>
                                        <input
                                        id="Start_date"
                                        name="Start_date"
                                        type="date"
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('Start_date')}
                                        />
                                    </div>
                                    <div className="flex flex-col w-2/5">
                                        <label htmlFor="End_date" onClick={() => handleFocus('End_date')}
                                        className={`absolute tran ${inputValues['End_date'] ? 'tran2' : (focusedInput === 'End_date' ? 'tran' : '')}`}>
                                            End Date
                                        </label>
                                        <input
                                        id="End_date"
                                        name="End_date"
                                        type="date"
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('End_date')}
                                        />
                                    </div>
                                    </div>
                                    <div className='mt-10'>
                                    <button className='btn btn-outline btn-accent' type='submit'>Submit</button>
                                    {/* <button className="mt-1" type='type'>Submit 1</button> */}
                                    </div>
                                    <div className='relative mt-5'>
                                    <p>Submitting {loading ? <span className='loading loading-ring '></span> : isTrue ? <span className='text-fuchsia-500 '> Success</span> : <span className='text-info'> Start</span>}</p>
                                    </div>
                                </form>
                            </div>
                            )}
                        </div>
                    </dialog>
                    {/* )} */}
                    </>
                )}
                <div className='-mb-16'></div>
            </div>
            </div>
        </div>
    </div>
  );
};

export default Lhome;

