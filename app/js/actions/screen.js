import {ActionTypes as types} from '../constants';

export const setScreen = (screen) => {
  return function (dispatch) {

    dispatch({
      type: types.SET_SCREEN,
      screen: screen
    });
  };
};
