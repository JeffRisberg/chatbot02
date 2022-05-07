import { createStore } from 'redux';
import appReducer from './reducers/index';

export const store = createStore(
  appReducer
);
