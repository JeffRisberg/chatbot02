import React, {useEffect, useState} from "react";
import {Card} from "@themesberg/react-bootstrap";
import Chatbot from 'react-chatbot-kit';
import axios from "axios";
import 'react-chatbot-kit/build/main.css';
import './UserDashboard.css';

import ScheduleList from "../components/ScheduleList/ScheduleList";
import ScheduleChart from "../components/ScheduleChart/ScheduleChart";

import config from '../bot/config';
import MessageParser from '../bot/MessageParser';
import ActionProvider from '../bot/ActionProvider';

function UserDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios("http://3.216.97.226:5001/api/users/1");
      setData(result.data[0]);
    })();
  }, []);

  return (
    <div className="UserDashboard">
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
         <Card.Body>
            <h5 className="card-title">Prepared for {data.firstname} {data.lastname}</h5>
            <p className="card-text">Updated 07-May-2022</p>
            <a href="https://coach.ai" className="btn btn-primary">Coach.ai</a>
         </Card.Body>
      </Card>
      <div className="row">
        <div className="col-md-7">
          <ScheduleChart />
          <div className="row">
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
