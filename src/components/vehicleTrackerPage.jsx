import '/src/index.css';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faCalendar, faCircleInfo, faDashboard, faGear, faGears, faWrench, faX } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import RecordLog from './RecordLog';

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

  // Dropdown options
  const sectionOptions = [
    { id: 'maintenance', label: 'Maintenance and Repair' },
    { id: 'fuel', label: 'Fuel Tracker' },
    { id: 'vehicle', label: 'Vehicle Information' },
    { id: 'insurance', label: 'Insurance Information' }
  ];

  return (
    <>

    <div className='bckgrn bg-black relative'>

 
      <Navbar />
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
                <h2 className="text-3xl text-center font-bold tracking-tight text-gray-100 sm:text-4xl">
                  Maintenance and Repair Tracker
                </h2>
                <p className="mt-2 text-lg text-center leading-8 text-gray-100">
                  Keep a track of all maintenance and repairs along the way! 

                </p>
              </div>
               {/* Dropdown for sorting */}
        <div className="flex justify-center mb-6">
          <label htmlFor="sort" className="mr-2 text-lg font-medium text-gray-100">Sort by:</label>
          <select 
            id="sort" 
            className="p-2 border border-gray-300 rounded-md" 
            value={sortOption} 
            onChange={handleSortChange}
          >
            <option value="date">Date</option>
            <option value="mileage">Mileage</option>
          </select>
        </div>
              <div className="flex flex-wrap justify-around">
                {sortedData.map((item, index) => (
                  <div key={index} className="flex-1 min-w-[300px] m-0 p-4 rounded-lg">
                     <button onClick={() => ManRepDeleteBtn(item.id)} className=" rounded w-7 bottom-6 bg-red-400 h-"><FontAwesomeIcon icon={faX} className='text-white'/></button>
                    <p className="flex-col items-center text-left  p-3 relative  rounded-2xl shadow-2xl shadow-current">
                      <FontAwesomeIcon icon={faCalendar} className="text-white pl-4" /> <span className='text-white'>Date: </span> <span className='text-green-300 font-semibold'>{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span><br/>
                      <FontAwesomeIcon icon={faDashboard} className="text-white pl-4" /><span className="text-white">M: {item.mileage}</span><br/>
                      <FontAwesomeIcon icon={faWrench} className="text-white pl-4" /> <span className='text-white'>{item.maintenance_repair }</span><br/>
                      <FontAwesomeIcon icon={faGears} className="text-white pl-4" /> <span className='text-white'>{item.parts}</span><br/>
                      <FontAwesomeIcon icon={faGears} className="text-white pl-4" /> <span className='text-white'>{item.vehicleSide}</span><br/>
                      <FontAwesomeIcon icon={faGears} className="text-white pl-4" /> <span className='text-white'>{item.serviceProvider}</span><br/>
                      <FontAwesomeIcon icon={faGears} className="text-white pl-4" /> <span className='text-white'>{item.serviceProviderLocation}</span><br/>
                      <FontAwesomeIcon icon={faGears} className="text-white pl-4" /> <span className='text-green-300'>$ {item.costOfService}</span><br/>
                      <FontAwesomeIcon icon={faGears} className="text-white pl-4" /> <span className='text-white'>{item.nextServiceDue}</span><br/>
                      {/* <FontAwesomeIcon icon={faGears} className="text-white pl-4" /> <span className='text-white'>{item.receipt_InvoiceNumber}</span><br/> */}
                      <FontAwesomeIcon icon={faCircleInfo} className="text-white pl-4" /> <span className='text-white'>Note/Issues: </span><span className="text-red-300 font-semibold">{item.note_Issues}</span>
                       \
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedSection === 'fuel' && (
          <div className="bg-black-300 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl text-center font-bold tracking-tight text-gray-100 sm:text-4xl">Fuel Tracker</h2>
                <p className="mt-2 text-lg text-center leading-8 text-gray-100">Keep a track of all your fuel logs here!</p>
              </div>
              <div className="flex justify-center mb-4">
          {/* Sort Dropdown */}
          {/* <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              Sort by: {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
              <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </MenuButton>
            <MenuItems className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => setSortOption('date')}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                  >
                    Date
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => setSortOption('odometerReading')}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                  >
                    Odometer Reading
                  </button>
                )}
              </MenuItem>
            </MenuItems>
          </Menu> */}
        </div>

        <div className="flex flex-wrap justify-around">
          {/* Render sorted fuel data */}
          {sortedFuelData.map((item, index) => (
            <div key={index} className="flex-1 min-w-[300px] m-2 p-4 rounded-lg shadow-md">
              <p className="flex-col items-center text-center p-3 bg-black rounded-2xl shadow-2xl shadow-current">
                <FontAwesomeIcon icon={faCalendar} className="text-white pl-4" /><span></span> <span className='text-white'> {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span><br/>
                <FontAwesomeIcon icon={faGear} className="text-white pl-4" /><span></span> <span className='text-white'>{item.gallon_LiterPurchased}</span> <br/>
                <FontAwesomeIcon icon={faGear} className="text-white pl-4" /><span></span><span className='text-white'>{item.pricePerGallon_Liter}</span> <br/>
                <FontAwesomeIcon icon={faGear} className="text-white pl-4" /><span></span><span className='text-white' >{item.totalCost} </span> <br/>
                <FontAwesomeIcon icon={faGear} className="text-white pl-4" /><span></span><span className='text-white'>{item.fuelType}</span>  <br/>
                <FontAwesomeIcon icon={faGear} className="text-white pl-4" /><span></span><span className='text-white'>{item.gasStationName} </span> <br/>
                <FontAwesomeIcon icon={faGear} className="text-white pl-4" /><span></span><span className='text-white'>{item.gasStationLocation}</span>  <br/>
                <FontAwesomeIcon icon={faGear} className="text-white pl-4" /><span></span><span className='text-white'>{item.paymentMethod}</span>  <br/>
                <FontAwesomeIcon icon={faGear} className="text-white pl-4" /><span></span><span className='text-white'>Mileage: {item.odometerReading}</span>  <br/>
                <FontAwesomeIcon icon={faGear} className="text-white pl-4" /><span></span><span className='text-white'>{item.tripPurpose}</span>  <br/>
              </p>
            </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedSection === 'vehicle' && (
          <div className="bg-black py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl text-center font-bold tracking-tight text-gray-100 sm:text-4xl">Vehicle Information Tracker</h2>
                <p className="mt-2 text-lg text-center leading-8 text-gray-100">Keep a track of all your vehicle information here!</p>
              </div>
              <div className="flex flex-wrap justify-around">
                {/* Render vehicle information */}
                {myveData.map((item, index) => (
                  <div key={index} className="flex-1 min-w-[300px] m-2 p-4 rounded-lg shadow-md">
                    <p className="flex-col items-center text-center p-3 bg-black rounded-2xl shadow-2xl shadow-current">
                      <FontAwesomeIcon icon={faCircleInfo} className="text-white pl-4" /> <span></span><span className='text-white' > {item.make}</span> <br/>
                      <FontAwesomeIcon icon={faCircleInfo} className="text-white pl-4" /><span></span><span className='text-white'> {item.model}</span> <br/>
                      <FontAwesomeIcon icon={faCircleInfo} className="text-white pl-4" /><span></span><span className='text-white'> {item.year}</span> <br/>
                      <FontAwesomeIcon icon={faCircleInfo} className="text-white pl-4" /><span></span><span className='text-red-300 font-semibold'> {item.vin}</span> 
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedSection === 'insurance' && (
          <div className="bg-black py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl text-center font-bold tracking-tight text-gray-100 sm:text-4xl">Insurance Information Tracker</h2>
                <p className="mt-2 text-lg text-center leading-8 text-gray-100">Keep a track of all your insurance information here!</p>
              </div>
              <div className="flex flex-wrap justify-around">
                {/* Render insurance information */}
                {myInsurData.map((item, index) => (
                  <div key={index} className="flex-1 min-w-[300px] m-2 p-4 rounded-lg shadow-md">
                    <p className="flex-col items-center text-left p-3 bg-black rounded-2xl shadow-2xl shadow-current">
                      {/* <FontAwesomeIcon icon={faCalendar} className="text-white pl-4" /> {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}<br/> */}
                      <FontAwesomeIcon icon={faCircleInfo} className="text-white pl-4" /> <span  className='text-white'>Provider:</span><span className='text-white'> {item.provider}</span> <br/>
                      <FontAwesomeIcon icon={faCircleInfo} className="text-white pl-4" /><span  className='text-white'>Policy #:</span><span  className='text-red-300 font-semibold'> {item.policyNumber}</span> <br/>
                      <FontAwesomeIcon icon={faCircleInfo} className="text-white pl-4" /><span  className='text-white'>Premium Payments: $</span><span  className='text-red-300 font-semibold'> {item.premiumPayment}</span><br/>
                      <FontAwesomeIcon icon={faCircleInfo} className="text-white pl-4" /><span  className='text-white'>Coverage Details:</span><span  className='text-white'> {item.coverageDetails}</span><br/>
                      <FontAwesomeIcon icon={faCircleInfo} className="text-white pl-4" /> <span  className='text-white'>Renewl Date: </span><span  className='text-red-300 font-semibold'> {item.renewlDate}</span> <br/>
                    
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </>
  );
}

export default VehicleTracker;
