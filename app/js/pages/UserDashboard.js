import React, {Component} from "react";
import {Link} from "react-router-dom";
import ChartistGraph from "react-chartist";
import './UserDashboard.css';

import ScheduleList from "../components/ScheduleList/ScheduleList";

class UserDashboard extends Component {
  render() {

    const data1 = {
      labels: ["Adv DB Lesson 1", "Adv DB Lesson 2", "ML Lesson 1", "ML Lesson 2", "ML Lesson 3"],
      series: [[2, 3, 4, 5, 6]]
    };
    const options1 = {
      high: 7,
      low: 0
    };
    const type1 = "Bar";

    return (
      <div className="UserDashboard">

        <div className="container" id={"chart"}>
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div>
                  <div className="card-body">
                    <h5 className="card-title">Prepared for John Smith</h5>
                    <p className="card-text">Updated 04-May-2022</p>
                    <a href="#" className="btn btn-primary">Coach.ai</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <ChartistGraph data={data1} options={options1} type={type1}/>
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
