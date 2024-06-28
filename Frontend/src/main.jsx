import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import { AuthContextProvider } from './context/authContext/authContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
