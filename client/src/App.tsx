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

function App() {
  // const {email, cfUsername} = userContext()
  return (
    // <div className="min-h-full h-screen py-12 px-4 sm:px-6 lg:px-8">
    // <div className="">
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/home" element={<Home/>} />
        </Routes>
      </BrowserRouter>
  //   </div>
  // </div>
  );
}

export default App;