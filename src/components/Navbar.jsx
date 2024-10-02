import '/src/App.css'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react';
import { Link } from 'react-router-dom';


const navigation = [
  { name: 'Home', href:'/Home', current: true },
  { name: 'Auto', href: '/AutoParts', current: false },
  { name: 'Expenses', href: '/Expenses', current: false },
  { name: 'Monitor', href: '/Monitor', current: false },
  { name: 'Logs', href: '/vehicleTrackerPage', current: false},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
 {
  return (
    <>
    

<nav class=" border-gray-200 dark:bg-red-900 bg-black ">
    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="https://flowbite.com" class="flex items-center space-x-3 rtl:space-x-reverse no-underline">
            <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
            <span class="self-center font-semibold whitespace-nowrap dark:text-white text-3xl">V Tracker</span>
        </a>
        <div class="flex items-center space-x-6 rtl:space-x-reverse">
            <a href="tel:5541251234" class="text-sm  text-gray-100 dark:text-white hover:underline no-underline">(347) 490-5546</a>
            <a href="#" class="text-md  text-blue-600 dark:text-blue-500 hover:underline hover:text-white no-underline">Login</a>
        </div>
    </div>
</nav>
<nav class=" bg-gray-900 ">
    <div class="max-w-screen-xl px-4 py-3 mx-auto">
        <div class=" flex items-center justify-center  ">
        {navigation.map((item) => (
            <Link 
              key={item.name}
              to={item.href}
              className={classNames (
                item.current ? 'text-blue-400 dark:text-white sm:text-2xl hover:bg-blue-200 sm:text-white': 'text-blue-400  font-semibold hover:bg-red-600 sm:hover:bg-gray-700 hover:text-green-300 sm:hover:text-white sm:text-2xl ',
                'px-2 w-40 text-center no-underline py-2 rounded-md text-lg font-medium'
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.name}
            </Link>
          ))}
          
            {/* <ul class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                <li>
                    <a href="#" class="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</a>
                </li>
                <li>
                    <a href="#" class="text-gray-900 dark:text-white hover:underline">Company</a>
                </li>
                <li>
                    <a href="#" class="text-gray-900 dark:text-white hover:underline">Team</a>
                </li>
                <li>
                    <Link to="Monitor" class="text-gray-900 dark:text-white hover:underline">Features</Link>
                </li>
            </ul> */}
        </div>
    </div>
</nav>

</>

    // <div className="flex space-x-4">
    //             {navigation.map((item) => (
    //               <a
    //                 key={item.name}
    //                 href={item.href}
    //                 aria-current={item.current ? 'page' : undefined}
    //                 className={classNames(
    //                   item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
    //                   'rounded-md px-3 py-2 text-sm font-medium',
    //                 )}
    //               >
    //                 {item.name}
    //               </a>
    //             ))}
    //           </div>

    
    
    // <Disclosure as="nav" className="bg-blue-800" id="nav">
    //   <div className="mx-auto max-w-2xl px-2 sm:px-6 lg:px-8">
    //     <div className="relative flex h-16 items-center justify-between">
    //       <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
    //         {/* Mobile menu button*/}
    //         <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
    //           <span className="absolute -inset-0.5" />
    //           <span className="sr-only">Open main menu</span>
    //           <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
    //           <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
    //         </DisclosureButton>
    //       </div>
    //       <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
    //         <div className="flex flex-shrink-0 items-center">
    //           <img
    //             alt="Your Company"
    //             src="https://t3.ftcdn.net/jpg/02/97/65/02/360_F_297650255_szbE8VaTvFupf5XjjPZjkzrQtvWO3GQl.jpg"
    //             className="h-8 w-auto"
    //           />
    //         </div>
    //         <div className="hidden sm:ml-6 sm:block">
    //           <div className="flex space-x-4">
    //             {navigation.map((item) => (
    //               <a
    //                 key={item.name}
    //                 href={item.href}
    //                 aria-current={item.current ? 'page' : undefined}
    //                 className={classNames(
    //                   item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
    //                   'rounded-md px-3 py-2 text-sm font-medium',
    //                 )}
    //               >
    //                 {item.name}
    //               </a>
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //       <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
    //         <button
    //           type="button"
    //           className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    //         >
    //           <span className="absolute -inset-1.5" />
    //           <span className="sr-only">View notifications</span>
    //           <BellIcon aria-hidden="true" className="h-6 w-6" />
    //         </button>

    //         {/* Profile dropdown */}
    //         <Menu as="div" className="relative ml-3">
    //           <div>
    //             <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
    //               <span className="absolute -inset-1.5" />
    //               <span className="sr-only">Open user menu</span>
    //               <img
    //                 alt=""
    //                 src="https://c8.alamy.com/comp/2G109BJ/mechanic-avatar-car-services-character-profile-user-person-man-icon-isolated-vector-illustration-2G109BJ.jpg"
    //                 className="h-8 w-8 rounded-full"
    //               />
    //             </MenuButton>
    //           </div>
    //           <MenuItems
    //             transition
    //             className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
    //           >
    //             <MenuItem>
    //               <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
    //                 Your Profile
    //               </a>
    //             </MenuItem>
    //             <MenuItem>
    //               <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
    //                 Settings
    //               </a>
    //             </MenuItem>
    //             <MenuItem>
    //               <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
    //                 Sign out
    //               </a>
    //             </MenuItem>
    //           </MenuItems>
    //         </Menu>
    //       </div>
    //     </div>
    //   </div>

      

    // </Disclosure>

  )
};
};

export default Navbar;