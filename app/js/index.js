import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { createBrowserHistory } from 'history';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Home from "./pages/Home";
import UserDashboard from "./pages/UserDashboard";
import HRTeamsDashboard from "./pages/HRTeamsDashboard";
import HRCompletedDashboard from "./pages/HRCompletedDashboard";
import HRTeamDashboard from "./pages/HRTeamDashboard";
import DailyDashboard from "./pages/DailyDashboard";

import configureStore from './store';

const history = createBrowserHistory({basename: '/'});

const store = configureStore({initialState: {}, history});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/userDashboard' element={<UserDashboard/>}/>
        <Route path='/hrTeamsDashboard' element={<HRTeamsDashboard/>}/>
        <Route path='/hrCompletedDashboard' element={<HRCompletedDashboard/>}/>
        <Route path='/hrTeamDashboard/:id' element={<HRTeamDashboard/>}/>
        <Route path='/dailyDashboard' element={<DailyDashboard/>}/>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app-root')
);
