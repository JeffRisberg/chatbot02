import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import TaskModal from '../components/TaskModal/TaskModal';
import './CalendarDashboard.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';

function CalendarDashboard(props) {
  const user_id = props.user.id;

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const events = [];
      var result = await axios('/api/weekly_tasks/' + user_id + '?all=1');

      result.data.forEach((weekly_task) => {
        const event = {};

        const start = weekly_task.start;
        const end = weekly_task.end;

        event.start = Date.parse(start);
        event.end = Date.parse(end);
        event.title = 'Weekly ' + weekly_task.name;
        event.color = weekly_task.done === 1 ? '#8F8' : '#F88';

        events.push(event);
      });

      result = await axios('/api/daily_tasks/' + user_id + '?all=1');

      result.data.forEach((daily_task) => {
        const event = {};

        const start = daily_task.start;
        const end = daily_task.end;

        event.start = Date.parse(start);
        event.end = Date.parse(end);
        event.title = daily_task.name;
        event.color = daily_task.done === 1 ? '#8F8' : '#F88';

        events.push(event);
      });
      setData(events);
    })();
  }, []);

  return (
    <div className="CalendarDashboard">
      <div>
        <Calendar
          localizer={localizer}
          events={data}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
      <TaskModal />
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
