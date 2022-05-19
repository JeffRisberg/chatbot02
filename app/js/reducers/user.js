import { handleActions } from 'redux-actions';
import { ActionTypes as types } from '../constants';

export default handleActions({
  [types.UPDATE]: (state) => {
    console.log("reducer UPDATE")
    return Object.assign({}, state, {
      data: [],
    });
  },
  [types.LOGIN]: (state) => {
      console.log("reducer LOGIN")
      return Object.assign({}, state, {
        data: [],
      });
    },
  [types.LOGOUT]: (state, action) => {
    console.log("reducer LOGOUT")
    return Object.assign({}, { data: action.items }, {
    });
  },
}, { data: [] });
