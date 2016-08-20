var precss = require('precss');
var autoprefixer = require('autoprefixer');
var style = require('style-loader');
var css = require('css-loader');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        js: "./assets/js/index.js",
        css: "./assets/scss/index.scss"
    },
    output: {
        filename: "./assets/js/bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css!sass')
        }]
    },
    postcss: function() {
        return [precss, autoprefixer]
    },
    plugins: [
        new ExtractTextPlugin('assets/css/main.css', {
            allChunks: true
        })
    ]
}