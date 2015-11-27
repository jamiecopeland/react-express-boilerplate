import path from 'path';
import webpack from 'webpack';

import { ROOT_FOLDER_PATH, SRC_FOLDER_PATH, BUILD_FOLDER_PATH, NODE_MODULES_FOLDER_PATH } from '../config/projectPathConfig';
import { APP_HOST, APP_PORT, WEBPACK_HOST, WEBPACK_PORT } from '../config/serverAddressConfig';
import { JS_FOLDER_PATH, CSS_FOLDER_PATH, ASSETS_FOLDER_PATH } from '../config/publicFolderConfig';
import webpackConfigBase from './webpack.config.base';

export const jsLoader = {
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    stage: 0,
    env: {
      development: {
        plugins: ['react-transform'],
        extra: {
          'react-transform': {
            transforms: [
              {
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module']
              },
              {
                transform: 'react-transform-catch-errors',
                imports: ['react', 'redbox-react']
              }
            ]
          }
        }
      }
    }
  },
  test: /\.js|jsx$/
};

export const styleLoader = {
  test: /\.scss$/,
  loaders: [
    'style-loader',
    'css-loader',
    'autoprefixer-loader',
    'sass-loader?outputStyle=compressed'
  ]
};

export default {
  cache: true,
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: [
      `webpack-hot-middleware/client?path=http://${WEBPACK_HOST}:${WEBPACK_PORT}/__webpack_hmr`,
      path.join(SRC_FOLDER_PATH, 'client', 'Main.js')
    ]
  },
  output: {
    path: BUILD_FOLDER_PATH,
    filename: '[name].js',
    publicPath: `http://${WEBPACK_HOST}:${WEBPACK_PORT}${JS_FOLDER_PATH}/`
  },
  module: {
    preLoaders: webpackConfigBase.module.preLoaders,
    loaders: webpackConfigBase.module.loaders.concat([
      jsLoader,
      styleLoader
    ])
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: webpackConfigBase.resolve
};
