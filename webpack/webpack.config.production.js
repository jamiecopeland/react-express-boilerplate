import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import { BUILD_PATH, SRC_PATH } from '../config/projectPathConfig';
import { JS_PATH, CSS_PATH } from '../config/publicFolderConfig';
import webpackConfigBase from './webpack.config.base';


export const jsLoader = {
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    stage: 0
  },
  test: /\.js|jsx$/
};

export const styleLoader = {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract(
    'style-loader',
    'css-loader',
    'autoprefixer-loader',
    'sass-loader?outputStyle=compressed'
  )
};

export default {
  entry: {
    main: path.join(SRC_PATH, 'client', 'Main.js')
  },
  output: {
    path: `${BUILD_PATH}`,
    filename: `${JS_PATH}/[name]--[hash].js`
  },
  module: {
    preLoaders: webpackConfigBase.module.preLoaders,
    loaders: webpackConfigBase.module.loaders.concat([
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          stage: 0
        },
        test: /\.js|jsx$/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader',
          'autoprefixer-loader',
          'sass-loader?outputStyle=compressed'
        )
      }
    ])
  },
  plugins: [
    new ExtractTextPlugin(`${CSS_PATH}/main--[hash].css`),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    })
  ],
  resolve: webpackConfigBase.resolve
}