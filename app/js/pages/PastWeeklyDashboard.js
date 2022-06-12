import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import TaskSummary from '../components/TaskSummary/TaskSummary';
import './PastWeeklyDashboard.css';

import {set_screen_tab} from '../actions/screen';

function PastWeeklyDashboard(props) {
  const my_name = 'past_weekly';
  const screen_tab = props.screen_tab || '|';
  const index = screen_tab.indexOf('|');
  const tab_color = (screen_tab.substr(0, index) === my_name) ? '#6daa6d' : '#aaa';

  function onClick() {
    axios.post('http://localhost:5000/change_screen/' + my_name, null, {
      withCredentials: true,
    })
      .then((resp) => {
        props.set_screen_tab(my_name, resp.data);
      });
  }

  function toDailyTasks() {
    props.set_screen_tab('daily', '');
  }

  return (
    <div className="PastWeeklyDashboard">
      <div className="dashboard-header" onClick={onClick} style={{background: tab_color}}>Past Weekly Tasks</div>
      <div className="row">
        <div className="col-md-12">
          <TaskSummary scope={"weekly"}/>
          <div><button type="button" onClick={toDailyTasks} className="btn btn-link">Return to Daily Tasks</button></div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  screen_tab: state.app.screen_tab,
});

export default connect(
  mapStateToProps,
  {set_screen_tab}
)(PastWeeklyDashboard);
