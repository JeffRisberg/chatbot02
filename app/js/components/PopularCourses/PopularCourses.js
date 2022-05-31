import React, {useEffect, useState} from 'react';
import {Card, Table} from '@themesberg/react-bootstrap';
import axios from 'axios';

// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';

function PopularCourses() {

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:5000/api/popular_courses");
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
                <th className="border-bottom">Count</th>
              </tr>
            </thead>
            <tbody>
              {data.map(u => (
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
  )
}

export default PopularCourses;
