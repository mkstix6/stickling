module.exports = {
    entry: "./assets/js/index.js",
    output: {
        filename: "./assets/js/bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    }
};