import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Card, ProgressBar} from '@themesberg/react-bootstrap';
import EnhancedTable from '../EnhancedTable';
import axios from 'axios';
import './TaskList.css';

// eslint-disable-next-line no-unused-vars
import {showUpdate} from '../../actions/content';

function TaskList(props) {
  const details = props.details;
  const scope = props.scope;
  const user_id = props.user.id;

  const [data, setData] = useState([]);

  const host = '';

  useEffect(() => {
    (async () => {
      if (scope === 'daily') {
        const result = await axios(host + '/api/daily_tasks/' + user_id);
        const data = result.data;

        setData(data);
      }
      if (scope === 'weekly') {
        const result1 = await axios(host + '/api/weekly_tasks/' + user_id);
        let data1 = result1.data;

        const parent_ids = [];
        data1.forEach((row1) => {
          const parent_id = row1.id;
          parent_ids.push(parent_id);
        });

        const result2 = await axios(host + '/api/daily_tasks/' + user_id + '?parent_ids=' + parent_ids);
        const data2 = result2.data;

        data1.forEach((row1) => {
          const parent_id = row1.id;
          const subRows = [];
          data2.forEach((row2) => {
            if (row2.parent_id === parent_id) {
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
        const result1 = await axios(host + '/api/monthly_goals/' + user_id);
        let data1 = result1.data;

        const parent_ids = [];
        data1.forEach((row1) => {
          const parent_id = row1.id;
          parent_ids.push(parent_id);
        });

        const result2 = await axios(host + '/api/weekly_tasks/' + user_id + '?parent_ids=' + parent_ids);
        const data2 = result2.data;

        data1.forEach((row1) => {
          const parent_id = row1.id;
          const subRows = [];
          data2.forEach((row2) => {
            if (row2.parent_id === parent_id) {
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

    const task_id = row.original.id;
    const url = host + '/api/tasks';
    let table = scope;

    if (row.depth === 1) {
      if (table === 'monthly') {
        table = 'weekly';
      }
      else if (table === 'weekly') {
        table = 'daily';
      }
    }

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

  columns.push({id: 'priority', Header: 'No', accessor: 'priority'});
  columns.push({id: 'name', Header: 'Name', accessor: t => t.name || ''});

  if (details === true && scope === 'monthly') {
    columns.push({
      id: 'due_date',
      Header: 'Due Date',
      accessor: t => {
        return t.due_date !== undefined && t.due_date !== null ? t.due_date.substr(5, 11) : '';
      }
    });
  }

  columns.push({
    id: 'submit',
    Header: 'Done',
    Cell: ({row}) => (
      <span className='fw-normal'>
        {row.original.done == 1 && <input type="checkbox" checked={true} onChange={(e) => submit(e, row)}/>}
        {row.original.done != 1 && <input type="checkbox" onChange={(e) => submit(e, row)}/>}
      </span>
    )
  })

  // When our cell renderer calls updateMyData, we'll use the rowIndex, columnId and new value to update original data
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
    var count = 0;
    data.forEach((task) => {
      if (task.done === 1) count++;
    });
    const now = Math.round((100.0 * count) / data.length);

    return (
      <div>
        <Card className="table-wrapper shadow-sm mt-2 mb-4">
          <Card.Body className='p-0'>
            <ProgressBar now={now} className="mx-2 mt-2" />
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
