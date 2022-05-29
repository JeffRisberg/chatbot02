import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Card, Table} from "@themesberg/react-bootstrap";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import "./TaskList.css";

import {showUpdate} from '../../actions/content';

function TaskList(props) {
  const scope = props.scope;
  const done = props.done;
  const user_id = props.user['id']

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      if (scope === 'daily') {
        const result = await axios("http://localhost:5000/api/daily_tasks/" + user_id + "?done=" + done);
        setData(result.data.slice(0, 7));
      }
      if (scope === 'weekly') {
        const result = await axios("http://localhost:5000/api/weekly_tasks/" + user_id + "?done=" + done);
        setData(result.data.slice(0, 7));
      }
    })();
  }, [props]);

  var checkedTaskIds = [];
  var targets = [];

  function checkChange(e, task_id) {
    const checked = e.target.checked;
    targets.push(e.target);

    if (checked) {
      checkedTaskIds.push(task_id);
    } else {
      checkedTaskIds =
        checkedTaskIds.filter(function (ele) {
          return ele != task_id;
        });
    }
    console.log(checkedTaskIds);
  }

  function submit(task_id) {
    if (checkedTaskIds.includes(task_id)) {

      var url = "http://localhost:5000/api/mark_daily_task_done"
      if (scope === 'weekly') {
        url = "http://localhost:5000/api/mark_weekly_task_done"
      }

      targets.forEach((t) => {
        t.checked = false;
      });

      axios.post(url, {'task_id': task_id}, {
        withCredentials: true,
      })
        .then(response => {
          if (response.status == 200) {
            props.showUpdate(task_id);
          } else {
            // HANDLE ERROR
            //alert("Failed")
          }
        })
    }
  }

  if (data.length > 0) {
    return (
      <div>
        <Card border="dark" className="table-wrapper table-responsive shadow-sm">
          <Card.Body>
            <Table hover className="tasks-table align-items-center">
              <thead>
                <tr>
                  {done == '0' && <th className="border-bottom"></th>}
                  <th className="border-bottom">Priority</th>
                  <th className="border-bottom">Task</th>
                  {scope === 'weekly' && <th className="border-bottom">Due Date</th>}
                  <th className="border-bottom">Why</th>
                  <th className="border-bottom"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((t, index) => (
                  <tr key={index}>
                    {done == '0' &&
                    <td>
                      <span className="fw-normal">
                        <input type="checkbox" onChange={(e) => checkChange(e, t.id)}/>
                      </span>
                    </td>
                    }
                    <td><span className="fw-normal">{t.priority}</span></td>
                    <td><span className="fw-normal">{t.name}</span></td>
                    {scope === 'weekly' && <td><span className="fw-normal">{t.due_date}</span></td>}
                    <td><span className="fw-normal">{t.why}</span></td>
                    {done == '0' &&
                    <td>
                      <span className="fw-normal">
                        <button onClick={() => submit(t.id)}>Submit</button>
                      </span>
                    </td>
                    }
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
