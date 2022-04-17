import React from 'react';

import './Buttons.css';

const Buttons = (props) => {
  console.log(props);
  const choices = props.choices || [];

  const choicesMarkup = choices.map((choice) => (
    <button
      className='button'
      key={choice.id}
    >
      {choice.text}
    </button>
  ));

  console.log(choicesMarkup);

  return <div className="buttons-container">{choicesMarkup}</div>;
};

export default Buttons;
