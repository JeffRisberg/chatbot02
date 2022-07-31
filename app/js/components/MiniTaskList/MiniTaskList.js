import React, {useState} from 'react';
import './MiniTaskList.css';

function MiniTaskList(props) {
  const title = props.title;
  const showDate = props.showDate || false;
  const tasks = props.tasks;
  const detailAction = props.detailAction;

  const [visible, setVisible] = useState(true);

  function onToggle() {
    setVisible(!visible);
  }

  return (
    <div className="mini-task-list">
      <button>
        <span onClick={detailAction}>
          {title}
          {showDate && <br/>}
          {showDate && new Date().toDateString()}
        </span>
        &nbsp;
        <span onClick={onToggle}>
          {visible && <i className="bi-chevron-up" style={{cursor: 'pointer', fontSize: '1.2rem'}}></i>}
          {!visible && <i className="bi-chevron-down" style={{cursor: 'pointer', fontSize: '1.2rem'}}></i>}
        </span>
      </button>
      {visible &&
      <ol>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ol>}
    </div>
  )
}

export default MiniTaskList;
