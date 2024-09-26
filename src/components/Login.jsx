import React, { useState } from "react";
 import Register from "./Register";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarOn, faChartPie, faFileInvoice, faGaugeMed, faGaugeSimpleHigh } from '@fortawesome/free-solid-svg-icons';
import Home from "./Home";
import validation from "./LoginVal"
import Homes from "./Home";

const Login = () =>{

             const [values, setValues] = useState({
                email: '',
                password: ''
             })

             const [errors, setErrors] = useState({})
             const handleInput = (e) =>{
                setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
             }

             const handleSubmit = (e) =>{
                e.preventDefault();
                setErrors(validation(values));
             }


  const navigate = useNavigate();

const handleRedirect = () =>{
  navigate('/Home');
};

return (
<>      



  <div className="flex justify-center space-x-4 flex-wrap h-14 bg-black ">
    <FontAwesomeIcon icon={faFileInvoice} className="text-3xl text-white  pr-4 relative top-5" />
    <FontAwesomeIcon icon={faChartPie} className="text-3xl text-white pr-10 relative top-5" />
    <FontAwesomeIcon icon={faGaugeMed} className="text-3xl text-white relative top-5"/>
    <FontAwesomeIcon icon={faCarOn} className="text-3xl text-white pl-5 relative top-5"/>
  </div>

{/*  */}


<div className="bg-black text-white flex min-h-screen flex-col items-center pb-24 sm:justify-center sm:pt-0  ">
  <a href="#" className="no-underline text-white">
      <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2  relative top-10">
          <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
              </svg>
          </div>
         V Tracker
      </div>
  </a>
  <div className=" mt-12 w-full max-w-lg sm:mt-10  relative top-10">
      <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
      <div
          className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
          <div className="flex flex-col p-6">
              <h3 className="text-xl font-semibold leading-6 tracking-tighter">Login</h3>
              <p className="mt-1.5 text-sm font-medium text-white/50">Welcome back, enter your credentials to continue.</p>
          </div>
          <div className="p-6 pt-0">




              <form onSubmit={handleSubmit}>
                  <div>
                      <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                          <div className="flex justify-between">
                              <label
                                  className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400 " htmlFor='email'>Email</label>
                              <div className="absolute right-3 translate-y-2 text-green-200">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                      className="w-6 h-6">
                                      <path fillRule="evenodd"
                                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                          clipRule="evenodd" />
                                  </svg>
                              </div>
                          </div>
                          <div className="flex items-center">
                          <input onChange={handleInput}  autoFocus  type="email" name="email" 
                              autoComplete="off"
                              className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground" />
                                {errors.email && <span className="text-red-600 absolute">{errors.email}</span>}</div>
                      </div>
                  </div>
                  <div className="mt-4">
                      <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                          <div className="flex justify-between">
                              <label
                                  className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400" htmlFor='password'>Password</label>
                          </div>
                          <div className="flex items-center">
                              <input  onChange={handleInput}  type="password" name="password"
                                  className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground" />
                                {errors.password && <span className="text-red-600 absolute">{errors.password}</span>}
                         
                          </div>
                      </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                      <label className="flex items-center gap-2">
                          <input  type="checkbox" name="remember"
                              className="outline-none focus:outline focus:outline-sky-300" />
                          <span className="text-xs">Remember me</span>
                      </label>
                      <a className="text-sm font-medium text-foreground underline" href="/forgot-password">Forgot
                          password?</a>
                  </div>
                  <div className="mt-4 flex items-center justify-end gap-x-2">
                      <Link to='Register' className=" no-underline hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2">Register</Link> 
                      {/* onClick={handleRedirect} */}
                      <button
                          className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                          type="submit"  onClick={handleRedirect}>Log in</button>
                  </div>

              </form>
    <Routes>
               <Route path='/Register' element={<Register/>} />
               <Route path="/Login" element={<Login/>} />
    
                </Routes>
</div>
</div>
</div>
</div>
        </>
    );
};

export default Login;