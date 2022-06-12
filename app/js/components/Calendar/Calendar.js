import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import { Day } from "../Day/Day";
import { generateDates } from "../../actions/time";
import axios from "axios";
import "./Calendar.css";

// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';

function Calendar(props) {
  const user = props.user

  const [date] = useState(new Date());
  const [days] = useState(generateDates(date));
  const [data, setData] = useState([]);

  const daysBefore = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  console.log(daysBefore);
  console.log(generateDates);

  useEffect(() => {
    (async () => {
      const result = await axios("/api/events/" + user.id);
      setData(result.data);
    })();
  }, []);

  console.log(data);

  return (
    <div>
      <div className="dayNamesRow">
        <div className="dayNames">
          {daysBefore.map((day) => (
            <div>{day}</div>
          ))}
        </div>
      </div>
      <div className="calendar">
        <div className="parent">
          {days.map((day) => (
            <Day
              key={day.toISOString()}
              day={day}
              events={[]}  // should be day.events
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
  {}
)(Calendar);
