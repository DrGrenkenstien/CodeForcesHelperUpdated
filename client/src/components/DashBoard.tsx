import React, { useEffect } from 'react'
import TotalStats from './DashboardComponents/TotalStats'
import LearningBlogs from './DashboardComponents/LearningBlogs'
import LeaderBoard from './DashboardComponents/LeaderBoard'
import { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment} from 'react' 
import Cookies from 'js-cookie';
import axios from 'axios'

const fetchUserSubmissions = async() => {
  const cfusername = localStorage.getItem("cfUsername")

  console.log("USERNAME IN DASHBOARD : ", cfusername)
  const data = {
    "cfUsername" : cfusername 
  }
  const response = await axios.post("http://localhost:3000/codeforces/status", data)    
  console.log("Submissions are", response.data["result"][0])
  return response.data["result"][0]
}

const getUsername = async () => {
        
  const email = localStorage.getItem("userEmail")
  console.log("Email at dashboard : ", email)
  const data = {
    "email" : email 
  }
  const response = await axios.post("http://localhost:3000/user/cfusername/", data) 
  console.log("Response received : ", response.data)
  localStorage.setItem("cfUsername", response.data)
  // Cookies.set('cfUsername', response.data, { expires: 7, path: '/' });
}

const DashBoard = () => {
  let [isStatsOpen, setisStatsOpen] = useState(false)

  function closeStatsModal() {
    setisStatsOpen(false)
  }

  function openStatsModal() {
    setisStatsOpen(true)
  }

  useEffect(() => {
    getUsername()
    fetchUserSubmissions().then((response) => {
      console.log("userSubmissions are : ", response)
    })
  }, [])

  return (
    <>  

    <div className='flex justify-center space-x-10'>
      <div onClick={openStatsModal}>
        <TotalStats/>
      </div>
      <div>
        <LearningBlogs/>
      </div>
      <div>
        <LeaderBoard/>
      </div>
    </div>

    <Transition appear show={isStatsOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeStatsModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Your Total CodeForces Stats
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error officia, laudantium cupiditate quos, dolore provident excepturi, odio cumque quas reprehenderit numquam exercitationem veritatis dolorem? Vitae id perferendis omnis totam quia?
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeStatsModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

    </>
  )
}

export default DashBoard