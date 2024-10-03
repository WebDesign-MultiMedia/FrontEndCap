import React from "react";
import Navbar from './Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
// import { Routes, Route } from "react-router-dom";
import RecordLog from './RecordLog';
// import ExpenseTracker from './Expenses';
// import MyChart from './Monitor'
import AutoParts from './AutoParts'
// import VehicleTracker from './vehicleTrackerPage'
// import Login  from "./Login";
import bgimgVid from './video'
// import Calendar from './Calender'
import video from './video'
import CustomerSupport from './CustomerSupport'
// import Footer from "./Footer";
// import Camera from "./Camera";
// import WebcamStreamCapture from "./VideoCapture";
import Monitor from './Monitor'
const Homes = () =>{


    return(
        <>


        
      <div className="bg-black min-h-screen ">     
        <Navbar/>
        <RecordLog/>
                <Monitor/>
      <AutoParts/>


      {/* <Footer/> */}
      </div>
 
      {/* <CustomerSupport/> */}
      {/* <Calendar/> */}

      
        
      

</>
    )

}

export default Homes;