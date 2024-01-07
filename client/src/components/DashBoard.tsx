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

function isEmptyObject(obj : Object) {
  return Object.keys(obj).length === 0;
}

const getRatingWiseDistribution = (submissions:object) =>{
    
      let data = {}

      if(isEmptyObject(submissions)) return data
      
      for (const key in submissions){

          const obj = submissions[key]
          const problemObject = obj["problem"]

          if(problemObject["rating"] == undefined){
            continue
          }

          data[problemObject["rating"]] = data[problemObject["rating"]] == null ? 1 : data[problemObject["rating"]] + 1
      }
      return data
}

const getTagwiseDistribution = (submissions:object) =>{

    let data = {}

    if(isEmptyObject(submissions)) return data

    for (const key in submissions){
      
      const obj = submissions[key]
      const problemObject = obj["problem"]
      const tagList = problemObject["tags"]
      
      if(problemObject["tags"] == undefined){
        continue
      }

      for (const tagName in tagList){
        data[tagList[tagName]] = data[tagList[tagName]] == null ? 1 : data[tagList[tagName]] + 1 
      }
  }
  return data
}

const DashBoard = () => {
  let [isStatsOpen, setisStatsOpen] = useState(false)
  const [submissions, setUsersubmissions] = useState({})

  const ratingDist = getRatingWiseDistribution(submissions)
  const tagDist = getTagwiseDistribution(submissions)

  // let keysList: string[] = Object.keys(person)
  const ratingList = Object.keys(ratingDist)
  const valuesList = ratingList.map(key => ratingDist[key]);

  // const tagList = Object.keys(tagDist)
  // const tagValueList = tagList.map(key => tagDist[key]);

  const pieChartData = []

  for (const key in tagDist){
    const localObject = {}

    localObject["id"] = pieChartData.length
    localObject["value"] = tagDist[key]
    localObject["label"] = key

    pieChartData.push(localObject)

  }

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
                <Dialog.Panel className="w-3/4 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Your Total CodeForces Stats
                  </Dialog.Title>
                  <div className="mt-2">
                    <div>
                      <BarChart
                          xAxis={[
                            {
                              id: 'barCategories',
                              data: ratingList,
                              scaleType: 'band',
                            },
                          ]}
                          series={[
                            {
                              data: valuesList,
                            },
                          ]}
                          width={600}
                          height={500}
                        />
                    </div>
                    <div>
                      <PieChart
                          series={[
                            {
                              data: pieChartData,
                            },
                          ]}
                          width={1050}
                          height={700}
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