import React from 'react';
import TopMenu from '../components/TopMenu/TopMenu';
import {connect} from 'react-redux';
import './Home.css';

function Home(props) {
  const user = props.user;

  const firstName = user !== null ? user.first_name : '';

  return (
    <div className='home-container'>
      <TopMenu />
      <div style={{height: '600px', color: 'white', display: 'grid', alignItems: 'center', justifyContent: 'center'}}>
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
  null,
)(Home);
