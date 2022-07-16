import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './Frame.css';

import Bot from './components/Bot/Bot';

import Login from './pages/Login';
import Home from './pages/Home';
import DailyDashboard from './pages/DailyDashboard';
import WeeklyDashboard from './pages/WeeklyDashboard';
import MonthlyDashboard from './pages/MonthlyDashboard';
import CalendarDashboard from './pages/CalendarDashboard';

import {set_screen} from './actions/screen';

function Frame(props) {
  const user_id = props.user != null ? props.user.id : null;
  var screen = props.screen || '|';
  const index = screen.indexOf('|');
  screen = screen.substr(0, index);

  const [data, setData] = useState([]);

  const host = 'http://localhost:5000';

  useEffect(() => {
    var url = host + '/api/daily_tasks/';

    if (screen === 'weekly') {
      url = host + '/api/weekly_tasks/';
    }
    if (screen === 'monthly') {
      url = host + '/api/monthly_goals/';
    }

    (async () => {
      if (user_id !== null) {
        const result = await axios('' + url + user_id);
        setData(result.data.slice(0, 7));
      }
    })();
  }, [props]);

  console.log(props.screen);
  if (props.screen === 'calendar') {
    return (
      <div className="frame-container">
        <CalendarDashboard/>
      </div>
    )
  } else if (props.user === null) {
    return (
      <Login/>
    )
  } else if (props.screen === 'home') {
    return (
      <Home/>
    )
  } else { // this is the detail view
    return (
      <div className="frame-container">
        <div className="row">
          <div className="col-md-1 col-lg-2">
          </div>
          <div className="col-md-5 col-lg-4" style={{verticalAlign: "top"}}>
            <Bot/>
          </div>
          <div className="col-md-6 col-lg-6" style={{verticalAlign: "top"}}>
            {data.length == 0 &&
            <div style={{padding: "10px", textAlign: "center"}}>
              <a href="https://coach.ai">
                <img src='/images/logo_coach_ai.png' width='45%'/>
              </a>
              <h3>Welcome to Coach.ai</h3>
              <p>Your Success Coach, Powered by AI</p>
              <p>We provide you with intelligent scheduling and planning to meet your goals</p>
              <p>Say hello to Coach Dara.</p>
            </div>
            }
            {data.length > 0 && screen == 'monthly' && <MonthlyDashboard details={true}/>}
            {data.length > 0 && screen == 'weekly' && <WeeklyDashboard details={true}/>}
            {data.length > 0 && screen == 'daily' && <DailyDashboard details={true}/>}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.app.user,
  content: state.app.content,
  screen: state.app.screen
});

export default connect(
  mapStateToProps,
  {set_screen}
)(Frame);
