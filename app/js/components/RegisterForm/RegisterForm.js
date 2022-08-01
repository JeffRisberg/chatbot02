import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Field, Form, withFormik } from 'formik';
import * as Yup from 'yup';
import './RegisterForm.css';

import { set_screen } from '../../actions/screen';

function RegisterForm(props) {

  const { touched, errors } = props;

  function doCancel() {
    props.set_screen(null);
  }

  return (
    <div className="registerForm-container">
      <div className="register-wrapper">
        <Form className="form-container">

          <div className="form-group" style={{ height: 60 }}>
            <Field type="text" name="first_name" className={"form-control"} placeholder="First Name" />
            {touched.first_name && errors.first_name &&
              <span className="help-block text-danger">{errors.first_name}</span>}
          </div>

          <div className="form-group" style={{ height: 60 }}>
            <Field type="text" name="email" className={"form-control"} placeholder="Email address" />
            {touched.email && errors.email &&
              <span className="help-block text-danger">{errors.email}</span>}
          </div>

          <div className="form-group" style={{ height: 60 }}>
            <Field type="password" name="password" className={"form-control"} placeholder="Password" />
            {touched.password && errors.password &&
              <span className="help-block text-danger">{errors.password}</span>}
          </div>

          <button type="submit" className="full-width btn btn-primary">
            Save
          </button>

          <div className="centered">
            <button onClick={doCancel} style={{ padding: 0 }} className="btn btn-default">
              <p className="text-style">
                Cancel
              </p>
            </button>
          </div>
        </Form>
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
  handleSubmit: (values, { props }) => {
    console.log(values);
    axios.post('/api/users', values, {
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
})(RegisterForm);

const mapStateToProps = (state) => ({
  user: state.app.user,
});

export default connect(
  mapStateToProps,
  { set_screen }
)(RegisterFormik);
