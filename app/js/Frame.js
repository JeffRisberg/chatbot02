import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './Frame.css';

import Login from './components/Login/Login';
import Register from './components/Register/Register';
import EditUserProfile from './components/EditUserProfile/EditUserProfile';
import UserInfo from './components/UserInfo/UserInfo';
import Bot from './components/Bot/Bot';

import DailyDashboard from './pages/DailyDashboard';
import WeeklyDashboard from './pages/WeeklyDashboard';
import MonthlyDashboard from './pages/MonthlyDashboard';
import PastDailyDashboard from './pages/PastDailyDashboard';
import PastWeeklyDashboard from './pages/PastWeeklyDashboard';
import CalendarDashboard from './pages/CalendarDashboard';

import {set_screen, set_screen_tab} from './actions/screen';

function Frame(props) {
  const user_id = props.user != null ? props.user.id : null;
  var screen_tab = props.screen_tab || '|';
  const index = screen_tab.indexOf('|');
  screen_tab = screen_tab.substr(0, index);

  const [data, setData] = useState([]);

  const host = 'http://localhost:5000';

  useEffect(() => {
    var url = host + '/api/daily_tasks/';

    if (screen_tab === 'weekly') {
      url = host + '/api/weekly_tasks/';
    }
    if (screen_tab === 'monthly') {
      url = host + '/api/monthly_goals/';
    }

    (async () => {
      if (user_id !== null) {
        const result = await axios('' + url + user_id);
        setData(result.data.slice(0, 7));
      }
    })();
  }, [props]);

  /*
  function pastDaily() {
    const tab_name = 'past_daily';
    axios.post('/change_screen/' + tab_name, null, {
      withCredentials: true,
    })
      .then((resp) => {
        props.set_screen_tab(tab_name, resp.data);
      });
  }

  function pastWeekly() {
    const tab_name = 'past_weekly';
    axios.post('/change_screen/' + tab_name, null, {
      withCredentials: true,
    })
      .then((resp) => {
        props.set_screen_tab(tab_name, resp.data);
      });
  }
   */

  if (props.screen === 'register') {
    return (
      <div className="frame-container">
        <div className="row">
          <div className="col-md-3 col-lg-2">
            <a href="https://coach.ai">
              <img src="/images/logo_coach_ai.png" width="150px"/>
            </a>
          </div>
          <div className="col-md-9 col-lg-10">
            <h2></h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 col-lg-3">
          </div>
          <div className="col-md-8 col-lg-6">
            <Register/>
          </div>
          <div className="col-md-2 col-lg-3">
          </div>
        </div>
      </div>
    )
  } else if (props.screen === 'calendar') {
    return (
      <div className="frame-container">
        <UserInfo/>
        <CalendarDashboard/>
      </div>
    )
  } else if (props.screen === 'edit_profile') {
    return (
      <div className="frame-container">
        <div className="row">
          <div className="col-md-2">
            <a href="https://coach.ai">
              <img src="/images/logo_coach_ai.png" width="150px"/>
            </a>
          </div>
          <div className="col-md-10">
            <h2></h2>
          </div>
        </div>
        <div className="row">
          <div className="d-sm-none col-lg-3">
          </div>
          <div className="col-sm-12 col-lg-6">
            <EditUserProfile/>
          </div>
          <div className="d-sm-none col-lg-3">
          </div>
        </div>
      </div>
    )
  } else if (props.user === null) {
    return (
      <div className="frame-container">
        <div className="row">
          <div className="col-md-3 col-lg-2">
            <a href="https://coach.ai">
              <img src="/images/logo_coach_ai.png" width="150px"/>
            </a>
          </div>
          <div className="col-md-9 col-lg-10">
            <h2></h2>
          </div>
        </div>
        <div className="row">
          <div className="d-sm-none col-lg-3">
          </div>
          <div className="col-sm-12 col-lg-6">
            <Login/>
          </div>
          <div className="d-sm-none col-lg-3">
          </div>
        </div>
      </div>
    )
  } else if (props.screen === 'dashboard') {
    return (
      <div className="frame-container">
        <div className="row">
          <UserInfo/>
        </div>
        <div className="row">
          <div className="col-lg-1">
          </div>
          <div valign={"top"} className="col-lg-10">
            <MonthlyDashboard/>
          </div>
          <div className="col-lg-1">
          </div>
        </div>
        <div>
          &nbsp;
        </div>
        <div className="row">
          <div valign={"top"} className="col-lg-7">
            <WeeklyDashboard/>
            {screen_tab == 'past_weekly' && <PastWeeklyDashboard/>}
          </div>
          <div valign={"top"} className="col-lg-5">
            {screen_tab !== 'past_daily' && screen_tab !== 'past_weekly' && <DailyDashboard/>}
            {screen_tab == 'past_daily' && <PastDailyDashboard/>}
          </div>
        </div>
      </div>
    )
  } else { // this is the detail view (for screen_tab), with the 2,4,6 layout
    return (
      <div className="frame-container">
        <div className="row">
          <UserInfo/>
        </div>
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
            {data.length > 0 && screen_tab == 'monthly' && <MonthlyDashboard details={true}/>}
            {data.length > 0 && screen_tab == 'weekly' && <WeeklyDashboard details={true}/>}
            {data.length > 0 && screen_tab == 'daily' && <DailyDashboard details={true}/>}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.app.user,
  content: state.app.content,
  screen: state.app.screen,
  screen_tab: state.app.screen_tab,
});

export default connect(
  mapStateToProps,
  {set_screen, set_screen_tab}
)(Frame);
