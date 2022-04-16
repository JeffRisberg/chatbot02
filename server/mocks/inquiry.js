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
        'choices': [{'label1':'link1'}, {'label2':'link2'}]
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
