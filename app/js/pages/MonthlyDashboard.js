import React, { useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import './MonthlyDashboard.css';

function MonthlyDashboard(props) {

  useEffect(() => {
    axios.post('http://localhost:5000/change_screen/3_months', null, {
      withCredentials: true,
    })
  }, [props]);

  return (
    <div className="MonthlyDashboard">
      <NavBar/>
      <div className="row">
        <div className="col-md-12">
          <h3>Your monthly schedule is still pending.</h3>
        </div>
      </div>
    </div>
  )
}

export default MonthlyDashboard;
