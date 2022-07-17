import React from 'react';
import {connect} from 'react-redux';
import TopMenu from '../components/TopMenu/TopMenu';
import axios from 'axios';
import {set_screen} from "../actions/screen";
import './Home.css';

function Home(props) {
  const user = props.user;

  const firstName = user !== null ? user.first_name : '';

  function onMonthly() {
    const my_name = 'monthly';
    axios.post('http://localhost:5000/change_screen/' + my_name, null, {
      withCredentials: true,
    })
      .then((resp) => {
        props.set_screen(my_name, resp.data);
      });
  }

  function onWeekly() {
    const my_name = 'weekly';

    axios.post('http://localhost:5000/change_screen/' + my_name, null, {
      withCredentials: true,
    })
      .then((resp) => {
        props.set_screen(my_name, resp.data);
      });
  }

  return (
    <div className='home-container'>
      <div style={{height: '45px'}}>
        <div style={{float: 'left'}}>
          <TopMenu/>
        </div>
        <div style={{float: 'right'}}>
          <button onClick={onWeekly} style={{background: 'none', borderWidth: 0}}>
            <span style={{color: 'white'}}>This Week</span>
          </button>
          <button onClick={onMonthly} style={{background: 'none', borderWidth: 0}}>
            <span style={{color: 'white'}}>This Month</span>
          </button>
        </div>
      </div>
      <div style={{height: '550px', color: 'white', display: 'grid', alignItems: 'center', justifyContent: 'center'}}>
        <h1>Hi, {firstName}</h1>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.app.user
});

export default connect(
  mapStateToProps,
  {set_screen}
)(Home);
