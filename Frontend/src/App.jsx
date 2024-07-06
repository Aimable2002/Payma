import { useState, useEffect } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import Sign from './pages/Sign/sign'
import Home from './pages/home/home'
import Dashboard from './pages/dashboard/dashboard'
import { useAuthContext } from './context/authContext/authContext'
import Profile from './pages/profile/profile'

import Lsign from './Lpages/Lregistration/Lsign'
import Lhome from './Lpages/Lhome/Lhome'

function App() {

  const {AuthUser} = useAuthContext()
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 769);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 769);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='px-4 py-4 w-screen'>
      {isSmallScreen ? (
      <Routes>
        <Route path='/sign' element={AuthUser ? <Navigate to= '/' /> : <Sign /> } />
        <Route path='/' element={AuthUser ? <Home /> : <Navigate to ='sign' />} />
        <Route path='/dashboard' element={AuthUser ? <Dashboard /> : <Navigate to ='sign' />} />
        <Route path='/profile' element={AuthUser ? <Profile /> : <Navigate to ='sign' />} />
      </Routes>
      ) : (
        <Routes>
          <Route path='/sign' element={AuthUser ? <Navigate to= '/' /> : <Lsign /> } />
          <Route path='/' element={AuthUser ? <Lhome /> : <Navigate to='sign' />} />
        </Routes>
      )}
    </div>
  )
}

export default App
