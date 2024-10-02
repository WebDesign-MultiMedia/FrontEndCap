import React, { useEffect, useState } from "react";
import Register from "./Register";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarOn, faChartPie, faFileInvoice, faGaugeMed } from '@fortawesome/free-solid-svg-icons';
import validation from "./LoginVal";
import Home from "./Home";
import Bg from "./video"

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value })); // Update to set value correctly
  };

  useEffect(() => {
    // Fetch user data from API
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8080/Logins');
        const data = await response.json();
        setUserData(Array.isArray(data) ? data : []); // Ensure it's an array
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserData([]);
      }
    };

    fetchUserData();
  }, []);

  const handleRedirect = (e) => {
    e.preventDefault();

    const user = userData.find(user => user.email === values.email && user.password === values.password);

    if (user) {
      navigate('/Home');
      alert("Login successful");
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <>
     <Bg />
      <div className="flex justify-center space-x-4 flex-wrap h-14 bg-black">
        <FontAwesomeIcon icon={faFileInvoice} className="text-3xl text-white pr-4 relative top-5" />
        <FontAwesomeIcon icon={faChartPie} className="text-3xl text-white pr-10 relative top-5" />
        <FontAwesomeIcon icon={faGaugeMed} className="text-3xl text-white relative top-5" />
        <FontAwesomeIcon icon={faCarOn} className="text-3xl text-white pl-5 relative top-5" />
      </div>

      <div className="bg-black text-white flex min-h-screen flex-col items-center pb-24 sm:justify-center sm:pt-0">
        <a href="#" className="no-underline text-white">
          <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2 relative top-10">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
              </svg>
            </div>
            V Tracker
          </div>
        </a>

        <div className="mt-12 w-full max-w-lg sm:mt-10 relative top-10">
          <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
          <div className="mx-5 border border-white/20 shadow-sm lg:rounded-xl lg:shadow-none">
            <div className="flex flex-col p-6">
              <h3 className="text-xl font-semibold leading-6 tracking-tighter">Login</h3>
              <p className="mt-1.5 text-sm font-medium text-white/50">Welcome back, enter your credentials to continue.</p>
            </div>
            <div className="p-6 pt-0">
              <form onSubmit={handleRedirect}>
                <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5">
                  <label htmlFor="email" className="text-xs font-medium text-muted-foreground text-gray-400">
                    Email
                  </label>
                  <input onChange={handleInput} type="email" name="email" value={values.email} autoComplete="off" className="block w-full bg-transparent text-sm" />
                  {errors.email && <span className="text-red-600">{errors.email}</span>}
                </div>
                <div className="mt-4 group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5">
                  <label htmlFor="password" className="text-xs font-medium text-muted-foreground text-gray-400">
                    Password
                  </label>
                  <input onChange={handleInput} type="password" name="password" value={values.password} className="block w-full bg-transparent text-sm" />
                  {errors.password && <span className="text-red-600">{errors.password}</span>}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" required name="remember" className="outline-none focus:outline-sky-300" />
                    <span className="text-xs">Remember me</span>
                  </label>
                  <a className="text-sm font-medium underline" href="/forgot-password">
                    Forgot password?
                  </a>
                </div>

                <div className="mt-4 flex items-center justify-end gap-x-2">
                  <Link to="/Register" className="no-underline hover:bg-black hover:text-white transition bg-white text-black h-10 px-4 py-2 rounded-md">
                    Register
                  </Link>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  <button className="font-semibold hover:bg-black hover:text-white transition bg-white text-black h-10 px-4 py-2 rounded-md" type="submit">
                    Log in
                  </button>
                </div>
              </form>

              <Routes>
                <Route path="/Register" element={<Register />} />
                <Route path="/Home" element={<Home />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
