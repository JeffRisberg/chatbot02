import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './CalendarDashboard.css';

// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';

function CalendarDashboard(props) {
  const user_id = props.user.id;

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios('http://localhost:5000/api/weekly_tasks/' + user_id);
      const events = [];

      result.data.forEach((weekly_task) => {
        const event = {};

        const start = weekly_task.Monday;
        const end = event.end;

        event.start = start.replace('T00:00:00', '');
        event.end = end.replace('T00:00:00', '');

        events.push(event);
      });
      setData(events);
    })();
  }, []);

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        &nbsp;
        {eventInfo.event.title}
      </>
    )
  }

  console.log(data);

  return (
    <div className="CalendarDashboard">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        initialView='timeGridWeek'
        //editable={true}
        //selectable={true}
        //selectMirror={true}
        //dayMaxEvents={true}
        //weekends={this.props.weekendsVisible}
        //datesSet={handleDates}
        //select={handleDateSelect}
        events={data}
        eventContent={renderEventContent} // custom render function
        //eventClick={this.handleEventClick}
        //eventAdd={this.handleEventAdd}
        //eventChange={this.handleEventChange} // called for drag-n-drop/resize
        //eventRemove={this.handleEventRemove}
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
