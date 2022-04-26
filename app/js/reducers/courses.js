import { handleActions } from 'redux-actions';
import { ActionTypes as types } from '../constants';

export default handleActions({
  [types.FETCH_COURSES]: (state) => {
    return Object.assign({}, state, {
      data: [],
      isFetching: true,
    });
  },
  [types.FETCH_COURSES_SUCCESS]: (state, action) => {
    return Object.assign({}, { data: action.courses }, {
      isFetching: false,
    });
  },
}, { data: [], isFetching: false });
