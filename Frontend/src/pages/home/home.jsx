import React, { useState } from "react";
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import MenuIcon from '@mui/icons-material/Menu';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import WalletIcon from '@mui/icons-material/Wallet';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import DragHandleTwoToneIcon from '@mui/icons-material/DragHandleTwoTone';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';

import './home.css'
import useLogout from "../../hook/registration/logout";

const truncateString = (str, maxLength) => {
    if(str.length <= maxLength ){
      return str;
    }else{
      const truncatedString = str.slice(0, maxLength);
      return truncatedString + (truncatedString.endsWith('') ? '' : '...');
    }
}
const home = () => {

  const [isFollowed, setIsFollowed] = React.useState(false);
  const {loading, logout} = useLogout();
  const [focusedInput, setFocusedInput] = useState(null);
  const [inputValues, setInputValues] = useState({});

  const handleFocus = (name) => {
    setFocusedInput(name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const menuItems = [
    { name: 'transaction', leftIcon: <LinearScaleIcon className="text-info" />, rightIcon: <DragHandleTwoToneIcon /> },
    { name: 'wallet', leftIcon: <WalletIcon className="text-info" />, rightIcon: <DragHandleTwoToneIcon /> },
    { name: 'task Dashboard', leftIcon: <AssessmentIcon className="text-info"/>, rightIcon: <DragHandleTwoToneIcon /> },
    { name: 'Dashboard', leftIcon: <SummarizeIcon className="text-info" />, rightIcon: <DragHandleTwoToneIcon/> },
    { name: 'settings', leftIcon: <SettingsIcon className="text-info" />, rightIcon: <DragHandleTwoToneIcon /> },
    { name: 'logout', leftIcon: !loading ? <LogoutTwoToneIcon className="text-error"/> : <span className="loading loading-ring"></span>, rightIcon: '', onClick: logout },
    { name: 'delete_account', leftIcon: <DeleteForeverTwoToneIcon className="text-error" />, rightIcon: '' }
  ];
  const [isMenu, setIsMenu] = useState(false)
  const handleMenu = (e) => {
    e.preventDefault()
    setIsMenu(!isMenu)
  }

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
  return (
    <div className="w-full flex flex-col overflow-auto">
        <div className=" w-full">
            <div className=" fixed flex flex-row justify-between px-2 align-middle" style={{width: 'calc(100% - 32px)', zIndex: '2'}}>
                <div>web Application</div>
                <div onClick={handleMenu} className="text-info"><MenuIcon /></div>
                {isMenu && (
                    <div className="drp-ctnt flex flex-col justify-between h-screen">
                        <div>
                            <div className="flex justify-end" onClick={handleMenu}>
                                <ClearTwoToneIcon />
                            </div>
                            {menuItems.map(({ name, leftIcon, rightIcon, onClick }) => (
                                <div key={name} className="flex flex-row justify-between items-center mt-5" onClick={onClick}>
                                    <div className="flex flex-row items-center">
                                    <span className="mr-2">{leftIcon}</span> {/* Left icon */}
                                    {name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                                    </div>
                                    <span>{rightIcon}</span> {/* Right icon */}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
        <div className="mt-8 py-2 gap-4 overflow-x-auto w-full flex flex-row hide-scrollbar">
            <div className={`${activeButton === 'Home' ? 'btn2' : 'btn1'}`} onClick={() => handleButtonClick('Home')}>Home</div>
            <div className={`${activeButton === 'Rank' ? 'btn2' : 'btn1'}`} onClick={() => handleButtonClick('Rank')}>Rank</div>
            <div className={`${activeButton === 'Tasks' ? 'btn2' : 'btn1'}`} onClick={() => handleButtonClick('Tasks')}>Tasks</div>
            <div className={`${activeButton === 'Report' ? 'btn2' : 'btn1'}`} onClick={() => handleButtonClick('Report')}>Report</div>
            <div className={`${activeButton === 'Alert' ? 'btn2' : 'btn1'}`} onClick={() => handleButtonClick('Alert')}>Alert</div>
        </div>
        {isHome && (
            <Card style={{zIndex: '1'}}>
                <CardHeader className="justify-between ">
                    <div className="flex  gap-5">
                    <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                    <div className="flex flex-col gap-1 items-start justify-center w-3/4">
                        <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                        <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
                    </div>
                    </div>
                    <Button
                    className={isFollowed ? " bg-transparent text-foreground border-default-200" : "border-primary"}
                    color="primary"
                    radius="full"
                    size="sm"
                    variant={isFollowed ? "bordered" : "solid"}
                    onPress={() => setIsFollowed(!isFollowed)}
                    >
                    {isFollowed ? "Unfollow" : "Follow"}
                    </Button>
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
                <CardFooter className="gap-3">
                    <div className="flex gap-1">
                      <p className="font-semibold text-default-400 text-small">4</p>
                      <p className=" text-default-400 text-small">Following</p>
                    </div>
                    <div className="flex gap-1">
                      <p className="font-semibold text-default-400 text-small">97.1K</p>
                      <p className="text-default-400 text-small">Followers</p>
                    </div>
                    <div className="flex gap-1">
                      <button className="btn">Check Task</button>
                    </div>
                </CardFooter>
            </Card>
          )}
        {/* {isTask && (
          <div>
            <h1 className="w-full text-center mt-5">Form to assign Task</h1>
            <div className="mt-10">
              <form className="flex flex-col w-full">
                <div className="flex flex-col w-full">
                  <label className={`absolute ${inputValues['Agreement'] ? 'tran2' : (focusedInput === 'Agreement' ? 'tran' : '')}`}>Agreement</label>
                  <input
                    name="Agreement"
                    type="text"
                    onChange={handleChange}
                    onFocus={() => handleFocus('Agreement')} />
                </div>
                <div className="flex gap-10 w-full flex-row">
                  <div className="flex flex-col w-2/5">
                    <label>Amount</label>
                    <input type="number" />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <label>Currency</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="flex gap-10 w-full flex-row">
                  <div className="flex flex-col w-2/5">
                    <label>Start_date</label>
                    <input type="Date" />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <label>End_date</label>
                    <input type="Date" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )} */}
        {isTask && (
      <div>
        <h1 className="w-full text-center mt-5">Form to assign Task</h1>
        <div className="mt-10">
          <form className="flex flex-col gap-10 w-full">
            <div className="flex flex-col w-full">
              <label htmlFor="Agreement" onClick={() => handleFocus('Agreement')}
                className={`absolute ${inputValues['Agreement'] ? 'tran2' : (focusedInput === 'Agreement' ? 'tran' : '')}`}>
                  Agreement
              </label>
              <input
                id="Agreement"
                name="Agreement"
                type="text"
                onChange={handleChange}
                onFocus={() => handleFocus('Agreement')}
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
          </form>
        </div>
      </div>
    )}
        {isReport && (
          <>
          <h1 className="w-full text-center mt-5">Form to make Report</h1>
          <div className="mt-10">
            <form className="flex flex-col gap-10 w-full">

              <div className="flex flex-col w-full">
                <label htmlFor="Agreement" onClick={() => handleFocus('Agreement')}
                  className={`absolute ${inputValues['Agreement'] ? 'tran2' : (focusedInput === 'Agreement' ? 'tran' : '')}`}>
                    Agreement
                </label>
                <input
                  id="Agreement"
                  name="Agreement"
                  type="text"
                  onChange={handleChange}
                  onFocus={() => handleFocus('Agreement')}
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
            </form>
          </div>
        </>
        )}
        {isAlert && (
          <Card style={{zIndex: '1'}}>
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
                
            </Card>)}
        {isRank && (
              <Card style={{zIndex: '1'}}>
              <CardHeader className="justify-between ">
                  <div className="flex  gap-5">
                  <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                  <div className="flex flex-col gap-1 items-start justify-center w-3/4">
                      <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                      <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
                  </div>
                  </div>
                  <div>Software Developer</div>
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
        )}
    </div>
  );
}


export default home;

