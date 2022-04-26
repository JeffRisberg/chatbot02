// eslint-disable-next-line no-unused-vars
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const configureStore = ({ initialState = {} }) => {

  const reducer = combineReducers({
    //routing: routerReducer,
    app: reducers,
  });

  // eslint-disable-next-line no-unused-vars
  const middlewares = [
    //routerMiddleware(history),
    thunk,
  ];

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middlewares)
  );

  return store;
};

export default configureStore;
