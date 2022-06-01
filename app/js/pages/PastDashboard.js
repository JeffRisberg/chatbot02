import React, { useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import TaskSummary from '../components/TaskSummary/TaskSummary';
import './PastDashboard.css';

function PastDashboard(props) {

  useEffect(() => {
    axios.post('http://localhost:5000/change_screen/past', null, {
      withCredentials: true,
    })
  }, [props]);

  return (
    <div className="PastDashboard">
      <NavBar/>
      <div className="row">
        <div className="col-md-12">
          <TaskSummary/>
        </div>
      </div>
    </div>
  )
}

export default PastDashboard;
