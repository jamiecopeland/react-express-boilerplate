require('babel-core/register')();

var webpack = require('webpack');
var webpackBaseConfig = require('./webpack/webpack.config.base.js');
var webpackDevelopmentConfig = require('./webpack/webpack.config.development.js');
var webpackProductionConfig = require('./webpack/webpack.config.production.js');

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: false, // Set this to true if running on CI server
    frameworks: [ 'mocha' ],
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'mocha' ],
    plugins: [
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-mocha-reporter"),
      require("karma-phantomjs-launcher"),
      require("karma-chrome-launcher"),
      require("karma-sourcemap-loader")
    ],
    webpack: {
      devtool: 'inline-source-map',
      module: {
        noParse: [
          /node_modules\/sinon/,
        ],
        loaders: webpackBaseConfig.module.loaders.concat([
          webpackProductionConfig.jsLoader,
          webpackDevelopmentConfig.styleLoader
        ])
      },
      resolve: webpackBaseConfig.resolve,
      plugins: [
        new webpack.IgnorePlugin(/ReactContext/), // This is a fix for skin-deep. See Troubleshooting section at https://github.com/glenjamin/skin-deep
        new webpack.NoErrorsPlugin()
      ]
    },
    webpackServer: {
      noInfo: true
    }
  });
};
