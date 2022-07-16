import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";
import {connect} from "react-redux";
import {clear_user} from "../../actions/user";
import {set_screen} from "../../actions/screen";

function TopMenu(props) {

  function do_logout() {
    props.clear_user();
    const url = 'http://localhost:5000/logout';

    axios.post(url, {}, {
      withCredentials: true,
    });
  }

  function onHome() {
    props.set_screen('home');
  }

  function onMonthly() {
    const my_name = 'monthly';
    axios.post('http://localhost:5000/change_screen/' + my_name, null, {
      withCredentials: true,
    })
      .then((resp) => {
        props.set_screen(my_name, resp.data);
      });
  }

  function onWeekly() {
    const my_name = 'weekly';

    axios.post('http://localhost:5000/change_screen/' + my_name, null, {
      withCredentials: true,
    })
      .then((resp) => {
        props.set_screen(my_name, resp.data);
      });
  }

  function onDaily() {
    const my_name = 'daily';

    axios.post('http://localhost:5000/change_screen/' + my_name, null, {
      withCredentials: true,
    })
      .then((resp) => {
        props.set_screen(my_name, resp.data);
      });
  }

  function onCalendar() {
    props.set_screen('calendar');
  }

  function onAbout() {
    props.set_screen('about');
  }

  function onLogout() {
    console.log("onLogout");
  }

  return (
    <Dropdown>
      <Dropdown.Toggle id='dropdown-basic'>
        <i className='bi-list' style={{cursor: 'pointer', fontSize: '2.5rem'}}></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={onHome}>Home</Dropdown.Item>
        <Dropdown.Item onClick={onMonthly}>Goals</Dropdown.Item>
        <Dropdown.Item onClick={onHome}>Calendar</Dropdown.Item>
        <Dropdown.Item>----</Dropdown.Item>
        <Dropdown.Item onClick={onAbout}>About</Dropdown.Item>
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
