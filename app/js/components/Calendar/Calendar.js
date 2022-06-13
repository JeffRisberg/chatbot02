import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Day from '../Day/Day';
import {generateDates} from '../../actions/time';
import './Calendar.css';

import {set_screen} from '../../actions/screen';

// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';

function Calendar(props) {
  const user = props.user;

  const [date] = useState(new Date());
  const [days] = useState(generateDates(date));
  const [data, setData] = useState([]);

  const daysBefore = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  useEffect(() => {
    (async () => {
      const result = await axios('http://localhost:5000/api/events/' + user.id);
      setData(result.data);
    })();
  }, []);

  console.log(data);

  days.forEach(day => {
    var day1 = day;
    var day2 = new Date(day1);
    day2.setDate(day.getDate() + 1);
    day.events = [];

    data.forEach(event_data => {
      const start_date = new Date(event_data['start_time']);
      const end_date = new Date(event_data['end_time']);
      const title = event_data['title'];

      if (start_date <= day2 && end_date >= day1) {
        console.log('match on ' + title);
        day.events.push(event_data);
      }
    })
  });


  const name_of_month = date.toLocaleString('default', {
    month: 'long',
  });

  const year_of_month = date.getFullYear();

  function done() {
    props.set_screen(null);
  }

  return (
    <div>
      <div style={{textAlign: "center", fontWeight: "bold", fontSize: "20px"}}>
        {name_of_month}
        &nbsp;
        {year_of_month}
        &nbsp;&nbsp;&nbsp;
        <button type="button" onClick={done} className="btn btn-link">Done</button>
      </div>
      <div className="dayNamesRow">
        <div className="dayNames">
          {daysBefore.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
      </div>
      <div className="calendar">
        <div className="parent">
          {days.map((day) => (
            <Day
              key={day.toISOString()}
              day={day}
              events={day.events}  // should be day.events
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.app.user
});

export default connect(
  mapStateToProps,
  {set_screen}
)(Calendar);
