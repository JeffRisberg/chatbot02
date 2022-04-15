import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import { createBrowserHistory } from 'history';

import App from './App';
import configureStore from './configureStore';

const history = createBrowserHistory({basename: '/'});

const store = configureStore({initialState: {}, history});

ReactDOM.render(
  <Provider store={store}>
    <App history={history}/>
  </Provider>,
  document.getElementById('app-root')
);
