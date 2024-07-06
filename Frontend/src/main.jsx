import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import { AuthContextProvider } from './context/authContext/authContext.jsx'
//import { ThemeContext } from './context/ThemeContext.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        {/* <ThemeContext> */}
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
        {/* </ThemeContext> */}
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>
)
