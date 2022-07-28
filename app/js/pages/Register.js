import React from 'react';
import './Login.css';

import RegisterForm from "../components/RegisterForm/RegisterForm";

function Register() {

  return (
    <div className="register-container">
      <div className="row">
        <div className="col-md-4">
          &nbsp;
        </div>
        <div className="col-md-4" style={{background: "white"}}>
          <a href="https://demo.coach.ai">
            <img src="/images/logo_priority.png" width="160px"/>
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
          <RegisterForm/>
        </div>
        <div className="col-md-4">
        </div>
      </div>
    </div>
  )
}

export default Register;
