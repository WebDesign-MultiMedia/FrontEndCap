import '/src/index.css';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faCalendar, faCalendarAlt, faCalendarDays, faCalendarPlus, faCalendarTimes, faCalendarWeek, faCalendarXmark, faCar, faCarAlt, faCarSide, faCheckCircle, faCircleInfo, faDashboard, faDollar, faDollarSign, faGasPump, faGaugeHigh, faGear, faGears, faGlobeAmericas, faInfo, faListNumeric, faLocationCrosshairs, faLocationDot, faMarker, faMoneyBill, faMoneyCheckDollar, faSearch, faServer, faSortAmountAsc, faSortAmountDown, faSortAmountDownAlt, faSortAmountUp, faSortNumericAsc, faTextHeight, faVial, faWrench, faX } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import RecordLog from './RecordLog';
import Font from 'react-font';

function VehicleTracker() {
  const [selectedSection, setSelectedSection] = useState('maintenance'); // default to 'maintenance'

  const [mydata, setMyData] = useState([]);
  const [myveData, setMyVeData] = useState([]);
  const [myFuelData, setMyFuelData] = useState([]);
  const [myInsurData, setMyInsurData] = useState([]);



  const [sortOption, setSortOption] = useState('date');
  // Fetch maintenance and repair data
  useEffect(() => {
    async function fetchMaintenanceRepaiData() {
      try {
        const response = await fetch("http://localhost:8080/MaintenanceRepairs");
        const data = await response.json();
        setMyData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMaintenanceRepaiData();
  }, []);

  // Delete Maintenance and Repair Log
  const ManRepDeleteBtn = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/MaintenanceRepairs/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }

    alert('Maintenance and Repair Log Deleted Successfully!');
    window.location.reload();
  }

 


  // Handle sorting change
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Sort the data based on the selected option
  const sortedData = [...mydata].sort((a, b) => {
    if (sortOption === 'date') {
      return new Date(b.date) - new Date(a.date); // Sort by date (newest first)
    } else if (sortOption === 'mileage') {
      return b.mileage - a.mileage; // Sort by mileage (highest first)
    }
    return 0;
  });




  
  // Fetch vehicle information
  useEffect(() => {
    async function fetchVeInfo() {
      try {
        const response = await fetch("http://localhost:8080/vehicleInformations");
        const showdata = await response.json();
        setMyVeData(showdata);
      } catch (error) {
        console.error(error);
      }
    }
    fetchVeInfo();
  }, []);

 // Delete Vehicle Information Log
 const VInfoDeleteBtn = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/vehicleInformations/delete/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }

  alert('Expense Deleted Log Deleted Successfully!');
  window.location.reload();
}





  
  // Fetch fuel log information
  useEffect(() => {
    async function fetchFuelInfo() {
      try {
        const response = await fetch("http://localhost:8080/FuelLogs");
        const showdata = await response.json();
        setMyFuelData(showdata);
      } catch (error) {
        console.error(error);
      }
    }
    fetchFuelInfo();
  }, []);

    // Sorting logic
    const sortedFuelData = [...myFuelData].sort((a, b) => {
      if (sortOption === 'date') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortOption === 'odometerReading') {
        return a.odometerReading - b.odometerReading;
      } 
      return 0;
    });


