import React from 'react';
import '../Calendar/Calendar.css';

function EventDetails(props) {
  const event = props.event;
  var color = props.event.color;
  if (color === null) {
    color = '#6daa6d';
  }
  //const date = props.date;

  return (
    <>
      <div style={{background: color}}>{event.title}</div>
    </>
  );
}

export default EventDetails;
