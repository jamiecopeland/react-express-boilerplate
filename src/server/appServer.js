import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import async from 'async';

import { BUILD_PATH, SRC_PATH } from '../../config/projectPathConfig';
import { APP_HOST, APP_PORT, WEBPACK_HOST, WEBPACK_PORT } from '../../config/serverAddressConfig';
import { JS_PATH, CSS_PATH } from '../../config/publicFolderConfig';

function initializeExpress(indexFileString) {
  const app = express();

  app.use(express.static(BUILD_PATH));

  app.use(cors());

  app.get('/api/message', (req, res) => {
    res.json({message: 'hello'});
  });

  app.get('*', (req, res) => {
    res.send(indexFileString);
  });

  app.listen(APP_PORT, () => {
    console.log(`******************`);
    console.log(`App server started at: http://${APP_HOST}:${APP_PORT}`);
    console.log(`******************`);

  });

  return app;
}

// --------------------------------------------------
// Initialization

import createIndexFile from './utils/createIndexFile';
createIndexFile(path.normalize(path.join(__dirname, '/../client/index.html')), (err, indexFileString) => {
  if(err) {
    throw(new Error(`Couldn't create index file: ${err}`));
  } else {
    initializeExpress(indexFileString);
  }
});
