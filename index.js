var webpack = require('webpack');
var webpackDevMiddleware = require('koa-webpack-dev-middleware');
var webpackHotMiddleware = require('koa-webpack-hot-middleware');
var config = require('./webpack.config')
var compiler = webpack(config);
var koa = require('koa');
var router = require('koa-router')();
var app = koa();
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

router.get('/', function *(next) {
    this.status = 200;
    this.body = {"Welcome2": "Hello"};
});

app.use(router.routes());

app.listen(3000);
