import React, {useEffect} from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import TaskList from '../components/TaskList/TaskList';
import './DailyDashboard.css';

function DailyDashboard(props) {

  useEffect(() => {
    axios.post('http://localhost:5000/change_screen/daily', null, {
      withCredentials: true,
    })
  }, [props]);

  return (
    <div className="DailyDashboard">
      <NavBar/>
      <div className="row">
        <div className="col-md-12">
          <TaskList scope={"daily"} done={"0"}/>
        </div>
      </div>
      <div className="row" style={{marginTop: "14px"}}>
        <div className="col-md-12">
          <h3>Completed</h3>
          <TaskList scope={"daily"} done={"1"}/>
        </div>
      </div>
    </div>
  )
}

export default DailyDashboard;
