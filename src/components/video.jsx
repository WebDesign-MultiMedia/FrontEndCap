import React from 'react'
import vd from '../assets/bgVid.mp4'
import vd2 from '../assets/getStarted.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCoffee, faFolderOpen, faUserAlt } from '@fortawesome/free-solid-svg-icons'; // Import the icon you want to use
import { Link } from 'react-router-dom';
import Login from './Login';

const bg = () => {
  return (
  <div className='relative w-full h-screen'>
  {/* Background Video */}
  <div className='absolute left-0 w-full h-full overflow-hidden'>
    <video 
      src={vd2} 
      autoPlay 
      muted 
      loop 
      className='w-full h-full object-cover'
    />
  </div>

  {/* Content above the video */}
  <div className='relative w-full h-full flex items-end pl-48 pb-32'>
    {/* Add your content here */}
    {/* Example: */}
    <h1 className='text-white'>V Tracker</h1>
    <Link to='Login'><FontAwesomeIcon icon={faUserAlt} className='text-red-500 relative pl-3 hover:bg-green text-3xl' /></Link>
  </div>
</div>

  )
}

export default bg;
