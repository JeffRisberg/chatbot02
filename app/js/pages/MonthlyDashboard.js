import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import TaskList from '../components/TaskList/TaskList';
import './MonthlyDashboard.css';

import {set_screen} from '../actions/screen';

function MonthlyDashboard(props) {
  const details = props.details;
  const my_name = 'monthly';
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
  screen: state.app.screen,
});

export default connect(
  mapStateToProps,
  {set_screen}
)(MonthlyDashboard);
