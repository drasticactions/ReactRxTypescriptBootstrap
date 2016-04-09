var path = require('path');
var webpack = require('webpack');

var WEBPACK_PORT = 3000;
var EXPRESS_PORT = 3001;

var SECURE = false;

var nodeModulesPath = path.join(__dirname, 'node_modules');

function prefix() { return SECURE ? 'https://':'http://'; }

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?'+prefix()+'localhost:3000',
        'webpack/hot/only-dev-server',
        './src/main'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js', false),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
    ],
    tslint: {
    // Rules are in tslint.json
    emitErrors: true, // false = WARNING for webpack, true = ERROR for webpack
    formattersDirectory: path.join(nodeModulesPath, 'tslint-loader', 'formatters')
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
            preLoaders: [
                { test: /\.ts(x?)$/, loader: "tslint", include: path.resolve(__dirname, "src") },
            ],
        loaders: [
           { test: /\.tsx?$/,  loaders: ['react-hot', 'ts'], include: path.join(__dirname, 'src') },
           { test: /\.json$/, loaders: ['json-loader'] },
           { test: /\.import\.css$/,  loader: "style!css", include: path.resolve(__dirname, "src") },
           { test: /\.less$/, exclude: /\.module\.less$/, loader: "style!css!less", include: path.resolve(__dirname, "src") },
           { test: /\.module\.less$/, loader: "style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less", include: path.resolve(__dirname, "src") },
           { test: /\.(jpg|png|jpg|png|woff|eot|ttf|svg|gif)$/, loader: "file-loader?name=[name].[ext]" }
        ]
    },
    node: {
        console: true,
        fs:  'empty',
        net: 'empty',
        tls: 'empty'
    },
    ports: {
        express: EXPRESS_PORT,
        webpack: WEBPACK_PORT
    },
    secure: SECURE
};