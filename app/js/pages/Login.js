import React from 'react';
import axios from "axios";
import {useGoogleLogin} from "@react-oauth/google";
import './Login.css';
import {connect} from "react-redux";
import {set_user} from "../actions/user";
import {set_screen} from "../actions/screen";

import LoginForm from '../components/LoginForm/LoginForm';

function Login(props) {

  const onLoginGmail = useGoogleLogin({
    onSuccess: async (tokenResponse) => {

      console.log("google tokenResponse:", tokenResponse);

      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
      );
      console.log("res:", res);

      const email = res.data.email;
      const values = {email: email, password: "pw", token: tokenResponse.access_token};

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
    scope: 'email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar',
  });

  return (
    <div className="login-container">
      <div className="inner">
        <div className="text-style">
          <img src="/images/logo_priority.png" width="110px"/>
        </div>

        <div className="text-style" style={{paddingTop: 15, paddingBottom: 20}}>
          Get the most out of your time
        </div>

        <button onClick={onLoginGmail} style={{borderWidth: 0, background: 'none'}}>
          <img src="/images/google-login.png" width="100%"/>
        </button>

        <div className="text-style" style={{paddingTop: 15, paddingBottom: 15}}>
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

