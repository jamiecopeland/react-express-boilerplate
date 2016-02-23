import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from './store';
import {createRoutes} from './routes';

ReactDOM.render(
  <Provider store={store}>
    {createRoutes(store)}
  </Provider>,
  document.getElementById('app-dom-hook')
);
