const path = require('path');
const webpack = require('webpack');

module.exports = {
  // environment
  mode: 'production',

  // input
  entry: path.resolve(__dirname, 'src/index.js'),

  // output
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'bundle.js',
  },

  // babel
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  // development server
  devtool: 'source-map',

  devServer: {
    contentBase: 'dist',
    port: 5000,
  },
}
