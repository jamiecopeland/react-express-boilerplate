import bg from 'gulp-bg';
import eslint from 'gulp-eslint';
import fs from 'fs';
import gulp from 'gulp';
import gutil from 'gulp-util';
import path from 'path';
import runSequence from 'run-sequence';
import shell from 'gulp-shell';
import del from 'del';

import { buildPublicFolder } from './webpack/webpackUtils';
import { BUILD_FOLDER_PATH } from './config/projectPathConfig';

// --------------------------------------------------
// Development tasks

gulp.task('startWebpackServer', bg('node', './webpack/server/webpackServerWrapper.js'));
gulp.task('startAppServerNodemon', shell.task(path.normalize('node_modules/.bin/nodemon src/server/appServerWrapper.js')));

// Main development task
gulp.task('startDevelopment', (callback) => {
  runSequence('deletePublicFolder', 'startWebpackServer', 'startAppServerNodemon', callback);
});

// --------------------------------------------------
// Testing tasks

gulp.task('startKarma', shell.task('karma start'));

// --------------------------------------------------
// Production tasks

gulp.task('deletePublicFolder', () => { return del([BUILD_FOLDER_PATH]); });
gulp.task('buildPublicFolder', buildPublicFolder);
gulp.task('build', (callback) => {
  return runSequence('deletePublicFolder', 'buildPublicFolder', callback);
});
gulp.task('startAppServer', bg('node', './src/server/appServerWrapper.js'));

// Main production task
gulp.task('startProduction', (callback) => {
  return runSequence('build', 'startAppServer', callback);
});

// // --------------------------------------------------
// // Default

gulp.task('default', ['startDevelopment']);
