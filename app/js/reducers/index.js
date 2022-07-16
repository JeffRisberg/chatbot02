import {combineReducers} from 'redux';
import user from './user';
import content from './content';
import screen from './screen';

export default combineReducers({
  user,
  content,
  screen
});
