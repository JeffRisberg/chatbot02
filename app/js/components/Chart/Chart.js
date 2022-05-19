import React from 'react';
import { connect } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import { showUpdate } from '../../actions';
import './Chart.css';

const Chart = (props) => {

  console.log("chart props:");
  console.log(props);

  const labels = props.payload.labels || [];
  const datasets = [{data: props.payload.series,
         backgroundColor: [
            "#ffbb11",
            "#e7f0d1",
            "#ec3071",
            "#b3baaf",
            "#2a71d0",
            "#50AF95"
          ]}]

  props.showUpdate();

  return (
  <div className="chart-container">
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
  </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.app.user,
});

export default connect(
  mapStateToProps,
  { showUpdate }
)(Chart);
