import {ActionTypes as types} from '../constants';

export const showUpdate = (id) => {
  return function (dispatch) {

    dispatch({
      type: types.UPDATE,
    });
  };
};
