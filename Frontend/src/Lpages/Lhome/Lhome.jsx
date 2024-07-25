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
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button, input} from "@nextui-org/react";
import useGetUserTask from '../../hook/getUsers/usegetusersTaskl';
import useTakeTask from '../../hook/getTask/useTakeTask';
import approveTask from '../../hook/approveTask/approveTask';
import postApproval from '../../hook/approveTask/postApproval';
import reportTask from '../../hook/reportHooks/reportTask';
import useTakeTaskView from '../../hook/getTask/useTakeTaskView';
import useGetUser from '../../hook/getUsers/useGetUser';
import usepostTask from '../../hook/postTaskReport/postTask';

import useInvite from '../../hook/Invitation/useInvite';
import useGetInvite from '../../hook/Invitation/useGetInvite';

import {Snippet} from "@nextui-org/react";
import usegetApplyView from '../../hook/applying/applyView';
import invitationSent from '../../hook/applying/invitationSent';
import useConfirm from '../../hook/applying/comfirm';
import useAcceptInvitation from '../../hook/Invitation/useAcceptInvitation';
import useDecline from '../../hook/applying/DeclineRequest';
import useDeclineInvite from '../../hook/Invitation/useDeclineInvite';
import getLogUser from '../../hook/getUsers/getLogUser';


