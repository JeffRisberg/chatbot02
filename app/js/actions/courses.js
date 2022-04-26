import { ActionTypes as types} from '../constants';
import axios from "axios";

export const queryCourses = () => {
  return function (dispatch) {

    dispatch({
      type: types.FETCH_COURSES,
    });
    axios('/api/courses/').then(result => {
      dispatch({
        type: types.FETCH_COURSES_SUCCESS,
        courses: result.data
      });
    });
  };
};
