import async from 'async';
import fs from 'fs';
import ip from 'ip';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { BUILD_FOLDER_PATH, SRC_FOLDER_PATH } from '../../../config/projectPathConfig';
import { APP_HOST, APP_PORT, WEBPACK_HOST, WEBPACK_PORT } from '../../../config/serverAddressConfig';
import { JS_FOLDER_PATH, CSS_FOLDER_PATH, MAIN_JS_FILE_NAME, MAIN_CSS_FILE_NAME, HASH_SEPARATOR } from '../../../config/publicFolderConfig';
import Index from '../components/index/index';

export default function createIndexFile(outerCallback) {

  async.waterfall([

    (callback) => {
      fs.readFile(`${BUILD_FOLDER_PATH}/build.json`, 'utf8', function read(err, data) {
        callback(null, data ? JSON.parse(data) : {});
      });
    },

    (memo, callback) => {
      fs.readFile(`${SRC_FOLDER_PATH}/styles/reset.css`, 'utf8', function read(err, data) {
        callback(err, {
          ...memo,
          resetCSS: data
        });
      });
    },

    (memo, callback) => {
      fs.readFile(`${SRC_FOLDER_PATH}/styles/preloader.css`, 'utf8', function read(err, data) {
        callback(err, {
          ...memo,
          preloaderCSS: data
        });
      });
    },

    (memo, callback) => {
      let jsPaths;
      let cssPaths;

      // TODO Swap this conditional out for a check on environmental variables
      if(memo.hash) {
        jsPaths = [`${JS_FOLDER_PATH}/${MAIN_JS_FILE_NAME}${HASH_SEPARATOR}${memo.hash}.js`];
        cssPaths = [`${CSS_FOLDER_PATH}/${MAIN_CSS_FILE_NAME}${HASH_SEPARATOR}${memo.hash}.css`]
      } else {
        jsPaths = [`http://${WEBPACK_HOST}:${WEBPACK_PORT}${JS_FOLDER_PATH}/${MAIN_JS_FILE_NAME}.js`]
      }

      const index = <Index
        // TODO Move this out in a config or strings file
        title="React express boilerplate"
        jsPaths={jsPaths}
        cssPaths={cssPaths}
        internalCSS={`${memo.resetCSS} ${memo.preloaderCSS}`}
      />;

      const indexFileString = ReactDOMServer.renderToStaticMarkup(index);

      outerCallback(null, indexFileString);
    }
  ]);
}
