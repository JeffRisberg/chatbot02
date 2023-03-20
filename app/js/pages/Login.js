import React from 'react';
import {connect} from 'react-redux';
import LoginForm from '../components/LoginForm/LoginForm';
import './Login.css';

import {set_user} from '../actions/user';
import {set_screen} from '../actions/screen';

function Login(props) {

  return (
    <div className="login-container">
      <div className="inner">

        <div className="login-description">
          Chatbot02
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

