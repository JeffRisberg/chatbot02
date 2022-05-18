import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from "regenerator-runtime";

function ScheduleChart(props) {

  const [labels, setLabels] = useState([])
  const [datasets, setDatasets] = useState([])

  console.log(props);

  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:5000/api/schedule/1");
      var data = result.data.slice(0, 6);
      console.log(data);

      var labels = data.map(item => {
         return item.courseName + ': ' + item.lessonName
      });
      var series = [...Array(labels.length).keys()];

      setLabels(labels);
      setDatasets([{
        data: series.map(y => { return y*10 + 10; }),
        backgroundColor: [
          "#ffbb11",
          "#e7f0d1",
          "#ec3071",
          "#b3baaf",
          "#2a71d0",
          "#50AF95"
        ]
      }]);
    })();
  }, [])

  return (
    <div className="ScheduleChart" style={{height: 250}}>
    {labels.length > 0 ?
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
    :
    <p style={{marginTop: 30}}>You don't have a lesson plan set up yet.
       Use the Chatbot on the right to create a plan that matches your goals.</p>
    }
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.app.user,
});

export default connect(
  mapStateToProps,
  { }
)(ScheduleChart);
