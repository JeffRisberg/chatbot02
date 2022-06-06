import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import NavBar from '../components/NavBar';
import TaskSummary from '../components/TaskSummary/TaskSummary';
import './PastDashboard.css';

import {set_screen_tab} from '../actions/screen';

function PastDashboard(props) {

  useEffect(() => {
    axios.post('http://localhost:5000/change_screen/past', null, {
      withCredentials: true,
    })
      .then((resp) => {
        props.set_screen_tab('past', resp.data);
      });
  }, [props]);

  return (
    <div className="PastDashboard">
      <NavBar/>
      <div className="row">
        <div className="col-md-12">
          <TaskSummary/>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  {set_screen_tab}
)(PastDashboard);
