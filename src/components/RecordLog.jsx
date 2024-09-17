import '/src/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

const RecordLog = () => {
  // State variable for selected form
  const [selectedForm, setSelectedForm] = useState('');

  // Handle the form selection change
  const handleFormChange = (event) => {
    setSelectedForm(event.target.value);
  };

  return (
    <>
      {/* Dropdown for form selection */}
      <div id="optionSelection" className="inline-block relative w-44">
        <select
          className="block appearance-none w-full border border-green-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
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
        <div className="VehicleInformation">
          <form id="formVal1">
            <fieldset id="VehicleInformation">
              <legend>Vehicle Information</legend>
              <br />
              <label htmlFor="VIN">VIN</label>
              <input type="text" id="VIN" name="VIN" autoFocus required />
              <span className="error-message" id="nameError"></span>
              <br />
              <label htmlFor="MAKE">Make</label>
              <input type="text" name="MAKE" id="MAKE" required />
              <span className="error-message" id="makeError"></span>
              <br />
              <label htmlFor="MODEL">Model</label>
              <input type="text" name="MODEL" id="MODEL" required />
              <span className="error-message" id="modelError"></span>
              <br />
              <label htmlFor="YEAR">Year</label>
              <input type="number" name="YEAR" id="YEAR" required />
              <span className="error-message" id="yearError"></span>
              <br />

              <button type="submit">Submit</button>
            </fieldset>
          </form>
        </div>
      )}

      {selectedForm === 'maintenanceAndRepair' && (
        <div className="MaintenanceAndRepairRecords">
          <form id="MaintenanceAndRepairRecordsform">
            <fieldset id="MaintenanceAndRepairRecords">
              <legend>Maintenance And Repairs</legend>
              <br />
              <label htmlFor="date">Date</label>
              <input type="date" name="date" required />
              <br />
              <label htmlFor="Mileage">Mileage</label>
              <input type="number" name="Mileage" required />
              <br />
              <label htmlFor="changeReplace">Change/Replace</label>
              <select name="changeReplace" id="changeReplace" required>
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
              <label htmlFor="VehicleLocation">Vehicle Side</label>
              <select name="VehicleLocation" id="VehicleLocation" required>
                <option value="">Choose...</option>
                <option value="Engine">Engine</option>
                <option value="Transmission">Transmission</option>
                <option value="Front Driver">Front Driver</option>
                <option value="Rear Passenger">Rear Passenger</option>
              </select>
              <br />
              <label htmlFor="ServiceProvider">Service Provider</label>
              <input type="text" name="ServiceProvider" required />
              <br />
              <label htmlFor="CostOfService">Cost of Service</label>
              <input type="number" name="CostOfService" placeholder="$" required />
              <br />
              <label htmlFor="NextServiceDue">Next Service Due</label>
              <input type="month" name="NextServiceDue" />
              <br />
              <button type="submit">Submit</button>
            </fieldset>
          </form>
        </div>
      )}

      {selectedForm === 'fuelRecord' && (
        <div className="FuelRecord">
          <form id="FuelRecordForm">
            <fieldset id="FuelRecord">
              <legend>Fuel Record</legend>
              <br />
              <label htmlFor="FuelDate">Date</label>
              <input type="date" name="FuelDate" required />
              <br />
              <label htmlFor="GallonPurchased">Gallon/Liter Purchased</label>
              <input type="number" name="GallonPurchased" required />
              <br />
              <label htmlFor="PricePerGallon">Price Per Gallon/Liter</label>
              <input type="number" name="PricePerGallon" placeholder="$" required />
              <br />
              <label htmlFor="TotalCost">Total Cost</label>
              <input type="number" name="TotalCost" placeholder="$" required />
              <br />
              <label htmlFor="fuelType">Fuel Type</label>
              <select name="fuelType" id="fuelType" required>
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
        <div className="VehicleRegistration">
          <form id="VehicleRegistrationform">
            <fieldset id="VehicleRegistration">
              <legend>Vehicle Registration</legend>
              <label htmlFor="RegistrationDate">Registration renewal date</label>
              <input type="date" name="RegistrationDate" required />
              <br />
              <label htmlFor="FeesAndTaxes">Fees and Taxes Paid</label>
              <input type="text" name="FeesAndTaxes" placeholder="$" />
              <br />
              <button type="submit">Submit</button>
            </fieldset>
          </form>
        </div>
      )}

      {selectedForm === 'insuranceRecords' && (
        <div className="InsuranceRecords">
          <form id="InsuranceRecordsForm">
            <fieldset id="InsuranceRecords">
              <legend>Insurance</legend>
              <label htmlFor="PolicyNumber">Policy Number</label>
              <input type="number" name="PolicyNumber" required />
              <br />
              <label htmlFor="Provider">Provider</label>
              <input type="text" name="Provider" placeholder="Name" />
              <br />
              <label htmlFor="CoverageDetails">Coverage Details</label>
              <input type="text" name="CoverageDetails" required />
              <br />
              <button type="submit">Submit</button>
            </fieldset>
          </form>
        </div>
      )}
    </>
  );
};

export default RecordLog;
