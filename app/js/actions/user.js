import { ActionTypes as types } from '../constants';
import axios from "axios";

// eslint-disable-next-line no-unused-vars
export const login = () => {
    const email = "john.smith@gmail.com";
    return function (dispatch) {

        return axios('http://localhost:5000/api/users?email=' + email)
            .then(response => {
              console.log(response);
              dispatch({
                  type: types.SET_USER,
                  user: response.data[0]
              });
        })
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

