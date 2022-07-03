import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Card} from '@themesberg/react-bootstrap';
import EnhancedTable from '../EnhancedTable';
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

  const host = 'http://localhost:5000';

  useEffect(() => {
    (async () => {
      if (scope === 'daily') {
        const result = await axios(host + '/api/daily_tasks/' + user_id + '?done=' + done);
        const data = result.data.slice(0, 7);

        setData(data);
      }
      if (scope === 'weekly') {
        const result1 = await axios(host + '/api/weekly_tasks/' + user_id + '?done=' + done);
        const data1 = result1.data.slice(0, 7);
        const result2 = await axios(host + '/api/daily_tasks/' + user_id + '?done=' + done);
        const data2 = result2.data.slice(0, 7);

        data1.forEach((row1) => {
          const parent_id = row1.id;
          const subRows = [];
          data2.forEach((row2) => {
            if (row2.weekly_task_id === parent_id) {
              subRows.push(row2);
            }
          });
          if (subRows.length > 0) {
            row1.subRows = subRows;
          }
        });

        setData(data1);
      }
      if (scope === 'monthly') {
        const result1 = await axios(host + '/api/monthly_goals/' + user_id + '?done=' + done);
        const data1 = result1.data.slice(0, 7);
        const result2 = await axios(host + '/api/weekly_tasks/' + user_id + '?done=' + done);
        const data2 = result2.data.slice(0, 7);

        data1.forEach((row1) => {
          const parent_id = row1.id;
          const subRows = [];
          data2.forEach((row2) => {
            if (row2.monthly_goal_id === parent_id) {
              subRows.push(row2);
            }
          });
          if (subRows.length > 0) {
            row1.subRows = subRows;
          }
        });
        setData(data1);
      }
    })();
  }, [props]);

  function submit(e, row) {
    e.target.checked = false;

    const url = host + '/api/tasks';
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

  const columns = [];

  if (details === true) {
    columns.push(
      {id: 'expander',
        Header: '',
        Cell: ({row}) =>
          // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
          // to build the toggle for expanding a row
          row.canExpand ? (
            <span
              {...row.getToggleRowExpandedProps({
                style: {
                  // We can even use the row.depth property
                  // and paddingLeft to indicate the depth
                  // of the row
                  paddingLeft: `${row.depth * 2}rem`,
                },
              })}
            >
              {row.isExpanded ? 'V' : '>'}
            </span>
          ) : null,
      });
  }

  columns.push({Header: 'Priority', accessor: 'priority'});
  columns.push({Header: 'Name', accessor: t => t.name || ''});

  if (details === true) {
    columns.push({Header: 'Why', accessor: t => t.why || ''});
  }

  if (details === true && scope !== 'daily') {
    columns.push({
      Header: 'Due Date',
      id: 'due_date',
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

  /*
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
  */

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    //setSkipPageReset(true)
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  if (data.length > 0) {
    return (
      <div>
        <Card className="table-wrapper table-responsive shadow-sm">
          <Card.Body>
            <EnhancedTable className="tasks-table align-items-center"
                           scope={scope}
                           columns={columns}
                           data={data}
                           setData={setData}
                           updateMyData={updateMyData}
            />
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
