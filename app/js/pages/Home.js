import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import TopMenu from '../components/TopMenu/TopMenu';
import './Home.css';

import {set_screen} from "../actions/screen";

function Home(props) {
  const user_id = props.user.id;
  const user = props.user;
  const firstName = user !== null ? user.first_name : '';

  const [monthlyData, setMonthlyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);

  const host = 'http://localhost:5000';

  useEffect(() => {
    (async () => {
      const result1 = await axios(host + '/api/monthly_goals/' + user_id);
      const data1 = result1.data.slice(0, 3);

      setMonthlyData(data1);

      const result2 = await axios(host + '/api/weekly_tasks/' + user_id);
      const data2 = result2.data.slice(0, 3);

      setWeeklyData(data2);

      const result3 = await axios(host + '/api/daily_tasks/' + user_id);
      const data3 = result3.data.slice(0, 1);

      setDailyData(data3);
    })();
  }, []);

  function onMonthly() {
    const my_name = 'monthly';
    axios.post(host + '/change_screen/' + my_name, null, {
      withCredentials: true,
    })
      .then((resp) => {
        props.set_screen(my_name, resp.data);
      });
  }

  function onWeekly() {
    const my_name = 'weekly';

    axios.post(host + '/change_screen/' + my_name, null, {
      withCredentials: true,
    })
      .then((resp) => {
        props.set_screen(my_name, resp.data);
      });
  }

  return (
    <div className='home-container'>
      <div style={{height: '45px'}}>
        <div style={{float: 'left'}}>
          <TopMenu/>
        </div>
        <div className="goal-box">
          <button onClick={onMonthly}>
            <span>This Month's Goals</span>
          </button>
          <ol>
            {monthlyData.map((goal) => (
              <li key={goal.id}>{goal.name}</li>
            ))}
          </ol>
        </div>
        <div className="goal-box">
          <button onClick={onWeekly}>
            <span>This Week's Goals</span>
          </button>
          <ol>
            {weeklyData.map((goal) => (
              <li key={goal.id}>{goal.name}</li>
            ))}
          </ol>
        </div>
      </div>
      <div style={{clear: 'both', height: '550px', color: 'white', display: 'grid', alignItems: 'center', justifyContent: 'center'}}>
        <div>
          <h1 style={{textAlign: 'center'}}>Hi, {firstName}</h1>
          {dailyData.length > 0 &&
          <h2 style={{textAlign: 'center'}}>Now</h2>}
          {dailyData.length === 0 &&
          <h2 style={{textAlign: 'center'}}>What do you want to work on today?</h2>}
          {dailyData.map((goal) => (
            <h1 style={{textDecoration: 'underline', textAlign: 'center'}} key={goal.id}>
              {goal.name}
            </h1>
          ))}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.app.user
});

export default connect(
  mapStateToProps,
  {set_screen}
)(Home);
