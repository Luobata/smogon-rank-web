var path = require('path')
var webpack = require('webpack')
var env = process.env.NODE_ENV;

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
        '#! /usr/bin/env node': JSON.stringify(env)
    })
  ],
  module: {
    loaders: [
      {
          test: /\.json$/,
          loader: "json-loader"
      },
      {
          test: /\.html$/,
          loader: "html-loader"
      }
    ]
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".js", ".node"]
  },
  node: {
      fs: 'empty'
  },
  target: 'node'
}
