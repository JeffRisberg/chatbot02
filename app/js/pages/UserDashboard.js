import React from "react";
import {Link} from "react-router-dom";
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import './UserDashboard.css';

import ScheduleList from "../components/ScheduleList/ScheduleList";
import ScheduleChart from "../components/ScheduleChart/ScheduleChart";
import UserInfo from "../components/UserInfo/UserInfo";

import config from '../bot/config';
import MessageParser from '../bot/MessageParser';
import ActionProvider from '../bot/ActionProvider';

function UserDashboard() {

  return (
    <div className="UserDashboard">
      <Link to="/hrTeamsDashboard">HR Access</Link>
      <UserInfo />
      <div className="row">
        <div className="col-md-7">
          <ScheduleChart />
          <div className="row" style={{marginTop: 20}}>
            <div className="col-md-8">
              <ScheduleList />
            </div>
           </div>
        </div>
        <div className="col-md-5">
          <div className="Chatbot">
            <header className="Chatbot-header">
              <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
              />
            </header>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard;
