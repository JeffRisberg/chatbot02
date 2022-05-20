import { ActionTypes as types } from '../constants';

// eslint-disable-next-line no-unused-vars
export const login = (login, password) => {
    return function (dispatch) {

        return dispatch({
          type: types.SET_USER,
          user: {firstName: "Jack", lastName: "Smith"}
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

