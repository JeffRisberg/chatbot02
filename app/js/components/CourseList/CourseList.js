import React, {useEffect, useState} from 'react';
import {Card, Table} from '@themesberg/react-bootstrap';
import axios from 'axios';

// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';

function CourseList() {

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:5000/api/courses");
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
                <th className="border-bottom">Name</th>
                <th className="border-bottom">Created at</th>
              </tr>
            </thead>
            <tbody>
              {data.map(u => (
                <tr key={u.id}>
                  <td>
                    <Card.Link className="d-flex align-items-center">
                      <div className="d-block">
                        <span className="fw-bold">{u.name}</span>
                      </div>
                    </Card.Link>
                  </td>
                  <td><span className="fw-normal">{u.dateCreated}</span></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  )
}

export default CourseList;
