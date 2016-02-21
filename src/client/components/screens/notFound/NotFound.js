import React from 'react';

import './NotFound.css';

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
