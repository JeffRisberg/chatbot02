import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import {store} from './store';
import ChatbotPage from "./pages/ChatbotPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ChatbotPage/>}/>
        <Route path='/myPlan' element={<UserDashboard/>}/>
        <Route path='/dashboard' element={<UserDashboard/>}/>
        <Route path='/userDashboard' element={<UserDashboard/>}/>
        <Route path='/adminDashboard' element={<AdminDashboard/>}/>
      </Routes>
    </BrowserRouter>,
  </Provider>,
  document.getElementById('app-root')
);
