import React, {useEffect, useState} from "react";
import { useParams} from "react-router-dom";
import NavBar from '../components/NavBar';
import {Card, Table} from "@themesberg/react-bootstrap";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import axios from "axios";
import './HRTeamDashboard.css';

function HRTeamDashboard() {
  let { id } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:5000/api/teams/" + id);
      setData(result.data[0]);
    })();
  }, [id]);

  var courses = [
    {id: 1, name: "Database", count: 28},
    {id: 2, name: "Team Management", count: 16},
    {id: 3, name: "Web Design", count: 14},
    {id: 4, name: "Financial Reporting", count: 4}
  ];

  var names = ["John", "Christos", "Utkarsh", "Vivek", "Mukesh"];

  var datasets = [
     {data: [4, 7, 4, 3, 5],
      backgroundColor: [
                "#ffbb11",
                "#e7f0d1",
                "#ec3071",
                "#b3baaf",
                "#2a71d0",
                "#50AF95"
              ]}
  ];

  if (id == 2) {
    courses = [
      {id: 1, name: "Database", count: 20},
      {id: 2, name: "Team Management", count: 6},
      {id: 3, name: "Financial Reporting", count: 4},
      {id: 4, name: "Web Design", count: 4},
    ];

    names = ["Ashok", "Alan", "Vish", "Thomas", "Antonis", "George"];

    datasets = [
       {data: [13, 5, 1, 6, 8, 10],
        backgroundColor: [
                 "#ffbb11",
                 "#e7f0d1",
                 "#ec3071",
                 "#b3baaf",
                 "#2a71d0",
                 "#50AF95"
               ]}
    ];
  }

  if (id == 3) {
      courses = [
        {id: 1, name: "Marketing", count: 21},
        {id: 2, name: "Financial Reporting", count: 14},
        {id: 3, name: "Database", count: 10},
        {id: 4, name: "Operations", count: 10},
        {id: 5, name: "Web Design", count: 6},
      ];

      names = ["Rick", "Bill", "Susan", "Simon", "Mark", "Sam", "Terry"];

      datasets = [
         {data: [11, 15, 51, 33, 26, 30, 27],
          backgroundColor: [
                    "#ffbb11",
                    "#e7f0d1",
                    "#ec3071",
                    "#b3baaf",
                    "#2a71d0",
                    "#50AF95"
                  ]}
      ];
  }

  if (id == 4) {
    courses = [
      {id: 1, name: "Machine Learning", count: 11},
      {id: 2, name: "Database", count: 10},
      {id: 3, name: "Web Design", count: 8},
    ];

    names = ["Haoyi", "Ant", "David", "Unmang", "Louis", "Aditya"];

    datasets = [
       {data: [21, 18, 36, 21, 25, 11]}
    ];
  }

  return (
    <div className="hr-team-dashboard">
      <NavBar/>

      <div className="row">
        <div className="col-md-12">
          <Card>
            <Card.Body>
              <h2>Team: {data.name}</h2>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <h3>Courses Taken</h3>
          <Bar
            data={{'labels': names, 'datasets': datasets}}
            options={{
              maintainAspectRatio: true,
              plugins: {
                title: { display: false },
                legend: { display: false },
              }
            }}
          />
        </div>
        <div className="col-md-4">
          <h3>Top Courses Taken</h3>
          <Card border="dark" className="table-wrapper table-responsive shadow-sm">
            <Card.Body>
              <Table hover className="courses-table align-items-center">
                <thead>
                <tr>
                  <th className="border-bottom">Course</th>
                  <th className="border-bottom">Count</th>
                </tr>
                </thead>
                <tbody>
                {courses.map(u => (
                  <tr key={u.id}>
                    <td><span className="fw-normal">{u.name}</span></td>
                    <td style={{textAlign: "right"}}><span className="fw-normal">{u.count}</span></td>
                  </tr>
                ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>

    </div>
  )
}

export default HRTeamDashboard;
