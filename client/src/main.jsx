/* eslint-disable react-refresh/only-export-components */
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createContext } from 'react'

export const Context=createContext({isAuthenticated:false});

 const AppWrapper=()=>{
  const [isAuthenticated,setIsAuthenticated]=useState(false);

  return (<Context.Provider value={{isAuthenticated,setIsAuthenticated}}>
      <App/>
    </Context.Provider>)
    
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper/>
  </StrictMode>,
)
