import { ActionTypes as types } from '../constants';

export const login = (login, password) => {
    return function (dispatch) {

        return dispatch({
          type: types.SET_USER,
          user: {firstName: "Jack", lastName: "Smith"}
        });
    };
};

export const logout = (token) => {
    return function (dispatch) {

        return dispatch({
          type: types.CLEAR_USER,
          user: null
        });
    };
};

