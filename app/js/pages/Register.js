import React from 'react';
import RegisterForm from "../components/RegisterForm/RegisterForm";
import './Register.css';

function Register() {

  return (
    <div className="register-container">
      <div className="inner">
        <div className="text-style">
          <img src="/images/logo_priority.png" width="110px"/>
        </div>

        <div className="text-style">
          Register
        </div>

        <RegisterForm/>
      </div>
    </div>
  )
}

export default Register;
