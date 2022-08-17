import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import './CalendarDashboard.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// eslint-disable-next-line no-unused-vars

function CalendarDashboard(props) {
  const user_id = props.user.id;

  const localizer = momentLocalizer(moment);

  const [data, setData] = useState([]);

  const host = '';

  useEffect(() => {
    (async () => {
      const events = [];
      var result = await axios(host + '/api/monthly_goals/' + user_id + '?all=1');

      result.data.forEach((monthly_goal) => {
        const event = {};

        const start = monthly_goal.start;
        const end = monthly_goal.end;

        event.start = moment(start).toDate();
        event.end = moment(end).toDate();
        event.title = 'Monthly: ' + monthly_goal.name;
        event.color = monthly_goal.done === 1 ? '#be9e2a' : '#136dd2';

        events.push(event);
      });

      result = await axios(host + '/api/weekly_tasks/' + user_id + '?all=1');

      result.data.forEach((weekly_task) => {
        const event = {};

        const start = weekly_task.start;
        const end = weekly_task.end;

        event.start = moment(start).toDate();
        event.end = moment(end).toDate();
        event.title = 'Weekly: ' + weekly_task.name;
        event.color = weekly_task.done === 1 ? '#191' : '#D88';

        events.push(event);
      });

      result = await axios(host + '/api/daily_tasks/' + user_id + '?all=1');

      result.data.forEach((daily_task) => {
        const event = {};

        const start = daily_task.start;
        const end = daily_task.end;

        event.start = moment.utc(start).toDate();
        event.end = moment.utc(end).toDate();
        event.title = daily_task.name;
        event.color = daily_task.done === 1 ? '#191' : '#D88';

        events.push(event);
      });

      result = await axios(host + '/api/events/' + user_id);

      result.data.map((e) => {
        const event = {};

        event.start = moment.utc(e.start).toDate();
        event.end = moment.utc(e.end).toDate();
        event.title = e.title;
        event.color = e.color;

        events.push(event);
      });

      setData(events);
    })();
  }, []);

  function eventStyleGetter(event) {
    let style = {
      border: '0px',
    };
    if (event.color) {
      style.backgroundColor = event.color
    }

    return {
      style: style
    };
  }

  const views = {
    month: true,
    week: true,
    day: true
  };

  return (
    <div className="CalendarDashboard">
      <Calendar
        localizer={localizer}
        events={data}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        style={{height: 'calc(100vh - 45px)'}}
        views={views}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.app.user
});

export default connect(
  mapStateToProps,
  null
)(CalendarDashboard);
