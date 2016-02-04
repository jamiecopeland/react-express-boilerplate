import React from 'react';

// import './Index.scss';

export default class Index extends React.Component {

  constructor(props) {
    super(props);
  }

  renderJsInclude(jsPaths) {
    return jsPaths.map((jsPath) => (
      <script key={jsPath} src={jsPath} />
    ))
  }

  renderCssInclude(cssPaths) {
    return cssPaths ? cssPaths.map((cssPath) => (
         <link key={cssPath} rel="stylesheet" href={cssPath}/>
       )) : null;
  }

  render() {
    return (
      <html>
        <head>
          <meta httpEquiv="Content-type" content="text/html; charset=utf-8"/>
          <title>{this.props.title}</title>
          <style rel="stylesheet">
            {this.props.internalCSS}
          </style>
          {this.renderCssInclude(this.props.cssPaths)}
        </head>
        <body>
          <div id="app-dom-hook"></div>
          {this.renderJsInclude(this.props.jsPaths)}
        </body>
      </html>
    );
  }

}

Index.propTypes = {
  title: React.PropTypes.string,
  jsPaths: React.PropTypes.array,
  cssPaths: React.PropTypes.array,
  internalCSS: React.PropTypes.string
};