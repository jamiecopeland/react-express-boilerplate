import async from 'async';
import fs from 'fs';
import handlebars from 'handlebars';

import { BUILD_FOLDER_PATH, SRC_FOLDER_PATH } from '../../../config/projectPathConfig';
import { APP_HOST, APP_PORT, WEBPACK_HOST, WEBPACK_PORT } from '../../../config/serverAddressConfig';
import { JS_FOLDER_PATH, CSS_FOLDER_PATH, MAIN_JS_FILE_NAME, MAIN_CSS_FILE_NAME, HASH_SEPARATOR } from '../../../config/publicFolderConfig';

export default function createIndexFile(indexTemplatePath, outerCallback) {

  async.series({
    buildJSON: (callback) => {
      fs.readFile(`${BUILD_FOLDER_PATH}/build.json`, 'utf8', function read(err, data) {
        callback(null, data ? JSON.parse(data) : null);
      });
    },

    resetCSS: (callback) => {
      fs.readFile(`${SRC_FOLDER_PATH}/styles/reset.css`, 'utf8', function read(err, data) {
        callback(err, data);
      });
    },

    preloaderCSS: (callback) => {
      fs.readFile(`${SRC_FOLDER_PATH}/styles/preloader.css`, 'utf8', function read(err, data) {
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
      mainJSInclude: `<script type="text/javascript" src="${JS_FOLDER_PATH}/${MAIN_JS_FILE_NAME}${HASH_SEPARATOR}${result.buildJSON.hash}.js"></script>`,
      mainCSSInclude: `<style type="text/css" rel="stylesheet">${result.resetCSS}\n${result.preloaderCSS}</style>\n<link type="text/css" rel="stylesheet" href="${CSS_FOLDER_PATH}/${MAIN_CSS_FILE_NAME}${HASH_SEPARATOR}${result.buildJSON.hash}.css" />`
    } : {
      mainJSInclude: `<script type="text/javascript" src="http://${WEBPACK_HOST}:${WEBPACK_PORT}${JS_FOLDER_PATH}/${MAIN_JS_FILE_NAME}.js"></script>`,
      mainCSSInclude: `<style type="text/css" rel="stylesheet">${result.resetCSS}\n${result.preloaderCSS}</style>`
    }

    const template = handlebars.compile(result.indexFileTemplate);
    outerCallback(err, template(srcTags));
  });
}
