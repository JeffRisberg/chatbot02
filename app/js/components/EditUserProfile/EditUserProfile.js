import React from 'react';
import {connect} from 'react-redux';
import {Field, Form, withFormik} from 'formik';
import * as Yup from 'yup';
import './EditUserProfile.css';

import {set_screen} from '../../actions/screen';
import {set_user} from '../../actions/user';

import axios from 'axios';

function EditUserProfilePage(props) {

  const editUserProfilePageStyle = {
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
    <div className="edit-profile-wrapper" style={editUserProfilePageStyle}>
      <div className="row">
        <div className="col-md-2">
          &nbsp;
        </div>
        <div className="col-md-8">
          <h2>Edit Profile</h2>
          <Form className="form-container">
            <Field type="hidden" name="id" className={"form-control"}/>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <Field type="text" name="first_name" className={"form-control"} placeholder="First Name"/>
              {touched.first_name && errors.first_name &&
              <span className="help-block text-danger">{errors.first_name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <Field type="text" name="last_name" className={"form-control"} placeholder="Last Name"/>
              {touched.last_name && errors.last_name &&
              <span className="help-block text-danger">{errors.last_name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="street_address1">Street Address 1</label>
              <Field type="text" name="street_address1" className={"form-control"} placeholder="Street Address 1"/>
              {touched.street_address1 && errors.street_address1 &&
              <span className="help-block text-danger">{errors.street_address1}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="streetAddress2">Street Address 2</label>
              <Field type="text" name="street_address2" className={"form-control"} placeholder="Street Address 2"/>
              {touched.street_address2 && errors.street_address2 &&
              <span className="help-block text-danger">{errors.street_address2}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <Field type="text" name="city" className={"form-control"} placeholder="City"/>
              {touched.city && errors.city && <span className="help-block text-danger">{errors.city}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <Field type="text" name="state" className={"form-control"} placeholder="State"/>
              {touched.state && errors.state && <span className="help-block text-danger">{errors.state}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="state">Zip</label>
              <Field type="text" name="zip" className={"form-control"} placeholder="ZipCode"/>
              {touched.zip && errors.zip && <span className="help-block text-danger">{errors.zip}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="state">Timezone&nbsp;&nbsp;</label>
              <Field name="timezone" as="select">
                <option value="America/Los_Angeles">Pacific</option>
                <option value="America/Denver">Mountain</option>
                <option value="America/Chicago">Central</option>
                <option value="America/New_York">Eastern</option>
              </Field>
              {touched.timezone && errors.timeszone && <span className="help-block text-danger">{errors.timezone}</span>}
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

const EditUserProfileFormik = withFormik({
  mapPropsToValues: (props) => {
    return {
      id: props.user.id || '',
      first_name: props.user.first_name || '',
      last_name: props.user.last_name || '',
      street_address1: props.user.street_address1 || '',
      street_address2: props.user.street_address2 || '',
      city: props.user.city || '',
      state: props.user.state || '',
      zip: props.user.zip || '',
      timezone: props.user.timezone || ''
    }
  },
  validationSchema: Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    state: Yup.string().required('State is required')
  }),
  handleSubmit: (values, {props}) => {
    console.log(values);
    axios.put('http://localhost:5000/api/users', values, {
      withCredentials: true,
    })
      .then(response => {
        console.log(response)
        if (response.status == 200) {
          props.set_user(values);
          props.set_screen(null);
        } else {
          // HANDLE ERROR
          alert('Invalid email or password')
        }
      })
  }
})(EditUserProfilePage);

const mapStateToProps = (state) => ({
  user: state.app.user,
});

export default connect(
  mapStateToProps,
  {set_user, set_screen}
)(EditUserProfileFormik);
