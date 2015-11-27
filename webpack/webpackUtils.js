import gutil from 'gulp-util';
import webpack from 'webpack';
import path from 'path';
import fs from 'fs';

import { BUILD_FOLDER_PATH } from '../config/projectPathConfig';
import { JS_FOLDER_PATH, CSS_FOLDER_PATH } from '../config/publicFolderConfig';
import webpackConfigDevelopment from './webpack.config.production';

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
