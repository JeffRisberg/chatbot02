import React, {Component} from 'react';
import './App.css';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

import config from './bot/config';
import MessageParser from './bot/MessageParser';
import ActionProvider from './bot/ActionProvider';

class App extends Component {
  render() {

    return (
      <div className="App">
        <header className="App-header">
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

export default App;
