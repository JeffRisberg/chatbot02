import React from 'react';
// eslint-disable-next-line no-unused-vars
import {Bar} from 'react-chartjs-2'
import './Chart.css';

const Chart = (props) => {

  const labels = props.payload.labels || [];
  const datasets = [{
    data: props.payload.series,
    backgroundColor: [
      "#ffbb11",
      "#e7f0d1",
      "#ec3071",
      "#b3baaf",
      "#2a71d0",
      "#50AF95"
    ]
  }]

  return (
    <div className="chart-container">
      <Bar
        data={{'labels': labels, 'datasets': datasets}}
        options={{
          maintainAspectRatio: false,
          plugins: {
            title: {display: false},
            legend: {display: false},
          }
        }}
      />
    </div>
  );
};

export default Chart;
