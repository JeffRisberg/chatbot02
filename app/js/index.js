import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { createBrowserHistory } from 'history';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import UserDashboard from "./pages/UserDashboard";
import HRTeamsDashboard from "./pages/HRTeamsDashboard";
import HRCompletedDashboard from "./pages/HRCompletedDashboard";
import HRTeamDashboard from "./pages/HRTeamDashboard";

import configureStore from './store';

const history = createBrowserHistory({basename: '/'});

const store = configureStore({initialState: {}, history});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserDashboard/>}/>
        <Route path='/hrTeamsDashboard' element={<HRTeamsDashboard/>}/>
        <Route path='/hrCompletedDashboard' element={<HRCompletedDashboard/>}/>
        <Route path='/hrTeamDashboard/:id' element={<HRTeamDashboard/>}/>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app-root')
);

//axios.get('http://3.216.97.226:5001/api/restart_conversation')
axios.get('http://localhost:5000/api/restart_conversation')
//axios.get('http://localhost:3000/api/restart_conversation')
