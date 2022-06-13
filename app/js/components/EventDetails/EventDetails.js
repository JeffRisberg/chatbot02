import React from 'react';
import '../Calendar/Calendar.css';

function EventDetails(props) {
  const event = props.event;
  //const date = props.date;

  return (
    <>
      <div>{event.title}</div>
    </>
  );
}

export default EventDetails;
