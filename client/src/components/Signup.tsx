import React from 'react'
import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import auth from "../constants/firebase"
import {User, createUserWithEmailAndPassword} from 'firebase/auth'
import { Navigate } from "react-router-dom";
import axios from 'axios';
import userContext from '../context/UserContext.ts'

const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

const storeUserInfo = async (email : String, codeforcesUsername : String) => {

  const data = {
      "email" : email,
      "codeforcesUsername" : codeforcesUsername
  }

  try {
      // Make a POST request to the "user/profile" endpoint
      const response = await axios.post('http://localhost:3000/user/', data);

      // Handle the response data
      console.log('Profile updated successfully:', response.data);

      // You can do more with the response data here

    } catch (error : any) {
      // Handle errors
      console.error('Error updating profile:', error.message);
    }
}

export default function Signup(){
  const {email, setEmail, cfUsername, setCfUsername} = userContext()
  const [signupState,setSignupState]=useState(fieldsState);
  const [isLoggedIn, setisLoggedIn] = useState(false)

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  if(isLoggedIn){
    return <Navigate to = '/'/>
  }

  if(email){
    return <Navigate to = '/home'/>
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(signupState)
    createAccount()
  }

  //handle Signup API Integration here
  const createAccount=()=>{
    // const auth = getAuth();
    const email = signupState["email-address"]
    const password = signupState["password"]
    const codeforcesUsername = signupState["username"]
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const User = userCredential.user;
      localStorage.setItem("isLoggedIn", true)
      localStorage.setItem("userEmail", email)

      storeUserInfo(email, codeforcesUsername)

      setEmail(email)
      setCfUsername(codeforcesUsername)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      switch(errorCode){
        case 'auth/email-already-in-use':
          setisLoggedIn(true)
      }
      console.log(errorCode)
      console.log(errorMessage)
      // ..
    });
  }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>

         

      </form>
    )
}