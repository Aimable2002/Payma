// src/pages/home/home.jsx
import React, {useState, useEffect, useMemo} from 'react';
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



import {Progress} from "@nextui-org/react";
import usegetTaskView from '../../hook/getTask/useTaskView';
import LTables from './Ltables';
import LGraph from './LGraph';
import Lhistory from './Lhistory'
import LBtn from './Lbtn';
import usegetTaskTaker from '../../hook/getTask/getTaskTaker';
import useGetUserOn from '../../hook/getUsers/getOnUser';

import LAccount from './LAccount';

const Ldashboard = () => {



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
        { name: 'wallet', leftIcon: <WalletIcon className="text-info" />, rightIcon: <DragHandleTwoToneIcon />, onClick: () => handleButtonClick('Home') },
        { name: 'task Dashboard', leftIcon: <AssessmentIcon className="text-info"/>, rightIcon: <DragHandleTwoToneIcon />, onClick: () => handleButtonClick('Rank')},
        { name: 'History', leftIcon: <LinearScaleIcon className="text-info"/>, rightIcon: <DragHandleTwoToneIcon />, onClick: () => handleButtonClick('Tasks')},
        { name: 'Dashboard', leftIcon: <SummarizeIcon className="text-info" />, rightIcon: <DragHandleTwoToneIcon/>, onClick: () => handleButtonClick('Alert') },
        { name: 'Account', leftIcon: <SettingsIcon className="text-info" />, rightIcon: <DragHandleTwoToneIcon />, onClick: () => handleButtonClick('Account')},
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
    const [isAccount, setIsAccount] = useState(false)
    const [isRank, setIsRank] = useState(false);
    const [isAlert, setIsAlert] = useState(false)
    const [activeButton, setActiveButton] = useState('Home');

    const handleButtonClick = (e) => {

        setIsHome(false)
        setIsTask(false)
        setIsAccount(false)
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
        case 'Account':
            setIsAccount(true);
            break;
        }
    };
    const { users } = useGetUser(activeButton)
    const {usersTask} = useGetUserTask(activeButton);

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
    const {isData} = useTakeTaskView(activeButton);
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
        const {Agreement, Amount, Currency, Start_date, End_date} = inputValues
        await tasked(inputValues)
      }
      const {task} = usegetTaskView()
      const {taskTaker} = usegetTaskTaker();
      const {usersOn} = useGetUserOn()

      const totalEarnPending = useMemo(() => {
        return taskTaker
        .filter(item => item.Approval !== 'Approved')
        .reduce((sum, item) => sum + (item.Amount || 0), 0);
      }, [taskTaker]);

      const totalEarn = useMemo(() => {
        return taskTaker
        .filter(item => item.Approval === 'Approved')
        .reduce((sum, item) => sum + (item.Amount || 0), 0);
      }, [taskTaker]);

      const totalAmount = useMemo(() => {
        return task
          .filter(item => item.Approval !== 'Approved')
          .reduce((sum, item) => sum + (item.Amount || 0), 0);
      }, [task]);
      const TotalPend = totalAmount + totalEarnPending

      const TotalTaskPaid = useMemo(() => {
        return task
        .filter(item => item.Approval === 'Approved')
        .reduce((sum, item) => sum + (item.Amount || 0), 0);
      }, [task])
      const countTaskPublished = useMemo(() => {
        return task.length
      }, [task])

      const countTaskITook = useMemo(() => {
        return taskTaker.reduce((count, item) => {
          if (item.Approval !== 'Approved') {
            return count + 1;
          }
          return count;
        }, 0);
      }, [taskTaker]);

      const countTaskPublished2 = useMemo(() => {
        return task.reduce((count, item) => {
          if (item.Approval !== 'Approved') {
            return count + 1;
          }
          return count;
        }, 0);
      }, [task]);
      const countTaskPublished3 = useMemo(() => {
        return task.reduce((count, item) => {
          if (item.Approval === 'Approved') {
            return count + 1;
          }
          return count;
        }, 0);
      }, [task]);
      const countTaskTook3 = useMemo(() => {
        return taskTaker.reduce((count, item) => {
          if (item.Approval === 'Approved') {
            return count + 1;
          }
          return count;
        }, 0);
      }, [taskTaker]);
  return (
    <div className='w-full flex flex-row fixed'>
        <div className={`w-2/12 overflow-y-auto ${bgColorClass}`} style={{zIndex: '2'}}>
            <div className='w-full flex flex-row justify-between'>
                <Link to='/'><h1 className='cursor-pointer'>Web App</h1></Link>
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
        {/* {!isAccount ? ( */}
          <div className='flex flex-col h-screen overflow-y-auto' style={{width: '95%'}}>
          <div className='w-full relative' style={{zIndex: '2'}}>
              <div className={`fixed w-5/6 bg-base-300 top-0 flex flex-row justify-between px-2 align-middle`}>
                  {/* <div>{isScrolled ? '' : 'Web Apllication'}</div> */}
                  
              
              <div className="py-2 gap-4 overflow-x-auto w-full flex flex-row hide-scrollbar">
                  <div className={`${activeButton === 'Home' ? 'btn2 cursor-pointer' : 'btn1 cursor-pointer'}`} >Wallet</div>
                  <div className={`${activeButton === 'Rank' ? 'btn2 cursor-pointer' : 'btn1 cursor-pointer'}`} >Task Dashboard</div>
                  <div className={`${activeButton === 'Tasks' ? 'btn2 cursor-pointer' : 'btn1 cursor-pointer'}`} >History</div>
                  {/* <div className={`${activeButton === 'Report' ? 'btn2' : 'btn1'}`} onClick={() => handleButtonClick('Report')}>Report</div> */}
                  <div className={`${activeButton === 'Alert' ? 'btn2 cursor-pointer' : 'btn1 cursor-pointer'}`} >Dashboard</div>
              </div>
              </div>
          </div>
          <div className='relative mt-14'>
              {isTask && (
                <Lhistory />
              )}
          <div className='grid grid-cols-3 gap-4 px-2 '>
              {isHome && (
                  <>
                    {usersOn.map((user) => (
                      <>
                     <Card style={{zIndex: '1', gap: '4px'}} className="mb-1">
                          <CardHeader className="justify-between ">
                            <div className="flex w-full  gap-5">
                              <div className="flex flex-col gap-1 items-start justify-center w-3/4">
                                <h5 className="text-small tracking-tight text-default-400">Balance</h5>
                                <h4 className=" w-3/4 text-small font-semibold leading-none text-default-600">{user.Balance} FRW</h4>
                              </div>
                            </div>
                            <div className="flex w-2/6">
                              <p>Manager</p>
                            </div>
                          </CardHeader>
                          <CardFooter className="gap-3">
                            <Progress aria-label="Loading..." value={60} className="max-w-md"/>
                        </CardFooter>
                      </Card> 
                      <Card style={{zIndex: '1', gap: '4px'}} className="mb-1">
                          <CardHeader className="justify-between ">
                            <div className="flex w-full  gap-5">
                              <div className="flex flex-col gap-1 items-start justify-center w-3/4">
                                <h5 className="text-small tracking-tight text-default-400">Deposite</h5>
                                <h4 className=" w-3/4 text-small font-semibold leading-none text-default-600">{user.Deposite} FRW</h4>
                              </div>
                            </div>
                            <div className="flex w-2/6">
                              <p>Manager</p>
                            </div>
                          </CardHeader>
                          <CardFooter className="gap-3">
                            <Progress aria-label="Loading..." value={60} className="max-w-md"/>
                        </CardFooter>
                      </Card>
                      <Card style={{zIndex: '1', gap: '4px'}} className="mb-1">
                          <CardHeader className="justify-between ">
                            <div className="flex w-full  gap-5">
                              <div className="flex flex-col gap-1 items-start justify-center w-3/4">
                                <h5 className="text-small tracking-tight text-default-400">Withdrow</h5>
                                <h4 className=" w-3/4 text-small font-semibold leading-none text-default-600">{user.WITHDROWAL} FRW</h4>
                              </div>
                            </div>
                            <div className="flex w-2/6">
                              <p>Manager</p>
                            </div>
                          </CardHeader>
                          <CardFooter className="gap-3">
                            <Progress aria-label="Loading..." value={60} className="max-w-md"/>
                        </CardFooter>
                      </Card>
                    </>
                    ))}  
                  </>
              )}

              {isAccount && (
                <LAccount />
              )}
              
              {isAlert && (
                  <>
                  {usersOn.map((user) => (
                    <>
                      <Card style={{zIndex: '1', gap: '4px'}} className="mb-1">
                          <CardHeader className="justify-between ">
                            <div className="flex w-full  gap-5">
                              <div className="flex flex-col gap-1 items-start justify-center w-3/4">
                                <h5 className="text-small tracking-tight text-default-400">Balance</h5>
                                <h4 className=" w-3/4 text-small font-semibold leading-none text-default-600">{user.Balance} FRW</h4>
                              </div>
                            </div>
                            <div className="flex w-2/6">
                              <p>Manager</p>
                            </div>
                          </CardHeader>
                          <CardFooter className="gap-3">
                            <Progress aria-label="Loading..." value={60} className="max-w-md"/>
                        </CardFooter>
                      </Card> 
                      <Card style={{zIndex: '1', gap: '4px'}} className="mb-1">
                          <CardHeader className="justify-between ">
                            <div className="flex w-full  gap-5">
                              <div className="flex flex-col gap-1 items-start justify-center w-3/4">
                                <h5 className="text-small tracking-tight text-default-400">Deposite</h5>
                                <h4 className=" w-3/4 text-small font-semibold leading-none text-default-600">{user.Deposite} FRW</h4>
                              </div>
                            </div>
                            <div className="flex w-2/6">
                              <p>Manager</p>
                            </div>
                          </CardHeader>
                          <CardFooter className="gap-3">
                            <Progress aria-label="Loading..." value={60} className="max-w-md"/>
                        </CardFooter>
                      </Card>
                      <Card style={{zIndex: '1', gap: '4px'}} className="mb-1">
                          <CardHeader className="justify-between ">
                            <div className="flex w-full  gap-5">
                              <div className="flex flex-col gap-1 items-start justify-center w-3/4">
                                <h5 className="text-small tracking-tight text-default-400">Withdrow</h5>
                                <h4 className=" w-3/4 text-small font-semibold leading-none text-default-600">{user.WITHDROWAL} FRW</h4>
                              </div>
                            </div>
                            <div className="flex w-2/6">
                              <p>Manager</p>
                            </div>
                          </CardHeader>
                          <CardFooter className="gap-3">
                            <Progress aria-label="Loading..." value={60} className="max-w-md"/>
                        </CardFooter>
                      </Card>
                      </>
                      ))}
                      <Card style={{zIndex: '1', gap: '4px'}} className="mb-1">
                          <CardHeader className="justify-between ">
                            <div className="flex w-full  gap-5">
                              <div className="flex flex-col gap-1 items-start justify-center w-3/4">
                                <h5 className="text-small tracking-tight text-default-400">Total Pending Earnings</h5>
                                <h4 className=" w-3/4 text-small font-semibold leading-none text-default-600">{totalEarnPending} FRW</h4>
                              </div>
                            </div>
                            <div className="flex w-2/6">
                              <p>{countTaskITook} Tasks</p>
                            </div>
                          </CardHeader>
                          <CardFooter className="gap-3">
                            <Progress aria-label="Loading..." value={60} className="max-w-md"/>
                        </CardFooter>
                      </Card> 

                      <Card style={{zIndex: '1', gap: '4px'}} className="mb-1">
                          <CardHeader className="justify-between ">
                            <div className="flex w-full  gap-5">
                              <div className="flex flex-col gap-1 items-start justify-center w-3/4">
                                <h5 className="text-small tracking-tight text-default-400">Task Earning Amount</h5>
                                <h4 className=" w-3/4 text-small font-semibold leading-none text-default-600">{totalEarn} FRW</h4>
                              </div>
                            </div>
                            <div className="flex w-2/6">
                              <p>{countTaskTook3} Tasks</p>
                            </div>
                          </CardHeader>
                          <CardFooter className="gap-3">
                            <Progress aria-label="Loading..." value={60} className="max-w-md"/>
                        </CardFooter>
                      </Card>

                       

                      <Card style={{zIndex: '1', gap: '4px'}} className="mb-1">
                          <CardHeader className="justify-between ">
                            <div className="flex w-full  gap-5">
                              <div className="flex flex-col gap-1 items-start justify-center w-3/4">
                                <h5 className="text-small tracking-tight text-default-400">Balance I assigned on Task</h5>
                                <h4 className=" w-3/4 text-small font-semibold leading-none text-default-600">{totalAmount} FRW</h4>
                              </div>
                            </div>
                            <div className="flex w-2/6">
                              <p>{countTaskPublished2} Tasks</p>
                            </div>
                          </CardHeader>
                          <CardFooter className="gap-3">
                            <Progress aria-label="Loading..." value={60} className="max-w-md"/>
                        </CardFooter>
                      </Card>
                      
                      <Card style={{zIndex: '1', gap: '4px'}} className="mb-1">
                          <CardHeader className="justify-between ">
                            <div className="flex w-full  gap-5">
                              <div className="flex flex-col gap-1 items-start justify-center w-3/4">
                                <h5 className="text-small tracking-tight text-default-400">Money I paid Task</h5>
                                <h4 className=" w-3/4 text-small font-semibold leading-none text-default-600">{TotalTaskPaid} FRW</h4>
                              </div>
                            </div>
                            <div className="flex w-2/6">
                              <p>{countTaskPublished3} Tasks</p>
                            </div>
                          </CardHeader>
                          <CardFooter className="gap-3">
                            <Progress aria-label="Loading..." value={60} className="max-w-md"/>
                        </CardFooter>
                      </Card>
                  </>
              )}
              <div className='-mb-16'></div>
          </div>
          {isHome && (<LBtn />)}
          <div>
          <div className='grid grid-cols-3 gap-4 px-2 '>
          {isRank && (
                  <>
                       <Card style={{zIndex: '1', gap: '4px'}} className="mb-1">
                          <CardHeader className="justify-between ">
                            <div className="flex w-full  gap-5">
                              <div className="flex flex-col gap-1 items-start justify-center w-3/4">
                                <h5 className="text-small tracking-tight text-default-400">Total Pending</h5>
                                <h4 className=" w-3/4 text-small font-semibold leading-none text-default-600">{TotalPend} FRW</h4>
                              </div>
                            </div>
                            <div className="flex w-2/6">
                              <p>Manager</p>
                            </div>
                          </CardHeader>
                          <CardFooter className="gap-3">
                            <Progress aria-label="Loading..." value={60} className="max-w-md"/>
                        </CardFooter>
                      </Card> 
                      <Card style={{zIndex: '1', gap: '4px'}} className="mb-1">
                          <CardHeader className="justify-between ">
                            <div className="flex w-full  gap-5">
                              <div className="flex flex-col gap-1 items-start justify-center w-3/4">
                                <h5 className="text-small tracking-tight text-default-400">Pendin Earning</h5>
                                <h4 className=" w-3/4 text-small font-semibold leading-none text-default-600">{totalEarnPending} FRW</h4>
                              </div>
                            </div>
                            <div className="flex w-2/6">
                              <p>Manager</p>
                            </div>
                          </CardHeader>
                          <CardFooter className="gap-3">
                            <Progress aria-label="Loading..." value={60} className="max-w-md"/>
                        </CardFooter>
                      </Card>
                      <Card style={{zIndex: '1', gap: '4px'}} className="mb-1">
                          <CardHeader className="justify-between ">
                            <div className="flex w-full  gap-5">
                              <div className="flex flex-col gap-1 items-start justify-center w-3/4">
                                <h5 className="text-small tracking-tight text-default-400">Pending Spendings</h5>
                                <h4 className=" w-3/4 text-small font-semibold leading-none text-default-600">{totalAmount} FRW</h4>
                              </div>
                            </div>
                            <div className="flex w-2/6">
                              <p>Manager</p>
                            </div>
                          </CardHeader>
                          <CardFooter className="gap-3">
                            <Progress aria-label="Loading..." value={60} className="max-w-md"/>
                        </CardFooter>
                      </Card>
            </>
          )}
          </div>
          {isRank && (<LTables />)}
          {/* {isAlert && (<LGraph />)} */}
          </div>
          </div>
      </div>
        {/* ) : ( */}
        {/* {isAccount && (
          <div className='flex flex-col h-screen overflow-y-auto' style={{width: '95%'}}>
            
          </div>
        )} */}
    </div>
  );
};

export default Ldashboard


