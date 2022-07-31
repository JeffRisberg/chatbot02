import React from 'react';
import ResetForm from '../components/ResetForm/ResetForm';
import './Reset.css';

function Reset() {

  return (
    <div className="reset-container">
      <div className="inner">
        <div className="text-style">
          <img src="/images/logo_priority.png" width="110px"/>
        </div>

        <div className="text-style" style={{paddingTop: 15, paddingBottom: 20}}>
          Enter the email address associated with your account and we’ll send you a link to reset your password
        </div>

        <ResetForm/>
      </div>
    </div>
  )
}

export default Reset;


