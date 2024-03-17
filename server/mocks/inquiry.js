const express = require('express');

const inquiryRouter = express.Router();

const bodyParser = require('body-parser');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  inquiryRouter.use(bodyParser.json());

  inquiryRouter.post('/', function (req, res) {
    const inquiry = req.query.inquiry;
    var answer = {'text': 'I didn\'t understand that'};

    if (inquiry.includes('hello')) {
      answer = {'text': 'Hello, nice to meet you'};
    } else if (inquiry.includes('skills')) {
      answer = {
        'text': 'I found the following skills:',
        'widget': 'buttons',
        'choices': [
          {'text': 'Database', id: 1, 'link': 'https://www.tutorialspoint.com/dbms/index.htm'},
          {'text': 'Natural Language Processing', id: 2, 'link': 'https://www.nltk.org/'},
          {'text': 'JavaScript', id: 3, 'link': 'https://www.javascript.com/'},
          {'text': 'DevOps', id: 4, 'link': 'https://www.devops.com/'}
        ]
      };
    } else if (inquiry.includes('courses')) {
      answer = {
        'text': 'We offer the following courses',
        'widget': 'linkList',
        'choices': [
          {'text': 'Accounting', id: 1, 'url': 'accounting'},
          {'text': 'Marketing', id: 2, 'url': 'marketing'},
          {'text': 'Strategy', id: 3, 'url': 'strategy'},
          {'text': 'New Venture Formation', id: 4, 'url': 'new_venture_formation'}
        ]
      };
    } else if (inquiry.includes('flavors')) {
      answer = {
        'text': 'Yum! here are some flavors:',
        'widget': 'buttons',
        'choices': [
          {'text': 'Strawberry', id: 1, 'link': 'strawberry'},
          {'text': 'Vanilla', id: 2, 'link': 'vanilla'},
          {'text': 'Chocolate', id: 3, 'link': 'chocolate'}
        ]
      };
    } else if (inquiry.includes('jobsC')) {
      answer = {
        'text': 'Here is the vertical bar chart:',
        'widget': 'chart',
        'labels': ['Data Sci I', 'Data Sci II', 'Senior Data Sci', 'Director'],
        'series': [1, 2, 3, 5],
        'type': 'Bar'

      };
    } else if (inquiry.includes('jobs')) {
      answer = {
        'text': 'Here is the horizontal bar chart:',
        'widget': 'chart',
        'labels': ['Data Sci I', 'Data Sci II', 'Senior Data Sci', 'Director', 'CTO'],
        'series': [1, 2, 3, 5, 8],
        'options': {'indexAxis': 'y'},
        'type': 'Bar'
      };
    } else if (inquiry.includes('sales')) {
      answer = {
        'text': 'Sales by Region:',
        'widget': 'table',
        'data': [['North', 'South', 'East', 'West'], [80, 40, 70, 95], ['a', 'b', 'c', 'd']],
      };
    } else if (inquiry.includes('eval')) {
      answer = {
        'text': 'Here is your evaluation',
        'widget': 'table',
        'data': [
          ['', 'Before', 'After'],
          ['Speech Organization', 'high', 'high'],
          ['Vocal Variety', 'medium', 'medium'],
          ['Relevance', 'medium', 'high'],
          ['Comfort Level', 'low', 'medium']
        ],
      };
    } else if (inquiry.includes('schedule')) {
      answer = {
        'text': 'Here is a table:',
        'widget': 'table',
        'data': [
          ['Advanced Database', '04-May-2022'],
          ['Machine Learning', '16-May-2022'],
          ['Kubernetes', '24-May-2022'],
          ['Team Management', '06-Jun-2022']
        ]
      };
    } else if (inquiry.includes('dashboard')) {
      answer = {
        'text': 'Click on link below',
        'widget': 'linkToDashboard'
      };
    } else if (inquiry.includes('reset')) {
      answer = {'text': 'Ok, let\'s start over'};
    }

    answer.status = 'ok';
    res.send(answer);
  });

  app.use('/api/inquiry', inquiryRouter);
};
