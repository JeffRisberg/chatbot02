import {ActionTypes as types} from '../constants';

export const showUpdate = (content_version_id) => {
  return function (dispatch) {

    dispatch({
      type: types.UPDATE_CONTENT,
      content: content_version_id
    });
  };
};
