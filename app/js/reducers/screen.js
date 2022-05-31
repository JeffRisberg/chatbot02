import {handleActions} from 'redux-actions';
import {ActionTypes as types} from '../constants';

export default handleActions({
  [types.SET_SCREEN]: (state, action) => {
    const screen = action.screen;
    return screen;
  },
}, null);
