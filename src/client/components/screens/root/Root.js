import React from 'react';

require('styles/global.scss');
require('./Root.scss');

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
