import {
  ROOT_PATH,
  SRC_PATH
} from '../config/projectPathConfig';

export default {
  module: {
    preLoaders: [
      {
        test: /\.js|jsx$/,
        include: SRC_PATH,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff)$/,
        loader: 'url-loader?limit=8192&name=assets/[path][name]--[hash].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    modulesDirectories: ['src', 'assets', 'node_modules'],
    root: ROOT_PATH
  }
}
