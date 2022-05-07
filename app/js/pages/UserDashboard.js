import React, {Component} from "react";
import {Link} from "react-router-dom";
import './UserDashboard.css';

import ScheduleList from "../components/ScheduleList/ScheduleList";
import ScheduleChart from "../components/ScheduleChart/ScheduleChart";

class UserDashboard extends Component {
  render() {

    return (
      <div className="UserDashboard">

        <div className="container" id={"chart"}>
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div>
                  <div className="card-body">
                    <h5 className="card-title">Prepared for John Smith</h5>
                    <p className="card-text">Updated 06-May-2022</p>
                    <a href="#" className="btn btn-primary">Coach.ai</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <ScheduleChart />
            </div>
          </div>
        </div>

        <div className="container" id={"chart"}>
          <div className="row">
            <div className="col-md-8">
              <ScheduleList />
            </div>
          </div>
        </div>
        <div>&nbsp;</div>
        <p><Link to="/adminDashboard">Admin Dashboard</Link></p>
        <p><Link to="/">Chatbot</Link></p>
      </div>
    );
  }
}

export default UserDashboard;
