import React from 'react'
import vd from '../assets/bgVid.mp4'
import vd2 from '../assets/getStarted.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCoffee, faFolderOpen, faUserAlt } from '@fortawesome/free-solid-svg-icons'; // Import the icon you want to use
import { Link } from 'react-router-dom';
import Login from './Login';
import HomeNavbar from './beforeLoginNav';

const bg = () => {
  return (
<>

<HomeNavbar />
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


</div>
</>
  )
}

export default bg;
