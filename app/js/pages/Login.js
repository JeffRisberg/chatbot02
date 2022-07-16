import React from 'react';
import './Login.css';

import LoginForm from '../components/LoginForm/LoginForm';

function Login() {

  return (
    <div className="home-container">
      <div className="row">
        <div className="col-md-4">
          &nbsp;
        </div>
        <div className="col-md-4" style={{background: "white"}}>
          <a href="https://coach.ai">
            <img src="/images/logo_coach_ai.png" width="150px"/>
          </a>
        </div>
        <div className="col-md-10">
          <h2></h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
        </div>
        <div className="col-md-4">
          <LoginForm/>
        </div>
        <div className="col-md-4">
        </div>
      </div>
    </div>
  )
}


export default Login;
