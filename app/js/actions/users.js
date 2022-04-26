//import { initialize } from 'redux-form';
import { ActionTypes as types} from '../constants';
import axios from "axios";

export const queryUsers = () => {
  return function (dispatch) {

    dispatch({
      type: types.FETCH_USERS,
    });
    axios('/api/users/').then(result => {
      dispatch({
        type: types.FETCH_USERS_SUCCESS,
        users: result.data
      });
    });
  };
};
