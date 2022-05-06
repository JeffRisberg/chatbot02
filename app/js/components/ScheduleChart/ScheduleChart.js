import React, {useEffect, useState} from 'react';
import ChartistGraph from "react-chartist";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from "regenerator-runtime";

function ScheduleChart() {

  const [labels, setLabels] = useState([]);
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:5001/api/schedule/1");
      var data = result.data.slice(0, 6)
      var x = data.map(item => {
         return item.courseName + '\n' + item.lessonName + '\n' + item.scheduledStart
      });
      var y = [...Array(x.length).keys()];
      setLabels(x);
      setSeries([y.map(y => { return y*10 + 10; })]);
      setOptions({distributeSeries: false,
                  axisX: {
                    offset: 40
                  },
                  axisY: {
                    offset: 20
                  }
                  });
    })();
  }, []);

  return (
    <div>
      <ChartistGraph data={{'labels': labels, 'series': series}} options={options} type="Bar"/>
    </div>
  )
 }

 export default ScheduleChart;
