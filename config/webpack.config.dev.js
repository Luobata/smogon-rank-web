var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var glob = require('glob');
var srcDir = path.resolve(process.cwd(), 'src');
var jsEntryDir = path.resolve(srcDir, 'page')
var htmlEntryDir = srcDir;
var assetsDir = path.resolve(process.cwd(), 'assets');
var jsDir = 'src/page/';
var assetsSubDirectory = 'static/';
var libMerge = true;
var cssSourceMap = true;
var singleModule = [];
var env = process.env.NODE_ENV;
var utils = require('./utils');

var config = {
    devtool: 'eval-source-map',
    entry: getEntry(),
    output: {
        path: path.join(process.cwd(), 'assets'),
        filename: jsDir + '[name].js',
        publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
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
            },
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/,
                include: path.join(process.cwd(), 'src')
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: assetsSubDirectory + 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: assetsSubDirectory + 'fonts/[name].[hash:7].[ext]'
                }
            },
            utils.styleLoaders({sourceMap: cssSourceMap})
        ]
    },
    vue: {
        loaders: utils.cssLoaders(),
        postcss: [
            require('autoprefixer')({
                browsers: ['last 2 versions']
            })
        ]
    },
    resolveLoader: { root: path.join(__dirname, "node_modules") },
    resolve: {
        extensions: ["", ".web.js", ".js", ".node", '.vue'],
        root: path.join(__dirname, "node_modules"),
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
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
};

var files = glob.sync(path.resolve(htmlEntryDir, '**/*.html'));
files.forEach(function(filename) {
    filename = filename.replace(/\//g, '\\');
    var m = filename.match(/(.+)\.html$/);
    if (m) {
        var conf = {
            template: filename,
            inject: true, //允许插件修改哪些内容，包括head与body
            hash: true, //为静态资源生成hash值
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            },
            filename: filename.replace(srcDir, assetsDir)
        };
        var vendor = m[1].replace(srcDir + '/', '');
        if (vendor in config.entry) {
            if (libMerge) {
                conf.chunks = ['lib', vendor];
            } else {
                conf.chunks = [vendor].concat(singleModule);
            }

        }
        config.plugins.push(new HtmlWebpackPlugin(conf));
    }
});

module.exports = config;
