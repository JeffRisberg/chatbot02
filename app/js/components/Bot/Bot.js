import React from 'react';
import {connect} from 'react-redux';
import Chatbot from 'react-chatbot-kit';
import {createChatBotMessage} from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import './Bot.css';

import config from '../../bot/config';
import MessageParser from '../../bot/MessageParser';
import ActionProvider from '../../bot/ActionProvider';

function Bot(props) {
  const screen_tab = props.screen_tab || 'unknown|Hello';
  const index = screen_tab.indexOf('|');
  const initial_message = screen_tab.substr(index+1);

  config.initialMessages = [
    createChatBotMessage(initial_message)
  ];

  return (
    <div className="Chatbot">
      <header className="Chatbot-header">
        <Chatbot
          key={screen_tab}
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </header>
    </div>
  )
}

const mapStateToProps = (state) => ({
  screen_tab: state.app.screen_tab,
});

export default connect(
  mapStateToProps,
  {}
)(Bot);
