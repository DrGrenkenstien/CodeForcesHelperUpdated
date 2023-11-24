import React from 'react'
import TotalStats from './DashboardComponents/TotalStats'
import LearningBlogs from './DashboardComponents/LearningBlogs'
import LeaderBoard from './DashboardComponents/LeaderBoard'

const DashBoard = () => {
  return (
    <>  
    <div className='flex justify-center'>
        <TotalStats/>
        <LearningBlogs/>
        <LeaderBoard/>
    </div>
        
    </>
  )
}

export default DashBoard