import React from 'react';
import moment from 'moment';
import WeeklyCalendar from '../components/WeeklyCalendar/WeeklyCalendar';
import './CalendarDashboard.css';
import '../components/WeeklyCalendar/style.less';

function CalendarDashboard(props) {

  const selectedIntervals = [
    {
      uid: 1,
      start: moment({h: 14, m: 0}),
      end: moment({h: 15, m: 30}),
      value: "Study for Exams"
    },
    {
      uid: 2,
      start: moment({h: 16, m: 0}),
      end: moment({h: 18, m: 0}),
      value: "Exercise Time"
    },
    {
      uid: 3,
      start: moment({h: 16, m: 0}).add(1, 'd'),
      end: moment({h: 18, m: 0}).add(1, 'd'),
      value: "Exercise Time"
    },
    {
      uid: 4,
      start: moment({h: 16, m: 0}).add(2, 'd'),
      end: moment({h: 16, m: 45}).add(2, 'd'),
      value: "Music practice"
    },
    {
      uid: 5,
      start: moment({h: 16, m: 0}).add(3, 'd'),
      end: moment({h: 17, m: 45}).add(3, 'd'),
      value: "Softball game"
    },

  ];

  return (
    <div className="CalendarDashboard">
      <WeeklyCalendar
        selectedIntervals={selectedIntervals}
      />
    </div>
  )
}

export default CalendarDashboard;
