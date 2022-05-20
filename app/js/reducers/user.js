import { handleActions } from 'redux-actions';
import { ActionTypes as types } from '../constants';

export default handleActions({
    [types.SET_USER]: (state, action) => {
            const user = action.user;
        return user;
    },
    [types.CLEAR_USER]: () => {
        return null;
    }
}, null);
