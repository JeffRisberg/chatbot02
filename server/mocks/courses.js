const express = require('express');

const coursesRouter = express.Router();

const bodyParser = require('body-parser');

const courseList = [
  {
    'id': 1,
    'name': 'Machine Learning',
    'dateCreated': 'January 20, 2022',
  },
  {
    'id': 2,
    'name': 'Database',
    'dateCreated': 'March 20, 2022',
  },
  {
    'id': 3,
    'name': 'Team Management',
    'dateCreated': 'March 20, 2022',
  },

];

module.exports = (app) => {
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  coursesRouter.use(bodyParser.json());

  coursesRouter.get('/', function (req, res) {
    res.send(courseList);
  });

  coursesRouter.get('/:id', function (req, res) {
  });

  app.use('/api/courses', coursesRouter);
};
