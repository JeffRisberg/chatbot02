import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Card, Table} from '@themesberg/react-bootstrap';
import axios from 'axios';
import './TaskList.css';

// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';

import {showUpdate} from '../../actions/content';

function TaskList(props) {
  const scope = props.scope;
  const done = props.done;
  const user_id = props.user.id;

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      if (scope === 'daily') {
        const result = await axios('http://localhost:5000/api/daily_tasks/' + user_id + '?done=' + done);
        setData(result.data.slice(0, 7));
      }
      if (scope === 'weekly') {
        const result = await axios('http://localhost:5000/api/weekly_tasks/' + user_id + '?done=' + done);
        setData(result.data.slice(0, 7));
      }
      if (scope === 'monthly') {
        const result = await axios('http://localhost:5000/api/goals/' + user_id + '?done=' + done);
        setData(result.data.slice(0, 7));
      }
    })();
  }, [props]);

  function submit(e, task_id) {
    e.target.checked = false;

    const url = 'http://localhost:5000/api/tasks';

    const table = (scope === 'monthly' ? 'goals' : scope);

    axios.put(url, {'id': task_id, 'table': table, 'done': 1}, {
      withCredentials: true,
    })
      .then(response => {
        if (response.status == 200) {
          props.showUpdate(task_id);
        } else {
          // HANDLE ERROR
          alert('Update failed');
        }
      });
  }

  if (data.length > 0) {
    return (
      <div>
        <Card className="table-wrapper table-responsive shadow-sm">
          <Card.Body>
            <Table hover className="tasks-table align-items-center">
              <thead>
                <tr>
                  {done == '0' && <th className="border-bottom"></th>}
                  <th className="border-bottom">Priority</th>
                  <th className="border-bottom">Task</th>
                  <th className="border-bottom">Why</th>
                  {scope !== 'daily' && <th className="border-bottom">Due Date</th>}
                </tr>
              </thead>
              <tbody>
                {data.map((t, index) => (
                  <tr key={index}>
                    {done == '0' &&
                    <td>
                      <span className="fw-normal">
                        <input type="checkbox" onChange={(e) => submit(e, t.id)}/>
                      </span>
                    </td>
                    }
                    <td><span className="fw-normal">{t.priority}</span></td>
                    <td><span className="fw-normal">{t.name}</span></td>
                    <td><span className="fw-normal">{t.why}</span></td>
                    {scope !== 'daily' && <td><span className="fw-normal">
                      {t.due_date !== null ? t.due_date.substr(5,11) : ''}
                    </span></td>}
                  </tr>
                ))}
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
  {showUpdate}
)(TaskList);
