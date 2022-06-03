import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import user from './user';
import content from './content';
import screen from './screen';
import screen_tab from './screen_tab';

export default combineReducers({
  user,
  content,
  screen,
  screen_tab,
  routing: routerReducer
});
