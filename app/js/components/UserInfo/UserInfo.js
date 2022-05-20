import React from 'react';
import { connect } from 'react-redux';
import {Card} from "@themesberg/react-bootstrap";

import { login } from '../../actions/user';
import { logout } from '../../actions/user';

function UserInfo(props) {
  const user = props.user;

  const firstName = user != null ? user.firstName : "";
  const lastName = user != null ? user.lastName : "";

  return (
    <Card border="dark" style={{background: "#f0f0f0", marginBottom: 10}} className="table-wrapper table-responsive shadow-sm">
         <Card.Body>
            <div className="row">
              <div className="col-md-2">
                <a href="https://coach.ai">
                  <img src="/images/logo_coach_ai.png" width="150px"/>
                </a>
              </div>
              <div className="col-md-9">
                <h5 className="card-title">Prepared for {firstName} {lastName}</h5>
                <p className="card-text">Updated 16-May-2022</p>
              </div>
              <div className="col-md-1">
                <a onClick={props.login}>Login</a>
                <br/>
                <a onClick={props.logout}>Logout</a>
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
  { login, logout }
)(UserInfo);
