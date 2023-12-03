import React from 'react'
import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import auth from "../constants/firebase"
import { User, signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router-dom"
import axios from 'axios';


const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

const makeApiCall = async (email, username) => {

    const data = {
        "email" : email,
        "username" : username
    }

    try {
        // Make a POST request to the "user/profile" endpoint
        const response = await axios.post('http://localhost:3000/user/profile', data);
  
        // Handle the response data
        console.log('Profile updated successfully:', response.data);
  
        // You can do more with the response data here
  
      } catch (error : any) {
        // Handle errors
        console.error('Error updating profile:', error.message);
      }
}

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);
    const [user, setUser] = useState<User | null>(null)

    if(user){
        return <Navigate to = '/home'/>
    }

    const handleChange=(e: any)=>{
        setLoginState({...loginState,[e.target?.id]:e.target?.value})
    }

    const handleSubmit=(e: any)=>{
        e.preventDefault();
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = () =>{
        const email = loginState["email-address"]
        const password = loginState["password"]
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const tempUser: User = userCredential.user
            localStorage.setItem("isLoggedIn", true)
            localStorage.setItem("userEmail", email)
            
            makeApiCall(email, "random")

            setUser(tempUser);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
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
        </div>

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit} text="Login"/>

      </form>
    )
}