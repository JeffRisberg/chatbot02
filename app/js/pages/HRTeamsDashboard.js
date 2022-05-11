import React, {Component} from "react";
import './HRTeamsDashboard.css';

import TeamsChart from "../components/TeamsChart/TeamsChart";
import PopularCourses from "../components/PopularCourses/PopularCourses";

class HRTeamsDashboard extends Component {

  render() {

    return (
      <div className="HRTeamsDashboard">
        <div className="container" id={"chart"}>

          <div className="row">
            <div className="col-md-8">
              <TeamsChart />
            </div>
            <div className="col-md-4">
              <PopularCourses />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HRTeamsDashboard;
