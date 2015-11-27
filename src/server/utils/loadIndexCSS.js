import async from 'async';
import fs from 'fs';

import { BUILD_FOLDER_PATH, SRC_FOLDER_PATH } from '../../../config/projectPathConfig';

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
