const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    filename: '[name].bundle.js',
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

  optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "initial",
          },
        },
      },
    },

  // development server
  devtool: 'source-map',

  devServer: {
    contentBase: 'dist',
    port: 3000,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`
    })
  ],
}
