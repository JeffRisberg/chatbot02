import React, {Component} from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import './ChatbotPage.css';

import config from '../bot/config';
import MessageParser from '../bot/MessageParser';
import ActionProvider from '../bot/ActionProvider';

class ChatbotPage extends Component {
  render() {

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
    );
  }
}

export default ChatbotPage;
