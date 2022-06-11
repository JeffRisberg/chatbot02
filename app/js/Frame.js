import React from 'react';
import {connect} from 'react-redux';
import './Frame.css';

import Login from './components/Login/Login';
import Register from './components/Register/Register';
import EditUserProfile from './components/EditUserProfile/EditUserProfile';
import UserInfo from './components/UserInfo/UserInfo';
import Bot from './components/Bot/Bot';

import PastDailyDashboard from './pages/PastDailyDashboard';
import PastWeeklyDashboard from './pages/PastWeeklyDashboard';
import DailyDashboard from './pages/DailyDashboard';
import WeeklyDashboard from './pages/WeeklyDashboard';
import MonthlyDashboard from './pages/MonthlyDashboard';

import {set_screen_tab} from './actions/screen';

function Frame(props) {

  function pastDailyTasks() {
    console.log('pastDaily');
    set_screen_tab('past_daily');
  }

  function pastWeeklyTasks() {
    console.log('pastWeekly');
    set_screen_tab('past_weekly');
  }

  if (props.screen === 'register') {
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
          <div className="col-md-3">
          </div>
          <div className="col-md-6">
            <Register/>
          </div>
          <div className="col-md-3">
          </div>
        </div>
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
          <div className="d-sm-nonecol-lg-3">
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
            <Login/>
          </div>
          <div className="d-sm-none col-lg-3">
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="frame-container">
        <div className="row">
          <UserInfo/>
        </div>
        <table width={"100%"}>
          <tbody>
            <tr>
              <td valign={"top"} width={"33%"} style={{border: "1px solid #888"}}>
                <WeeklyDashboard/>
              </td>
              <td valign={"top"} width={"33%"} rowSpan={"2"}>
                <Bot/>
              </td>
              <td valign={"top"} width={"33%"} style={{border: "1px solid #888"}}>
                {props.screen == 'past_daily' ? <PastDailyDashboard/> : ''}
                {props.screen == 'past_weeky' ? <PastWeeklyDashboard/> : ''}
                {props.screen !== 'past_daily' && props.screen !== 'past_weekly' ? <DailyDashboard/> : ''}
              </td>
            </tr>
            <tr>
              <td valign={"top"} style={{border: "1px solid #888"}}>
                <MonthlyDashboard/>
              </td>
              <td valign={"top"} style={{border: "1px solid #888"}}>
                <div><button type="button" onClick={pastDailyTasks} className="btn btn-link">Past Daily Tasks</button></div>
                <div><button type="button" onClick={pastWeeklyTasks} className="btn btn-link">Past Weekly Tasks</button></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  user: state.app.user,
  screen: state.app.screen,
  screen_tab: state.app.screen_tab,
});

export default connect(
  mapStateToProps,
  {set_screen_tab}
)(Frame);
