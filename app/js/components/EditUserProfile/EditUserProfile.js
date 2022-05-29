import React from "react";
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './EditUserProfile.css';

import { setScreen } from '../../actions/screen';

function EditUserProfilePage(props) {
  console.log(props);

  const editUserProfilePageStyle = {
    margin: "32px auto 37px",
    maxWidth: "530px",
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 0px 3px 3px rgba(0,0,0,0.15)"
  };

  const { touched, errors } = props;

  function do_save() {
    props.setScreen(null);
  }

  return (
    <div className="edit-profile-wrapper" style={editUserProfilePageStyle}>
      <div className="row">
        <div className="col-md-2">
        </div>
        <div className="col-md-8">
          <h2>Edit Profile</h2>
          <Form className="form-container">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <Field type="text" name="firstName" className={"form-control"} placeholder="First Name" />
              { touched.firstName && errors.firstName && <span className="help-block text-danger">{errors.firstName}</span> }
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <Field type="text" name="lastName" className={"form-control"} placeholder="Last Name" />
              { touched.firstName && errors.lastName && <span className="help-block text-danger">{errors.lastName}</span> }
            </div>
            <div className="form-group">
              <label htmlFor="streetAddress1">Street Address 1</label>
              <Field type="text" name="streetAddress1" className={"form-control"} placeholder="Street Address 1" />
              { touched.streetAddress1 && errors.streetAddress1 && <span className="help-block text-danger">{errors.streetAddress1}</span> }
            </div>
            <div className="form-group">
              <label htmlFor="streetAddress1">Street Address 2</label>
              <Field type="text" name="streetAddress2" className={"form-control"} placeholder="Street Address 2" />
              { touched.streetAddress1 && errors.streetAddress2 && <span className="help-block text-danger">{errors.streetAddress2}</span> }
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <Field type="text" name="city" className={"form-control"} placeholder="City" />
              { touched.city && errors.city && <span className="help-block text-danger">{errors.city}</span> }
            </div>
             <div className="form-group">
              <label htmlFor="state">State</label>
              <Field type="text" name="state" className={"form-control"} placeholder="State" />
              { touched.state && errors.state && <span className="help-block text-danger">{errors.state}</span> }
            </div>
          </Form>
          <a onClick={do_save}>Save Profile</a>
        </div>
      </div>
    </div>
  )
}

const EditUserProfileFormik = withFormik({
  mapPropsToValues: (props) => {
    return {
      firstName: props.user.firstName || '',
      lastName: props.user.lastName || '',
      city: props.user.city || '',
      state: props.user.state || ''
    }
  },
  validationSchema: Yup.object().shape({
    firstName: Yup.string().required('First Name is required')
  }),
  handleSubmit: (values, { props }) => {
    console.log("handleSubmit");
    console.log(values);
  }
})(EditUserProfilePage);

const mapStateToProps = (state) => ({
  user: state.app.user,
});

export default connect(
  mapStateToProps,
  { setScreen }
)(EditUserProfileFormik);
