const express = require('express');

const inquiryRouter = express.Router();

const bodyParser = require('body-parser');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  inquiryRouter.use(bodyParser.json());

  const itemsDB = app.itemsDB;

  inquiryRouter.get('/', function (req, res) {
    const answer = "I found the following items";
    res.send({
      'status': 'ok',
      'data': answer
    })
  });

  app.use('/api/inquiry', inquiryRouter);
};
