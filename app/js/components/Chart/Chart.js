import React from 'react';

import './Chart.css';
import ChartistGraph from "react-chartist";

const Chart = (props) => {
  const labels = props.payload.labels || [];
  const series = props.payload.series || false;
  const type = props.payload.type || "Bar";
  const options = props.payload.options || {
    distributeSeries: true,
    axisX: {
      offset: 50
    },
    axisY: {
      offset: 10
    }
  };

  const data = {
    labels: labels,
    series: series,
  };

  console.log("chart type " +type);
  return <div className="chart-container">
    <ChartistGraph data={data} options={options} type={type} />
  </div>;
};

export default Chart;
