/**
 * Created by thiago.candido on 10/09/2015.
 */

module.exports = {
    entry : './src/viewport.js',
    devtool: 'source-map',
    output: {
        path: './build/debug',
        filename:'viewport.js'
    },
    module : {
        loaders:[
            {test: /\.js$/, exclude: /node_modules/, loaders: [ 'babel']}
        ],
        postLoaders:[
            {test: /\.js$/, exclude: /node_modules/, loaders: [ 'expose?VIEWPORT']}
        ]
    }
}