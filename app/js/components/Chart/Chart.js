import React from 'react';
import {Link} from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import './Chart.css';

const Chart = (props) => {
  const labels = props.payload.labels || [];
  const datasets = [props.payload.series]

  return (
  <div className="chart-container">
    <Link to="/userDashboard" target="_blank">
      <Bar
        data={{'labels': labels, 'datasets': datasets}}
        options={{
          maintainAspectRatio: false,
          plugins: {
            title: { display: false },
            legend: { display: false },
          }
        }}
      />
    </Link>
  </div>
  );
};

export default Chart;
