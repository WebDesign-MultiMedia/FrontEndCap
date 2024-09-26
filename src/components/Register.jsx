
import React, { useState } from 'react';
import '/src/index.css';
import { Link } from "react-router-dom";
import Login from "./Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarOn, faChartPie, faFileInvoice, faGaugeMed, faGaugeSimpleHigh } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import validation from "./RegisterVal"

const Registers = () =>{
 
    const [values, setValues] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: ''
   })

   const [errors, setErrors] = useState({})

   const handleInput = (e) =>{
      setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
   }

   const handleSubmit = (e) =>{
      e.preventDefault();

  const validationErrors = validation(values);
  setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        axios.post('http://localhost:8080/Register/Register', values)
          .then(res => console.log(res))
          .catch(err => console.log(err));
      }
   }

    return(
        <>

<div className="flex justify-center space-x-4 flex-wrap h-14 bg-black ">
    <FontAwesomeIcon icon={faFileInvoice} className="text-3xl text-white  pr-4 relative top-5" />
    <FontAwesomeIcon icon={faChartPie} className="text-3xl text-white pr-10 relative top-5" />
    <FontAwesomeIcon icon={faGaugeMed} className="text-3xl text-white relative top-5"/>
    <FontAwesomeIcon icon={faCarOn} className="text-3xl text-white pl-5 relative top-5"/>
  </div>


    <div className="App flex items-center justify-center min-h-screen bg-black">
  <form 
    onSubmit={handleSubmit} htmlFor="Reg"
    className="relative bottom-64 -mb-px h-px w-80 bg-gradient-to-r from-transparent via-sky-300 to-transparent"
  >
    <fieldset className="space-y-4">
      <h2 className="text-2xl font-semibold text-center text-white ">Sign Up</h2>

      <div className="Field">
        <label className="block text-sm font-medium text-white" htmlFor="firstName">
          First name <sup>*</sup>
        </label>
        <input  
        id='firstName'
        autoComplete='name'
          className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          // value= firstName
          name='firstName'
          // onChange={(e) => setFirstName(e.target.value)}
          onChange={handleInput}
          placeholder="First name"
        />
  {errors.firstName && <span className="text-red-600 absolute left-20 ">{errors.firstName}</span>}

      </div>

      <div className="Field">
        <label className="block text-sm font-medium text-white" htmlFor="lastName">Last name</label>
        <input 
        autoComplete='name'
          className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value='lastName'
          id='lastName'
          name='lastName'
          // onChange={(e) => setLastName(e.target.value)}
          onChange={handleInput}
       
        />
          {errors.lastName && <span className="text-red-600 absolute left-20">{errors.lastName}</span>}

      </div>

      <div className="Field">
        <label className="block text-sm font-medium text-white" htmlFor="email">
          Email address <sup>*</sup>
        </label>
        <input 
        id='email'
        autoComplete='email'
          className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          // value={"email"}
        onChange={handleInput}
          // onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          name="email"
        />
          {errors.email && <span className="text-red-600 absolute left-28">{errors.email}</span>}

      </div>

      <div className="Field">
        <label className="block text-sm font-medium text-white" htmlFor="password">
          Password <sup>*</sup>
        </label>
        <input 
        id='password'
          className="text-red-400 mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          // value={"password"}
          onChange={handleInput}
          // onChange={(e) => setPassword({ ...password, value: e.target.value })}
          // onBlur={() => setPassword({ ...password, isTouched: true })}
          placeholder="Password"
          name="password"
        />
          {errors.password && <span className="text-red-600 absolute left-24">{errors.password}</span>}
      </div>

      {/* <div className="Field">
        <label className="block text-sm font-medium text-gray-700" htmlFor="confirmPassword">
          Confirm Password <sup>*</sup>
        </label>
        <input
        id='confirmPassword'
          className="text-red-400 mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          value={confirmPassword.value}
          onChange={(e) => setConfirmPassword({ ...confirmPassword, value: e.target.value })}
          onBlur={() => setConfirmPassword({ ...confirmPassword, isTouched: true })}
          placeholder="Confirm Password"
          name='confirmPassword'
        />
    {confirmPassword.isTouched && confirmPassword.value !== password.value  ? (
              <span className="text-red-500">Passwords do not match.</span>
            ) : null}
      </div> */}

      <div className="Field">
        <label className="block text-sm font-medium text-white" htmlFor="role">
          Role <sup>*</sup>
        </label>
        <select 
        id='role'
        autoComplete='role'
          className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-red-600"
          value={"role"} 
          // name='role'
          //  onChange={(e) => setRole(e.target.value)}    
          onChange={handleInput}
        >
          <option value="role">Role</option>
          <option value="individual">Individual</option>
          <option value="business">Business</option>
        </select>
        
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300 disabled:bg-gray-300"> 
        Create account
      </button>
    {/* {success && <p className="text-green-500 mt-4">Registration successful!</p>} */}

      <Link to="/"  className=" no-underline text-blue-700 bg-white inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2 duration-200"> Login </Link>
    </fieldset>
  </form>
</div>


        </>
    );
};

export default Registers;