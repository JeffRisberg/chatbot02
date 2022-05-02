import React from 'react';
import {createChatBotMessage} from 'react-chatbot-kit';
import Buttons from '../components/Buttons/Buttons';
import LinkList from '../components/LinkList/LinkList';
import Chart from '../components/Chart/Chart';
import Table from '../components/Table/Table';
import LinkToDashboard from '../components/LinkToDashboard/LinkToDashboard';

const config = {
  botName: 'chatbot02i',
  initialMessages: [
    createChatBotMessage('How are you doing today?')
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
      widgetName: 'chart',
      widgetFunc: (props) => <Chart {...props} />
    },
    {
      widgetName: 'table',
      widgetFunc: (props) => <Table {...props} />
    },
    {
      widgetName: 'linkToDashboard',
      widgetFunc: (props) => <LinkToDashboard {...props} />
    }
  ]
};

export default config;
