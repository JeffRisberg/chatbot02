import React, {Component} from "react";
import './AdminDashboard.css';
import ChartistGraph from "react-chartist";
import {Link} from "react-router-dom";

import UserList from "../components/UserList/UserList";
import CourseList from "../components/CourseList/CourseList";
import PopularCourseChart from "../components/PopularCourseChart/PopularCourseChart";

class AdminDashboard extends Component {
  render() {

    const data1 = {
      labels: ["1Q 2020", "2Q 2020", "3Q 2020", "4Q 2020", "1Q 2021", "2Q 2021", "3Q 2021", "4Q 2021"],
      series: [[125, 264, 309, 366, 401, 499, 589, 694]]
    };
    const options1 = {
      high: 700,
      low: 0
    };
    const type1 = "Bar";

    return (
      <div className="AdminDashboard">
        <div className="container" id={"chart"}>

          <div className="row">
            <div className="col-md-5">
              <h3>Usage Trend</h3>
              <ChartistGraph data={data1} options={options1} type={type1}/>
            </div>
            <div className="col-md-7">
              <h3>Active Users</h3>
              <UserList/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-5">
              <h3>Popular Courses</h3>
              <PopularCourseChart />
            </div>
            <div className="col-md-7">
              <h3>Courses</h3>
              <CourseList/>
            </div>
          </div>

        </div>
        <div>&nbsp;</div>
        <p><Link to="/userDashboard">User Dashboard</Link></p>
        <p><Link to="/">Chatbot</Link></p>
      </div>
    );
  }
}

export default AdminDashboard;
