import React, { useState } from 'react'
import '../styles/component.styles/Navbar.scss'
import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import '../styles/component.styles/Navbar.scss'

const Navbar = () => {
  const [isOpen,setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate()
    
  const toggleBt=()=>{
    setIsOpen(prev=>!prev)
  }

  return (
    <div className='Navbar-container'>
      <div className="loo-nav">
        <h3>Logo</h3>
      </div>
      <div className={`menu-coantainer ${isOpen ?"open" :""}`}>
        <ul className="menulist">
          <li>Home</li>
          <li>Demo</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="btn-start">
        <button className='login-btn' onClick={()=>navigate('/login')}>Login</button>
        <button className='signup-btn' onClick={()=>navigate('/signup')}>Signup</button>
        <div className="humberger" onClick={toggleBt}>
          {isOpen?( <IoMdClose />):(<FaBars />)}
        </div>
      </div>
    </div>
  )
}

export default Navbar  



