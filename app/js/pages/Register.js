import React from 'react';
import RegisterForm from "../components/RegisterForm/RegisterForm";
import './Register.css';

function Register() {

  return (
    <div className="register-container">
      <div className="inner">
        <div className="text-style" style={{paddingBottom: 50}}>
          <a href="https://coach.ai">
            <img src="/images/logo.png" width="112px"/>
          </a>
        </div>

        <div className="header-style" style={{paddingBottom: 20}}>
          Register
        </div>

        <RegisterForm/>
      </div>
    </div>
  )
}

export default Register;
