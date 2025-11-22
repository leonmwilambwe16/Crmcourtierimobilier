import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import "../styles/laout.style/Laout.scss"

const Clientlayout = () => {
  
  return (
   
    <div className='layout-container'>
      <Sidebar/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default Clientlayout