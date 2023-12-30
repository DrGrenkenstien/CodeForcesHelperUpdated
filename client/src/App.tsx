import './App.css';
import React, { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import Home from './pages/Home'
import {UserContextProvider} from './context/UserContext.ts'

function App() {
  // const {email, cfUsername} = userContext()
  const [email, setlocal_email] = useState<String | null>(null)
  const [cfUsername, setlocal_cfUsername] = useState<String | null>(null)

  const setCfUsername = (val : String) => {
        setlocal_cfUsername(val)
  }

  const setEmail = (val : String) => {
        setlocal_email(val)
  }

  return (
    // <div className="min-h-full h-screen py-12 px-4 sm:px-6 lg:px-8">
    // <div className="">
    <UserContextProvider value={{cfUsername, email, setCfUsername, setEmail}}>
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/home" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  //   </div>
  // </div>
  );
}

export default App;