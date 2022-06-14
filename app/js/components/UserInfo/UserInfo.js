import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Card} from '@themesberg/react-bootstrap';

import {clear_user} from '../../actions/user';
import {set_screen} from '../../actions/screen';

function UserInfo(props) {
  const user = props.user;

  const first_name = user !== null ? user.first_name : '';
  const last_name = user !== null ? user.last_name : '';

  function do_edit_profile() {
    props.set_screen('edit_profile');
  }

  function do_logout() {
    props.clear_user();
    const url = 'http://localhost:5000/logout';

    axios.post(url, {}, {
      withCredentials: true,
    });
  }

  return (
    <Card border="dark" style={{background: "#f0f0f0", marginBottom: 10}}
          className="table-wrapper table-responsive shadow-sm">
      <Card.Body style={{padding: '0px'}}>
        <div className="row">
          <div className="col-md-2" style={{maxWidth: 200}}>
            <a href="https://coach.ai">
              <img src='/images/logo_coach_ai.png' width='95%'/>
            </a>
          </div>
          <div className="col-md-6">
            <p className="card-text"></p>
            <h5 className="card-title">Prepared for {first_name} {last_name}</h5>
          </div>
          <div className="col-md-4" style={{textAlign: 'right'}}>
            <a onClick={do_edit_profile}>Edit Profile</a>
            <br/>
            <a onClick={do_logout}>Logout</a>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  user: state.app.user,
});

export default connect(
  mapStateToProps,
  {clear_user, set_screen}
)(UserInfo);
