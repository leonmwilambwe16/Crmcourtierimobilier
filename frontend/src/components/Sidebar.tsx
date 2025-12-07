import React, { useState, useEffect } from 'react';
import "../styles/component.styles/Sidebar.scss";
import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import { 
  FiMenu, FiX, FiHome, FiFolder, FiMessageCircle, FiUsers, FiSettings 
} from "react-icons/fi";
import { FaBuildingColumns } from "react-icons/fa6";

const Sidebar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!user) return null;

  return (
    <div className={`sidebar-container ${isOpen ? "open" : "closed"}`}>

      {/* Avatar */}
      <div className="logo-sidebar-menu">
        <div className="avatar">
          <div className="image">K</div>
          {isOpen && ( 
            <div className="name">
              <p>Leon Ngoy</p>
              <span>{user.role}</span>
            </div>
          )}
        </div>

        {/* Sidebar Menu */}
        <div className="side-menu">
          <ul className="menu-side-list">
            {user.role === "CLIENT" && (
              <>
                <li>
                  <Link to="/client-dashboard">
                    <FiHome size={20} />
                    {isOpen && <span className="label">Dashboard</span>}
                  </Link>
                </li>

                 <li>
                  <Link to="/client-courtier">
                     <FiUsers size={20} />
                    {isOpen && <span className="label">Courtier</span>}
                  </Link>
                </li>
                <li>
                  <Link to="/client-properties">
                    <FaBuildingColumns size={20} />
                    {isOpen && <span className="label">My Properties</span>}
                  </Link>
                </li>
                <li>
                  <Link to="/client-files">
                    <FiFolder size={20} />
                    {isOpen && <span className="label">My Files</span>}
                  </Link>
                </li>
                <li>
                  <Link to="/client-messages">
                    <FiMessageCircle size={20} />
                    {isOpen && <span className="label">Messages</span>}
                  </Link>
                </li>
              </>
            )}

            {user.role === "COURTIER" && (
              <>
                <li>
                  <Link to="/courtier-dashboard">
                    <FiHome size={20} />
                    {isOpen && <span className="label">Dashboard</span>}
                  </Link>
                </li>
                <li>
                  <Link to="/courtier-properties">
                    <FaBuildingColumns size={20} />
                    {isOpen && <span className="label">My Properties</span>}
                  </Link>
                </li>
                  <li>
                  <Link to="/courtier-files">
                    <FiFolder size={20} />
                    {isOpen && <span className="label">Create Files</span>}
                  </Link>
                </li>
                <li>
                  <Link to="/courtier-clients">
                    <FiUsers size={20} />
                    {isOpen && <span className="label">My Clients</span>}
                  </Link>
                </li>
                <li>
                  <Link to="/courtier-messages">
                    <FiMessageCircle size={20} />
                    {isOpen && <span className="label">Messages</span>}
                  </Link>
                </li>
              </>
            )}

            {user.role === "ADMIN" && (
              <>
                <li>
                  <Link to="/manager-dashboard">
                    <FiSettings size={20} />
                    {isOpen && <span className="label">Dashboard</span>}
                  </Link>
                </li>
                <li>
                  <Link to="/manage-courtiers">
                    <FiUsers size={20} />
                    {isOpen && <span className="label">Manage Courtiers</span>}
                  </Link>
                </li>
                <li>
                  <Link to="/manage-clients">
                    <FiUsers size={20} />
                    {isOpen && <span className="label">Manage Clients</span>}
                  </Link>
                </li>
                <li>
                  <Link to="/manage-properties">
                    <FiFolder size={20} />
                    {isOpen && <span className="label">Manage Properties</span>}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Logout Button */}
      <div className="logout-btn">
        <button>Logout</button>
      </div>

      {/* Fixed Toggle Button */}
      {window.innerWidth > 768 && (
        <button
          className="toggle-btn-fixed"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}
    </div>
  );
};

export default Sidebar;
