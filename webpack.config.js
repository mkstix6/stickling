var precss = require('precss')
var autoprefixer = require('autoprefixer')
var style = require('style-loader')
var css = require('css-loader')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    js: './assets/js/index.js',
    css: './assets/scss/index.scss'
  },
  output: {
    filename: './dist/bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css!sass!postcss-loader')
    }]
  },
  postcss: function () {
    return [precss, autoprefixer({
      browsers: ['last 2 versions']
    })]
  },
  plugins: [
    new ExtractTextPlugin('dist/main.css', {
      allChunks: true
    })
  ]
}
