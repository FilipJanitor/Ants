var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './public/js/client.js'),
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
            }
          }
        ]
    },
    output: {
        path: path.resolve(__dirname, "public/"),
        filename: "client.bundle.js"
    }
}