import React from 'react';
import { createRoutes } from '../routes';

const App = ({ store }) => (
  <div>
    {createRoutes(store)}
  </div>
);

App.propTypes = {
  store: React.PropTypes.object,
};

export default App;
