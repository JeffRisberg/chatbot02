import {ActionTypes as types} from '../constants';

export const set_screen = (screen, initial_message) => {
  return function (dispatch) {

    dispatch({
      type: types.SET_SCREEN,
      screen: screen + '|' + initial_message
    });
  };
};
