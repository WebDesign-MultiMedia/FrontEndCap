import React from 'react'
import { useState } from 'react';

function Footer() {


        const [isOpen, setIsOpen] = useState(false);
      
        const toggleFooter = () => {
          setIsOpen(!isOpen);
        };

  return (
    <div>

     {/* Footer Toggle Button for small screens */}
     <div
        className={`md:hidden fixed bottom-0 left-0 w-16 h-16 bg-gray-900 text-gray-100 flex items-center justify-center rounded-tr-lg cursor-pointer ${
          isOpen ? 'hidden' : 'block'
        }`}
        onClick={toggleFooter}
      >
        <span className="text-sm">Open</span>
      </div>

      {/* Footer Section */}
      <footer
        className={`bg-gray-900 rounded-lg shadow m-1 dark:bg-gray-800 fixed bottom-0 left-0 w-full z-10 transition-transform duration-300 ease-in-out md:translate-y-0 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-100 sm:text-center dark:text-gray-100">
            © 2024. All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>

          {/* Close Button in Footer */}
          <div
            className="md:hidden fixed top-2 right-2 text-gray-100 cursor-pointer"
            onClick={toggleFooter}
          >
            <span>Close</span>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Footer
