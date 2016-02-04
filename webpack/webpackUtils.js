import gutil from 'gulp-util';
import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import async from 'async';

import { BUILD_FOLDER_PATH, SRC_FOLDER_PATH } from '../config/projectPathConfig';
import { JS_FOLDER_PATH, CSS_FOLDER_PATH, MAIN_JS_FILE_NAME, MAIN_CSS_FILE_NAME, HASH_SEPARATOR } from '../config/publicFolderConfig';
import webpackConfigDevelopment from './webpack.config.production';

export default function loadIndexCSS(outerCallback) {
  async.series({
    resetCSS: (callback) => {
      fs.readFile(`${SRC_FOLDER_PATH}/styles/reset.css`, 'utf8', function read(err, data) {
        callback(err, data);
      });
    },

    preloaderCSS: (callback) => {
      fs.readFile(`${SRC_FOLDER_PATH}/styles/preloader.css`, 'utf8', function read(err, data) {
        callback(err, data);
      });
    }
  },
  (err, result) => {
    outerCallback(err, result);
  });
}








import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Index from '../src/server/components/index/Index.js';

export function buildPublicFolder(callback) {

  webpack(webpackConfigDevelopment, (err, stats) => {

    if(err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack]', stats.toString({
      colors: true,
      version: false,
      hash: true,
      timings: false,
      chunks: false,
      chunkModules: false
    }));

    var buildJSON = {
      hash: stats.hash
    };

    fs.writeFile(path.join(BUILD_FOLDER_PATH, 'build.json'), JSON.stringify(buildJSON), function(err) {
      callback(err);
    });

  });

};
