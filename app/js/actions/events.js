import {ActionTypes as types} from '../constants';

export const setEvents = (events) => {
  return function (dispatch) {

    return dispatch({
      type: types.SET_EVENTS,
      events: events
    });
  };
};

export const addEvent = (event) => {
  return function (dispatch) {
    return dispatch({
      type: types.ADD_EVENT,
      event: event
    });
  };
};

export const updateEvent = (event) => {
  return function (dispatch) {
    return dispatch({
      type: types.UPDATE_EVENT,
      event: event
    });
  };
};

export const deleteEvent = (event) => {
  return function (dispatch) {
    return dispatch({
      type: types.DELETE_EVENT,
      event: event
    });
  };
};
