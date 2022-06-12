import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Card, Table} from '@themesberg/react-bootstrap';
import axios from 'axios';
import './TaskSummary.css';

// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';

function TaskSummary(props) {
  const scope = props.scope;
  const user_id = props.user.id;

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      if (scope === 'daily') {
        const result = await axios('http://localhost:5000/api/daily_tasks_summary/' + user_id);
        setData(result.data.slice(0, 7));
      }
      if (scope === 'weekly') {
        const result = await axios('http://localhost:5000/api/weekly_tasks_summary/' + user_id);
        setData(result.data.slice(0, 7));
      }
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
                  <th className="border-bottom">Task</th>
                  <th className="border-bottom">Done?</th>
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
                      <td><span className="fw-normal">{t.name}</span></td>
                      <td><span className="fw-normal">{t.done ? 'Done' : ''}</span></td>
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
