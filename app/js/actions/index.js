import {ActionTypes as types} from '../constants';

export const showUpdate = () => {
  return function (dispatch) {

    dispatch({
      type: types.UPDATE,
    });
  };
};
