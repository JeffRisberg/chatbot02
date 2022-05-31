import {ActionTypes as types} from '../constants';

export const set_user = (user) => {
  return function (dispatch) {

    return dispatch({
      type: types.SET_USER,
      user: user
    });
  };
};

export const clear_user = () => {
  return function (dispatch) {

    return dispatch({
      type: types.CLEAR_USER,
      user: null
    });
  };
};

export const register = () => {
  return function (dispatch) {

    return dispatch({
      type: types.REGISTER_USER,
      user: null
    });
  };
};
