const express = require('express');

const usersRouter = express.Router();

const bodyParser = require('body-parser');

 const userList = [
  {
    "id": 1,
    "firstname": "John",
    "lastname": "Smith",
    "email": "john.smith@gmail.com",
    "title": "Data Scientist II",
    "dateCreated": "January 20, 2022",
  },
  {
    "id": 2,
    "firstname": "Hank",
    "lastname": "Jones",
    "title": "Data Scientist I",
    "email": "hank.jones@gmail.com",
    "dateCreated": "March 20, 2022",
  },
  {
    "id": 3,
    "firstname": "Sarah",
    "lastname": "Underhill",
    "title": "Database Specialist",
    "email": "sarah.underhill@gmail.com",
    "dateCreated": "March 20, 2022",
  },
  {
    "id": 4,
    "firstname": "Tom",
    "lastname": "Woods",
    "title": "Software Engineer",
    "email": "tom.woods@gmail.com",
    "dateCreated": "December 20, 2021",
  }
];

module.exports = (app) => {
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  usersRouter.use(bodyParser.json());

  usersRouter.get('/', function (req, res) {
    res.send(userList)
  });

  usersRouter.get('/:id', function (req, res) {
  });

  app.use('/api/users', usersRouter);
};
