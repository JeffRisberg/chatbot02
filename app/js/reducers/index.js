import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import content from './content';

export default combineReducers({
  user,
  content,
  routing: routerReducer
});
