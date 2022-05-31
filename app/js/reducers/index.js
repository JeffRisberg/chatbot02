import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import user from './user';
import content from './content';
import screen from './screen';

export default combineReducers({
  user,
  content,
  screen,
  routing: routerReducer
});
