import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

const configureStore = ({ initialState = {} }) => {

  const reducer = combineReducers({
    app: reducers,
  });

  const logger = createLogger();

  const middlewares = [
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
