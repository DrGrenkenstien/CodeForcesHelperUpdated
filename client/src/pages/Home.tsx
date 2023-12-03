import React from 'react'
import Navbar from '../components/NavBar'
import DashBoard from '../components/DashBoard'
import axios from 'axios'

async function fetchTotalStats() {
  try {
    // Make a GET request to the /api/totalstats endpoint
    const response = await axios.get('http://localhost:3000/api/totalstats');

    // Handle the response data
    console.log('Total Stats:', response.data);

    // You can do more with the response data here

  } catch (error : any) {
    // Handle errors
    console.error('Error fetching total stats:', error.message);
  }
}

const Home = () => {
  fetchTotalStats()
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