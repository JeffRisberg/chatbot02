import React, {useEffect, useState} from 'react';
import {Card, Table} from '@themesberg/react-bootstrap';
import axios from 'axios';

// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';

function UserList() {

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios('http://localhost:5000/api/users');
      setData(result.data);
    })();
  }, []);

  return (
    <div>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body>
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">First Name</th>
                <th className="border-bottom">Last Name</th>
                <th className="border-bottom">Title</th>
                <th className="border-bottom">Joined on Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map(u => (
                <tr key={u.id}>
                  <td><span className="fw-normal"><div className="small text-gray">{u.firstName}</div></span></td>
                  <td><span className="fw-normal"><div className="small text-gray">{u.lastName}</div></span></td>
                  <td><span className="fw-normal"><div className="small text-gray">{u.title}</div></span></td>
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

export default UserList;
