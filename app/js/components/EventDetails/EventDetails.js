import React from 'react';
import '../Calendar/Calendar.css';

function EventDetails(props) {
  const event = props.event;
  //const date = props.date;

  function setOpen(props) {
    console.log(props)
  }

  return (
    <>
      <div onClick={() => setOpen(true)}>{event.title}</div>
    </>
  );
}

export default EventDetails;
