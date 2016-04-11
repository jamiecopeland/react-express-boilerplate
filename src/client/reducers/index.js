import { Map } from 'immutable';
import { routerReducer } from 'react-router-redux';

export default (state, action) => Map({
  routing: routerReducer(state.get('routing'), action),
});
