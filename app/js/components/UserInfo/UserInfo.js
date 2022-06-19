import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import {Card} from '@themesberg/react-bootstrap';

import {clear_user} from '../../actions/user';
import {set_screen} from '../../actions/screen';
import {set_screen_tab} from '../../actions/screen';

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

  function onDashboard() {
    props.set_screen('dashboard');
  }

  function onMonthly() {
    const my_name = 'monthly';
    axios.post('http://localhost:5000/change_screen/' + my_name, null, {
      withCredentials: true,
    })
      .then((resp) => {
        props.set_screen(null);
        props.set_screen_tab(my_name, resp.data);
      });
  }

  function onWeekly() {
    const my_name = 'weekly';

    axios.post('http://localhost:5000/change_screen/' + my_name, null, {
      withCredentials: true,
    })
      .then((resp) => {
        props.set_screen(null);
        props.set_screen_tab(my_name, resp.data);
      });
  }

  function onDaily() {
    const my_name = 'daily';

    axios.post('http://localhost:5000/change_screen/' + my_name, null, {
      withCredentials: true,
    })
      .then((resp) => {
        props.set_screen(null);
        props.set_screen_tab(my_name, resp.data);
      });
  }

  function onCalendar() {
    props.set_screen('calendar');
  }

  return (
    <Card border="dark" style={{background: "#f0f0f0", marginBottom: 10}}
          className="table-wrapper table-responsive shadow-sm">
      <Card.Body style={{padding: '0px'}}>
        <div className="row">
          <div className="col-md-2" style={{maxWidth: 210}}>
            <a href="https://coach.ai">
              <img src='/images/logo_coach_ai.png' width='100%'/>
            </a>
          </div>
          <div className="col-md-4">
            <p className="card-text"></p>
            <h5 className="card-title">Prepared for {first_name} {last_name}</h5>
            <h6>{moment().format('MMMM D, YYYY')}</h6>
          </div>
          <div className="col-md-4" style={{marginTop: '18px'}}>
            <div className='navigation-header' onClick={onDashboard}>Dashboard</div>
            <div className='navigation-header' onClick={onMonthly}>Monthly</div>
            <div className='navigation-header' onClick={onWeekly}>Weekly</div>
            <div className='navigation-header' onClick={onDaily}>Daily</div>
            <div className='navigation-header' onClick={onCalendar}>Calendar</div>
          </div>
          <div className="col-md-2" style={{marginTop: '12px', textAlign: 'right'}}>
            <a style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={do_edit_profile}>Edit Profile</a>
            <br/>
            <a style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={do_logout}>Logout</a>
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
  {clear_user, set_screen, set_screen_tab}
)(UserInfo);
