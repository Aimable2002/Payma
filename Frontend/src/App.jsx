
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import Sign from './pages/Sign/sign'
import Home from './pages/home/home'
import { useAuthContext } from './context/authContext/authContext'

function App() {

  const {AuthUser} = useAuthContext()

  return (
    <div className='px-4 py-4 w-screen'>
      <Routes>
        <Route path='/sign' element={AuthUser ? <Navigate to= '/' /> : <Sign /> } />
        <Route path='/' element={AuthUser ? <Home /> : <Navigate to ='sign' />} />
      </Routes>
    </div>
  )
}

export default App
