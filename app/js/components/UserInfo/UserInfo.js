import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Card} from "@themesberg/react-bootstrap";

import { logout } from '../../actions/user';

function UserInfo(props) {
  const user = props.user;

  const firstName = user != null ? user.firstName : "";
  const lastName = user != null ? user.lastName : "";

   const navigate = useNavigate(); // <-- call hook to get navigate function

   function doLogout() {
     props.logout();
     navigate("/")
   }

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
                <a onClick={doLogout}>Logout</a>
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
  { logout }
)(UserInfo);
