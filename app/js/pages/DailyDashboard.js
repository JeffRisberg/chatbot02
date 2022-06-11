import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import TaskList from '../components/TaskList/TaskList';
import './DailyDashboard.css';

import {set_screen_tab} from '../actions/screen';

function DailyDashboard(props) {
  const my_name = 'daily';
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
    <div className="DailyDashboard">
      <div className="dashboard-header" onClick={onClick} style={{background: tab_color}}>Daily Tasks</div>
      <div className="row">
        <div className="col-md-12">
          <TaskList scope={"daily"} done={"0"}/>
        </div>
      </div>
      <div className="row" style={{marginTop: "14px"}}>
        <div className="col-md-12">
          <h4>Completed</h4>
          <TaskList scope={"daily"} done={"1"}/>
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
)(DailyDashboard);

