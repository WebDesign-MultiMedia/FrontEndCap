// import React, { useEffect, useRef, useState } from 'react';
// import { Chart, registerables } from 'chart.js';
// import Navbar from './Navbar';

// // Register all necessary components
// Chart.register(...registerables);

// const Monitor = () => {
//   const [mydata, setMyData] = useState([]);
//   const [error, setError] = useState(null);
//   const chart1Ref = useRef(null);
//   const chartInstanceRef = useRef(null);

//   useEffect(() => {
//     const fetchMaintenanceRepairData = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/MaintenanceRepairs'); // Replace with your API endpoint
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setMyData(Array.isArray(data) ? data : []); // Ensure data is an array
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError(error.message);
//         setMyData([]); // Set to empty array on error
//       }
//     };

//     fetchMaintenanceRepairData();
//   }, []);

//   useEffect(() => {
//     if (mydata.length === 0) return;

//     const manc = mydata.filter((item) => item.type === 'Maintenance').length;
//     const rep = mydata.filter((item) => item.type === 'Repairs').length;

//     // Destroy existing chart instance if it exists
//     if (chartInstanceRef.current) {
//       chartInstanceRef.current.destroy();
//     }

//     // Maintenance and Repairs Chart
//     const ctx1 = chart1Ref.current.getContext('2d');
//     chartInstanceRef.current = new Chart(ctx1, {
//       type: 'pie',
//       data: {
//         labels: ['Maintenance', 'Repairs'],
//         datasets: [{
//           label: 'Maintenance and Repairs',
//           data: [manc, rep], // Add counts of Maintenance and Repairs
//           borderWidth: 3,
//           backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
//           borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
//         }],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//       },
//     });

//     return () => {
//       // Cleanup charts on component unmount
//       if (chartInstanceRef.current) {
//         chartInstanceRef.current.destroy();
//       }
//     };
//   }, [mydata]);

//   return (
//     <>
//       <Navbar />
//       <div>
//         <canvas ref={chart1Ref}></canvas>
//       </div>
//       {error ? (
//         <div style={{ color: 'red' }}>Error: {error}</div>
//       ) : (
//         <div>
//           {mydata.map((item, index) => (
//             <div key={index}>
//               <p>{item.name}</p>
//               <p>{item.details}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// };

// export default Monitor;