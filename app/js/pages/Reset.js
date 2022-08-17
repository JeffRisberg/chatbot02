import React from 'react';
import ResetForm from '../components/ResetForm/ResetForm';
import './Reset.css';

function Reset() {

  return (
    <div className="reset-container">
      <div className="inner">
        <div className="text-style" style={{ paddingBottom: 50 }}>
          <a href="https://coach.ai">
            <img src="/images/logo.png" width="112px"/>
          </a>

        </div>
        <div className="header-style" style={{ paddingBottom: 20 }}>
          Reset your password
        </div>
        <div className="text-style" style={{ paddingBottom: 30, textAlign: 'left' }}>
          Enter the email address associated with your account and we’ll send you a link to reset your password
        </div>

        <ResetForm />
      </div>
    </div>
  )
}

export default Reset;
