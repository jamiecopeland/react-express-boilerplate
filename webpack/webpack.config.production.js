import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import {BUILD_FOLDER_PATH, SRC_FOLDER_PATH} from '../config/projectPathConfig';
import {JS_FOLDER_PATH, CSS_FOLDER_PATH, MAIN_JS_FILE_NAME, MAIN_CSS_FILE_NAME, HASH_SEPARATOR} from '../config/publicFolderConfig';
import webpackConfigBase, {styleLoader as baseStyleLoader} from './webpack.config.base';

export const jsLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    cacheDirectory: true,
    presets: ['es2015', 'stage-0', 'react']
  }
};

export const styleLoader = {
  test: baseStyleLoader.test,
  loader: ExtractTextPlugin.extract.apply(this, baseStyleLoader.loaders)
}

export default {
  entry: {
    [MAIN_JS_FILE_NAME]: path.join(SRC_FOLDER_PATH, 'client', 'Main.js')
  },
  output: {
    path: BUILD_FOLDER_PATH,
    filename: `${JS_FOLDER_PATH}/[name]${HASH_SEPARATOR}[hash].js`
  },
  module: {
    preLoaders: webpackConfigBase.module.preLoaders,
    loaders: webpackConfigBase.module.loaders.concat([
      jsLoader,
      styleLoader
    ])
  },
  postcss: webpackConfigBase.postcss,
  plugins: [
    new ExtractTextPlugin(`${CSS_FOLDER_PATH}/${MAIN_CSS_FILE_NAME}${HASH_SEPARATOR}[hash].css`),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
  ],
  resolve: webpackConfigBase.resolve
}