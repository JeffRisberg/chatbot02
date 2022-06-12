import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import TaskSummary from '../components/TaskSummary/TaskSummary';
import './PastDailyDashboard.css';

import {set_screen_tab} from '../actions/screen';

function PastDailyDashboard(props) {
  const my_name = 'past_daily';
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

  return (
    <div className="PastDailyDashboard">
      <div className="dashboard-header" onClick={onClick} style={{background: tab_color}}>Past Daily Tasks</div>
      <div className="row">
        <div className="col-md-12">
          <TaskSummary scope={"daily"}/>
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
)(PastDailyDashboard);