const path = require('path');
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'build/'),
    entry: {
        index: './scripts/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/'),
        filename: 'script/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    "awesome-typescript-loader",
                    "angular2-template - loader"
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [['es2015', { "modules": false }]]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader'],
                    publicPath: '../'
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(jpg|jpeg|png)$/,
                use: {
                    loader: 'file-loader?name=images/[hash].[ext]'
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'file-loader?name=templates/[hash].[ext]'
                },
                exclude: ['./src/index.html']
            }
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: true
        }),
        new CopyWebpackPlugin([{
            from: '../src/images',
            to: 'images'
        }, {
            from: '../src/index.html',
            to: ''
        }]),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'script/commons.js',
        }),
        new webpack.ContextReplacementPlugin(
            /angular[\/\\]core[\/\\]@angular/,
            path.resolve(__dirname, 'src'),
            {}
        )
    ]
};