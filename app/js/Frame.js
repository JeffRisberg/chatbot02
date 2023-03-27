import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './Frame.css';

import Home from './pages/Home';

import {set_screen} from './actions/screen';

function Frame(props) {
  const user_id = props.user != null ? props.user.id : null;
  var screen = props.screen || '|';
  const index = screen.indexOf('|');
  screen = screen.substr(0, index);

  const [data, setData] = useState([]);

  console.log(data)

  const host = '';

  useEffect(() => {
    var url = host + '/api/daily_tasks/';

    if (screen === 'weekly') {
      url = host + '/api/weekly_tasks/';
    }
    if (screen === 'monthly') {
      url = host + '/api/monthly_goals/';
    }

    (async () => {
      if (user_id !== null) {
        const result = await axios('' + url + user_id);
        setData(result.data.slice(0, 7));
      }
    })();
  }, [props]);

  return (
    <Home />
  )

}

const mapStateToProps = (state) => ({
  user: state.app.user,
});

export default connect(
  mapStateToProps,
  {set_screen}
)(Frame);
