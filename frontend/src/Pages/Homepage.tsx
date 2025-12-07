import React from 'react'
import "../styles/page.styles/Homepage.scss"
import { IoIosKey } from "react-icons/io";
const Homepage = () => {
  return (
    <div className='container-homepage'>
      <div className="text-crm">
        <span className='text-span'><IoIosKey />
        <p>Pipeline</p>
        </span>
        <h1><span>Smarter CRM</span> for team that move fast</h1>
        <small>Streamline your workflow with All the tools we have</small>
        <div className="btnstart">
          <button>Start</button>
          <button>View Demo</button>
        </div>
      </div>
    
    </div>
  )
}

export default Homepage