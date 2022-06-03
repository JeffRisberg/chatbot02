import {handleActions} from 'redux-actions';
import {ActionTypes as types} from '../constants';

export default handleActions({
  [types.UPDATE_CONTENT]: (state, action) => {
    const content = action.content;
    return content;
  }
}, null);
