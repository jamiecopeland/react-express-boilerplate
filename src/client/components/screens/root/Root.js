import React from 'react';

import 'styles/global.css';
import './Root.css';

export default class Root extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  render() {
    const {children} = this.props;
    return (
      <div className="Root">
        <h1>Root</h1>
        {children}
      </div>
    );
  }

}
