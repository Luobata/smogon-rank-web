var path = require('path');
var webpack = require('webpack');
var glob = require('glob');
var srcDir = path.resolve(process.cwd(), 'src');
var jsEntryDir = path.resolve(srcDir, 'dist')
var jsDir = 'dist/';
var libMerge = true;
var singleModule = [];
var env = process.env.NODE_ENV;

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client?noInfo=true&reload=true',
    // './dist/test'
    './config/devServer'
  ],
  // entry: getEntry(),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('common.js')
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
  resolveLoader: { root: path.join(__dirname, "node_modules") },
  resolve: {
    extensions: [".web.js", ".js", ".node"],
    root: path.join(__dirname, "node_modules")
  },
  node: {
      fs: 'empty'
  }
};
function getEntry() {
    var entrys = glob.sync(path.resolve(jsEntryDir, '**/*.js'));
    var map = {};
    entrys.forEach(function(entry) {
        if (entry) {
            var path = entry.replace(jsEntryDir + '/', '');
            var entryName = path.substring(0, path.length - 3);
            var entryArr = [];
            entryArr.push(entry);
            entryArr.push('eventsource-polyfill');
            entryArr.push('webpack-hot-middleware/client');
            map[entryName] = entryArr;
        }
    });
    //自定义额外加载包,不会合并在页面对应js中
    if (libMerge) {
        map['lib'] = singleModule;
    } else {
        singleModule.forEach(function(libName) {
            map[libName] = [libName];
        });
    }
    return map;
}
