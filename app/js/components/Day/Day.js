import React from 'react';
import EventDetails from '../EventDetails/EventDetails';
import './Day.css';

function Day(props) {
  const day = props.day;
  const dayNumber = String(day.getDate());

  const events = day.events;

  return (
    <div className="day">
      <header>
        <div className="number-of-day">
          {dayNumber.length === 1 ? `0${dayNumber}` : dayNumber}
        </div>
      </header>
      <div className="events">
        {events?.map(event => (
          <div key={event.id} className={'event'}>
            <EventDetails
              event={event}
              date={day}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Day;
