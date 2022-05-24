import React from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { login } from '../../actions/user';

const LoginPage = (props) => {
  const loginPageStyle = {
    margin: "32px auto 37px",
    maxWidth: "530px",
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 0px 3px 3px rgba(0,0,0,0.15)"
  };

  const { touched, errors } = props;

  return (
      <div className="container">
        <div className="login-wrapper" style={loginPageStyle}>
          <h2>Login</h2>
          <Form className="form-container">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="text" name="email" className={"form-control"} placeholder="Email" />
              { touched.email && errors.email && <span className="help-block text-danger">{errors.email}</span> }
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" className={"form-control"} placeholder="Password" />
              { touched.password && errors.password && <span className="help-block text-danger">{errors.password}</span> }
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
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
  handleSubmit: (values, { props }) => {
    axios.post("http://localhost:5000/login", values)
    .then(response => {
      console.log(response);
      if (response.status == 200) {
        console.log(response.data[0]);

        props.login(response.data[0]);
        console.log(props);
        props.navigate.navigate("/dashboard")
      } else {
        // HANDLE ERROR
        throw new Error('Something went wrong');
      }
    })
  }
})(LoginPage);

const mapStateToProps = (state) => ({
  content: state.app.content
});

export default connect(
    mapStateToProps,
    {login}
)(LoginFormik);
