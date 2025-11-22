import React from 'react'
import "../styles/component.styles/Sidebar.scss"
import { useAuth } from '../Context/AuthContext';
import "../styles/component.styles/Sidebar.scss"
import { Link } from 'react-router-dom';
const Sidebar = () => {

    const {user}= useAuth();
    if(!user) return null ;


  return (
  
    <div className='sidebar-container'>
      <div className="logo-sidebar-menu">
       
        <div className="avatar">
           <h2>logo</h2>
          <div className="image">
            k
          </div>
          <p>Leon ngoy</p>
        </div>
        <div className="side-menu">
          <ul className="menu-side-list">
               {user.role === "CLIENT" &&(
                <>
                <li><Link to="/client-dashboard">Dashbord</Link></li>
                <li><Link to="/client-properties">My Properties</Link></li>
                <li><Link to="/client-files">My Files</Link></li>
                <li><Link  to="/client-messages">Message</Link></li>
                </>
              )}

            {user.role === "COURTIER" &&(
             
              <>
                <li><Link to="/courtier-dashboard">Dashbord</Link></li>
                <li><Link to="/courtier-properties">My Properties</Link></li>
                <li><Link to="/courtier-clients">My Files</Link></li>
                <li><Link to="/courtier-messages">Message</Link></li>
                </>
              
            )}
          
            {user.role === "ADMIN" &&(
               <>
               <li><Link to="/manager-dashboar">Admin</Link></li>
               <li><Link to="/manage-courtiers">Manage Courtiers</Link></li>
              <li><Link to="/manage-clients">Manage Clients</Link></li>
              <li><Link to="/manage-properties">Manage Properties</Link></li>
               </>
            )}
           
              
          </ul>
        
        </div>
      </div>
      <div className="logout-btn">
        <button>Logout</button>
      </div>
    </div>
  )
}

export default Sidebar