import React from 'react';

require('./NotFound.scss');

export default class NotFound extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="NotFound">Sorry, page not found.</div>
    );
  }

}
