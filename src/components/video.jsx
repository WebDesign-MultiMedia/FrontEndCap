import React, { useState } from 'react';
import vd2 from '../assets/getStarted.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'; // Import the icon you want to use
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Navbar from './Navbar';
import HomeNavbar from './beforeLoginNav';

const Bg = () => {
  const [showContent, setShowContent] = useState(true);

  const handleIconClick = () => {
    setShowContent(false); // Hide both the video and icon when clicked
  };

  return (
    <>

<HomeNavbar/>
      <div className="relative w-full h-screen bg-black bottom-2">
        {/* Background Video and Icon (conditionally rendered) */}
        {showContent && (
          <>
            {/* Background Video */}
            <div className="absolute inset-0">
              <video
                src={vd2}
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />
            </div>

            {/* Centered content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center z-10 text-center">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl  text-white mb-4 font-thin">
                V Tracker
              </h1>
              {/* Clickable Icon to hide both video and icon */}
              <h3 className="text-center text-white text-xl sm:text-2xl lg:text-3xl px-4 sm:px-8 lg:px-16 leading-relaxed max-w-3xl mx-auto font-thin">
  Welcome to <span className="font-bold">V Tracker</span>, your comprehensive vehicle tracking solution! Our platform helps you stay informed about your vehicle's location, performance, and status in real-time. Whether for personal or business use, <span className="font-bold">V Tracker</span> ensures that you have the tools to monitor and manage your vehicles with ease, providing peace of mind and improved efficiency every step of the way.
</h3>


            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Bg;
