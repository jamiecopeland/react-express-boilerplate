import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import async from 'async';
import ip from 'ip';

import { BUILD_FOLDER_PATH, SRC_FOLDER_PATH } from '../../config/projectPathConfig';
import { APP_HOST, APP_PORT, WEBPACK_HOST, WEBPACK_PORT } from '../../config/serverAddressConfig';
import { JS_FOLDER_PATH, CSS_FOLDER_PATH, MAIN_JS_FILE_NAME, MAIN_CSS_FILE_NAME } from '../../config/publicFolderConfig';

function initializeExpress(indexFileString) {
  const app = express();
  const indexWithDocType = `<!DOCTYPE html>${indexFileString}`;

  app.use(express.static(BUILD_FOLDER_PATH));

  app.use(cors());

  app.get('/api/message', (req, res) => {
    res.json({message: 'hello'});
  });

  app.get('*', (req, res) => {
    res.send(indexWithDocType);
  });

  app.listen(APP_PORT, () => {
    console.log(`**********`);
    console.log(`App server started at: http://${APP_HOST}:${APP_PORT}`);
    console.log(`**********`);
  });

  return app;
}

// --------------------------------------------------
// Initialization

import createIndexFile from './utils/createIndexFile';
createIndexFile((err, indexFileString) => {
  if(err) {
    throw(new Error(`Couldn't create index file: ${err}`));
  } else {
    initializeExpress(indexFileString);
  }
});
