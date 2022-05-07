import React from 'react';
import {Link} from "react-router-dom";

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

  return
  <div className="chart-container">
    <Link to="/userDashboard" target="_blank">
      <ChartistGraph data={data} options={options} type={type} />
    </Link>
  </div>;
};

export default Chart;
