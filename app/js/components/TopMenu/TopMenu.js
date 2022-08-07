import React from 'react';
import {connect} from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import './TopMenu.css';

import {clear_user} from '../../actions/user';
import {set_screen} from '../../actions/screen';

function TopMenu(props) {

  function onHome() {
    props.set_screen('home');
  }

  function onSetGoal() {
    props.set_screen('set-goal-month')
  }

  function onMonthly() {
    const my_name = 'monthly';
    axios.post('/change_screen/' + my_name, null, {
      withCredentials: true,
    })
      .then((resp) => {
        props.set_screen(my_name, resp.data);
      });
  }

  function onWeekly() {
    const my_name = 'weekly';

    axios.post('/change_screen/' + my_name, null, {
      withCredentials: true,
    })
      .then((resp) => {
        props.set_screen(my_name, resp.data);
      });
  }

  function onDaily() {
    const my_name = 'daily';

    axios.post('/change_screen/' + my_name, null, {
      withCredentials: true,
    })
      .then((resp) => {
        props.set_screen(my_name, resp.data);
      });
  }

  function onCalendar() {
    props.set_screen('calendar');
  }

  function onLogout() {
    props.clear_user();
    const url = '/logout';

    axios.post(url, {}, {
      withCredentials: true,
    });
  }

  return (
    <Dropdown>
      <Dropdown.Toggle id='dropdown-basic' style={{background: 'none', padding: 0, borderWidth: 0}}>
        <i className='bi-list' style={{cursor: 'pointer', fontSize: '2.0rem'}}></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={onHome}>Home</Dropdown.Item>
        <Dropdown.Item onClick={onSetGoal}>Set Goals</Dropdown.Item>
        <Dropdown.Item onClick={onMonthly}>Talk to Dara</Dropdown.Item>
        <Dropdown.Item className='ps-4' onClick={onMonthly}>Monthly Planning</Dropdown.Item>
        <Dropdown.Item className='ps-4' onClick={onWeekly}>Weekly Planning</Dropdown.Item>
        <Dropdown.Item className='ps-4' onClick={onDaily}>Daily Planning</Dropdown.Item>
        <Dropdown.Item onClick={onCalendar}>Calendar</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

const mapStateToProps = (state) => ({
  user: state.app.user,
});

export default connect(
  mapStateToProps,
  {clear_user, set_screen}
)(TopMenu);
