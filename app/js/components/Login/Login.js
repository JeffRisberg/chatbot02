import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import "./Login.css";

import { login } from '../../actions/user';

function Login(props) {

  const msg = "";

  return (
     <div className="login-container">
        <h2>Login</h2>

        <form>
          <label /*for="email"*/>
            <i className="fas fa-envelope"></i>
          </label>
          <input type="text" name="email" placeholder="Email" id="email" required />
          <br/>
          <label /*for="password"*/>
            <i className="fas fa-lock"></i>
          </label>
          <input type="password" name="password" placeholder="Password" id="password" required />
          <br/>
          <button onClick={props.login}>Login</button>
        </form>
     </div>
  )
}

const mapStateToProps = (state) => ({
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
