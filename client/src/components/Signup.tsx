import React from 'react'
import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import auth from "../constants/firebase"
import {User, createUserWithEmailAndPassword} from 'firebase/auth'
import { Navigate } from "react-router-dom";

const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  if(isLoggedIn){
    return <Navigate to = '/'/>
  }

  if(user){
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
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const User = userCredential.user;
      localStorage.setItem("isLoggedIn", true)
      localStorage.setItem("userEmail", email)
      setUser(User)
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