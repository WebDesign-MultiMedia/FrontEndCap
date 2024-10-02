// import React, { useState, useEffect } from 'react';

// const Calendar = () => {
//   const [today, setToday] = useState(new Date());
//   const [activeDay, setActiveDay] = useState(today.getDate());
//   const [month, setMonth] = useState(today.getMonth());
//   const [year, setYear] = useState(today.getFullYear());
//   const [eventsArr, setEventsArr] = useState([]);

//   const months = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   useEffect(() => {
//     getEvents();
//   }, []);

//   // Load events from local storage
//   const getEvents = () => {
//     const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
//     setEventsArr(savedEvents);
//   };

//   // Save events to local storage
//   const saveEvents = (events) => {
//     localStorage.setItem('events', JSON.stringify(events));
//   };

//   const initCalendar = () => {
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const prevLastDay = new Date(year, month, 0);
//     const prevDays = prevLastDay.getDate();
//     const lastDate = lastDay.getDate();
//     const day = firstDay.getDay();
//     const nextDays = 7 - lastDay.getDay() - 1;

//     let days = [];

//     // Previous month days
//     for (let x = day; x > 0; x--) {
//       days.push(
//         <div key={`prev-${x}`} className="day prev-date text-gray-400">
//           {prevDays - x + 1}
//         </div>
//       );
//     }

//     // Current month days
//     for (let i = 1; i <= lastDate; i++) {
//       let event = false;
//       eventsArr.forEach((eventObj) => {
//         if (eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year) {
//           event = true;
//         }
//       });

//       const isToday = i === today.getDate() && year === today.getFullYear() && month === today.getMonth();

//       days.push(
//         <div
//           key={`day-${i}`}
//           className={`day cursor-pointer ${isToday ? "today active" : ""} ${event ? "event" : ""}`}
//           onClick={() => handleDayClick(i)}
//         >
//           {i}
//         </div>
//       );
//     }

//     // Next month days
//     for (let j = 1; j <= nextDays; j++) {
//       days.push(
//         <div key={`next-${j}`} className="day next-date text-gray-400">
//           {j}
//         </div>
//       );
//     }

//     return days;
//   };

//   const prevMonth = () => {
//     setMonth(month === 0 ? 11 : month - 1);
//     setYear(month === 0 ? year - 1 : year);
//   };

//   const nextMonth = () => {
//     setMonth(month === 11 ? 0 : month + 1);
//     setYear(month === 11 ? year + 1 : year);
//   };

//   const handleDayClick = (day) => {
//     setActiveDay(day);
//   };

//   const handleToday = () => {
//     setToday(new Date());
//     setMonth(today.getMonth());
//     setYear(today.getFullYear());
//     setActiveDay(today.getDate());
//   };

//   // Add event logic
//   const addEvent = () => {
//     const eventTitle = document.querySelector('.event-name').value;
//     const eventTimeFrom = document.querySelector('.event-time-from').value;
//     const eventTimeTo = document.querySelector('.event-time-to').value;

//     if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
//       alert("Please fill all the fields");
//       return;
//     }

//     const newEvent = {
//       day: activeDay,
//       month: month + 1,
//       year: year,
//       events: [
//         {
//           title: eventTitle,
//           time: `${eventTimeFrom} - ${eventTimeTo}`
//         }
//       ]
//     };

//     const existingEvents = [...eventsArr];
//     const existingDayEvent = existingEvents.find(
//       (event) => event.day === activeDay && event.month === month + 1 && event.year === year
//     );

//     if (existingDayEvent) {
//       existingDayEvent.events.push(newEvent.events[0]);
//     } else {
//       existingEvents.push(newEvent);
//     }

//     setEventsArr(existingEvents);
//     saveEvents(existingEvents);

//     // Clear input fields
//     document.querySelector('.event-name').value = "";
//     document.querySelector('.event-time-from').value = "";
//     document.querySelector('.event-time-to').value = "";
//   };

