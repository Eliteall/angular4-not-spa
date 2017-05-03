const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = [{
    entry: {
        bundle: './build/main.js'
    },
    output: {
        path: path.join(__dirname, '/public'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                exclude: /node_modules/,
                test: /\.js[x]?$/
            }
        ]
    }
}, {
    entry: {
        style: './build/main.js'
    },
    output: {
        path: path.join(__dirname, '/public/css'),
        filename: '[name].css'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader?-url",
                    publicPath: "/dist"
                })
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader?-url",
                        "sass-loader"
                    ],
                    publicPath: "/dist"
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "[name].css",
            disable: false,
            allChunks: true
        }),
        new webpack.ContextReplacementPlugin(
            /(\.\\)(\/\\)(\~\\)(\/\\)(\@\\)angular(\/\\)core(\/\\)(\@\\)angular(\/\\)core(\.\\)es5(\.\\)js/
        ),
    ]
}];