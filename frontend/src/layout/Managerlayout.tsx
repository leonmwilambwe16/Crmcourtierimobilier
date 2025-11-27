import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import DashboardNavbar from '../components/DashboardNavbar'
import "../styles/laout.style/Laout.scss"

const Managerlayout = () => {
  return (
    <div className='layout-container'>
      <Sidebar/>
      <div className="main-content">
        <DashboardNavbar/>
        <main>
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default Managerlayout