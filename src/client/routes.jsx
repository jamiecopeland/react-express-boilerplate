import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import Root from 'client/components/screens/root/Root';
import NotFound from 'client/components/screens/notFound/NotFound';

const history = createBrowserHistory();

export default (
  <Router history={history}>
    <Route path="/" component={Root}>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);
