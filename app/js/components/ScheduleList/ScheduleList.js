import React, {useEffect, useState} from 'react';
import {Card, Table} from "@themesberg/react-bootstrap";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from "regenerator-runtime";
import "./ScheduleList.css";

function ScheduleList() {

 const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:5000/api/schedule/1");
      setData(result.data.slice(0, 7));
    })();
  }, []);

  return (
    <div>
      <Card border="dark" className="table-wrapper table-responsive shadow-sm">
        <Card.Body>
          <Table hover className="courses-table align-items-center">
            <thead>
            <tr>
              <th className="border-bottom"></th>
              <th className="border-bottom">Course</th>
              <th className="border-bottom">Lesson</th>
              <th className="border-bottom">Start</th>
            </tr>
            </thead>
            <tbody>
            {data.map((u, index) => (
              <tr key={index}>
                <td><span className="fw-normal"><input type="checkbox" /></span></td>
                <td><span className="fw-normal">{u.courseName}</span></td>
                <td><span className="fw-normal">{u.lessonName}</span></td>
                <td><span className="fw-normal">{u.scheduledStart}</span></td>
              </tr>
            ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  )
 }

 export default ScheduleList;
