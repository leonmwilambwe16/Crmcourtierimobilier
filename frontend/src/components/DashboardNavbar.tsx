import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import "../styles/component.styles/DashboardNavbar.scss";

const DashboardNavbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Toggle dark/light theme
  const toggleTheme = (): void => {
    const newTheme = darkMode ? 'light' : 'dark';
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    setDarkMode(savedTheme === 'dark');
  }, []);

  // Format date: "Monday, 27 November 2025"
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <nav className="dashboard-navbar">
      <div className="left">
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      <div className="right">
        <span className="calendar">{formattedDate}</span>
        <span className="clock">{formattedTime}</span>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
