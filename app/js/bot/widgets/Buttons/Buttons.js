import React from 'react';

import './Buttons.css';

const Buttons = (props) => {
  const choices = props.payload.choices || [];
  const active = props.payload.active || false;

  const choicesMarkup = choices.map((choice) => {
    const link = choice.link;
    var id = choice.id;
    if (link != null) {
      id = JSON.stringify(link)
    }

    if (active) {
      return (
        <button
          className='button'
          key={choice.id}
          id={id}
          onClick={props.actionProvider.handleClickButton}
        >
          {choice.text}
        </button>
      )
    } else {
      return (
        <button
          className='button'
          key={choice.id}
          id={id}
        >
          {choice.text}
        </button>
      )
    }
  });

  return <div className="buttons-container">{choicesMarkup}</div>;
};

export default Buttons;