//   return (
//     <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 bg-gray-900 text-white rounded-lg shadow-lg">
//       {/* Left Side - Calendar */}
//       <div className="left w-full lg:w-2/3 p-4 bg-gray-700 rounded-lg">
//         <div className="calendar">
//           <div className="month flex justify-between items-center mb-4">
//             <i className="fas fa-angle-left prev cursor-pointer" onClick={prevMonth}></i>
//             <div className="date font-bold text-lg">
//               {months[month]} {year}
//             </div>
//             <i className="fas fa-angle-right next cursor-pointer" onClick={nextMonth}></i>
//           </div>
//           <div className="weekdays grid grid-cols-7 text-center text-gray-300 mb-2">
//             <div>Sun</div>
//             <div>Mon</div>
//             <div>Tue</div>
//             <div>Wed</div>
//             <div>Thu</div>
//             <div>Fri</div>
//             <div>Sat</div>
//           </div>
//           <div className="days grid grid-cols-7 gap-2 text-center">
//             {initCalendar()}
//           </div>
//           <div className="goto-today flex justify-between items-center mt-4">
//             <div className="goto flex items-center">
//               <input
//                 type="text"
//                 placeholder="mm/yyyy"
//                 className="date-input border px-2 py-1 rounded-md text-center mr-2"
//               />
//               <button className="goto-btn bg-blue-500 text-white px-4 py-1 rounded-md">Go</button>
//             </div>
//             <button className="today-btn bg-green-500 text-white px-4 py-1 rounded-md" onClick={handleToday}>
//               Today
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Events */}
//       <div className="right w-full lg:w-1/3 p-4 bg-gray-700 rounded-lg">
//         <div className="today-date flex items-center justify-between mb-4">
//           <div className="event-day text-xl font-bold">{new Date(year, month, activeDay).toLocaleString('en-us', { weekday: 'long' })}</div>
//           <div className="event-date text-gray-300">{activeDay} {months[month]} {year}</div>
//         </div>
//         <div className="events h-64 overflow-y-auto bg-gray-800 p-4 rounded-lg">
//           {eventsArr.filter(event => event.day === activeDay && event.month === month + 1 && event.year === year).length > 0 ? (
//             eventsArr.filter(event => event.day === activeDay && event.month === month + 1 && event.year === year)[0].events.map((event, index) => (
//               <div key={index} className="event p-2 bg-gray-700 rounded mb-2">
//                 <h3 className="event-title text-white font-bold">{event.title}</h3>
//                 <p className="event-time text-gray-400">{event.time}</p>
//               </div>
//             ))
//           ) : (
//             <div className="no-event text-gray-500">No Events</div>
//           )}
//         </div>
//         <div className="add-event-wrapper mt-4 bg-gray-800 p-4 rounded-lg">
//           <div className="add-event-header flex justify-between items-center mb-2">
//             <div className="title text-lg font-bold">Add Event</div>
//             <i className="fas fa-times close cursor-pointer"></i>
//           </div>
//           <div className="add-event-body space-y-4">
//             <div className="add-event-input">
//               <input
//                 type="text"
//                 placeholder="Event Name"
//                 className="event-name border w-full px-4 py-2 rounded-md"
//               />
//             </div>
//             <div className="add-event-input">
//               <input
//                 type="text"
//                 placeholder="Event Time From"
//                 className="event-time-from border w-full px-4 py-2 rounded-md"
//               />
//             </div>
//             <div className="add-event-input">
//               <input
//                 type="text"
//                 placeholder="Event Time To"
//                 className="event-time-to border w-full px-4 py-2 rounded-md"
//               />
//             </div>
//           </div>
//           <div className="add-event-footer flex justify-end mt-4">
//             <button className="add-event-btn bg-blue-500 text-white px-4 py-2 rounded-md" onClick={addEvent}>
//               Add Event
//             </button>
//           </div>
//         </div>
//         <button className="add-event2 bg-blue-500 text-white rounded-full p-4 fixed bottom-4 right-4">
//           <i className="fas fa-plus"></i>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Calendar;


