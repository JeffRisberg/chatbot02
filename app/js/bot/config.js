import React from 'react';
import {createChatBotMessage} from 'react-chatbot-kit';
import Buttons from './widgets/Buttons/Buttons';
import LinkList from './widgets/LinkList/LinkList';
import Chart from './widgets/Chart/Chart';
import Table from './widgets/Table/Table';
import ContentUpdater from './widgets/ContentUpdater/ContentUpdater';

const config = {
  botName: 'Chatbot02',
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
      widgetName: 'content_updater',
      widgetFunc: (props) => <ContentUpdater {...props} />
    }
  ]
};

export default config;