//http://localhost:8080/FuelLogs/delete/${id}
const FuelInfoDeleteBtn = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/FuelLogs/delete/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }

  alert('Fuel Details Deleted Log Deleted Successfully!');
  window.location.reload();
}



  
  // Fetch insurance log information
  useEffect(() => {
    async function fetchInsurLog() {
      try {
        const response = await fetch("http://localhost:8080/InsuranceLogs");
        const showdata = await response.json();
        setMyInsurData(showdata);
      } catch (error) {
        console.error(error);
      }
    }
    fetchInsurLog();
  }, []);


  const InsureInfoDeleteBtn = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/InsuranceLogs/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  
    alert('Insurance Details Deleted Log Deleted Successfully!');
    window.location.reload();
  }



  // Dropdown options
  const sectionOptions = [
    { id: 'maintenance', label: 'Maintenance and Repair' },
    { id: 'fuel', label: 'Fuel Tracker' },
    { id: 'vehicle', label: 'Vehicle Information' },
    { id: 'insurance', label: 'Insurance Information' }
  ];

  return (
    <>
<Navbar/>
    <div className='bckgrn bg-black relative'>


      <RecordLog/>
      <div className="container mx-auto p-6 flex flex-col items-center  ">
        <Menu as="div" className="relative inline-block text-left mb-4  ">
          <MenuButton className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-900 text-white text-sm font-medium  hover:bg-red-500">
            {sectionOptions.find((option) => option.id === selectedSection).label}
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
          </MenuButton>
          <MenuItems className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            {sectionOptions.map((option) => (
              <MenuItem key={option.id}>
                {({ active }) => (
                  <button
                    onClick={() => setSelectedSection(option.id)}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                  >
                    {option.label}
                  </button>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
        </div>

        {selectedSection === 'maintenance' && (
          <div className="bg-black-300 py-24 sm:py-32 ">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <Font family='Josefin Slab'> <h2 className="text-4xl text-center  tracking-tight text-gray-100 sm:text-5xl">
                  Maintenance and Repair Tracker
                </h2> </Font>
                <p className="mt-2 text-lg text-center font-mono leading-8 text-blue-300">
                  Keep a track of all maintenance and repairs along the way! 

                </p>
              </div>
 
            <Font family='Josefin Slab'>  <div className="flex text-xl flex-wrap justify-around">
                {sortedData.map((item, index) => (
                  <div key={index} className="flex-1 min-w-[300px] m-4   p-4 rounded-lg ">
                     <button onClick={() => ManRepDeleteBtn(item.id)} className=" rounded w-7 relative top-5 right-3 z-1  bg-red-400 ">
                      <FontAwesomeIcon icon={faX} className='text-white'/></button>
                      
                    <p className="flex-col items-center text-left  p-3 relative  rounded-2xl bg-gray-900  shadow-inner shadow-gray-400">
                      <FontAwesomeIcon icon={faCalendarAlt} className="text-white pl-4" /> <span className='text-white'>Date: </span> <span className='text-red-300 font-semibold'>{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span><br/>
                      <FontAwesomeIcon icon={faDashboard} className="text-white pl-4" /><span className="text-white"> Mileage: {item.mileage}</span><br/>
                      <FontAwesomeIcon icon={faWrench} className="text-white pl-4" /> <span className='text-white'> Type: {item.maintenance_repair }</span><br/>
                      <FontAwesomeIcon icon={faGears} className="text-white pl-4" /> <span className='text-white'> Parts: {item.parts}</span><br/>
                      <FontAwesomeIcon icon={faCarSide} className="text-white pl-4" /> <span className='text-white'> Side: {item.vehicleSide}</span><br/>
                      <FontAwesomeIcon icon={faSearch} className="text-white pl-4" /> <span className='text-white'> Service Provider: {item.serviceProvider}</span><br/>
                      <FontAwesomeIcon icon={faLocationDot} className="text-white pl-4" /> <span className='text-white'> Location: {item.serviceProviderLocation}</span><br/>
                      <FontAwesomeIcon icon={faDollarSign} className="text-white pl-4" /> <span className='text-green-300'>{item.costOfService}</span><br/>
                      <FontAwesomeIcon icon={faCalendarXmark} className="text-white pl-4" /> <span className='text-white'> Due: {item.nextServiceDue}</span><br/>
                      {/* <FontAwesomeIcon icon={faGears} className="text-white pl-4" /> <span className='text-white'>{item.receipt_InvoiceNumber}</span><br/> */}
                      <FontAwesomeIcon icon={faCircleInfo} className="text-white pl-4" /> <span className='text-white'> Note/Issues: </span><span className="text-red-300 font-semibold">{item.note_Issues}</span>
                       
                    </p>
                  </div>
                ))}
              </div></Font>
            </div>
          </div>
        )}

        {selectedSection === 'fuel' && (
          <div className="bg-black-300 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <Font family='Josefin Slab'> <h2 className="text-4xl text-center  tracking-tight text-gray-100 sm:text-5xl">Fuel Tracker</h2></Font>
                <p className="mt-2 text-lg font-mono text-center leading-8 text-blue-300">Keep a track of all your fuel logs here!</p>
              </div>
              
        <Font family='Josefin Slab' ><div className="flex flex-wrap justify-around text-xl">
          {/* Render sorted fuel data */}
         {sortedFuelData.map((item, index) => (
            <div key={index} className="flex-1 min-w-[300px] m-2 p-4 rounded-lg  ">
                  <button onClick={() => FuelInfoDeleteBtn(item.id)} className=" rounded w-7 relative top-5 right-3  bg-red-400 ">
                  <FontAwesomeIcon icon={faX} className='text-white'/></button>
              <p className="flex-col items-center text-center p-3 rounded-2xl  bg-gray-900  shadow-inner shadow-gray-400">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-white pl-4" /><span></span> <span className='text-white'> <span className='text-red-300 font-bold'> {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></span><br/>
                <FontAwesomeIcon icon={faGasPump} className="text-white pl-4" /><span></span> <span className='text-white'>Gallon Purchased: <span>{item.gallon_LiterPurchased}</span> </span> <br/>
                <FontAwesomeIcon icon={faDollar} className="text-white pl-4" /><span></span><span className='text-white'>Gallon Price: $ <span className='text-red-400 font-bold'>{item.pricePerGallon_Liter} </span></span> <br/>
                <FontAwesomeIcon icon={faCheckCircle} className="text-white pl-4" /><span></span><span className='text-white' >Amount: $<span className='text-red-400 font-bold'> {item.totalCost}</span> </span> <br/>
                <FontAwesomeIcon icon={faGasPump} className="text-white pl-4" /><span></span><span className='text-white'>Type: <span>{item.fuelType}</span></span>  <br/>
                <FontAwesomeIcon icon={faSearch} className="text-white pl-4" /><span></span><span className='text-white'>Gas Station Name <span>{item.gasStationName} </span></span> <br/>
                <FontAwesomeIcon icon={faLocationCrosshairs} className="text-white pl-4" /><span></span><span className='text-white'>Location: <span> {item.gasStationLocation}</span> </span>  <br/>
                <FontAwesomeIcon icon={faMoneyCheckDollar} className="text-white pl-4" /><span></span><span className='text-white'>Payment Method: <span className='text-red-400 font-bold'>{item.paymentMethod}</span> </span>  <br/>
                <FontAwesomeIcon icon={faGaugeHigh} className="text-white pl-4" /><span></span><span className='text-white'>Mileage: <span>{item.odometerReading}</span> </span>  <br/>
                <FontAwesomeIcon icon={faGlobeAmericas} className="text-white pl-4" /><span></span><span className='text-white'>Purpose: <span className='text-green-300 font-bold' >{item.tripPurpose}</span> </span>  <br/>
              </p>
            </div>
                ))}
              </div></Font>
            </div>
          </div>
        )}

        {selectedSection === 'vehicle' && (
          <div className="bg-black py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
               <Font family='Josefin Slab'> <h2 className="text-3xl text-center  tracking-tight text-gray-100 sm:text-5xl">Vehicle Information Tracker</h2></Font>
                <p className="mt-2 text-lg text-center font-mono leading-8 text-blue-300">Keep a track of all your vehicle information here!</p>
              </div>
              <Font family='Josefin Slab '> <div className="flex flex-wrap justify-around text-xl">
                {/* Render vehicle information */}
                {myveData.map((item, index) => (
                
                  <div key={index} className="flex-1 min-w-[300px] m-2 p-4 rounded-lg  ">
                    <button onClick={() => VInfoDeleteBtn(item.id)} className=" rounded w-7 relative top-5 right-3  bg-red-400 ">
                    <FontAwesomeIcon icon={faX} className='text-white'/></button>
                    <p className="flex-col items-center text-center p-3  rounded-2xl  bg-gray-900  shadow-inner shadow-gray-400">
                      <FontAwesomeIcon icon={faCarAlt} className="text-white pl-4" /> <span></span><span className='text-white' > Make: {item.make}</span> <br/>
                      <FontAwesomeIcon icon={faCarSide} className="text-white pl-4" /><span></span><span className='text-white'> Model: {item.model}</span> <br/>
                      <FontAwesomeIcon icon={faCalendarAlt} className="text-white pl-4" /><span></span><span className='text-white'> Year: {item.year}</span> <br/>
                    <span className='text-white'> Vin:</span><span className='text-red-300 font-thin'> {item.vin}</span> 
                    </p>
                  </div>
                ))}
              </div></Font>
            </div>
          </div>
        )}

        {selectedSection === 'insurance' && (
          <div className="bg-black py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <Font family='Josefin Slab'> <h2 className="text-4xl text-center  tracking-tight text-gray-100 sm:text-5xl">Insurance Information Tracker</h2></Font>
                <p className="mt-2 text-lg font-mono text-center leading-8 text-blue-300">Keep a track of all your insurance information here!</p>
              </div>
               <Font family='Josefin Slab'><div className="flex flex-wrap justify-around text-lg">
                {/* Render insurance information */}
                  {myInsurData.map((item, index) => (
               <div key={index} className="flex-1 min-w-[300px] m-2 p-4 rounded-lg shadow-md">
                <button onClick={() => InsureInfoDeleteBtn(item.id)} className=" rounded w-7 relative top-5 right-3 z- bg-red-400 ">
                <FontAwesomeIcon icon={faX} className='text-white'/></button>
                    <p className="flex-col items-center text-left p-3 rounded-2xl bg-gray-900  shadow-inner shadow-gray-400">
                      {/* <FontAwesomeIcon icon={faCalendar} className="text-white pl-4" /> {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}<br/> */}
                      <FontAwesomeIcon icon={faCar} className="text-white pl-4" /> <span  className='text-white'> Provider:</span><span className='text-white'> {item.provider}</span> <br/>
                      <FontAwesomeIcon icon={faSortNumericAsc} className="text-white pl-4" /><span  className='text-white'> Policy #:</span><span  className='text-red-300 font-semibold'> {item.policyNumber}</span> <br/>
                      <FontAwesomeIcon icon={faDollarSign} className="text-white pl-4" /><span  className='text-white'> Premium Payments: $</span><span  className='text-red-300 font-semibold'> {item.premiumPayment}</span><br/>
                      <FontAwesomeIcon icon={faCircleInfo} className="text-white pl-4" /><span  className='text-white'> Coverage Details:</span><span  className='text-white'> {item.coverageDetails}</span><br/>
                      <FontAwesomeIcon icon={faCalendarDays} className="text-white pl-4" /> <span  className='text-white'> Renewl Date: </span><span  className='text-red-300 font-semibold'> {item.renewlDate}</span> <br/>
                    
                    </p>
                  </div>
                ))}
              </div></Font>
            </div>
          </div>
        )}
      </div>

    </>
  );
}

export default VehicleTracker;
