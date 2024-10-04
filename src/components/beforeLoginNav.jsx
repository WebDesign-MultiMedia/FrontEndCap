import '/src/App.css';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Registers from './Register';
import Home from './Home';
import { Route, Routes } from 'react-router-dom';
import Font, { Text } from 'react-font';

const navigation = [
  { name: 'Login', href: '/Login', current: false }, 
  { name: 'Register', href: '/Register', current: false },

];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const HomeNavbar = () => {
  return (
    <>
  
  <Disclosure as="nav" className="bg-gray-900 h-20">
        {({ open }) => (
          <>
            <div className="max-w-screen-xl px-4 py-3 mx-auto">
              <div className="flex items-center justify-between sm:justify-center">
                {/* Full navigation for medium and large screens */}
                <div className="hidden sm:flex space-x-6 justify-center">
                  {navigation.map((item) => (
                  <Font family='Graduate'>  <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? 'text-blue-400 dark:text-white sm:text-2xl'
                          : 'text-blue-400  hover:bg-red-600 hover:text-green-300 sm:hover:text-white sm:text-2xl',
                        'px-2 w-40 text-center no-underline py-2 rounded-md text-lg font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link> </Font>
                  ))}
                </div>

                {/* Hamburger menu for small screens */}
                <div className="flex sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {/* Mobile menu dropdown */}
            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-lg font-medium no-underline'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      </>
  );
};

export default HomeNavbar;
