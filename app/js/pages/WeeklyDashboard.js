import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import TaskList from '../components/TaskList/TaskList';
import './WeeklyDashboard.css';

import {set_screen} from '../actions/screen';

function WeeklyDashboard(props) {
  const details = props.details;
  const my_name = 'weekly';
  const screen = props.screen || '|';
  const index = screen.indexOf('|');
  const tab_color = (screen.substr(0, index) === my_name) ? '#6daa6d' : '#aaa';

  function onClick() {
    axios.post('/change_screen/' + my_name, null, {
      withCredentials: true,
    })
      .then((resp) => {
        props.set_screen(my_name, resp.data);
      });
  }

  return (
    <div className="WeeklyDashboard">
      <div className="dashboard-header" onClick={onClick} style={{textDecoration: 'underline', background: tab_color}}>Weekly Goals</div>
      <div className="row">
        <div className="col-md-12">
          <TaskList details={details} scope={"weekly"}/>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  screen: state.app.screen,
});

export default connect(
  mapStateToProps,
  {set_screen}
)(WeeklyDashboard);
