import async from 'async';
import fs from 'fs';
import handlebars from 'handlebars';

import { BUILD_PATH, SRC_PATH } from '../../../config/projectPathConfig';
import { APP_HOST, APP_PORT, WEBPACK_HOST, WEBPACK_PORT } from '../../../config/serverAddressConfig';
import { JS_PATH, CSS_PATH } from '../../../config/publicFolderConfig';

export default function createIndexFile(indexTemplatePath, outerCallback) {

  async.series({

    buildJSON: (callback) => {
      fs.readFile(`${BUILD_PATH}/build.json`, 'utf8', function read(err, data) {
        callback(null, data ? JSON.parse(data) : null);
      });
    },

    resetCSS: (callback) => {
      fs.readFile(`${SRC_PATH}/styles/reset.css`, 'utf8', function read(err, data) {
        callback(err, data);
      });
    },

    preloaderCSS: (callback) => {
      fs.readFile(`${SRC_PATH}/styles/preloader.css`, 'utf8', function read(err, data) {
        callback(err, data);
      });
    },

    indexFileTemplate: (callback) => {
      fs.readFile(indexTemplatePath, 'utf8', function read(err, data) {
        callback(err, data);
      });
    }
  },
  (err, result) => {

    const srcTags = result.buildJSON ? {
      mainJSInclude: `<script type="text/javascript" src="${JS_PATH}/main--${result.buildJSON.hash}.js"></script>`,
      mainCSSInclude: `<style type="text/css" rel="stylesheet">${result.resetCSS}\n${result.preloaderCSS}</style>\n<link type="text/css" rel="stylesheet" href="${CSS_PATH}/main--${result.buildJSON.hash}.css" />`
    } : {
      mainJSInclude: `<script type="text/javascript" src="http://${WEBPACK_HOST}:${WEBPACK_PORT}${JS_PATH}/main.js"></script>`,
      mainCSSInclude: `<style type="text/css" rel="stylesheet">${result.resetCSS}\n${result.preloaderCSS}</style>`
    }

    const template = handlebars.compile(result.indexFileTemplate);
    outerCallback(err, template(srcTags));
  });
}
