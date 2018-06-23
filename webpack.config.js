var precss = require('precss')
var autoprefixer = require('autoprefixer')
var style = require('style-loader')
var css = require('css-loader')

module.exports = {
  entry: {
    js: './assets/js/index.js'
    // css: './assets/scss/index.scss'
  },
  output: {
    filename: './assets/js/bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.scss$/,
      loader: 'css!sass!postcss-loader'
    }]
  },
  postcss: function () {
    return [precss, autoprefixer({
      browsers: ['last 2 versions']
    })]
  }
}
