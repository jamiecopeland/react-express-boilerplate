import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import appReducer from 'client/reducers/appReducer';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  createLogger({
    collapsed: true
  })
)(createStore);

export const initialState = {};

const store = createStoreWithMiddleware(appReducer, initialState);
export default store;
