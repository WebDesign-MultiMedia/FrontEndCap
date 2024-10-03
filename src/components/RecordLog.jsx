import '/src/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState , useEffect} from 'react';
import Footer from './Footer';
import Font from 'react-font';

const RecordLog = () => {


  // // State variable for selected form
  const [selectedForm, setSelectedForm] = useState('');

  // // Handle the form selection change
  const handleFormChange = (event) => {
    setSelectedForm(event.target.value);
  };

  
  const [vin, setVin] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [myData, setMyData] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const vehicleData = { make, model, year, vin};

    try {
      const response = await fetch("http://localhost:8080/vehicleInformations/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicleData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Vehicle information added:', data);
        setMyData(data);
        setMake('');
        setModel('');
        setVin('');
        setYear('');
        // You can add more logic here, like resetting the form or displaying a success message.
      } else {
        console.error('Failed to add vehicle information');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    alert('Vehicle information added successfully');

    window.location.reload();
  }


  

  const [FuelDate, setFuelDate] = useState('');
  const [gallon_LiterPurchased, setGallonPurchased] = useState('');
  const [pricePerGallon_Liter, setPricePerGallon] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [gasStationName, setGasStationName] = useState('');
  const [gasStationLocation, setGasStationLocation] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [odometerReading, setOdometerReading] = useState('');
  const [tripPurpose, setTripPurpose] = useState('');

  const [myDataFuel, setMyDataFuel] = useState([]);

  const handleSubmitFuel = async (e) => {
    e.preventDefault();


    const vehicleFuelData = { FuelDate, gallon_LiterPurchased, pricePerGallon_Liter, totalCost, fuelType, gasStationName, gasStationLocation, paymentMethod, odometerReading, tripPurpose};

    try {
      const response = await fetch("http://localhost:8080/FuelLogs/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicleFuelData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fuel information added:', data);
        setMyDataFuel(data);
        setFuelDate('');
        setGallonPurchased('');
        setPricePerGallon('');
        setTotalCost('');
        setFuelType('');
        // You can add more logic here, like resetting the form or displaying a success message.
      } else {
        console.error('Failed to add Fuel information');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    alert('Fuel information added successfully');

    window.location.reload();
  }




const [policyNumber, setPolicyNumber] = useState('');
const [provider, setProvider] = useState('');
const [coverageDetails, setCoverageDetails] = useState('');
const [premiumPayment, setPremiumPayment] = useState('');
const [renewlDate, setRenewlDate] = useState('');
const [myInsurData, setMyInsurData] = useState([]);
  
const handleSubmitInsurLog = async (e) => {
    e.preventDefault();

    const vehicleInsureData = { policyNumber, provider, coverageDetails, premiumPayment, fuelType, renewlDate};

    try {
      const response = await fetch("http://localhost:8080/InsuranceLogs/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicleInsureData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Insurance information added:', data);
        setMyInsurData(data);
        setPolicyNumber('');
        setProvider('');
        setCoverageDetails('');
        setPremiumPayment('');
        setRenewlDate('');
        // You can add more logic here, like resetting the form or displaying a success message.
      } else {
        console.error('Failed to add Insurance information');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    alert('Insurance information added successfully');

    window.location.reload();
  }





  const [date, setDate] = useState('');
  const [mileage, setMileage] = useState('');
  const [maintenance_repair, setMaintenance_repair] = useState('');
  const [parts, setParts] = useState('');
  const [vehicleSide, setVehicleSide] = useState('');
  const [serviceProvider, setServiceProvider] = useState('');
  const [serviceProviderLocation, setServiceProviderLocation] = useState('');
  const [costOfService, setCostOfService] = useState('');
  const [nextServiceDue, setNextServiceDue] = useState('');
  const [receipt_InvoiceNumber, setReceipt_InvoiceNumber] = useState('');
  const [note_Issues, setNote_Issues] = useState('');
  const [myManRepData, setMyManRepData] = useState([]);





  const handleSubmitManRep = async (e) => {
    e.preventDefault();

    const vehicleManRepairData = {
      date,
      mileage,
      maintenance_repair,
      parts,
      vehicleSide,
      serviceProvider,
      serviceProviderLocation,
      costOfService,
      nextServiceDue,
      receipt_InvoiceNumber,
      note_Issues
    };

      try {
        // Create both fetch requests
        const sheetDBRequest = fetch("https://sheetdb.io/api/v1/am2i3k26ig8ui", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(vehicleManRepairData),
        });
    
        const localServerRequest = fetch("http://localhost:8080/MaintenanceRepairs/add", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(vehicleManRepairData),
        });
    
        // Use Promise.all to send both requests concurrently
        const [sheetDBResponse, localServerResponse] = await Promise.all([sheetDBRequest, localServerRequest]);
    
        // Handle SheetDB Response
        if (sheetDBResponse.ok) {
          const sheetDBData = await sheetDBResponse.json();
          console.log('SheetDB maintenance_repair information added:', sheetDBData);
        } else {
          console.error('Failed to add vehicle information to SheetDB');
        }
    
        // Handle Local Server Response
        if (localServerResponse.ok) {
          const localServerData = await localServerResponse.json();
          console.log('Local server maintenance_repair information added:', localServerData);
        } else {
          console.error('Failed to add vehicle information to local server');
        }
    
        // Reset form fields after successful submission
        setMyManRepData(vehicleManRepairData);
        setDate('');
        setMileage('');
        setMaintenance_repair('');
        setParts('');
        setVehicleSide('');
        setServiceProvider('');
        setServiceProviderLocation('');
        setCostOfService('');
        setNextServiceDue('');
        setReceipt_InvoiceNumber('');
        setNote_Issues('');
      } catch (error) {
        console.error('Error occurred while sending data:', error);
      }
    
    

  //   try{
  //      const GSres = await fetch("http://localhost:8080/GasStations/add", {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(vehicleManRepairData),
  //   });
  //   if (response.ok) {
  //     const result = await response.json();
  //     console.log('Data successfully sent to Google Sheet:', result);
  //   } else {
  //     console.error('Failed to send data to Google Sheet');
  //   }
  // } catch (error) {
  //   console.error('Error:', error);
  // }



    alert('maintenance_repair information added successfully');

    window.location.reload();
  };
  

  
  return (
    <>
    <div className="w-full bg-black z-10 relative ">
      
   
  
    
      {/* Dropdown for form selection */}
      <div id="" className=" flex flex-col items-center ">
       <Font family='Libre Baskerville'> <select
          className="bg-gray-900  text-white top-2 relative w-52 text-center appearance-none  border border-green-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline "
          onChange={handleFormChange}
          value={selectedForm}
        >
          <option value=""  >Select an Option:</option>
          <option value="vehicleInformation">Vehicle Information</option>
          <option value="maintenanceAndRepair">Maintenance & Repairs</option>
          <option value="fuelRecord">Vehicle Fuel</option>
          {/* <option value="vehicleRegistration">Vehicle Registration</option> */}
          <option value="insuranceRecords">Vehicle Insurance</option>
        </select> </Font>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      {/* Conditionally render forms based on the selected option */}
      {selectedForm === 'vehicleInformation' && (
        <div className="VehicleInformation  flex justify-center items-center w-full  absolute bottom-40 top-96  sm:absolute sm:bottom-52  lg:absolute lg:bottom-52" >
        
<form className='bg-gray-900 text-white p-8 rounded border-solid border-1 border-white shadow-md w-full max-w-md text-center'>
              <p className='text-2xl'>Vehicle Information</p>
              <br />
              <label htmlFor="vin" className='relative right-3'>VIN</label>
              <input required type="text" id="vin" name="vin" className='bg-gray-400 rounded-md' autoFocus value={vin} onChange={(e) => setVin((e.target.value))} />
              <span className="error-message" id="nameError"></span>
              <br />
              <label htmlFor="make" className='relative right-3'>Make</label>
              <input required type="text" name="make" id="make" className='bg-gray-400 rounded-md mt-1 relative right-1' value={make} onChange={(e) => setMake(e.target.value)} />
              <span className="error-message" id="makeError"></span>
              <br />
              <label htmlFor="model" className='relative right-3'>Model</label>
              <input required type="text" name="model" id="model" className='bg-gray-400 rounded-md mt-1 relative right-2' value={model} onChange={(e) => setModel(e.target.value)} />
              <span className="error-message" id="modelError"></span>
              <br />
              <label htmlFor="year" className='relative right-3'>Year</label>
              <input required type="number" name="year" id="year" className='bg-gray-400 rounded-md mt-1 ' value={year} onChange={(e) => setYear((e.target.value))} />
              <span className="error-message" id="yearError"></span>
              <br />

              <button type="submit" onClick={handleSubmit} className='bg-blue-500 rounded w-24 mt-2 text-white font-semibold' >Submit</button>
          </form>

        </div>
      )}

{/* <form  action='https://script.google.com/macros/s/AKfycbzno-t29z5TCzUPxJvd_L67SSJ3IyZgYsCtPScRmdFK784aU_cCmKOHFQa5ma4srga_zw/exec' id="MaintenanceAndRepairRecordsform" name='excel-form' className='bg-white p-8 rounded shadow-md w-full max-w-md text-center'> */}


      {selectedForm === 'maintenanceAndRepair' && (
        <div className="MaintenanceAndRepairRecords   flex justify-center items-center w-full  absolute bottom-40 top-96   sm:absolute sm:bottom-52  lg:absolute lg:bottom-52">
          <form  className='bg-gray-900  text-white p-2 rounded border-solid border-1 border-white shadow-md w-full max-w-md text-center' >
              <legend>Maintenance And Repairs</legend>
              <br />
              <label htmlFor="date" className='relative right-3'>Date</label>
              <input type="date" name="date" required autoFocus className='bg-blue-400 rounded-md  text-center' value={date} onChange={(e) => setDate(e.target.value)} />
              <br />
              <label htmlFor="mileage" className='relative right-3'>Mileage</label>
              <input type="number" name="mileage" required autoFocus className='bg-blue-400 rounded-md mt-1 text-center'value={mileage} onChange={(e) => setMileage(e.target.value)}/>
              <br />
              <label htmlFor="maintenance_repair" className='relative right-3'>Maintenance/Repair</label>
              <select name="maintenance_repair" id="maintenance_repair" className='bg-blue-400 rounded-md mt-1 text-center' value={maintenance_repair} onChange={(e) => setMaintenance_repair(e.target.value)}>
              <option value="">Select an option...</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Repair">Repair</option>
              </select>
              <br/>
              <label htmlFor="parts" className='relative right-3'>Change/Replace</label>
              <select name="parts" id="parts" className='bg-blue-400 rounded-md mt-1 text-center' value={parts} onChange={(e) => setParts(e.target.value)}>
                <option value="">Select an option...</option>
                <option value="Break Pads">Brake Pads</option>
                <option value="Rotors">Rotors</option>
                <option value="Engine Oil, Filter">Engine Oil, Filter</option>
                <option value="Transmission Fluid">Transmission Fluid</option>
                <option value="Coolant Flush">Coolant Flush</option>
                <option value="Battery Checked">Battery Checked</option>
                {/* Other options */}
              </select>
              <br />
              <label htmlFor="vehicleSide" className='relative right-3'>Vehicle Side</label>
              <select name="vehicleSide" id="vehicleSide" className='bg-blue-400 rounded-md mt-1 text-center' value={vehicleSide} onChange={(e) => setVehicleSide(e.target.value)}>
                <option value="">Choose...</option>
                <option value="Engine">Engine</option>
                <option value="Transmission">Transmission</option>
                <option value="Front Driver">Front Driver</option>
                <option value="Rear Passenger">Rear Passenger</option>
              </select>
              <br />
              <label htmlFor="serviceProvider" className='relative right-3' >Service Provider</label>
              <input type="text" name="serviceProvider" required className='bg-blue-400 rounded-md mt-1 text-center' value={serviceProvider} onChange={(e) => setServiceProvider(e.target.value)}/>
             <br/>
              <label htmlFor="serviceProviderLocation" className='relative right-3' >Location</label>
              <input type="text" name="serviceProviderLocation" required className='bg-blue-400 rounded-md mt-1 text-center' value={serviceProviderLocation} onChange={(e) => setServiceProviderLocation(e.target.value)}/>
              <br />
              <label htmlFor="costOfService" className='relative right-3'>Cost of Service</label>
              <input type="number" name="costOfService" placeholder="$" required className='bg-blue-400 mt-1 rounded-md text-center' value={costOfService} onChange={(e) => setCostOfService(e.target.value)}/>
              <br />
              <label htmlFor="nextServiceDue" className='relative right-3'>Next Service Due</label>
              <input type="month" name="nextServiceDue" className='bg-blue-400 rounded-md text-center mt-1' value={nextServiceDue} onChange={(e) => setNextServiceDue(e.target.value)} />
              <br />
              <label htmlFor="receipt_InvoiceNumber" className='relative right-3'>Receipt/Invoice Number</label>
              <input type="text" name="receipt_InvoiceNumber" className='bg-blue-400 rounded-md text-center mt-1' value={receipt_InvoiceNumber} onChange={(e) => setReceipt_InvoiceNumber(e.target.value)} />
              <br/>
              <label htmlFor="note_Issues" className='relative right-3'>Note/Issues</label>
              <input type="textarea" name="note_Issues" className='bg-blue-400 rounded-md text-center mt-1' value={note_Issues} onChange={(e) => setNote_Issues(e.target.value)} />
              <br/>
              <button type="submit" onClick={handleSubmitManRep}  className='bg-blue-600 rounded w-24 mt-2 text-white' >Submit</button>
          </form>
        </div>
      )}

      {selectedForm === 'fuelRecord' && (
        <div className="FuelRecord    flex justify-center items-center w-full  absolute bottom-40 top-96  sm:absolute sm:bottom-52  lg:absolute lg:bottom-52">
          <form id="FuelRecordForm" className='bg-gray-900 text-white p-3 rounded border-solid border-1 border-white shadow-md w-full max-w-md text-center'>
            <fieldset id="FuelRecord">
              <legend>Fuel Record</legend>
              <br />
              <label htmlFor="FuelDate" className='relative right-3'>Date</label>
              <input type="text" name="FuelDate" required className='bg-blue-400 rounded-md mt-1 ' value={FuelDate} onChange={(e) => setFuelDate((e.target.value))} />
              <br />
              <label htmlFor="gallon_LiterPurchased" className='relative right-3'>Gallon/Liter Purchased</label>
              <input type="number" name="gallon_LiterPurchased" required autoFocus className='bg-blue-400 rounded-md mt-1' value={gallon_LiterPurchased} onChange={(e) => setGallonPurchased((e.target.value))}/>
              <br />
              <label htmlFor="pricePerGallon_Liter" className='relative right-3'>Price Per Gallon/Liter</label>
              <input type="number" name="pricePerGallon_Liter" placeholder="$" required className='bg-blue-400 rounded-md mt-1' value={pricePerGallon_Liter} onChange={(e) => setPricePerGallon((e.target.value))}/>
              <br />
              <label htmlFor="totalCost" className='relative right-3'>Total Cost</label>
              <input type="number" name="totalCost" placeholder="$" className='bg-blue-400 rounded-md mt-1 ' required value={totalCost} onChange={(e) => setTotalCost((e.target.value))} />
              <br />
              <label htmlFor="fuelType" className='relative right-3'>Fuel Type</label>
              <select name="fuelType" id="fuelType" className='bg-blue-400 rounded-md mt-1' required value={fuelType} onChange={(e) => setFuelType((e.target.value))}>
                <option value="">Select fuel type...</option>
                <option value="Regular">Regular</option>
                <option value="Premium">Premium</option>
                <option value="Diesel">Diesel</option>
              </select>
              <br />
              <label htmlFor="gasStationName" className='relative right-3'>Gas Station Name</label>
              <input type="text" name="gasStationName" placeholder="$" className='bg-blue-400 rounded-md mt-1 ' required value={gasStationName} onChange={(e) => setGasStationName((e.target.value))} />
              <br />
              <label htmlFor="gasStationLocation" className='relative right-3'>Location</label>
              <input type="text" name="gasStationLocation" placeholder="$" className='bg-blue-400 rounded-md mt-1 ' required value={gasStationLocation} onChange={(e) => setGasStationLocation((e.target.value))} />
              <br />
              <label htmlFor="paymentMethod" className='relative right-3'>Payment Method</label>
              <input type="text" name="paymentMethod" placeholder="$" className='bg-blue-400 rounded-md mt-1 ' required value={paymentMethod} onChange={(e) => setPaymentMethod((e.target.value))} />
              <br />
              <label htmlFor="odometerReading" className='relative right-3'>Odometer</label>
              <input type="number" name="odometerReading" placeholder="$" className='bg-blue-400 rounded-md mt-1 ' required value={odometerReading} onChange={(e) => setOdometerReading((e.target.value))} />
              <br />
              <label htmlFor="tripPurpose" className='relative right-3'>Trip Purpose</label>
              <input type="text" name="tripPurpose" placeholder="$" className='bg-blue-400 rounded-md mt-1 ' required value={tripPurpose} onChange={(e) => setTripPurpose((e.target.value))} />
              <br />
              <button type="submit" onClick={handleSubmitFuel}>Submit</button>
            </fieldset>
          </form>
        </div>
      )}

      {/* {selectedForm === 'vehicleRegistration' && (
        <div className="VehicleRegistration    flex justify-center items-center w-full  absolute bottom-40 top-96  sm:absolute sm:bottom-52  lg:absolute lg:bottom-52">
          <form id="VehicleRegistrationform" className='bg-white p-8 rounded shadow-md w-full max-w-md text-center'>
              <legend>Vehicle Registration</legend>
              <label htmlFor="RegistrationDate" className='relative right-3'>Registration renewal date</label>
              <input type="date" name="RegistrationDate" className='bg-blue-400 rounded pl-3' required />
              <br />
              <label htmlFor="FeesAndTaxes" className='relative right-3' >Fees and Taxes Paid</label>
              <input type="text" name="FeesAndTaxes" placeholder="$" autoFocus  className='bg-blue-400 rounded-md mt-1 '/>
              <br />
              <button type="submit">Submit</button>
          </form>
        </div>
      )} */}

      {selectedForm === 'insuranceRecords' && (
        <div className="InsuranceRecords   flex justify-center items-center w-full  absolute bottom-40 top-96  sm:absolute sm:bottom-52  lg:absolute lg:bottom-52">
          <form id="InsuranceRecordsForm" className='bg-gray-900 text-white p-8 rounded border-solid border-1 border-white shadow-md w-full max-w-md text-center'>
              <legend>Insurance</legend>
              <label htmlFor="policyNumber" className='relative right-3'>Policy Number</label>
              <input type="text" name="policyNumber" required autoFocus  className='bg-blue-400 rounded-md mt-1 relative right-1' value={policyNumber} onChange={(e) => setPolicyNumber((e.target.value))} />
              <br />
              <label htmlFor="provider" className='relative right-3' >Provider</label>
              <input type="text" name="provider" placeholder=""  className='bg-blue-400 rounded-md mt-1 relative -right-5 ' value={provider} onChange={(e) => setProvider((e.target.value))}/>
              <br />
              <label htmlFor="coverageDetails" className='relative right-3'>Coverage Details</label>
              <input type="text" name="coverageDetails" required  className='bg-blue-400 rounded-md mt-1 relative right-2' value={coverageDetails} onChange={(e) => setCoverageDetails((e.target.value))}/>
              <br />
              <label htmlFor="premiumPayment" className='relative right-3'>Premium Payment</label>
              <input type="text" name="premiumPayment" required  className='bg-blue-400 rounded-md mt-1 relative right-2' value={premiumPayment} onChange={(e) => setPremiumPayment((e.target.value))}/>
              <br/>
              <label htmlFor="renewlDate" className='relative right-3'>Renewal Date</label>
              <input type="date" name='renewlDate' value={renewlDate} onChange={(e) => setRenewlDate((e.target.value))}/> <br/>
              <button type="submit" className='bg-blue-600 rounded w-24 mt-2 text-white relative top-2' onClick={handleSubmitInsurLog}>Submit</button>
          </form>
        </div>
      )}

 

    </div>

    <Footer/>
    </>
  
  );
};

export default RecordLog;