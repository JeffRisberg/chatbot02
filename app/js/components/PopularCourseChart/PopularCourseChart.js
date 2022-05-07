import React, {useEffect, useState} from 'react';
import ChartistGraph from "react-chartist";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from "regenerator-runtime";

function PopularCourseChart() {

  const [labels, setLabels] = useState([]);
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});
  const [responsiveOptions, setResponsiveOptions] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:5001/api/popular_courses");
      var data = result.data

      setLabels(data.map(item => { return item.name }));
      setSeries(data.map(item => { return item.count }));
      setOptions({labelOffset: 30, labelInterpolationFnc: function(value) {return value}});
      setResponsiveOptions(
      [
       ['screen and (min-width: 640px)', {
         chartPadding: 10,
         labelOffset: 30,
         labelDirection: 'explode',
         labelInterpolationFnc: function(value) {
           return value;
         }
       }],
       ['screen and (min-width: 1024px)', {
         labelOffset: 30,
         chartPadding: 10
       }]
     ]);
    })();
  }, []);

  return (
    <div>
      <ChartistGraph data={{'labels': labels, 'series': series}}
      options={options} responsiveOptions={responsiveOptions}
      type="Pie" />
    </div>
  )
 }

 export default PopularCourseChart;
