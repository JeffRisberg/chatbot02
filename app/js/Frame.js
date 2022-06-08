import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
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

function Frame(props) {

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
          <div className="col-sm-1 col-lg-3">
          </div>
          <div className="col-sm-10 col-lg-6">
            <EditUserProfile/>
          </div>
          <div className="col-sm-1 col-lg-3">
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
          <div className="col-sm-1 col-lg-3">
          </div>
          <div className="col-sm-10 col-lg-6">
            <Login/>
          </div>
          <div className="col-sm-1 col-lg-3">
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
        <div className="row">
          <div className="col-md-12 col-lg-4">
            <Bot/>
          </div>
          <div className="col-md-12 col-lg-8">
            <BrowserRouter>
              <Routes>
                <Route path='/pastDailyDashboard' element={<PastDailyDashboard/>}/>
                <Route path='/pastWeeklyDashboard' element={<PastWeeklyDashboard/>}/>
                <Route path='/' element={<DailyDashboard/>}/>
                <Route path='/dailyDashboard' element={<DailyDashboard/>}/>
                <Route path='/weeklyDashboard' element={<WeeklyDashboard/>}/>
                <Route path='/monthlyDashboard' element={<MonthlyDashboard/>}/>
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  user: state.app.user,
  screen: state.app.screen,
});

export default connect(
  mapStateToProps,
  {}
)(Frame);
