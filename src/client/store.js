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

// Enable Webpack hot module replacement for reducers
if (module.hot) {
  module.hot.accept('./reducers/appReducer', () => {
    const nextRootReducer = require('./reducers/appReducer');
    store.replaceReducer(nextRootReducer.default);
  });
}

export default store;
