import {combineReducers} from 'redux';
import user from './user';
import content from './content';
import screen from './screen';
import event from './event';

export default combineReducers({
  user,
  content,
  screen,
  event
});
