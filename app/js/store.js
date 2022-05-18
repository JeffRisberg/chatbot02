import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

const configureStore = ({ initialState = {}, history }) => {

  const reducer = combineReducers({
    routing: routerReducer,
    app: reducers,
  });

  const logger = createLogger();

  const middlewares = [
    routerMiddleware(history),
    thunk,
    logger
  ];

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middlewares)
    );

  return store;
};

export default configureStore;
