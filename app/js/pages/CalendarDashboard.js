import React, {useEffect, useState} from 'react';
import axios from "axios";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './CalendarDashboard.css';

const DELAY = 200;

// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';

function CalendarDashboard(props) {
  console.log(props);

  const [data, setData] = useState([]);

  //function createEventId() {
  //  return String(eventGuid++);
  //}

  useEffect(() => {
    (async () => {
      const result = await axios('http://localhost:5000/api/events/' + 1);
      setData(result.data);
    })();
  }, []);


  const events = [
    {
      id: 1,
      title: "Parents' Anniversary",
      start: '2022-06-10'
    },
    {
      id: 2,
      title: "Bob Birthday",
      start: '2022-06-12'
    },
    {
      id: 3,
      title: 'Workout at Gym',
      start: '2022-06-20T16:00:00',
      end: '2022-06-20T18:00:00'
    },
    {
      id: 4,
      title: 'Workout at Gym',
      start: '2022-06-21T16:00:00',
      end: '2022-06-21T18:00:00'
    },
    {
      id: 5,
      title: 'Workout at Gym',
      start: '2022-06-22T16:00:00',
      end: '2022-06-22T18:00:00'
    },
    {
      id: 6,
      title: 'Workout at Gym',
      start: '2022-06-27T16:00:00',
      end: '2022-06-27T18:00:00'
    },
    {
      id: 7,
      title: 'Workout at Gym',
      start: '2022-06-28T16:00:00',
      end: '2022-06-28T18:00:00'
    },
    {
      id: 8,
      title: 'Study time',
      start: '2022-06-29T14:00:00',
      end: '2022-06-29T16:00:00'
    },
    {
      id: 9,
      title: 'Workout at Gym',
      start: '2022-06-29T16:00:00',
      end: '2022-06-29T18:00:00'
    }
  ];

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        &nbsp;
        {eventInfo.event.title}
      </>
    )
  }

  function requestEventsInRange(startStr, endStr) {
    console.log(`[STUB] requesting events from ${startStr} to ${endStr}`)

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(events) // won't use the start/end, always return whole DB
      }, DELAY)
    })
  }

  const handleDates = (rangeInfo) => {
    console.log(rangeInfo);
    console.log(requestEventsInRange(rangeInfo.startStr, rangeInfo.endStr))
  }

  const handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar
    let title = prompt('Please enter a new title for your event')

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({ // will render immediately. will call handleEventAdd
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      }, true) // temporary=true, will get overwritten when reducer gives new events
    }
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
        datesSet={handleDates}
        select={handleDateSelect}
        events={events}
        eventContent={renderEventContent} // custom render function
        //eventClick={this.handleEventClick}
        //eventAdd={this.handleEventAdd}
        //eventChange={this.handleEventChange} // called for drag-n-drop/resize
        //eventRemove={this.handleEventRemove}
      />
    </div>
  )
}

export default CalendarDashboard;
