import '/src/App.css'
// import Navbar from './components/Navbar';
// import RecordLog from './components/RecordLog';
// import Calendar from './components/Calender'
import ExpenseTracker from './components/Expenses';
// import MyChart from './components/Monitor';
import VehicleTracker from './components/vehicleTrackerPage';
// import AutoParts from './components/AutoParts';
import Login from './components/Login';
import { BrowserRouter, Router, Route, Routes, useNavigate } from 'react-router-dom';
// import { Colors } from 'chart.js';
// import { useEffect, useState } from 'react';
// import { GoogleLogin } from '@react-oauth/google';
// import jwt_decode from "jwt-decode";
// import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarOn, faChartPie, faFileInvoice, faGaugeMed, faGaugeSimpleHigh } from '@fortawesome/free-solid-svg-icons';
import Home from './components/Home';
import Registers from './components/Register';
import AutoParts from './components/AutoParts';

import Bg from './components/video'
import WebcamStreamCapture from './components/VidCamCapture';
// import YourComponent from './components/VinDecoder';

const App = () => {

return(
  <>


<WebcamStreamCapture/>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/AutoParts" element={<AutoParts />} />
        <Route path="/register" element={<Registers />} />
        {/* <Route path="/Calender" element={<CalendarApp />} /> */}
        <Route path="/vehicleTrackerPage" element={<VehicleTracker />} />
        <Route path="/Expenses" element={<ExpenseTracker />} />

        </Routes>

      
      {/* <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/register" element={<Registers />} />
        <Route path="/AutoParts" element={<AutoParts />} />
        <Route path="/ " element={<vd />} />
        <Route path="/Monitor" element={<MyChart />} />
        <Route path="/vehicleTrackerPage" element={<VehicleTracker />} />
        
      </Routes> */}

      



{/* <div className="flex justify-center space-x-4 flex-wrap h-14 bg-black ">
      <FontAwesomeIcon icon={faFileCircleCheck} className="text-3xl text-yellow-400 pr-4 relative top-5" />
      <FontAwesomeIcon icon={faGaugeMed} className="text-3xl text-yellow-400 relative top-5"/>
      <FontAwesomeIcon icon={faFileCircleCheck} className="text-3xl text-red-400 pl-5 relative top-5"/>
    </div> */}


  </>
  );
};

export default App;
