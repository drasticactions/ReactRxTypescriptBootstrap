var express = require('express');
var fs = require('fs');
var http = require('http');
var https = require('https');
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var app = express();
var config = require('./webpack.config');
var options = {
    key: fs.readFileSync(path.resolve('certificates', 'dev-server.key'), 'utf8'),
    cert: fs.readFileSync(path.resolve('certificates', 'dev-server.crt'), 'utf8')
};
function prefix() { return config.secure ? 'https://' : 'http://'; }
// WEBPACK SERVER
var webpackserver = new WebpackDevServer(webpack(config), {
    historyApiFallback: true,
    host: 'localhost',
    hot: true,
    https: config.secure,
    inline: true,
    noInfo: false,
    options: options,
    port: config.ports.webpack,
    progress: false,
    publicPath: config.output.publicPath,
    quiet: false,
    stats: { colors: true },
    proxy: [
        {
            path: /^(?!.*socket\.io)(.*)$/,
            target: prefix() + 'localhost:' + config.ports.express + '/',
            ssl: options,
            secure: false
        },
        {
            path: /^(?!.*\.hot-update\.js)(.*)$/,
            target: prefix() + 'localhost:' + config.ports.express + '/',
            ssl: options,
            secure: false
        }
    ]
});
webpackserver.listen(config.ports.webpack, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Webpack Dev Server Listening at ' + prefix() + 'localhost:' + config.ports.webpack);
});
// EXPRESS SERVER
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', prefix() + 'localhost:' + config.ports.webpack);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.use(allowCrossDomain);
app.use('/', express.static('public'));
require('./test')(app); // Test
app.use('/is-authorized', function (req, res) {
    try {
        res.end(JSON.stringify(require('./public/is-authorized.json')));
    }
    catch (err) {
        console.log(err);
        res.end('{}');
    }
});
var server = config.secure ? https.createServer(options, app) : http.createServer(app);
server.listen(config.ports.express, function () {
    console.log('Example app listening at %s%s:%s', prefix(), 'localhost', config.ports.express);
});
//# sourceMappingURL=server.js.map