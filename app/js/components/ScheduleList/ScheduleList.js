import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Card, Table} from '@themesberg/react-bootstrap';
import axios from 'axios';
import './ScheduleList.css';

// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';

function ScheduleList(props) {
  const user_id = props.user['id'];

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:5000/api/schedule/" + user_id);
      setData(result.data.slice(0, 7));
    })();
  }, [props]);

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
                <th className="border-bottom">Description</th>
                <th className="border-bottom">Start</th>
              </tr>
            </thead>
            <tbody>
              {data.map((s, index) => (
                <tr key={index}>
                  <td><span className="fw-normal"><input type="checkbox"/></span></td>
                  <td><span className="fw-normal">{s.courseName}</span></td>
                  <td><span className="fw-normal">{s.lessonName}</span></td>
                  <td><span className="fw-normal">{s.description}</span></td>
                  <td><span className="fw-normal">{s.scheduledStart}</span></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  )
}

const mapStateToProps = (state) => ({
  content: state.app.content,
  user: state.app.user
});

export default connect(
  mapStateToProps,
  {}
)(ScheduleList);
