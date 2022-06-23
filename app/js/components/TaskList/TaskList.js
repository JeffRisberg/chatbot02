import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Card} from '@themesberg/react-bootstrap';
import Table from '../Table'
import axios from 'axios';
import './TaskList.css';

// eslint-disable-next-line no-unused-vars
import {showUpdate} from '../../actions/content';

function TaskList(props) {
  const details = props.details;
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
        const result = await axios('http://localhost:5000/api/monthly_goals/' + user_id + '?done=' + done);
        setData(result.data.slice(0, 7));
      }
    })();
  }, [props]);

  function submit(e, row) {
    e.target.checked = false;

    const url = 'http://localhost:5000/api/tasks';
    const table = scope;
    const task_id = row.original.id;

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

  function handleEdit(e, row) {
    var index = row.index;

    const task_id = row.original.id;

    console.log('edit event at ' + index + ' ' + task_id);

    // display modal
    // say user types in modal new firstName
    // post request

    // set row.firstName = newFirstName
  }

  const columns = [];

  columns.push({Header: 'Name', accessor: 'name'});

  if (details === true) {
    columns.push({Header: 'Why', accessor: 'why'});
  }

  if (details === true && scope !== 'daily') {
    columns.push({
      Header: 'Due Date',
      accessor: t => {
        return t.due_date !== null ? t.due_date.substr(5, 11) : '';
      }
    });
  }

  if (done === '0') {
    columns.push({
      Header: '',
      id: 'submit',
      Cell: ({row}) => (
        <span className='fw-normal'>
          <input type="checkbox" onChange={(e) => submit(e, row)}/>
        </span>
      )
    })
  }

  if (details === true && done === '0') {
    columns.push({
      Header: '',
      id: 'edit',
      Cell: ({row}) => (
        <button style={{fontSize: '10px', borderWidth: '1px'}} onClick={(e) => handleEdit(e, row)}>
          Edit
        </button>
      )
    })
  }

  if (data.length > 0) {
    return (
      <div>
        <Card className="table-wrapper table-responsive shadow-sm">
          <Card.Body>
            <Table className="tasks-table align-items-center"
                   columns={columns} data={data}/>
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
