var express = require('express')
var rewrite = require('express-urlrewrite')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpack = require('webpack')
var webpackConfig = require('./webpack.config')

var app = express()

var compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.path,
    stats: {
        colors: true
    }
}))

var fs = require('fs')
var path = require('path')

fs.readdirSync(__dirname).forEach(function (file) {
    if (fs.statSync(path.join(__dirname, file)).isDirectory())
        app.use(rewrite('/' + file + '/*', '/' + file + '/index.html'))
})

app.use(express.static(__dirname))

app.listen(8083, function () {
    console.log('Server listening on http://localhost:8083, Ctrl+C to stop')
})
