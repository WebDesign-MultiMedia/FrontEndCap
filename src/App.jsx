import '/src/App.css'
import ExpenseTracker from './components/Expenses';
import VehicleTracker from './components/vehicleTrackerPage';
import Login from './components/Login';
import { BrowserRouter, Router, Route, Routes, useNavigate } from 'react-router-dom';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarOn, faChartPie, faFileInvoice, faGaugeMed, faGaugeSimpleHigh } from '@fortawesome/free-solid-svg-icons';
import Home from './components/Home';
import Registers from './components/Register';
import AutoParts from './components/AutoParts';
import VidCamCapture from './components/VideoImageLog';
import HomeNavbar from './components/beforeLoginNav';
import Bg from './components/video';
import Navbar from './components/Navbar';
import VideoImageLog from './components/VideoImageLog';
import CustomerSupportForm from './components/CustomerSupport';

const App = () => {

return(
  <>


    <Routes>
      <Route path="/" element={<Bg/>}></Route>
      <Route path="/vehicleTrackerPage" element={<VehicleTracker/>}></Route>
      <Route path="/VideoImageLog" element={<VideoImageLog/>}></Route>
      <Route path="/Expenses" element={<ExpenseTracker/>}></Route>
               <Route path='/Register' element={<Registers/>} />
               <Route path="/Login" element={<Login/>} />
               <Route path="/Home" element={<Home/>} />
                <Route path="/AutoParts" element={<AutoParts/>} />
                <Route path="/CustomerSupport" element={<CustomerSupportForm/>} />
                </Routes>
    

    


  </>
  );
};

export default App;
