import React from 'react';
import {createChatBotMessage} from 'react-chatbot-kit';
import Buttons from '../components/Buttons/Buttons';

const config = {
  botName: 'chatbot02',
  initialMessages: [
    createChatBotMessage('Hi, I\'m here to help. What do you want to learn?')
  ],
  state: {
    choices: '',
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E'
    },
    chatButton: {
      backgroundColor: '#376B7E'
    },
  },
  widgets: [
    {
      widgetName: 'buttons',
      widgetFunc: (props) => <Buttons {...props} />,
      mapStateToProps: ['choices'],
    }
  ]
};

export default config;
