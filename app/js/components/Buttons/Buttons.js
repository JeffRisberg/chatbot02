import React from 'react';

import './Buttons.css';

const Buttons = (props) => {
  const choices = props.payload || [];

  const choicesMarkup = choices.map((choice) => (
    <button
      className='button'
      key={choice.id}
    >
      {choice.text}
    </button>
  ));

  return <div className="buttons-container">{choicesMarkup}</div>;
};

export default Buttons;
