import '/src/index.css';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';


function VehicleTracker() {

    
  const [mydata, setMyData] = useState([]);
  
  useEffect(()=>{
   async function fetchMaintenanceRepaiData(){
     try {
       const response = await fetch("http://localhost:8080/MaintenanceRepairs");
       const data = await response.json();
       setMyData(data);
     } catch (error) {
       console.error(error); 
     }
   }
   fetchMaintenanceRepaiData();
  }, [])
  console.log(mydata);

  return (
<>
<Navbar/>
<div className="bg-blue-500 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl">Maintenance and Repair Tracker</h2>
          <p className="mt-2 text-lg text-center leading-8 text-gray-600">
            Keep a track of all maintenance and repairs along the way !
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        


        {mydata.map((item, index)=>{
    return(
    <>  
            <article key={index} className=" article flex max-w-xl flex-col items-center justify-between bg-blue-100 rounded-2xl shadow-2xl shadow-current ">
                    {/* Date and Mileage */}
              <div className="flex items-center gap-x-4 text-md">
                <time dateTime={item.formattedDate} className="text-blue-500 ">
                  {item.formattedDate}
                </time>

                <p className="relative z-10 rounded-full bg-red-400 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                  M:{item.mileage}
                </p>
              </div>

              <div className="group relative">

                {/* Maintenance/Repair, Parts, Vehicle Side */}
                <h3 className='mt-3 text-center text-2xl font-semibold leading-6 text-pink-900 group-hover:text-gray-600'>Maintenance/Repair:</h3>
                <p className='text-center'>{item.maintenance_repair}</p>

                <h3 className='mt-3 text-center text-2xl font-semibold leading-6 text-pink-900 group-hover:text-gray-600'>Parts:</h3>  
                <p className='text-center'>{item.parts}</p>
                  <br />

                 <h3 className='mt-3 text-center text-2xl font-semibold leading-6 text-pink-900 group-hover:text-gray-600'>Vehicle Side:</h3>
                 <p className='text-center'>{item.vehicleSide}</p>
              </div>
              <div className="mx-auto mt-2 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-red-700 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-0">

              <div className="relative flex items-center gap-x-4 h-30 bg-yellow-400 rounded-2xl">
                <div className="text-md leading-6">
                {/* Service Provider, Cost of Service, Next Service Due, Notes/Issues */}
                <h4 className='text-center text-blue-900 font-semibold w-64'>Service Provider:</h4>
                <p className='font-semibold text-red-400 text-center'>{item.serviceProvider}</p>

                  <h4 className='text-center text-red-900 font-semibold'>Cost of Service:</h4>
                  <p className="font-semibold text-bredlue-400 text-center">${item.costOfService}</p>

                  <h4 className='text-center text-red-900 font-semibold'>Next Service Due:</h4>
                  <p className="text-red-600 text-center">{item.nextServiceDue}</p>


                  <h4 className=' text-center text-red-900 font-semibold'>Notes/Issues: </h4>
                  <p className="text-red-600 text-center">{item.note_Issues}</p>

                </div>
              </div>
              </div>
            </article>

      </>
      );
  })}
  
  </div>
      </div>
    </div> 

    </>
  );
}

export default VehicleTracker;
