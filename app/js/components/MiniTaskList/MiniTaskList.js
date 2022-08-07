import React, {useState} from 'react';
import './MiniTaskList.css';

function MiniTaskList(props) {
  const title = props.title;
  const tasks = props.tasks;
  const detailAction = props.detailAction;
  const hideable = props.hideable;

  const [visible, setVisible] = useState(true);

  function onToggle() {
    setVisible(!visible);
  }

  return (
    <div className="mini-task-list">
      <button>
        <span onClick={detailAction}>
          {title}
        </span>
        &nbsp;
        {
          !!hideable && (
            <span onClick={onToggle}>
              {visible && <i className="bi-chevron-up" style={{cursor: 'pointer', fontSize: '1.2rem'}}></i>}
              {!visible && <i className="bi-chevron-down" style={{cursor: 'pointer', fontSize: '1.2rem'}}></i>}
            </span>
          )
        }
      </button>
      {visible && tasks.map((task, index) => (
        <p key={task.id}>{index + 1}. {task.name}</p>
      ))}
    </div>
  )
}

export default MiniTaskList;
