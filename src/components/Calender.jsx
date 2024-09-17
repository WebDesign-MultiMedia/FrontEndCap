import React, { useState, useEffect } from 'react';
import '/src/index.css';

const CalendarApp = () => {
  const [today, setToday] = useState(new Date());
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [activeDay, setActiveDay] = useState(today.getDate());
  const [eventsArr, setEventsArr] = useState([]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventTimeFrom, setEventTimeFrom] = useState('');
  const [eventTimeTo, setEventTimeTo] = useState('');
  const [dateInput, setDateInput] = useState('');

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const initCalendar = () => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    const daysArray = [];

    for (let x = day; x > 0; x--) {
      daysArray.push({ date: prevDays - x + 1, prevMonth: true });
    }

    for (let i = 1; i <= lastDate; i++) {
      let event = eventsArr.some(
        (eventObj) =>
          eventObj.day === i &&
          eventObj.month === month + 1 &&
          eventObj.year === year
      );
      let todayCheck =
        i === new Date().getDate() &&
        year === new Date().getFullYear() &&
        month === new Date().getMonth();

      daysArray.push({
        date: i,
        isToday: todayCheck,
        hasEvent: event,
        isActive: todayCheck && i === activeDay,
      });
    }

    for (let j = 1; j <= nextDays; j++) {
      daysArray.push({ date: j, nextMonth: true });
    }

    return daysArray;
  };

  const prevMonth = () => {
    setMonth(month - 1);
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    }
  };

  const nextMonth = () => {
    setMonth(month + 1);
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    }
  };

  const handleDayClick = (day) => {
    setActiveDay(day);
  };

  const handleTodayClick = () => {
    setToday(new Date());
    setMonth(today.getMonth());
    setYear(today.getFullYear());
  };

  const handleGotoDate = () => {
    const [inputMonth, inputYear] = dateInput.split('/');
    if (
      inputMonth > 0 &&
      inputMonth <= 12 &&
      inputYear.length === 4 &&
      parseInt(inputYear)
    ) {
      setMonth(inputMonth - 1);
      setYear(inputYear);
    } else {
      alert('Invalid Date');
    }
  };

  const handleAddEventSubmit = () => {
    if (!eventTitle || !eventTimeFrom || !eventTimeTo) {
      alert('Please fill all the fields');
      return;
    }

    let eventExists = false;
    const newEventsArr = eventsArr.map((eventObj) => {
      if (eventObj.day === activeDay && eventObj.month === month + 1 && eventObj.year === year) {
        eventExists = eventObj.events.some((e) => e.title === eventTitle);
        if (!eventExists) {
          eventObj.events.push({ title: eventTitle, time: `${eventTimeFrom} - ${eventTimeTo}` });
        }
        return eventObj;
      }
      return eventObj;
    });

    if (!eventExists && !newEventsArr.some((e) => e.day === activeDay)) {
      newEventsArr.push({
        day: activeDay,
        month: month + 1,
        year,
        events: [{ title: eventTitle, time: `${eventTimeFrom} - ${eventTimeTo}` }],
      });
    }

    setEventsArr(newEventsArr);
    setShowAddEvent(false);
    setEventTitle('');
    setEventTimeFrom('');
    setEventTimeTo('');
  };

  useEffect(() => {
    // Sync with localStorage (similar to componentDidMount)
    const savedEvents = JSON.parse(localStorage.getItem('events'));
    if (savedEvents) {
      setEventsArr(savedEvents);
    }
  }, []);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('events', JSON.stringify(eventsArr));
  }, [eventsArr]);

  return (
    <div className="container">
      <div className="left">
        <div className="calendar">
          <div className="month">
            <i className="fas fa-angle-left prev" onClick={prevMonth}></i>
            <div className="date">{`${months[month]} ${year}`}</div>
            <i className="fas fa-angle-right next" onClick={nextMonth}></i>
          </div>
          <div className="weekdays">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="days">
            {initCalendar().map((day, index) => (
              <div
                key={index}
                className={`day ${day.prevMonth ? 'prev-date' : ''} ${
                  day.nextMonth ? 'next-date' : ''
                } ${day.isToday ? 'today' : ''} ${day.isActive ? 'active' : ''} ${
                  day.hasEvent ? 'event' : ''
                }`}
                onClick={() => handleDayClick(day.date)}
              >
                {day.date}
              </div>
            ))}
          </div>
          <div className="goto-today">
            <div className="goto">
              <input
                type="text"
                placeholder="mm/yyyy"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
              />
              <button className="goto-btn" onClick={handleGotoDate}>
                Go
              </button>
            </div>
            <button className="today-btn" onClick={handleTodayClick}>
              Today
            </button>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="today-date">
          <div className="event-day">{new Date(year, month, activeDay).toDateString().split(' ')[0]}</div>
          <div className="event-date">{`${activeDay} ${months[month]} ${year}`}</div>
        </div>
        <div className="events">
          {/* Render events here based on activeDay */}
        </div>
        <div className={`add-event-wrapper ${showAddEvent ? 'active' : ''}`}>
          <div className="add-event-header">
            <div className="title">Add Event</div>
            <i className="fas fa-times close" onClick={() => setShowAddEvent(false)}></i>
          </div>
          <div className="add-event-body">
            <div className="add-event-input">
              <input
                type="text"
                placeholder="Event Name"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
            </div>
            <div className="add-event-input">
              <input
                type="text"
                placeholder="Event Time From"
                value={eventTimeFrom}
                onChange={(e) => setEventTimeFrom(e.target.value)}
              />
            </div>
            <div className="add-event-input">
              <input
                type="text"
                placeholder="Event Time To"
                value={eventTimeTo}
                onChange={(e) => setEventTimeTo(e.target.value)}
              />
            </div>
          </div>
          <div className="add-event-footer">
            <button className="add-event-btn" onClick={handleAddEventSubmit}>
              Add Event
            </button>
          </div>
        </div>
      </div>
      <button className="add-event2" onClick={() => setShowAddEvent(!showAddEvent)}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default CalendarApp;
