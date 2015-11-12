import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import routes from './routes.jsx';

ReactDOM.render(<Provider store={store}>{routes}</Provider>, document.getElementById('app-dom-hook'));
