import React from 'react';

import './Schedule.css';
import ChartistGraph from "react-chartist";

const Schedule = () => {

  const data = {
    labels: ["Lesson-1 25-Apr-2022", "Lesson-2 01-May-2022", "Lesson-3 15-May-2022", "Lesson-4 29-May-2022"],
    series: [1, 2, 3, 4]
  };
  const options = {
    distributeSeries: true,
    axisX: {
      offset: 50 //Insert here your axisX offset and play with the values
    },
    axisY: {
      offset: 10 //Insert here your axisY offset and play with the values
    }
  };
  const type = "Bar";

  console.log(data);
  return <div className="schedule-container">
    <ChartistGraph data={data} options={options} type={type} />
  </div>;
};

export default Schedule;
