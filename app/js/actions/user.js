import {ActionTypes as types} from '../constants';

// eslint-disable-next-line no-unused-vars
export const login = (user, history) => {
  return function (dispatch) {

    return dispatch({
      type: types.SET_USER,
      user: user
    });
  };
};

// eslint-disable-next-line no-unused-vars
export const logout = (token) => {
  return function (dispatch) {

    return dispatch({
      type: types.CLEAR_USER,
      user: null
    });
  };
};

// eslint-disable-next-line no-unused-vars
export const register = (token) => {
  return function (dispatch) {

    return dispatch({
      type: types.REGISTER_USER,
      user: null
    });
  };
};
