import React from 'react';

require('./Root.scss');

export default class Root extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Root">Root</div>
    );
  }

}
