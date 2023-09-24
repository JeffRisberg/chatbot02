import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createBrowserHistory} from 'history';
import Frame from './Frame';

import './index.css';

import configureStore from './store';

const my_history = createBrowserHistory({basename: '/'});

const store = configureStore({initialState: {}, my_history});

ReactDOM.render(
  <Provider store={store}>
    <Frame/>
  </Provider>,
  document.getElementById("app-root")
);
