var precss = require('precss');
var autoprefixer = require('autoprefixer');
var style = require('style-loader');
var css = require('css-loader');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = '/'

module.exports = {
    entry: {
        js: "./assets/js/index.js",
        css: "./assets/scss/index.scss"
    },
    output: {
        path: __dirname + "dist",
        filename: "[name].entry.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }, {
            test: /\.scss$/,
            loaders: ["style", "css", "sass"]
        }]
    }
}