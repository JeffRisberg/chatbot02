import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import './ChatbotPage.css';

import config from '../bot/config';
import MessageParser from '../bot/MessageParser';
import ActionProvider from '../bot/ActionProvider';

function ChatbotPage() {

  const [showBot, toggleBot] = useState(false);

  const saveMessages = (messages /*, HTMLString*/) => {
    console.log("saveMessages");
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  };

  const loadMessages = () => {
    console.log("loadMessages");

    const messages = JSON.parse(localStorage.getItem('chat_messages'));
    return messages;
  };

  return (
    <div className="Chatbot">
      <header className="Chatbot-header">
        {showBot && (
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            messageHistory={loadMessages()}
            saveMessages={saveMessages}
          />
          )}
      </header>
      <button onClick={() => toggleBot((prev) => !prev)}>Bot</button>
    </div>
  );
}

export default ChatbotPage;
