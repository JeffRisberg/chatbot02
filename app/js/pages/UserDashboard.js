import React, {Component} from "react";
import {Link} from "react-router-dom";
import ChartistGraph from "react-chartist";
import './UserDashboard.css';

class UserDashboard extends Component {
  render() {

    const data1 = {
      labels: ["Data Scientist I", "Data Scientist II", "Data Science Lead", "Data Science Director", "CTO"],
      series: [[20, 30, 40, 50, 60]]
    };
    const options1 = {
      high: 70,
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
                    <p className="card-text">Updated 02-May-2022</p>
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
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                  <thead>
                  <tr>
                    <th scope="col">Course</th>
                    <th scope="col">Section</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Comments</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Advanced Database</td>
                    <td>Lesson 1</td>
                    <td>02-May-2022</td>
                    <td>05-May-2022</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Advanced Database</td>
                    <td>Lesson 2</td>
                    <td>06-May-2022</td>
                    <td>10-May-2022</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Machine Learning</td>
                    <td>Lesson 1</td>
                    <td>02-May-2022</td>
                    <td>08-May-2022</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Machine Learning</td>
                    <td>Lesson 2</td>
                    <td>09-May-2022</td>
                    <td>15-May-2022</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Machine Learning</td>
                    <td>Lesson 3</td>
                    <td>16-May-2022</td>
                    <td>25-May-2022</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Team Management</td>
                    <td></td>
                    <td>05-May-2022</td>
                    <td>06-Jun-2022</td>
                    <td>&nbsp;</td>
                  </tr>
                  </tbody>
                </table>
              </div>
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
