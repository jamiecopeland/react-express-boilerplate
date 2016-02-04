import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';
import express from 'express';

import webpackConfigDevelopment from '../webpack.config.development';
import { WEBPACK_HOST, WEBPACK_PORT } from '../../config/serverAddressConfig';

const app = express();
const compiler = webpack(webpackConfigDevelopment);

app.use(webpackDev(compiler, {
  noInfo: true,
  publicPath: webpackConfigDevelopment.output.publicPath
}));

app.use(webpackHot(compiler));

app.listen(WEBPACK_PORT, () => {
  console.log(`**********`);
  console.log(`Webpack server started`);
  console.log(`**********`);
});
