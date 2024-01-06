import React, { useEffect } from 'react'
import TotalStats from './DashboardComponents/TotalStats'
import LearningBlogs from './DashboardComponents/LearningBlogs'
import LeaderBoard from './DashboardComponents/LeaderBoard'
import { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment} from 'react' 
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios'

const fetchUserSubmissions = async() => {
  const cfusername = localStorage.getItem("cfUsername")

  // console.log("USERNAME IN DASHBOARD : ", cfusername)
  const data = {
    "cfUsername" : cfusername 
  }
  const response = await axios.post("http://localhost:3000/codeforces/status", data)    
  return response.data["result"]
}

const getUsername = async () => {
        
  const email = localStorage.getItem("userEmail")
  // console.log("Email at dashboard : ", email)
  const data = {
    "email" : email 
  }
  const response = await axios.post("http://localhost:3000/user/cfusername/", data) 
  // console.log("Response received : ", response.data)
  localStorage.setItem("cfUsername", response.data)
}

const getRatingWiseDistribution = (submissions) =>{
    
      let data = {}

      for (const obj in submissions){

          const problemObject = obj["problem"]
          data[problemObject["rating"]] += 1
      }
      return data
}

const DashBoard = () => {
  let [isStatsOpen, setisStatsOpen] = useState(false)
  const [submissions, setUsersubmissions] = useState({})

  function closeStatsModal() {
    setisStatsOpen(false)
  }

  function openStatsModal() {
    setisStatsOpen(true)
  }

  useEffect(() => {
    getUsername()
    fetchUserSubmissions().then((response) => {
      console.log(response)
      setUsersubmissions(response)
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
                <Dialog.Panel className="w-2/3 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Your Total CodeForces Stats
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="relative">
                      <BarChart
                          xAxis={[
                            {
                              id: 'barCategories',
                              data: ['bar A', 'bar B', 'bar C'],
                              scaleType: 'band',
                            },
                          ]}
                          series={[
                            {
                              data: [2, 5, 3],
                            },
                          ]}
                          width={400}
                          height={300}
                        />
                    </div>
                    <div className="relative">
                      <PieChart
                          series={[
                            {
                              data: [
                                { id: 0, value: 10, label: 'series A' },
                                { id: 1, value: 15, label: 'series B' },
                                { id: 2, value: 20, label: 'series C' },
                              ],
                            },
                          ]}
                          width={400}
                          height={200}
                        />
                    </div>
                    
                  </div>

                  {/* <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeStatsModal}
                    >
                      Got it, thanks!
                    </button>
                  </div> */}
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