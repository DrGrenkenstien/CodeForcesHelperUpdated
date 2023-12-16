import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';

const fetchUserDetails = async () => {
  const cfusername = Cookies.get("cfUsername")
  const data = {
    "cfUsername" : cfusername 
  }
  const response = await axios.post("http://localhost:3000/codeforces/userinfo", data)    
  console.log("Data recieved at the client", response.data["result"][0])
  return response.data["result"][0]
}

const getUsername = async () => {
        
  const email = localStorage.getItem("userEmail")
  const data = {
    "email" : email 
  }
  const response = await axios.post("http://localhost:3000/user/cfusername/", data) 
  console.log("Response received : ", response.data)
  Cookies.set('cfUsername', response.data, { expires: 7, path: '/' });
}

const TotalStats = () => {
  const [cfUserInfo, setcfUserInfo] = useState<object>({})

  useEffect(()=> {
      getUsername()
      fetchUserDetails().then((userInfo) => {
        setcfUserInfo(userInfo)
      })
  }, [])

  return (
    <div>
      <div className="cursor-pointer block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">See your Total Stats</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">Your General CodeForces Stats</p>
        <br/>
        <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400">
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
                <span>Current Rating: <span className="font-semibold text-gray-900 dark:text-white">{cfUserInfo.rating == null ? 'No Contests attended': cfUserInfo.rating}</span></span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
                <span>Contribution: <span className="font-semibold text-gray-900 dark:text-white">{cfUserInfo.contribution}</span></span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
                <span>Current Rank: <span className="font-semibold text-gray-900 dark:text-white">{cfUserInfo.rank == null ? 'Dead Bottom lol': cfUserInfo.rank}</span></span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
                <span>Max Rating: <span className="font-semibold text-gray-900 dark:text-white">{cfUserInfo.maxRating == null ? 'Dead Bottom again': cfUserInfo.maxRating}</span></span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
                <span>Max Rank: <span className="font-semibold text-gray-900 dark:text-white">{cfUserInfo.maxRank == null ? 'Beginner': cfUserInfo.maxRank}</span></span>
            </li>
          </ul>

      </div>
    </div>
  )
}

export default TotalStats