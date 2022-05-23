import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import "./Register.css";

import { register } from '../../actions/user';

function Register(props) {

  const msg = "";

  return (
     <div className="register-container">
        <h2>Register</h2>

        <form>
          <label /*for="email"*/>
            <i className="fas fa-envelope"></i>
          </label>
          <input type="text" name="email" placeholder="Email" id="email" required/>
          <br/>
          <label /*for="password"*/>
            <i className="fas fa-lock"></i>
          </label>
          <input type="password" name="password" placeholder="Password" id="password" required />
          <br/>
          <button onClick={props.register}>Register</button>
        </form>
     </div>
  )
}

const mapStateToProps = (state) => ({
});

export default connect(
  mapStateToProps,
  { register }
)(Register);
