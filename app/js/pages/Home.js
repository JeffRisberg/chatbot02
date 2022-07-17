import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TopMenu from '../components/TopMenu/TopMenu';
import axios from 'axios';
import {set_screen} from "../actions/screen";
import './Home.css';

function Home(props) {
  const user_id = props.user.id;
  const user = props.user;
  const firstName = user !== null ? user.first_name : '';

  const [monthlyData, setMonthlyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  const host = 'http://localhost:5000';

  useEffect(() => {
    (async () => {
        const result1 = await axios(host + '/api/monthly_tasks/' + user_id);
        const data1 = result1.data;

        setMonthlyData(data1);

        const result2 = await axios(host + '/api/weekly_tasks/' + user_id);
        const data2 = result2.data;

        setWeeklyData(data2);
      })
  });

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

  console.log(monthlyData);
  console.log(weeklyData);

  return (
    <div className='home-container'>
      <div style={{height: '45px'}}>
        <div style={{float: 'left'}}>
          <TopMenu/>
        </div>
        <div style={{float: 'right'}}>
          <button onClick={onWeekly} style={{background: 'none', borderWidth: 0}}>
            <span style={{color: 'white'}}>This Week</span>
          </button>
          <button onClick={onMonthly} style={{background: 'none', borderWidth: 0}}>
            <span style={{color: 'white'}}>This Month</span>
          </button>
        </div>
      </div>
      <div style={{height: '550px', color: 'white', display: 'grid', alignItems: 'center', justifyContent: 'center'}}>
        <h1>Hi, {firstName}</h1>
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
