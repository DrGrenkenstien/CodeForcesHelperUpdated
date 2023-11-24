import React from 'react'
import Navbar from '../components/NavBar'
import DashBoard from '../components/DashBoard'

const Home = () => {
  return (
    <>
    <div className='mb-10'>
      <Navbar/>
    </div>
    <div>
      <DashBoard/>
    </div>
    </>
  )
}

export default Home