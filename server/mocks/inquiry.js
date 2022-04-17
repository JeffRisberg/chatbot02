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
    }

    else if (inquiry.includes('skills')) {
      answer = {
        'text': 'I found the following items',
        'widget': 'buttons',
        'choices': [
          {'text': 'Data Science', id: 1, 'link': 'data_science'},
          {'text': 'Javascript', id: 2, 'link': 'javascript'}
        ]
      };
    }

    else if (inquiry.includes('flavors')) {
      answer = {
        'text': 'I found the following items',
        'widget': 'buttons',
        'choices': [
          {'text': 'Strawberry', id: 101, 'link': 'strawberry'},
          {'text': 'Vanilla', id: 102, 'link': 'vanilla'},
          {'text': 'Chocolate', id: 103, 'link': 'chocolate'}
        ]
      };
    }

    else if (inquiry.includes('reset')) {
      answer = {'text': 'Ok, let\'s start over'};
    }

    answer['status'] = 'ok';
    res.send(answer);
  });

  app.use('/api/inquiry', inquiryRouter);
};
