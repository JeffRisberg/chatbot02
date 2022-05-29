import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createBrowserHistory } from 'history';
import Frame from './Frame';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import configureStore from './store';

const history = createBrowserHistory({basename: '/'});

const store = configureStore({initialState: {}, history});

ReactDOM.render(
  <Provider store={store}>
    <Frame />,
  </Provider>,
  document.getElementById('app-root')
);
