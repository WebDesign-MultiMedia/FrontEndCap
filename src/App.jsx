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


// import YourComponent from './components/VinDecoder';

const App = () => {

return(
  <>




    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/beforeLoginNav" element={<HomeNavbar />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/AutoParts" element={<AutoParts />} />
        <Route path="/register" element={<Registers />} />
        <Route path="/vehicleTrackerPage" element={<VehicleTracker />} />
        <Route path="/Expenses" element={<ExpenseTracker />} />
        <Route path="/VideoImageLog" element={<VidCamCapture />} />

        </Routes>

    


  </>
  );
};

export default App;
