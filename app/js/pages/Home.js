import React from 'react';
import {connect} from 'react-redux';
import Bot from '../components/Bot/Bot';
import './Home.css';

function Home(props) {
  //const user_id = props.user.id;
  const user = props.user;

  //console.log(user_id);
  console.log(user);

  return (
    <div className='home-container'>
      <div className='row'>
        <div className='cod-md-12' style={{background: '#fee'}}>
          Top Menu
        </div>
      </div>
      <div className='row' style={{background: '#eef'}}>
        <div className='col-md-4'>
        </div>
        <div className='col-md-4'>
          <Bot/>
        </div>
        <div className='col-md-4'>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.app.user,
});

export default connect(
  mapStateToProps,
  {}
)(Home);
