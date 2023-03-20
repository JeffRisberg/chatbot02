import React from 'react';
import {connect} from 'react-redux';
import Bot from "../components/Bot/Bot";

function Home(props) {
  // const user_id = props.user.id;
  // const user = props.user;

  return (
    <div className='home-container'>
      <div>
        <div>
          Top menu
         </div>
        <div>
          <Bot/>
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
