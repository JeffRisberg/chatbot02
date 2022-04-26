import React from 'react';
import {createChatBotMessage} from 'react-chatbot-kit';
import Buttons from '../components/Buttons/Buttons';
import LinkList from '../components/LinkList/LinkList';
import Schedule from '../components/Schedule/Schedule';

const config = {
  botName: 'chatbot02',
  initialMessages: [
    createChatBotMessage('Hi, I\'m here to help. What do you want to learn ?')
  ],
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
      widgetFunc: (props) => <Buttons {...props} />
    },
    {
      widgetName: 'linkList',
      widgetFunc: (props) => <LinkList {...props} />
    },
    {
      widgetName: 'schedule',
      widgetFunc: (props) => <Schedule {...props} />
    }
  ]
};

export default config;
