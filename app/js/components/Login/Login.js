import React from 'react';
import {connect} from 'react-redux';
import axios from "axios";
import {Field, Form, withFormik} from 'formik';
import * as Yup from 'yup';

import {set_user} from '../../actions/user';
import {set_screen} from '../../actions/screen';
import {set_screen_tab} from '../../actions/screen';


const LoginPage = (props) => {
  const loginPageStyle = {
    margin: '32px auto 37px',
    maxWidth: '530px',
    background: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0px 0px 3px 3px rgba(0,0,0,0.15)'
  };

  const {touched, errors} = props;

  function doRegister() {
    props.set_screen('register');
  }

  return (
    <div className="container">
      <div className="login-wrapper" style={loginPageStyle}>
        <h2>Login</h2>
        <Form className="form-container">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="text" name="email" className={"form-control"} placeholder="Email"/>
            {touched.email && errors.email && <span className="help-block text-danger">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" className={"form-control"} placeholder="Password"/>
            {touched.password && errors.password && <span className="help-block text-danger">{errors.password}</span>}
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          &nbsp;&nbsp;
          <button type="button" onClick={doRegister} className="btn btn-primary">Register</button>
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

            const tab_name = 'monthly';
            axios.post('http://localhost:5000/change_screen/' + tab_name, null, {
              withCredentials: true,
            })
              .then((resp) => {
                props.set_screen_tab(tab_name, resp.data);
              })
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
  {set_user, set_screen, set_screen_tab}
)(LoginFormik);
