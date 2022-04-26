import React, {Component} from "react";
import './Dashboard.css';
import ChartistGraph from "react-chartist";

import UserList from "../components/UserList/UserList";
import CourseList from "../components/CourseList/CourseList";

class Dashboard extends Component {
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

    const data2 = {
      labels: ["Machine Learning", "Advanced Database", "JavaScript", "Team management", "Public Speaking"],
      series: [12, 22, 30, 7, 12]
    };
    const options2 = {
      labelInterpolationFnc: function(value) {
        return value[0]
      }
    };
    const responsiveOptions2 = [
      ['screen and (min-width: 640px)', {
        chartPadding: 10,
        labelOffset: 30,
        labelDirection: 'explode',
        labelInterpolationFnc: function(value) {
          return value;
        }
      }],
      ['screen and (min-width: 1024px)', {
        labelOffset: 30,
        chartPadding: 10
      }]
    ];
    const type2 = "Pie";

    return (
      <div className="Dashboard">
        <div className="container" id={"chart"}>

          <div className="row">
            <div className="col-md-8">
              <h3>Active Users</h3>
              <UserList/>
            </div>
            <div className="col-md-4">
              <h3>Usage Trend</h3>
              <ChartistGraph data={data1} options={options1} type={type1}/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-7">
              <h3>Courses</h3>
              <CourseList/>
            </div>
            <div className="col-md-5">
              <h3>Popular Courses</h3>
              <ChartistGraph data={data2} options={options2} type={type2} responsiveOptions={responsiveOptions2}/>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Dashboard;
