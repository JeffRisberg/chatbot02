const express = require('express');

const scheduleRouter = express.Router();

const bodyParser = require('body-parser');

const scheduleList = [
  {
    "id": 1,
    "courseName": "Machine Learning",
    "lessonName": "Lesson 1",
    "status": "scheduled",
    "finalComments": null,
    "scheduledStart": "May 6, 2022",
    "scheduledEnd": "May 7, 2022"
  },
  {
    "id": 2,
    "courseName": "Machine Learning",
    "lessonName" : "Lesson 2",
    "status": "scheduled",
    "finalComments": null,
    "scheduledStart": "May 6, 2022",
    "scheduledSnd": "May 7, 2022"
  },
  {
    "id": 3,
    "courseName": "Machine Learning",
    "lessonName" : "Lesson 3",
    "status": "scheduled",
    "finalComments": null,
    "scheduledStart": "May 6, 2022",
    "scheduledEnd": "May 7, 2022"
  },
  {
    "id": 4,
    "courseName": "Machine Learning",
    "lessonName" : "Lesson 4",
    "status": "scheduled",
    "finalComments": null,
    "scheduledStart": "May 6, 2022",
    "scheduledEnd": "May 7, 2022"
  },
  {
    "id": 5,
    "courseName": "Advanced Database",
    "lessonName" : "Lesson 1",
    "status": "scheduled",
    "finalComments": null,
    "scheduledStart": "May 7, 2022",
    "scheduledEnd": "May 7, 2022"
  }
];

module.exports = (app) => {
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  scheduleRouter.use(bodyParser.json());

  scheduleRouter.get('/', function (req, res) {
    res.send(scheduleList)
  });

  scheduleRouter.get('/:id', function (req, res) {
    res.send(scheduleList)
  });

  app.use('/api/schedule', scheduleRouter);
};
