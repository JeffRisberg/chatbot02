import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Field, Form, withFormik} from 'formik';
import * as Yup from 'yup';
import "./LoginForm.css";

import {set_user} from '../../actions/user';
import {set_screen} from '../../actions/screen';

const LoginPage = (props) => {

  const {touched, errors} = props;

  function doRegister() {
    props.set_screen('register');
  }

  function doCancel() {
    props.set_screen(null);
  }

  return (
    <div className="loginForm-container">
      <div className="login-wrapper">
        <Form className="form-container">
          <div className="form-group">
            <Field type="text" name="email" className={"form-control"} placeholder="Email"/>
            {touched.email && errors.email && <span className="help-block text-danger">{errors.email}</span>}
          </div>
          <div className="form-group">
            <Field type="password" name="password" className={"form-control"} placeholder="Password"/>
            {touched.password && errors.password && <span className="help-block text-danger">{errors.password}</span>}
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <button type="button" onClick={doRegister} className="btn btn-primary">
            Register
          </button>
          <div style={{cursor: 'pointer'}} onClick={doCancel}>Cancel</div>
        </Form>
      </div>
    </div>
  );
}

const LoginFormik = withFormik({
  mapPropsToValues: (props) => {
    return {
      email: props.email || '',
      password: props.password || ''
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email not valid').required('Email is required'),
    password: Yup.string().required('Password is required')
  }),
  handleSubmit: (values, {props}) => {
    try {
      axios.post("http://localhost:5000/login", values, {
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
    } catch (error) {
      alert('Unable to login')
    }
  }
})(LoginPage);

const mapStateToProps = (state) => ({
  content: state.app.content
});

export default connect(
  mapStateToProps,
  {set_user, set_screen}
)(LoginFormik);
