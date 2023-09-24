import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Field, Form, withFormik} from 'formik';
import * as Yup from 'yup';
import './LoginForm.css';

import {set_user} from '../../actions/user';
import {set_screen} from '../../actions/screen';

const LoginForm = (props) => {

  const {touched, errors} = props;

  return (
    <div className="loginForm-container">
      <div className="login-wrapper">
        <Form className="form-container">

          <div className="form-group" style={{height: 60}}>
            <Field type="email" name="email" className={"form-control"} placeholder="Email"/>
            {touched.email && errors.email && <span className="help-block text-danger">{errors.email}</span>}
          </div>

          <div className="form-group">
            <Field type="password" name="password" className={"form-control"} placeholder="Password"/>
            {touched.password && errors.password && <span className="help-block text-danger">{errors.password}</span>}
          </div>

          <div className="alignleft" style={{cursor: 'pointer'}} /*onClick={doRegister}*/>
            <span className="text-style small">
              Don't have an account?
            </span>
          </div>

          <div className="alignright" style={{cursor: 'pointer'}} /*onClick={doReset}*/>
            <span className="text-style small">
              Forgot Password?
            </span>
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Login &#x2192;
          </button>
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
    } catch (error) {
      alert('Unable to login')
    }
  }
})(LoginForm);

const mapStateToProps = (state) => ({
  content: state.app.content
});

export default connect(
  mapStateToProps,
  {set_user, set_screen}
)(LoginFormik);