const truncateString = (str, maxLength) => {
    if(str.length <= maxLength ){
      return str;
    }else{
      const truncatedString = str.slice(0, maxLength);
      return truncatedString + (truncatedString.endsWith('') ? '.....' : '...');
    }
}

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
    // const menuItems = [
    //     { name: 'transaction', leftIcon: <LinearScaleIcon className="text-info" />, rightIcon: <DragHandleTwoToneIcon />, link: '/dashboard'},
    //     { name: 'wallet', leftIcon: <WalletIcon className="text-info" />, rightIcon: <DragHandleTwoToneIcon />, link: '/dashboard' },
    //     { name: 'task Dashboard', leftIcon: <AssessmentIcon className="text-info"/>, rightIcon: <DragHandleTwoToneIcon />, link: '/dashboard' },
    //     { name: 'Dashboard', leftIcon: <SummarizeIcon className="text-info" />, rightIcon: <DragHandleTwoToneIcon/>, link: '/dashboard' },
    //     { name: 'Account', leftIcon: <SettingsIcon className="text-info" />, rightIcon: <DragHandleTwoToneIcon />, onClick: () =>document.getElementById('my_modal_30').showModal() },
    //     { name: 'Theme', leftIcon: <ContrastIcon className="text-info" />, onClick: toggleTheme },
    //     { name: 'logout', leftIcon: !loading ? <LogoutTwoToneIcon className="text-error"/> : <span className="loading loading-ring"></span>, rightIcon: '', onClick: logout },
    //     { name: 'delete_account', leftIcon: <DeleteForeverTwoToneIcon className="text-error" />, rightIcon: '' }
    // ];
    const menuItems = [
        { name: 'Dashboard', leftIcon: <AssessmentIcon className="text-info" />, rightIcon: <DragHandleTwoToneIcon />, link: '/dashboard'},
        { name: 'Notifications', leftIcon: <AssessmentIcon className="text-info" />, rightIcon: <DragHandleTwoToneIcon />, onClick: () => handleButtonClick('Notification')},
        { name: 'Account', leftIcon: <SettingsIcon className="text-info" />, rightIcon: <DragHandleTwoToneIcon />, onClick: () =>document.getElementById('my_modal_30').showModal() },
        { name: 'Theme', leftIcon: <ContrastIcon className="text-info" />, onClick: toggleTheme },
        { name: 'Contact us', leftIcon: <LinearScaleIcon className="text-info"/>, rightIcon: <DragHandleTwoToneIcon />},
        { name: 'FAQs', leftIcon: <SummarizeIcon className="text-info" />, rightIcon: <DragHandleTwoToneIcon/>},
        { name: 'Terms', leftIcon: <SummarizeIcon className="text-info" />, rightIcon: <DragHandleTwoToneIcon/>},
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
    const [isNotification, setIsNotification] = useState(false)
    const [isRank, setIsRank] = useState(false);
    const [isAlert, setIsAlert] = useState(false)
    const [activeButton, setActiveButton] = useState('Home');

    const handleButtonClick = (e) => {

        setIsHome(false)
        setIsTask(false)
        setIsNotification(false)
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
        case 'Notification':
            setIsNotification(true);
            break;
        case 'Rank':
            setIsRank(true);
            break;
        case 'Alert':
            setIsAlert(true);
            break;
        }
    };
    const { users } = useGetUser(activeButton)
    const {usersTask} = useGetUserTask(activeButton);


    const {trackEvent, takeTask} = useTakeTask();
    const [TaskStatus, setTaskStatus] = useState({});
    
    const handleApply = async(task) => {
        console.log('task apply :', task)
      const values = task.taskId;
      await takeTask(values)
      setTaskStatus((prevStatus) => ({
        ...prevStatus,
        [task.taskId]: !prevStatus[task.taskId],
      }));
      
    }
    const {isData} = useTakeTaskView(activeButton);
    const {inviteTask} = useGetInvite(activeButton)
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
    const {isTaskToApprove} = approveTask(activeButton)
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
        const {Agreement, Description, Amount, Currency, Start_date, End_date} = inputValues
        await tasked(inputValues)
        console.log('description :', inputValues)
      }
      const [focusedInput22, setFocusedInput22] = useState('');
      const [inputValues2, setInputValues2] = useState({
        OldPassword: '',
        NewPassword: ''
    })
    const handleFocus22 = (label) => {
        setFocusedInput22(label);
    };
    const handleChange22 = (e) => {
        const { name, value } = e.target;
        setInputValues2({
            ...inputValues2,
            [name]: value
        });

    };
    const [ InviteValue, setInviteValue ] = useState({
        Task: '',
        Agreement: "",
        Amount: '',
        Start_date: '',
        End_date: ''
      })
      const handleChange00 = (e) => {
        const { name, value } = e.target;
        setInviteValue({
            ...InviteValue,
            [name]: value
        });
  
    };
    const { isInvited, postInvitation} = useInvite()
      const handleInvite = async (user) => {
        const  {"Task Title": Agreement, "Task Description": Description, "Amount in FRW": Amount, Start_date, End_date} = InviteValue
        const inviteData = {
          Agreement,
          Description,
          Amount,
          Start_date,
          End_date
        };
        const {userId, userName} = user
        const input = {userId, userName}
        const allData = {inviteData, input}
        console.log('all data :', allData)
        await postInvitation(allData)
    }
    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        e.preventDefault();
        if (!search) return;
    
        const result = users.find((any) => any.userName.toLowerCase().includes(search.toLowerCase()));
    
        if (result) {
          setUser(result);
          setSearch('');
        } else {
          console.log('no user found');
        }
    };
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const [isFollowed, setIsFollowed] = React.useState(false);

    const [isAll, setIsAll] = useState(true)
    const [isRequest, setIsRequest] = useState(false)
    const [isInvitation, setIsInvitation] = useState(false)

    const[ActiveType, setActiveType] = useState('ALL')

    const handleNotificationsType = (e) => {
        setIsAll(false)
        setIsRequest(false)
        setIsInvitation(false)
        setActiveType(e)
        switch (e) {
        case 'ALL' :
            setIsAll(true)
        break;
        case 'Request' :
            setIsRequest(true)
        break;
        case 'Invitation' :
            setIsInvitation(true)
        break
        }

    }
    const {applyView} = usegetApplyView(activeButton);
    //console.log('applyView :', applyView)

    const {inviteTaskPending} = invitationSent(activeButton)

    const {trackConfirm, confirmTask } = useConfirm()
    const [trackConfirmId, setTrackConfirmId] = useState({})

    const handleConfirmRequest = async(apply) => {
        
        const {taskId, APPLYING_USERNAME} = apply
        const input = {taskId, APPLYING_USERNAME}
        console.log('confrim id :', input)
        console.log('confrim id :', apply)
        await confirmTask (input)
        setTrackConfirmId((prevStatus) => ({
        ...prevStatus,
        [apply.taskId] : !prevStatus[apply.taskId]
        }))
    }
    const {trackDecline, declineTask } = useDecline()

    const handleDEclineRequest = async(apply) => {
        const {taskId, APPLYING_USERNAME} = apply
        const input = {taskId, APPLYING_USERNAME}
        console.log('decline id :', input)
        await declineTask(input)
    }
    const { tractAcceptInvite, postAccept} = useAcceptInvitation();
    const [tracktAccept, setTrackAccept] = useState({})
    const handleAcceptInvit = async(invite) => {
        const {inviteeId, TakerId, Approval} = invite
        const input = {inviteeId, TakerId, Approval}
        console.log('input :', input)
        await postAccept(input)
        setTrackAccept((prevStatus) => ({
            ...prevStatus,
            [invite.inviteeId] : !prevStatus[invite.inviteeId]
        }))
    }
    const {tractDeclineInvite, postDecline } = useDeclineInvite()
    const handleDeclineInvite = async (invite) => {
        const {inviteeId, TakerId, Approval} = invite
        const input = {inviteeId, TakerId, Approval}
        console.log('input :', input)
        await postDecline(input)
    }
    const {logUser} = getLogUser();
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
                        <div key={name} className={`flex flex-row justify-between items-center mt-5 ${activeButton === name ? 'text-info' : ''}`} onClick={onClick}>
                            <div className="flex flex-row items-center">
                                <span className="mr-2">{leftIcon}</span> 
                                {name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <span>{rightIcon}</span>
                        </div>
                    </Link> 
                ))}
            </div>
            <dialog id="my_modal_30" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Pearsonal Details</h3>
                    {logUser.map((user) => (
                    <div className='flex flex-col align-middle justify-center'>
                        <h2>Your detail info</h2>
                        <div className='flex flex-row gap-4'>
                            <div className='flex flex-col text-sm'>
                                <h2>First_Name</h2>
                                <div>{user.First_name}</div>
                            </div>
                            <div className='flex flex-col text-sm'>
                                <h2>Last_Name</h2>
                                <div>{user.Last_name}</div>
                            </div>
                            <div className='flex flex-col text-sm'>
                                <h2>User_Name</h2>
                                <div>@{user.userName}</div>
                            </div>
                        </div>
                        <div className='flex flex-col mt-4'>
                            <h2>Title</h2>
                            <div className='flex flex-row gap-4'>
                                <div>{user.Title} <span className='ml-2 text-info'> Edit</span></div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 mt-4'>
                            <h2>Change Password</h2>
                            <div className='flex flex-col mt-5'>
                                <div className='flex-col flex'>
                                    <form>
                                        <div className='flex'>
                                            <label htmlFor="old" className={` absolute ${inputValues2['OldPassword'] ? 'trans2' : (focusedInput22 === 'OldPassword' ? 'trans' : '')}`}>Old Password</label>
                                            <input type="password" 
                                            id='old'
                                            name='OldPassword'
                                            className="bg-transparent"
                                            onChange={handleChange22}
                                            onFocus={() => handleFocus22('OldPassword')}/>
                                        </div>
                                        <div className='flex mt-5 mb-5 '>
                                            <label htmlFor="new" className={` absolute ${inputValues2['NewPassword'] ? 'trans2' : (focusedInput22 === 'NewPassword' ? 'trans' : '')}`}>New Password</label>
                                            <input type="password"
                                            id='new'
                                            name='NewPassword'
                                            className="bg-transparent"
                                            onChange={handleChange22}
                                            onFocus={() => handleFocus22('NewPassword')} />
                                        </div>
                                        <div className=''>
                                            <button>save password</button>
                                        </div>
                                    </form>
                                    <div className='flex flex-col mt-2'>
                                        <h2>Address</h2>
                                        <div className='flex flex-col'>
                                            <div>Email</div>
                                            <div>{user.EMAIL} <span className='text-info'> Edit</span></div>
                                        </div>
                                        <div className='flex flex-col'>
                                            <div>Phone_number</div>
                                            <div>{user.Phone_number} <span className='text-info'> Edit</span></div>
                                        </div>
                                        <div className='mt-4'>
                                            <button>Save all</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
        </dialog>
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
                                <span>+ </span> <span>add Your New Task</span>
                            </div>
                            {/* ) : (
                                <div>
                                    <span> </span> <span>cancel</span>
                                </div>
                            )} */}
                        </div>
                        <div className='px-2 mb-1'>
                            <h1>This is task You Take</h1>
                        </div>
                    </div>
                )}
                {isAlert && (
                    <div className='px-2 mb-1'>
                        <h1>This is task You have to approve</h1>
                    </div>
                )}
                {isRank && (
                    <div className='w-full flex-row flex gap-2 py-1'>
                        <div className='w-full'>
                            <form onSubmit={handleSearch}>
                                <input 
                                type="search" 
                                placeholder='search...'
                                className='border-none w-full px-4'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)} />
                            </form>
                        </div>
                    </div>
                )}
                {isNotification && (
                    <div className=" w-11/12 px-2 flex flex-row justify-between align-middle">
                        <div className={`${ActiveType === 'ALL' ? 'text-info cursor-pointer' : 'cursor-pointer'}`} onClick={() => handleNotificationsType('ALL')}>All</div>
                        <div className={`${ActiveType === 'Request' ? 'text-info cursor-pointer' : 'cursor-pointer'}`} onClick={() => handleNotificationsType('Request')}>Request</div>
                        <div className={`${ActiveType === 'Invitation' ? 'text-info cursor-pointer' : 'cursor-pointer'}`} onClick={() => handleNotificationsType('Invitation')}>Invitations</div>
                    </div>
                )}
            <div className='grid grid-cols-3 gap-4 px-2 w-full'>
                {isHome && (
                    <>
                {usersTask.map((task) => {
                    return (
                    <Card  style={{zIndex: '1'}}>
                        <CardHeader className="justify-between">
                            <div className="flex gap-5">
                            {/* <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" /> */}
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
                                {truncateString(task.Description, 90)}
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
                                <button className="btn" onClick={()=>document.getElementById(task.taskId).showModal()}>
                                    {loading ? <span className="loading loading-ring"></span> :  !loading  && trackEvent ? 'Apply' : task.Task_Status }
                                    {/* {task.Task_Status} */}
                                </button>
                            </div>
                            <dialog id={task.taskId} className="modal">
                                <div className="modal-box">
                                    <form method="dialog">
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                    <div className='mb-4'>
                                        <Card>
                                            <CardHeader className="justify-between">
                                                <div className="flex gap-5">
                                                <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                                                <div className="flex flex-col gap-1 items-start justify-center">
                                                    <h4 className="text-small font-semibold leading-none text-default-600">{task.FULL_NAME}</h4>
                                                    <h5 className="text-small tracking-tight text-default-400">@{task.userName}</h5>
                                                </div>
                                                </div>
                                                {/* <div className="flex w-2/6">
                                                    <p>Job: {task.Agreement}</p>
                                                </div> */}
                                            </CardHeader>
                                        </Card>
                                        <div className='w-full px-2 flex flex-col'>
                                            <h1 className="text-default-500 tracking-tight">Job description</h1>
                                            <h2 className="text-small tracking-tight text-default-500">Job titile : {task.Agreement}</h2>
                                            <div className='w-full inline-block'>
                                                {task.Description}
                                            </div>
                                            <div className='w-full flex flex-col'>
                                                <div className='w-2/4 flex flex-col'>
                                                    <div>Amount</div>
                                                    <div>{task.Amount} FRW</div>
                                                </div>
                                                <div className='w-2/4 flex flex-col'>
                                                    <div>Duration</div>
                                                    <div>{task.Duration}</div>
                                                </div>
                                                <div className='w-full flex justify-between flex-row'>
                                                    <div className='w-2/5 flex flex-col'>
                                                        <div>Start date</div>
                                                        <div>{formatDate(task.Start_date)}</div>
                                                    </div>
                                                    <div className='w-2/5 flex flex-col'>
                                                        <div>End date</div>
                                                        <div>{formatDate(task.End_date)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col mt-4">
                                                <h1 className="text-info">Our Contact</h1>
                                                <div className="w-full flex flex-col">
                                                    <div>Contact info</div>
                                                    <div><Snippet>{task.Phone_number}</Snippet></div>
                                                    <div><Snippet>{task.EMAIL}</Snippet></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {task.Task_Status === 'Taken' ? (
                                        <Button className="btn">
                                            Task Taken
                                        </Button>
                                    ) : (
                                        <button className="btn" onClick={() => handleApply(task)}>
                                            Apply/contact
                                        </button>
                                    )}
                                </div>
                            </dialog>
                        </CardFooter>
                    </Card>
                    )
                })}
                </>
                )}
                {isRank && (
                    <>
                        {users
                        .filter((user) => user.userName.toLowerCase().includes(search.toLowerCase()))
                        .map((user) => (
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
                                        <button className="btn" onClick={()=>document.getElementById(user.userId).showModal()}>invite</button>
                                    </div>

                                    <dialog id={user.userId} className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                            <h3 className="font-bold text-lg">Invite {user.userName}</h3>

                                            {['Task Title', 'Task Description', 'Amount in FRW', 'Start_date', 'End_date'].map((field) => (
                                                <div key={field} className='flex w-full flex-col inputGroup'>
                                                    <label htmlFor={field} className={`absolute ${InviteValue[field] ? 'trans2' : (focusedInput === field ? 'trans' : '')} ${field.toLowerCase().includes('date') ? 'tran' : ''}`}>
                                                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                                                    </label>
                                                    <input
                                                    id={field}
                                                    name={field}
                                                    className="bg-transparent"
                                                    onChange={handleChange00}
                                                    type={field.includes('date') ? 'date' : field.toLowerCase() === 'amount' ? 'number' : 'text'}
                                                    onFocus={() => handleFocus(field)}
                                                    />
                                                </div>
                                            ))}
                                            <div className='mt-10'>
                                                <button type='button' onClick={() => handleInvite(user)}>{!isInvited ? 'Invite' : 'Well Done'}</button>
                                            </div>
                                        </div>
                                    </dialog>
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
                        {!loading && inviteTask.length !== 0 ? (
                            inviteTask.map((user) => (
                            <Card key={user.taskId} className="w-full mb-1" style={{zIndex: '1'}}>
                            <CardHeader className="justify-between w-full">
                                    <div className="flex w-4/5  gap-5">
                                    {/* <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" /> */}
                                    <div className="flex flex-col gap-1 items-start justify-center w-3/4">
                                        <h4 className="text-small font-semibold leading-none text-default-600">{user.Agreement}</h4>
                                        <h5 className="text-small tracking-tight text-default-400">@{user.inviter}</h5>
                                    </div>
                                    </div>
                                    <Button
                                    onClick={() => handleReport(user)}
                                    className={!reportStatus[user.inviteeId] ? " bg-transparent text-foreground border-default-200" : "border-primary"}
                                    color="primary"
                                    radius="full"
                                    size="sm"
                                    >
                                    {reportStatus[user.inviteeId] ? 'Reported' : user.Report}
                                    {/* {reportStatus[user.taskId] ? <span>Reported</span> : <span>pending</span>} */}
                                    </Button>
                                </CardHeader>
                            </Card>
                        ))) : ('')}
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
                                    className="bg-transparent"
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
                                    className="bg-transparent"
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
                                    className="bg-transparent"
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
                                    className="bg-transparent"
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
                                    className="bg-transparent"
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
                                    className="bg-transparent"
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
                                        className="bg-transparent"
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
                                        className="bg-transparent"
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
                                        className="bg-transparent"
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
                                        className="bg-transparent"
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
                                        className="bg-transparent"
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
                                        className="bg-transparent"
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
                {isNotification  && (
                    <>
                        {/* <div className="w-full gap-2"> */}
                        {isAll && (
                            <>
                                {!loading && applyView.length !== 0 ? (
                                    applyView.map((apply) => (
                                        <Card className="w-full mt-2" style={{zIndex: '1'}}>
                                            <CardHeader className="justify-between w-full">
                                                <div className="flex w-4/5  gap-5">
                                                    <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                                                    <div className="flex flex-col gap-1 items-start justify-center w-3/4">
                                                        <h4 className="text-small font-semibold leading-none text-default-600">{apply.Agreement}</h4>
                                                        <h5 className="text-small tracking-tight text-default-400">@{apply.APPLYING_USERNAME}</h5>
                                                    </div>
                                                </div>
                                                <div className="w-2/6">
                                                    <Button
                                                        className={isFollowed ? " bg-transparent text-foreground border-default-200" : "border-primary"}
                                                        color="primary"
                                                        radius="full"
                                                        size="sm"
                                                        onClick={() => document.getElementById(apply.taskId).showModal()}
                                                    >
                                                    Accept /Decline
                                                    </Button>
                                                    <dialog id={apply.taskId} className="modal">
                                                        <div className="modal-box">
                                                            <form method="dialog">
                                                                {/* if there is a button in form, it will close the modal */}
                                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                            </form>
                                                            <h3 className="font-bold text-lg">Job Request!</h3>
                                                            <div className='mb-4'>
                                                                <Card>
                                                                    <CardHeader className="justify-between">
                                                                        <div className="flex gap-5">
                                                                            <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                                                                            <div className="flex flex-col gap-1 items-start justify-center">
                                                                                <h4 className="text-small font-semibold leading-none text-default-600">{apply.Agreement}</h4>
                                                                                <h5 className="text-small tracking-tight text-default-400">@{apply.APPLYING_USERNAME}, {apply.taskId}</h5>
                                                                            </div>
                                                                        </div>
                                                                        {/* <div className="flex w-2/6">
                                                                        <p>Job: {task.Agreement}</p>
                                                                        </div> */}
                                                                    </CardHeader>
                                                                </Card> 
    
                                                                <div className='w-full px-2 flex flex-col'>
                                                                    <h1 className="text-default-500 tracking-tight">Job description</h1>
                                                                    <h2 className="text-small tracking-tight text-default-500">Job titile : {apply.Agreement}</h2>
                                                                    <div className='w-full inline-block mt-3'>
                                                                        {truncateString(apply.description, 90)}
                                                                    </div>
                                                                    {/* <div className='w-full inline-block mt-3'>
                                                                    this is specification
                                                                    </div> */}
                                                                    <div className='w-full flex flex-col'>
                                                                        <div className='w-2/4 flex flex-col mt-2'>
                                                                            <div>Amount</div>
                                                                            <div>{apply.Amount} FRW</div>
                                                                        </div>
                                                                        <div className='w-2/4 flex flex-col mt-2'>
                                                                            <div>Duration</div>
                                                                            <div>{apply.Duration}</div>
                                                                        </div>
                                                                        <div className='w-full flex justify-between gap-5 flex-row mt-2'>
                                                                            <div className='w-full flex flex-col'>
                                                                                <div>Start date</div>
                                                                                <div>{formatDate (apply.Start_date)}</div>
                                                                            </div>
                                                                            <div className='w-full flex flex-col'>
                                                                                <div>End date</div>
                                                                                <div>{formatDate (apply.End_date)}</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="w-full flex flex-col mt-4">
                                                                        <h1 className="text-info">Our Contact</h1>
                                                                        <div className="w-full flex flex-col">
                                                                            <div>Contact info</div>
                                                                            <div><Snippet>{apply.APPLYING_TEL}</Snippet></div>
                                                                            <div><Snippet>{apply.APPLYING_EMAIL}</Snippet></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="w-full flex flex-row justify-between gap-5 mt-10">
                                                                        <Button onClick={() => handleConfirmRequest(apply)}>{!loading && trackConfirm ? 'well done' : loading ? 'loading..' : 'Confirm offer'}</Button>
                                                                        <Button onClick={() => handleDEclineRequest(apply)}>{!loading && trackDecline ? 'oops You decline' : loading ? 'loading..' : 'Decline offer'}</Button>
                                                                    </div>
                                                                </div>
                                                                {/* </div> */}
    
                                                            </div>
                                                        </div>
                                                    </dialog>
                                                </div>
                                            </CardHeader>
                                            <CardBody className="px-3 py-0 text-small text-default-400">
                                                <span className="pt-2 text-default-700">
                                                    {apply.APPLYING_USERNAME} requesting  
                                                    <span className="py-2 ml-2" aria-label="computer" role="img">
                                                        Job: {apply.Agreement}, you published.
                                                    </span>
                                                </span>
                                                <div>
                                                    {apply.description}
                                                </div>
                                            </CardBody>
                                        </Card>
                                    ))
                                ) : (
                                    loading && applyView.length !== 0 ? 'lodding....' : ''
                                )}


                                {!loading && inviteTaskPending.length !== 0 ? (
                                    inviteTaskPending.map((invite) => (

                                    <Card className="w-full mt-2" style={{zIndex: '1'}}>
                                        <CardHeader className="justify-between w-full">
                                            <div className="flex w-4/5  gap-5">
                                                <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                                                <div className="flex flex-col gap-1 items-start justify-center w-3/4">
                                                    <h4 className="text-small font-semibold leading-none text-default-600">{invite.Agreement}</h4>
                                                    <h5 className="text-small tracking-tight text-default-400">@{invite.inviter}</h5>
                                                </div>
                                            </div>
                                            <div className="w-2/6">
                                                <Button
                                                    className={isFollowed ? " bg-transparent text-foreground border-default-200" : "border-primary"}
                                                    color="primary"
                                                    radius="full"
                                                    size="sm"
                                                    onClick={() => document.getElementById(invite.inviteeId).showModal()}
                                                >
                                                    Accept/Decline
                                                </Button>
                                                <dialog id={invite.inviteeId} className="modal">
                                                    <div className="modal-box">
                                                        <form method="dialog">
                                                        {/* if there is a button in form, it will close the modal */}
                                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                        </form>
                                                        <h3 className="font-bold text-lg">Invitation!</h3>
                                                        <div className='mb-4'>
                                                            <Card>
                                                                <CardHeader className="justify-between">
                                                                    <div className="flex gap-5">
                                                                        <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                                                                        <div className="flex flex-col gap-1 items-start justify-center">
                                                                            <h4 className="text-small font-semibold leading-none text-default-600">{invite.INVITER_FULL_NAME }</h4>
                                                                            <h5 className="text-small tracking-tight text-default-400">@{invite.inviter}</h5>
                                                                        </div>
                                                                    </div>
                                                                    {/* <div className="flex w-2/6">
                                                                    <p>Job: {task.Agreement}</p>
                                                                    </div> */}
                                                                </CardHeader>
                                                            </Card> 

                                                            <div className='w-full px-2 flex flex-col'>
                                                                <h1 className="text-default-500 tracking-tight">Job description</h1>
                                                                <h2 className="text-small tracking-tight text-default-500">Job titile : {invite.Agreement}</h2>
                                                                <div className='w-full inline-block mt-3'>
                                                                    {invite.Description}
                                                                </div>
                                                                {/* <div className='w-full inline-block mt-3'>
                                                                    this is specification
                                                                </div> */}
                                                                <div className='w-full flex flex-col'>
                                                                    <div className='w-2/4 flex flex-col mt-2'>
                                                                        <div>Amount</div>
                                                                        <div>{invite.Amount} FRW</div>
                                                                    </div>
                                                                    <div className='w-2/4 flex flex-col mt-2'>
                                                                        <div>Duration</div>
                                                                        <div>{invite.Duration}</div>
                                                                    </div>
                                                                    <div className='w-full flex justify-between gap-5 flex-row mt-2'>
                                                                        <div className='w-full flex flex-col'>
                                                                            <div>Start date</div>
                                                                            <div>{formatDate (invite.Start_date)}</div>
                                                                        </div>
                                                                        <div className='w-full flex flex-col'>
                                                                            <div>End date</div>
                                                                            <div>{formatDate (invite.End_date)}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="w-full flex flex-col mt-4">
                                                                    <h1 className="text-info">Our Contact</h1>
                                                                    <div className="w-full flex flex-col">
                                                                        <div>Contact info</div>
                                                                        <div><Snippet>{invite.INVITER_TEL }</Snippet></div>
                                                                        <div><Snippet>{invite.INVITER_EMAIL}</Snippet></div>
                                                                    </div>
                                                                </div>
                                                                <div className="w-full flex flex-row justify-between gap-5 mt-10">
                                                                    <Button onClick={() => handleAcceptInvit(invite)}>{tractAcceptInvite ? 'Well done ' : 'Accept offer'}</Button>
                                                                    <Button onClick={() => handleDeclineInvite(invite)}>{tractDeclineInvite ? 'oops you decline' : 'Decline offer'}</Button>
                                                                </div>
                                                            </div>
                                                            {/* </div> */}

                                                        </div>
                                                    </div>
                                                </dialog>
                                            </div>
                                        </CardHeader>
                                        <CardBody className="px-3 py-0 text-small text-default-400">
                                            <div>
                                                {invite.Description}
                                            </div>
                                            <span className="pt-2 text-default-700">
                                                Amount: 
                                                <span className="py-2 ml-2" aria-label="computer" role="img">
                                                    {invite.Amount} FRW
                                                </span>
                                            </span>
                                        </CardBody>
                                    </Card>
                                ))
                                    ) : (
                                        loading && inviteTaskPending.length !== 0 ? 'loading..' : ''
                                )}
                            </>
                        )}
                        {isRequest && (
                            <>
                            {!loading && applyView.length !== 0 ? (
                                applyView.map((apply) => (
                                    <Card className="w-full mt-2" style={{zIndex: '1'}}>
                                        <CardHeader className="justify-between w-full">
                                            <div className="flex w-4/5  gap-5">
                                                <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                                                <div className="flex flex-col gap-1 items-start justify-center w-3/4">
                                                    <h4 className="text-small font-semibold leading-none text-default-600">{apply.Agreement}</h4>
                                                    <h5 className="text-small tracking-tight text-default-400">@{apply.APPLYING_USERNAME}</h5>
                                                </div>
                                            </div>
                                            <div className="w-2/6">
                                                <Button
                                                    className={isFollowed ? " bg-transparent text-foreground border-default-200" : "border-primary"}
                                                    color="primary"
                                                    radius="full"
                                                    size="sm"
                                                    onClick={() => document.getElementById(apply.taskId).showModal()}
                                                >
                                                Accept /Decline
                                                </Button>
                                                <dialog id={apply.taskId} className="modal">
                                                    <div className="modal-box">
                                                        <form method="dialog">
                                                            {/* if there is a button in form, it will close the modal */}
                                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                        </form>
                                                        <h3 className="font-bold text-lg">Job Request!</h3>
                                                        <div className='mb-4'>
                                                            <Card>
                                                                <CardHeader className="justify-between">
                                                                    <div className="flex gap-5">
                                                                        <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                                                                        <div className="flex flex-col gap-1 items-start justify-center">
                                                                            <h4 className="text-small font-semibold leading-none text-default-600">{apply.Agreement}</h4>
                                                                            <h5 className="text-small tracking-tight text-default-400">@{apply.APPLYING_USERNAME}, {apply.taskId}</h5>
                                                                        </div>
                                                                    </div>
                                                                    {/* <div className="flex w-2/6">
                                                                    <p>Job: {task.Agreement}</p>
                                                                    </div> */}
                                                                </CardHeader>
                                                            </Card> 
    
                                                            <div className='w-full px-2 flex flex-col'>
                                                                <h1 className="text-default-500 tracking-tight">Job description</h1>
                                                                <h2 className="text-small tracking-tight text-default-500">Job titile : {apply.Agreement}</h2>
                                                                <div className='w-full inline-block mt-3'>
                                                                    {truncateString(apply.description, 90)}
                                                                </div>
                                                                {/* <div className='w-full inline-block mt-3'>
                                                                this is specification
                                                                </div> */}
                                                                <div className='w-full flex flex-col'>
                                                                    <div className='w-2/4 flex flex-col mt-2'>
                                                                        <div>Amount</div>
                                                                        <div>{apply.Amount} FRW</div>
                                                                    </div>
                                                                    <div className='w-2/4 flex flex-col mt-2'>
                                                                        <div>Duration</div>
                                                                        <div>{apply.Duration}</div>
                                                                    </div>
                                                                    <div className='w-full flex justify-between gap-5 flex-row mt-2'>
                                                                        <div className='w-full flex flex-col'>
                                                                            <div>Start date</div>
                                                                            <div>{formatDate (apply.Start_date)}</div>
                                                                        </div>
                                                                        <div className='w-full flex flex-col'>
                                                                            <div>End date</div>
                                                                            <div>{formatDate (apply.End_date)}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="w-full flex flex-col mt-4">
                                                                    <h1 className="text-info">Our Contact</h1>
                                                                    <div className="w-full flex flex-col">
                                                                        <div>Contact info</div>
                                                                        <div><Snippet>{apply.APPLYING_TEL}</Snippet></div>
                                                                        <div><Snippet>{apply.APPLYING_EMAIL}</Snippet></div>
                                                                    </div>
                                                                </div>
                                                                <div className="w-full flex flex-row justify-between gap-5 mt-10">
                                                                        <Button onClick={() => handleConfirmRequest(apply)}>{!loading && trackConfirm ? 'well done' : loading ? 'loading..' : 'Confirm offer'}</Button>
                                                                        <Button onClick={() => handleDEclineRequest(apply)}>{!loading && trackDecline ? 'oops You decline' : loading ? 'loading..' : 'Decline offer'}</Button>
                                                                </div>
                                                            </div>
                                                            {/* </div> */}
    
                                                        </div>
                                                    </div>
                                                </dialog>
                                            </div>
                                        </CardHeader>
                                        <CardBody className="px-3 py-0 text-small text-default-400">
                                            <span className="pt-2 text-default-700">
                                                {apply.APPLYING_USERNAME} requesting  
                                                <span className="py-2 ml-2" aria-label="computer" role="img">
                                                    Job: {apply.Agreement}, you published.
                                                </span>
                                            </span>
                                            <div>
                                                {apply.description}
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))
                            ) : (
                                loading && applyView.length !== 0 ? 'lodding....' : ''
                            )}
                            </>
                        )}
                        
                        {isInvitation && (
                            <>
                                {!loading && inviteTaskPending.length !== 0 ? (
                            inviteTaskPending.map((invite) => (

                        <Card className="w-full mt-2" style={{zIndex: '1'}}>
                            <CardHeader className="justify-between w-full">
                                <div className="flex w-4/5  gap-5">
                                <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                                <div className="flex flex-col gap-1 items-start justify-center w-3/4">
                                    <h4 className="text-small font-semibold leading-none text-default-600">{invite.Agreement}</h4>
                                    <h5 className="text-small tracking-tight text-default-400">@{invite.inviter}</h5>
                                </div>
                                </div>
                                <div className="w-2/6">
                                    <Button
                                    className={isFollowed ? " bg-transparent text-foreground border-default-200" : "border-primary"}
                                    color="primary"
                                    radius="full"
                                    size="sm"
                                    onClick={() => document.getElementById(invite.inviteeId).showModal()}
                                    >
                                        Accept/Decline
                                    </Button>
                                    <dialog id={invite.inviteeId} className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                            <h3 className="font-bold text-lg">Invitation!</h3>
                                            <div className='mb-4'>
                                                <Card>
                                                    <CardHeader className="justify-between">
                                                        <div className="flex gap-5">
                                                            <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                                                            <div className="flex flex-col gap-1 items-start justify-center">
                                                                <h4 className="text-small font-semibold leading-none text-default-600">{invite.INVITER_FULL_NAME }</h4>
                                                                <h5 className="text-small tracking-tight text-default-400">@{invite.inviter}</h5>
                                                            </div>
                                                        </div>
                                                        {/* <div className="flex w-2/6">
                                                        <p>Job: {task.Agreement}</p>
                                                        </div> */}
                                                    </CardHeader>
                                                </Card> 

                                                <div className='w-full px-2 flex flex-col'>
                                                    <h1 className="text-default-500 tracking-tight">Job description</h1>
                                                    <h2 className="text-small tracking-tight text-default-500">Job titile : {invite.Agreement}</h2>
                                                    <div className='w-full inline-block mt-3'>
                                                        {invite.Description}
                                                    </div>
                                                    {/* <div className='w-full inline-block mt-3'>
                                                    this is specification
                                                    </div> */}
                                                    <div className='w-full flex flex-col'>
                                                        <div className='w-2/4 flex flex-col mt-2'>
                                                            <div>Amount</div>
                                                            <div>{invite.Amount} FRW</div>
                                                        </div>
                                                        <div className='w-2/4 flex flex-col mt-2'>
                                                            <div>Duration</div>
                                                            <div>{invite.Duration}</div>
                                                        </div>
                                                        <div className='w-full flex justify-between gap-5 flex-row mt-2'>
                                                            <div className='w-full flex flex-col'>
                                                                <div>Start date</div>
                                                                <div>{formatDate (invite.Start_date)}</div>
                                                            </div>
                                                            <div className='w-full flex flex-col'>
                                                                <div>End date</div>
                                                                <div>{formatDate (invite.End_date)}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-full flex flex-col mt-4">
                                                        <h1 className="text-info">Our Contact</h1>
                                                        <div className="w-full flex flex-col">
                                                            <div>Contact info</div>
                                                            <div><Snippet>{invite.INVITER_TEL }</Snippet></div>
                                                            <div><Snippet>{invite.INVITER_EMAIL}</Snippet></div>
                                                        </div>
                                                    </div>
                                                    <div className="w-full flex flex-row justify-between gap-5 mt-10">
                                                        <Button onClick={() => handleAcceptInvit(invite)}>{tractAcceptInvite ? 'Well done ' : 'Accept offer'}</Button>
                                                        <Button onClick={() => handleDeclineInvite(invite)}>{tractDeclineInvite ? 'oops you decline' : 'Decline offer'}</Button>
                                                    </div>
                                                </div>
                                                {/* </div> */}

                                            </div>
                                        </div>
                                    </dialog>
                                </div>
                            </CardHeader>
                            <CardBody className="px-3 py-0 text-small text-default-400">
                                <div>
                                    {invite.Description}
                                </div>
                                <span className="pt-2 text-default-700">
                                    Amount: 
                                    <span className="py-2 ml-2" aria-label="computer" role="img">
                                        {invite.Amount} FRW
                                    </span>
                                </span>
                            </CardBody>
                        </Card>
                        ))
                                ) : (
                                    loading && inviteTaskPending.length !== 0 ? 'loading..' : ''
                                )}
                            </>
                        )}
                        {/* </div> */}
                        <dialog id="my_modal_4" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <h1 className="w-full text-center mt-5">Form to make Report</h1>
                
                            </div>
                        </dialog>
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

