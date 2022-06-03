import {ActionTypes as types} from '../constants';

export const set_screen = (screen) => {
  return function (dispatch) {

    dispatch({
      type: types.SET_SCREEN,
      screen: screen
    });
  };
};

export const set_screen_tab = (screen_tab, initial_message) => {
  return function (dispatch) {

    dispatch({
      type: types.SET_SCREEN_TAB,
      screen_tab: screen_tab + "|" + initial_message
    });
  };
};
