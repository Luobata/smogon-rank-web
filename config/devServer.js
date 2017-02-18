var webpack = require('webpack');
var path = require('path');
var webpackDevMiddleware = require('koa-webpack-dev-middleware');
var webpackHotMiddleware = require('koa-webpack-hot-middleware');
var config = require('./webpack.config.dev')
var compiler = webpack(config);
var koa = require('koa');
var router = require('koa-router')();
var app = koa();
var routerComponent = require('../server/lib/route.js');
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    hot: true,
    lazy: false,
    historyApiFallback: true,
    stats: {
        colors: true // 用颜色标识
    },
    publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app
    .use(routerComponent.routes())
    .use(router.allowedMethods());;
app.use(require('koa-static')(path.join(process.cwd(), '/dist')));
//app.use(require('koa-serve-index')(path.join(process.cwd(), '/src')));


app.listen(3000);
