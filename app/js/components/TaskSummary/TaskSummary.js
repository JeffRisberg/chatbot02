import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Card, Table} from '@themesberg/react-bootstrap';
import axios from 'axios';
import './TaskSummary.css';

// eslint-disable-next-line no-unused-vars

function TaskSummary(props) {
  const user_id = props.user.id;

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios('http://localhost:5000/api/tasks_summary/' + user_id);
      setData(result.data.slice(0, 7));
    })();
  }, [props]);

  if (data.length > 0) {
    var prior_date = '';

    return (
      <div>
        <Card border="dark" className="table-wrapper table-responsive shadow-sm">
          <Card.Body>
            <Table hover className="tasks-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">Date</th>
                  <th className="border-bottom">Priority</th>
                  <th className="border-bottom">Type</th>
                  <th className="border-bottom">Task</th>
                  <th className="border-bottom">Why</th>
                </tr>
              </thead>
              <tbody>
                {data.map((t, index) => {
                  const new_date = (t.date !== prior_date);
                  prior_date = t.date;
                  return (
                    <tr key={index}>
                      <td><span className="fw-normal">{new_date ? t.date : ''}</span></td>
                      <td><span className="fw-normal">{t.priority}</span></td>
                      <td><span className="fw-normal">{t.type}</span></td>
                      <td>
                      <span className="fw-normal">
                        {t.name} {t.done ? '(done)' : ''}
                      </span>
                      </td>
                      <td><span className="fw-normal">{t.why}</span></td>
                    </tr>
                  )}
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    )
  } else {
    return (
      <span className="badge bg-success" style={{fontSize: "16px"}}>None</span>
    )
  }
}

const mapStateToProps = (state) => ({
  content: state.app.content,
  user: state.app.user
});

export default connect(
  mapStateToProps,
  {}
)(TaskSummary);
