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
const Homes = () =>{


    return(
        <>
      <Navbar /> 
      <RecordLog/>
      <AutoParts/>

      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />
      </Routes> */}

</>
    )

}

export default Homes;