import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import {useExpanded, useTable} from 'react-table';
import {connect} from 'react-redux';

// eslint-disable-next-line no-unused-vars
import {showUpdate} from '../actions/content';

// Create an editable cell renderer
const EditableCell = ({
                        value: initialValue,
                        row: {index},
                        column: {id},
                        updateMyData, // This is a custom function that we supplied to our table instance
                        editableRowIndex // index of the row we requested for editing
                      }) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed externally, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return id !== 'priority' && id !== 'due_date' && index === editableRowIndex ? (
    <input value={value} onChange={onChange} onBlur={onBlur}/>
  ) : (
    <p>{value}</p>
  );
};

EditableCell.propTypes = {
  cell: PropTypes.shape({
    value: PropTypes.any.isRequired
  }),
  row: PropTypes.shape({
    index: PropTypes.any.isRequired
  }),
  column: PropTypes.shape({
    id: PropTypes.any.isRequired
  }),
  updateMyData: PropTypes.func.isRequired
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell
};

const EnhancedTable = ({
                         scope,
                         columns,
                         data,
                         updateMyData,
                         showUpdate
                       }) => {
  const [editableRowIndex, setEditableRowIndex] = React.useState(null);

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: true, // !skipPageReset,
      // updateMyData isn't part of the API, but anything we put into these options will automatically be available
      // on the instance.  That way we can call this function from our cell renderer!
      updateMyData,
      // pass state variables so that we can access them in edit hook later
      editableRowIndex,
      setEditableRowIndex // setState hook for toggling edit on/off switch
    },
    useExpanded,
    (hooks) => {
      hooks.allColumns.push((columns) => [
        ...columns,
        {
          accessor: "edit",
          id: "edit",
          Header: "Edit",
          Cell: ({row, setEditableRowIndex, editableRowIndex}) => (
            row.depth === 0 && <div style={{display: 'inline-block'}}>
              <span onClick={() => {
                const currentIndex = row.index;
                if (editableRowIndex !== currentIndex) {
                  // row requested for edit access
                  setEditableRowIndex(currentIndex);
                } else {
                  // request for saving the updated row
                  setEditableRowIndex(null);
                  const updatedRow = row.values;

                  // call tasks API with update request
                  const payload = {
                    "id": row.original.id, "table": scope,
                    "name": updatedRow.name, "why": updatedRow.why, /*"due_date": updatedRow.due_date*/
                  };

                  const url = 'http://localhost:5000/api/tasks';
                  axios.put(url, payload, {
                    withCredentials: true,
                  })
                    .then((resp) => {
                      console.log(resp);
                    })
                }
              }}
              >
                {/* single action button supporting 2 modes */}
                {editableRowIndex !== row.index ?
                  <i className="bi-pencil" style={{cursor: 'pointer', fontSize: '1.3rem'}}></i>
                  :
                  <i className="bi-save" style={{cursor: 'pointer', fontSize: '1.3rem'}}></i>}
              </span>
              &nbsp;
              <span onClick={() => {
                // call tasks API with delete request
                const url = 'http://localhost:5000/api/tasks/' + row.original.id + "?table=" + scope;
                axios.delete(url, null, {
                  withCredentials: true,
                })
                  .then((resp) => {
                    console.log(resp);
                    showUpdate(row.original.id)
                  })
              }}
              >
                <i className="bi-trash" style={{cursor: 'pointer', fontSize: '1.3rem'}}></i>
              </span>
            </div>
          )
        }
      ]);
    }
  );

  // Render the UI for your table
  return (
    <div>
      <table className="table" width={"100%"} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <td
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </td>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} style={row.depth === 1 ? {fontStyle: 'italic'} : {}}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} style={row.depth === 1 ? {paddingLeft: '25px'} : {}}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

EnhancedTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  updateMyData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  //skipPageReset: PropTypes.bool.isRequired
};

export default connect(
  null,
  {showUpdate}
)(EnhancedTable);
