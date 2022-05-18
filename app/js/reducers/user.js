import { handleActions } from 'redux-actions';
import { ActionTypes as types } from '../constants';

export default handleActions({
  [types.LOGIN]: (state) => {
    return Object.assign({}, state, {
      data: [],
    });
  },
  [types.LOGOUT]: (state, action) => {
    return Object.assign({}, { data: action.items }, {
    });
  },
}, { data: [] });
