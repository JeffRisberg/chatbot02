import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import './Bot.css';

import config from '../../bot/config';
import MessageParser from '../../bot/MessageParser';
import ActionProvider from '../../bot/ActionProvider';

function Bot() {

  return (
    <div className="Chatbot">
      <header className="Chatbot-header">
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </header>
    </div>
  )
}

export default Bot;
