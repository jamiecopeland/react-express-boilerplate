import React from 'react';

function renderJsInclude(jsPaths) {
  return jsPaths.map((jsPath) => (
    <script key={jsPath} src={jsPath} />
  ))
}

function renderCssInclude(cssPaths) {
  return cssPaths ? cssPaths.map((cssPath) => (
       <link key={cssPath} rel="stylesheet" href={cssPath}/>
     )) : null;
}

export default class Index extends React.Component {

  static propTypes = {
    title: React.PropTypes.string,
    jsPaths: React.PropTypes.array,
    cssPaths: React.PropTypes.array,
    internalCSS: React.PropTypes.string
  };

  render() {
    return (
      <html>
        <head>
          <meta httpEquiv="Content-type" content="text/html; charset=utf-8"/>
          <title>{this.props.title}</title>
          <style rel="stylesheet">
            {this.props.internalCSS}
          </style>
          {renderCssInclude(this.props.cssPaths)}
        </head>
        <body>
          <div id="app-dom-hook"></div>
          {renderJsInclude(this.props.jsPaths)}
        </body>
      </html>
    );
  }

}
