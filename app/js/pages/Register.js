import React from 'react';
import './Register.css';
import RegisterForm from "../components/RegisterForm/RegisterForm";

function Register() {

  return (
    <div className="register-container">
      <div className="inner">
        <div className="text-style">
          <img src="/images/logo_priority.png" width="150px"/>
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
