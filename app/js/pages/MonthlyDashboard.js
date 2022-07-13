import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import TaskList from '../components/TaskList/TaskList';
import './MonthlyDashboard.css';

import {set_screen_tab} from '../actions/screen';

function MonthlyDashboard(props) {
  const details = props.details;
  const my_name = 'monthly';
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
    <div className="MonthlyDashboard">
      <div className="dashboard-header" onClick={onClick} style={{textDecoration: 'underline', background: tab_color}}>Monthly Goals</div>
      <div className="row">
        <div className="col-md-12">
          <TaskList details={details} scope={"monthly"} />
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
)(MonthlyDashboard);
