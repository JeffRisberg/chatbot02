import {ActionTypes as types} from '../constants';

export const set_screen = (screen) => {
  return function (dispatch) {

    dispatch({
      type: types.SET_SCREEN,
      screen: screen
    });
  };
};
