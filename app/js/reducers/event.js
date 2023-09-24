import {handleActions} from 'redux-actions';
import {ActionTypes as types} from '../constants';

export default handleActions({
  [types.SET_EVENTS]: (state, action) => {
    state.events = action.events;
    return {
      events: action.events
    };
  },
  [types.ADD_EVENT]: (state, action) => {
    return {
      events: [...state.events, action.event]
    };
  },
  [types.UPDATE_EVENT]: (state, action) => {
    const index = state.events.findIndex(event => event.id === action.event.id)
    const newEvents = [...state.events]
    if (index >= 0) {
      newEvents[index] = action.event
    }
    return {
      events: newEvents
    };
  },
  [types.DELETE_EVENT]: (state, action) => {
    return {
      events: state.events.filter(event => event.id !== action.event.id)
    };
  }
}, {events: []});
