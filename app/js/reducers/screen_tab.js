import {handleActions} from 'redux-actions';
import {ActionTypes as types} from '../constants';

export default handleActions({
  [types.SET_SCREEN_TAB]: (state, action) => {
    const screen_tab = action.screen_tab;
    return screen_tab;
  }
}, null);
