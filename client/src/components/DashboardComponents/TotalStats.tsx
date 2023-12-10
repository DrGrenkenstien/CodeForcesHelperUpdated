import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';

const fetchUserDetails = async () => {
  const cfusername = Cookies.get("cfUsername")
  console.log("Length of passed string : ", cfusername?.length)
  const data = {
    "cfUsername" : cfusername 
  }
  const response = await axios.post("http://localhost:3000/codeforces/userinfo", data)    
  console.log("Data recieved at the client", response.data["result"][0])
}

const TotalStats = () => {
  // const [condeforcesUsername, setCodeforcesUsername] = useState<string | null>(null)
  
  const getUsername = async () => {
        
    const email = localStorage.getItem("userEmail")
    const data = {
      "email" : email 
    }
    const response = await axios.post("http://localhost:3000/user/cfusername/", data) 
    console.log("Response received : ", response.data)
    Cookies.set('cfUsername', response.data, { expires: 7, path: '/' });
  }


  useEffect(()=> {
      getUsername()
      fetchUserDetails()
  }, [])

  return (
    <div>
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">See your Total Stats</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">See your CodeFroces Stats</p>
        </a>
    </div>
  )
}

export default TotalStats