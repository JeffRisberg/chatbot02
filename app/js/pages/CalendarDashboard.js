import React from 'react';
import Calendar from '../components/Calendar/Calendar';
import './CalendarDashboard.css';

function CalendarDashboard(props) {
  console.log(props);

  return (
    <div className="CalendarDashboard">
      <Calendar/>
    </div>
  )
}

export default CalendarDashboard;
