import React, {Component} from "react";
import NavBar from '../components/NavBar';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import './HRCompletedDashboard.css';

class HRCompletedDashboard extends Component {

  render() {
    const dates = ["Week 3", "Week 4", "Week 5", "Week 6", "Week 7"];

    const datasets1 = [{data: [52, 47, 34, 55, 70 ]}]
    const datasets2 = [{data: [34, 57, 34, 45, 92 ]}];

    return (
      <div className="HRCompletedDashboard">
        <NavBar/>

        <div className="row">
          <div className="col-md-6">
            <h3># of Courses Completed</h3>
            <Bar
              data={{'labels': dates, 'datasets': datasets1}}
              options={{
                plugins: {
                  title: { display: false },
                  legend: { display: false },
                }
              }}
            />
          </div>

          <div className="col-md-6">
            <h3>% of Courses Completed</h3>
            <Bar
              data={{'labels': dates, 'datasets': datasets2}}
              options={{
                plugins: {
                  title: { display: false },
                  legend: { display: false },
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default HRCompletedDashboard;
