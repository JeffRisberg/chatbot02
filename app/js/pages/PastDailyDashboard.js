import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import NavBar from '../components/NavBar';
import TaskSummary from '../components/TaskSummary/TaskSummary';
import './PastDailyDashboard.css';

import {set_screen_tab} from '../actions/screen';

function PastDailyDashboard(props) {

  useEffect(() => {
    axios.post('change_screen/past_daily', null, {
      withCredentials: true,
    })
      .then((resp) => {
        props.set_screen_tab('past', resp.data);
      })
  }, [props]);

  return (
    <div className="PastDailyDashboard">
      <NavBar/>
      <div className="row">
        <div className="col-md-12">
          <TaskSummary scope={"daily"}/>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  {set_screen_tab}
)(PastDailyDashboard);
