import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import NavBar from '../components/NavBar';
import TaskList from '../components/TaskList/TaskList';
import './WeeklyDashboard.css';

import {set_screen_tab} from '../actions/screen';

function WeeklyDashboard(props) {

  useEffect(() => {
    axios.post('http://localhost:5000/change_screen/weekly', null, {
      withCredentials: true,
    })
      .then((resp) => {
        props.set_screen_tab('weekly', resp.data);
      });
  }, [props]);

  return (
    <div className="WeeklyDashboard">
      <NavBar/>
      <div className="row">
        <div className="col-md-12">
          <TaskList scope={"weekly"} done={"0"}/>
        </div>
      </div>
      <div className="row" style={{marginTop: "14px"}}>
        <div className="col-md-12">
          <h3>Completed</h3>
          <TaskList scope={"weekly"} done={"1"}/>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  {set_screen_tab}
)(WeeklyDashboard);
