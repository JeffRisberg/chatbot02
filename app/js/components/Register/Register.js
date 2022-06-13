import React from 'react';
import {connect} from 'react-redux';
import './Register.css';

import {Field, Form, withFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import {set_screen} from "../../actions/screen";
import {set_user} from '../../actions/user';

function RegisterPage(props) {

  const registerPageStyle = {
    margin: '32px auto 37px',
    maxWidth: '530px',
    background: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0px 0px 3px 3px rgba(0,0,0,0.15)'
  };

  const {touched, errors} = props;

  function doCancel() {
    props.set_screen(null);
  }

  return (
    <div className="register-wrapper" style={registerPageStyle}>
      <div className="row">
        <div className="col-md-2">
          &nbsp;
        </div>
        <div className="col-md-8">
          <h2>Register</h2>
          <Form className="form-container">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <Field type="text" name="first_name" className={"form-control"} placeholder="First Name"/>
              {touched.first_name && errors.first_name &&
              <span className="help-block text-danger">{errors.first_name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <Field type="text" name="email" className={"form-control"} placeholder="Email address"/>
              {touched.email && errors.email &&
              <span className="help-block text-danger">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="firstName">Password</label>
              <Field type="password" name="password" className={"form-control"} placeholder="Password"/>
              {touched.password && errors.password &&
              <span className="help-block text-danger">{errors.password}</span>}
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
            &nbsp;&nbsp;
            <button type="button" onClick={doCancel} className="btn btn-default">Cancel</button>
          </Form>
        </div>
      </div>
    </div>
  )
}

const RegisterFormik = withFormik({
  mapPropsToValues: () => {
    return {
      first_name: '',
      email: '',
      password: '',
    }
  },
  validationSchema: Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    email: Yup.string().email('Email not valid').required('Email is required'),
    password: Yup.string().required('Password is required')
  }),
  handleSubmit: (values, {props}) => {
    console.log(values);
    axios.post('http://localhost:5000/api/users', values, {
      withCredentials: true,
    })
      .then(response => {
        if (response.status == 200) {
          values['id'] = response.data
          props.set_screen(null);
        } else {
          // HANDLE ERROR
          alert('Invalid email or password')
        }
      })
  }
})(RegisterPage);

const mapStateToProps = (state) => ({
  user: state.app.user,
});

export default connect(
  mapStateToProps,
  {set_user, set_screen}
)(RegisterFormik);
