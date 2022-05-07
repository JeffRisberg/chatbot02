import React, {useEffect, useState} from 'react';
import {Card, Table} from "@themesberg/react-bootstrap";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from "regenerator-runtime";

function ScheduleList() {

 const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:5001/api/schedule/1");
      setData(result.data);
    })();
  }, []);

  return (
    <div>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body>
          <Table hover className="courses-table align-items-center">
            <thead>
            <tr>
              <th className="border-bottom">Course</th>
              <th className="border-bottom">Lesson</th>
              <th className="border-bottom">Description</th>
              <th className="border-bottom">Status</th>
              <th className="border-bottom">Start</th>
            </tr>
            </thead>
            <tbody>
            {data.map(u => (
              <tr key={u.id}>
                <td><span className="fw-normal">{u.courseName}</span></td>
                <td><span className="fw-normal">{u.lessonName}</span></td>
                <td><span className="fw-normal">{u.description}</span></td>
                <td><span className="fw-normal">{u.status}</span></td>
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
