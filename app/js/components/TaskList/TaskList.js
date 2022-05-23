import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {Card, Table} from "@themesberg/react-bootstrap";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from "regenerator-runtime";
import "./TaskList.css";

function TaskList(props) {
  const scope = props.scope;
  const done = props.done;

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      if (scope === 'daily') {
        const result = await axios("http://localhost:5000/api/daily_tasks/1?done=" + done);
        setData(result.data.slice(0, 7));
      }
      if (scope === 'weekly') {
        const result = await axios("http://localhost:5000/api/weekly_tasks/1?done=" + done);
        setData(result.data.slice(0, 7));
      }
    })();
  }, [props]);

  if (data.length > 0) {
    return (
      <div>
        <Card border="dark" className="table-wrapper table-responsive shadow-sm">
          <Card.Body>
            <Table hover className="tasks-table align-items-center">
              <thead>
              <tr>
                {done =='0' && <th className="border-bottom"></th>}
                <th className="border-bottom">Priority</th>
                <th className="border-bottom">Task</th>
                {scope === 'weekly' && <th className="border-bottom">Due Date</th>}
                <th className="border-bottom">Why</th>
              </tr>
              </thead>
              <tbody>
              {data.map((t, index) => (
                <tr key={index}>
                  {done == '0' && <td><span className="fw-normal"><input type="checkbox" /></span></td>}
                  <td><span className="fw-normal">{t.priority}</span></td>
                  <td><span className="fw-normal">{t.name}</span></td>
                  {scope === 'weekly' && <td><span className="fw-normal">{t.due_date}</span></td>}
                  <td><span className="fw-normal">{t.why}</span></td>
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
});

export default connect(
  mapStateToProps,
  { }
)(TaskList);
