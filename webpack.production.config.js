/**
 * Created by thiago.candido on 10/09/2015.
 */
var webpack = require('webpack');

module.exports = {
    entry : './src/viewport.js',
    output: {
        path: './build/deploy',
        filename:'viewport.min.js'
    },
    module : {
        loaders:[
            {test: /\.js$/, exclude: /node_modules/, loaders: [ 'babel']}
        ],
        postLoaders:[
            {test: /\.js$/, exclude: /node_modules/, loaders: [ 'expose?VIEWPORT']}
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourcemap : false,
            mangle : true
        }),
]
}