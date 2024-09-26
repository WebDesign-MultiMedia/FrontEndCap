import '/src/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vehicleData = { vin, make, model, year };

    try {
      const response = await fetch('http://localhost:8080/vehicleInformations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicleData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Vehicle information added:', data);
        // You can add more logic here, like resetting the form or displaying a success message.
      } else {
        console.error('Failed to add vehicle information');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <>
      {/* Dropdown for form selection */}
      <div id="optionSelection" className=" flex flex-col items-center min-h-screen  ">
        <select
          className="bg-red-200 relative w-52 text-center appearance-none  border border-green-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline "
          onChange={handleFormChange}
          value={selectedForm}
        >
          <option value="">Select an Option:</option>
          <option value="vehicleInformation">Vehicle Information</option>
          <option value="maintenanceAndRepair">Maintenance & Repairs</option>
          <option value="fuelRecord">Vehicle Fuel</option>
          <option value="vehicleRegistration">Vehicle Registration</option>
          <option value="insuranceRecords">Vehicle Insurance</option>
        </select>
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
        <div className="VehicleInformation  flex justify-center items-center w-full mb-96 relative bottom-96" >
          <form id="formVal1" onSubmit={handleSubmit} className='bg-white p-8 rounded shadow-md w-full max-w-md text-center'>
              <p className='text-2xl'>Vehicle Information</p>
              <br />
              <label htmlFor="vin" className='relative right-3'>VIN</label>
              <input type="text" id="vin" name="vin" className='bg-blue-400 rounded-md' autoFocus value={vin} onChange={(e) => setVin(e.target.value)} />
              <span className="error-message" id="nameError"></span>
              <br />
              <label htmlFor="make" className='relative right-3'>Make</label>
              <input type="text" name="make" id="make" className='bg-blue-400 rounded-md mt-1 relative right-1' value={make} onChange={(e) => setMake(e.target.value)} />
              <span className="error-message" id="makeError"></span>
              <br />
              <label htmlFor="model" className='relative right-3'>Model</label>
              <input type="text" name="model" id="model" className='bg-blue-400 rounded-md mt-1 relative right-2' value={model} onChange={(e) => setModel(e.target.value)} />
              <span className="error-message" id="modelError"></span>
              <br />
              <label htmlFor="year" className='relative right-3'>Year</label>
              <input type="number" name="year" id="year" className='bg-blue-400 rounded-md mt-1 ' value={year} onChange={(e) => setYear(e.target.value)} />
              <span className="error-message" id="yearError"></span>
              <br />

              <button type="submit" className='bg-blue-600 rounded w-24 mt-2 text-white' >Submit</button>
          </form>
        </div>
      )}


      {selectedForm === 'maintenanceAndRepair' && (
        <div className="MaintenanceAndRepairRecords  flex justify-center items-center w-full mb-96 relative bottom-96">
          <form id="MaintenanceAndRepairRecordsform" className='bg-white p-8 rounded shadow-md w-full max-w-md text-center'>
              <legend>Maintenance And Repairs</legend>
              <br />
              <label htmlFor="date" className='relative right-3'>Date</label>
              <input type="date" name="date" required autoFocus className='bg-blue-400 rounded-md  text-center' />
              <br />
              <label htmlFor="Mileage" className='relative right-3'>Mileage</label>
              <input type="number" name="Mileage" required autoFocus className='bg-blue-400 rounded-md mt-1 text-center'/>
              <br />
              <label htmlFor="changeReplace" className='relative right-3'>Change/Replace</label>
              <select name="changeReplace" id="changeReplace" className='bg-blue-400 rounded-md mt-1 text-center' required>
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
              <label htmlFor="VehicleLocation" className='relative right-3'>Vehicle Side</label>
              <select name="VehicleLocation" id="VehicleLocation" className='bg-blue-400 rounded-md mt-1 text-center' required>
                <option value="">Choose...</option>
                <option value="Engine">Engine</option>
                <option value="Transmission">Transmission</option>
                <option value="Front Driver">Front Driver</option>
                <option value="Rear Passenger">Rear Passenger</option>
              </select>
              <br />
              <label htmlFor="ServiceProvider" className='relative right-3' >Service Provider</label>
              <input type="text" name="ServiceProvider" required className='bg-blue-400 rounded-md mt-1 text-center'/>
              <br />
              <label htmlFor="CostOfService" className='relative right-3'>Cost of Service</label>
              <input type="number" name="CostOfService" placeholder="$" required className='bg-blue-400 mt-1 rounded-md text-center'/>
              <br />
              <label htmlFor="NextServiceDue" className='relative right-3'>Next Service Due</label>
              <input type="month" name="NextServiceDue" className='bg-blue-400 rounded-md text-center mt-1' />
              <br />
              <button type="submit" className='bg-blue-600 rounded w-24 mt-2 text-white' >Submit</button>
          </form>
        </div>
      )}

      {selectedForm === 'fuelRecord' && (
        <div className="FuelRecord  flex justify-center items-center w-full mb-96 relative bottom-96">
          <form id="FuelRecordForm" className='bg-white p-8 rounded shadow-md w-full max-w-md text-center'>
            <fieldset id="FuelRecord">
              <legend>Fuel Record</legend>
              <br />
              <label htmlFor="FuelDate" className='relative right-3'>Date</label>
              <input type="date" name="FuelDate" required className='bg-blue-400 rounded-md mt-1 ' />
              <br />
              <label htmlFor="GallonPurchased" className='relative right-3'>Gallon/Liter Purchased</label>
              <input type="number" name="GallonPurchased" required autoFocus className='bg-blue-400 rounded-md mt-1 '/>
              <br />
              <label htmlFor="PricePerGallon" className='relative right-3'>Price Per Gallon/Liter</label>
              <input type="number" name="PricePerGallon" placeholder="$" required className='bg-blue-400 rounded-md mt-1 '/>
              <br />
              <label htmlFor="TotalCost" className='relative right-3'>Total Cost</label>
              <input type="number" name="TotalCost" placeholder="$" className='bg-blue-400 rounded-md mt-1 ' required />
              <br />
              <label htmlFor="fuelType" className='relative right-3'>Fuel Type</label>
              <select name="fuelType" id="fuelType" className='bg-blue-400 rounded-md mt-1' required>
                <option value="">Select fuel type...</option>
                <option value="Regular">Regular</option>
                <option value="Premium">Premium</option>
                <option value="Diesel">Diesel</option>
              </select>
              <br />
              <button type="submit">Submit</button>
            </fieldset>
          </form>
        </div>
      )}

      {selectedForm === 'vehicleRegistration' && (
        <div className="VehicleRegistration  flex justify-center items-center w-full mb-96 relative bottom-96">
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
      )}

      {selectedForm === 'insuranceRecords' && (
        <div className="InsuranceRecords  flex justify-center items-center w-full mb-96 relative bottom-96">
          <form id="InsuranceRecordsForm" className='bg-white p-8 rounded shadow-md w-full max-w-md text-center'>
              <legend>Insurance</legend>
              <label htmlFor="PolicyNumber" className='relative right-3'>Policy Number</label>
              <input type="number" name="PolicyNumber" required autoFocus  className='bg-blue-400 rounded-md mt-1 relative right-1 '/>
              <br />
              <label htmlFor="Provider" className='relative right-3' >Provider</label>
              <input type="text" name="Provider" placeholder=""  className='bg-blue-400 rounded-md mt-1 relative -right-5 ' />
              <br />
              <label htmlFor="CoverageDetails" className='relative right-3'>Coverage Details</label>
              <input type="text" name="CoverageDetails" required  className='bg-blue-400 rounded-md mt-1 relative right-2'/>
              <br />
              <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default RecordLog;