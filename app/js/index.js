import React from 'react';
import {Provider} from 'react-redux';
import {createBrowserHistory} from 'history';
import { createRoot } from 'react-dom/client';
import Frame from './Frame';

import './index.css';

import configureStore from './store';

const my_history = createBrowserHistory({basename: '/'});

const store = configureStore({initialState: {}, my_history});

const container = document.getElementById('app-root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Frame/>
  </Provider>
);
