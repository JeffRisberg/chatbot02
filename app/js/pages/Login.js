import React from 'react';
import {connect} from "react-redux";
import axios from 'axios';
import {useGoogleLogin} from '@react-oauth/google';
import LoginForm from '../components/LoginForm/LoginForm';
import './Login.css';

import {set_user} from '../actions/user';
import {set_screen} from '../actions/screen';

function Login(props) {

  const onLoginGmail = useGoogleLogin({
    onSuccess: async ({code}) => {

      const values = {
        token: code,
        source: "google"
      };

      axios.post("/login", values, {
        withCredentials: true,
      })
        .then(response => {
          if (response.status == 200 && response.data != null && response.data.length > 0) {
            props.set_user(response.data[0]);
            props.set_screen('home', '');

          } else {
            // HANDLE ERROR
            alert('Invalid email or password')
          }
        })
    },
    flow: 'auth-code',
    prompt: 'consent',
    scope: 'email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
  });

  return (
    <div className="login-container">
      <div className="inner">
        <div className="text-style">
          <a href="https://coach.ai">
            <img src="/images/logo.png" width="112px"/>
          </a>
        </div>

        <div className="login-description">
          Get the most out of your time
        </div>

        <button onClick={onLoginGmail} className="btn btn-social">
        <img src="/images/google-logo-small.gif" width={28} height={28}/>
        <span className='ps-4'>Sign in with Google</span>
        </button>

        <div className="login-description">
          or
        </div>

        <LoginForm/>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  content: state.app.content
});

export default connect(
  mapStateToProps,
  {set_user, set_screen}
)(Login);

