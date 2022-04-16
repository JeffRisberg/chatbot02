const express = require('express');

const inquiryRouter = express.Router();

const bodyParser = require('body-parser');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  inquiryRouter.use(bodyParser.json());

  inquiryRouter.get('/:inquiry', function (req, res) {
    const inquiry = req.params.inquiry;
    var answer = 'I didn\'t understand that';

    if (inquiry.includes('skills')) {
      answer = 'I found the following items';
    }

    else if (inquiry.includes('hello')) {
      answer = 'Hello, nice to meet you';
    }

    else if (inquiry.includes('reset')) {
      answer = 'Ok, let\'s start over';
    }

    res.send({
      'status': 'ok',
      'data': answer
    });
  });

  app.use('/api/inquiry', inquiryRouter);
};
