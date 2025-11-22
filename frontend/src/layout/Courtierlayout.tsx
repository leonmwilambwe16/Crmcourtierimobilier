import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const Courtierlayout = () => {
  return (
    <div>
      <Sidebar/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default Courtierlayout