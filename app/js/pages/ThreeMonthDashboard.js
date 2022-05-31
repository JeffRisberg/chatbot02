import React, { useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import './ThreeMonthDashboard.css';

function ThreeMonthDashboard(props) {

  useEffect(() => {
    axios.post('http://localhost:5000/change_screen/3_months', null, {
      withCredentials: true,
    })
  }, [props]);

  return (
    <div className="ThreeMonthDashboard">
      <NavBar/>
      <div className="row">
        <div className="col-md-12">
          <h3>Your 3-month schedule is still pending.</h3>
        </div>
      </div>
    </div>
  )
}

export default ThreeMonthDashboard;
