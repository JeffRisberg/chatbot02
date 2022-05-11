import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Outlet} from "react-router-dom";
import NavBar from './components/NavBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import {store} from './store';
import UserDashboard from "./pages/UserDashboard";
import HRTeamsDashboard from "./pages/HRTeamsDashboard";
import HRCompletedDashboard from "./pages/HRCompletedDashboard";
import HRTeamDashboard from "./pages/HRTeamDashboard";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
       <div>
          <NavBar/>
          <Outlet/>
        </div>
      <Routes>
        <Route path='/' element={<UserDashboard/>}/>
        <Route path='/hrTeamsDashboard' element={<HRTeamsDashboard/>}/>
        <Route path='/htCompletedDashboard' element={<HRCompletedDashboard/>}/>
        <Route path='/hrTeamDashboard/:id' element={<HRTeamDashboard/>}/>
      </Routes>
    </BrowserRouter>,
  </Provider>,
  document.getElementById('app-root')
);
