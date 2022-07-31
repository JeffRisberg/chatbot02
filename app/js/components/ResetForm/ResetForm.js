import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Field, Form, withFormik } from 'formik';
import * as Yup from 'yup';
import "./ResetForm.css";

import { set_screen } from '../../actions/screen';

const ResetForm = (props) => {

  const { touched, errors } = props;

  function doCancel() {
    props.set_screen(null);
  }

  return (
    <div className="resetForm-container">
      <div className="reset-wrapper">
        <Form className="form-container">

          <div className="form-group" style={{height: 60}}>
            <Field type="text" name="email" className={"form-control"} placeholder="Email" />
            {touched.email && errors.email && <span className="help-block text-danger">{errors.email}</span>}
          </div>

          <button type="submit" className="full-width btn btn-primary">
            Continue
          </button>
          <button onClick={doCancel} style={{padding: 0}} className="btn btn-default">Cancel</button>
        </Form>
      </div>
    </div>
  );
}

const ResetFormik = withFormik({
  mapPropsToValues: (props) => {
    return {
      email: props.email || '',
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email not valid').required('Email is required'),
  }),
  handleSubmit: (values, { props }) => {
    try {
      axios.post("/reset", values, {
        withCredentials: true,
      })
        .then(response => {
          if (response.status == 200 && response.data != null && response.data.length > 0) {
            // props.set_user(response.data[0]);
            props.set_screen('home', '');

          } else {
            // HANDLE ERROR
            alert('Invalid email')
          }
        })
    } catch (error) {
      alert('Unable to reset')
    }
  }
})(ResetForm);

const mapStateToProps = (state) => ({
  content: state.app.content
});

export default connect(
  mapStateToProps,
  {set_screen}
)(ResetFormik);
