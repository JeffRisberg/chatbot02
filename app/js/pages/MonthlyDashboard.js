import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import NavBar from '../components/NavBar';
import './MonthlyDashboard.css';

import {set_screen_tab} from '../actions/screen';

function MonthlyDashboard(props) {

  useEffect(() => {
    axios.post('http://localhost:5000/change_screen/monthly', null, {
      withCredentials: true,
    })
      .then((resp) => {
        props.set_screen_tab('monthly', resp.data);
      })
  }, [props]);

  return (
    <div className="MonthlyDashboard">
      <NavBar/>
      <div className="row">
        <div className="col-md-12">
          <h3>Your monthly schedule is still pending.</h3>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = () => ({
});

export default connect(
  mapStateToProps,
  {set_screen_tab}
)(MonthlyDashboard);

