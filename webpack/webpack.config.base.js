import autoprefixer from 'autoprefixer';
import precss from 'precss';

import {
  ROOT_FOLDER_PATH,
  SRC_FOLDER_PATH
} from '../config/projectPathConfig';

export const styleLoader = {
  test: /\.scss$/,
  loaders: [
    'style-loader',
    'css-loader',
    'postcss-loader',
    // 'sass-loader?outputStyle=compressed'
  ]
};

export default {
  module: {
    preLoaders: [
      {
        test: /\.js|jsx$/,
        include: SRC_FOLDER_PATH,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff)$/,
        loader: 'url-loader?limit=8192&name=assets/[path][name]--[hash].[ext]'
      }
    ]
  },
  postcss: [
    autoprefixer, precss
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    modulesDirectories: ['src', 'assets', 'node_modules'],
    root: ROOT_FOLDER_PATH
  }
}
