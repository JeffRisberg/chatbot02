import React from 'react';
// eslint-disable-next-line no-unused-vars
import {Bar} from 'react-chartjs-2';
import './Chart.css';

import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = (props) => {
  const labels = props.payload.labels || [];
  const options = props.payload.options || {};

  const datasets = [{
    data: props.payload.series,
    backgroundColor: [
      '#ffbb11',
      '#e7f0d1',
      '#ec3071',
      '#b3baaf',
      '#2a71d0',
      '#50AF95'
    ]
  }];

  options.maintainAspectRatio = false;
  options.plugins = {
    title: {display: false},
    legend: {display: false},
  };

  return (
    <div className='chart-container'>
      <Bar
        data={{'labels': labels, 'datasets': datasets}}
        options={options}
      />
    </div>
  );
}

export default Chart;
