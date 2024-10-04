import React from 'react'
import BackNav from './beforeLoginNav'
import { Navbar } from 'react-bootstrap';
import Navb from './Navbar';

function CustomerSupport() {
  return (
    <>
<Navb/>

    <div className=" sm:p-6 lg:p-8 flex justify-center items-center  bg-black min-h-screen">
      <form
        action="https://public.herotofu.com/v1/77da8c70-7efa-11ef-a713-f1ff48b47695"
        method="post"
        acceptCharset="UTF-8"
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md"
      >
        <h1>Customer Support</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Your Name
          </label>
          <input
            name="Name"
            id="name"
            type="text"
            required
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Your Email
          </label>
          <input
            name="Email"
            id="email"
            type="email"
            required
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="issue" className="block text-gray-700 font-bold mb-2">
            Explain your issue
          </label>
          <input
            name="issue"
            id="issue"
            type="textarea"
            required
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="What is your issue?"
          />
        </div>

        <div className="mb-4">
          <input
            type="submit"
            value="Submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          />
        </div>

        {/* Hidden honeypot field */}
        <div className="hidden">
          <input
            type="text"
            name="_gotcha"
            tabIndex="-1"
            autoComplete="off"
            className="w-full"
          />
        </div>
      </form>
    </div>
    </>
  )
}

export default CustomerSupport;
