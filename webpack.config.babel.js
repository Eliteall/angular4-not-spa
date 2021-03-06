const path = require('path');
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src/'),
    entry: {
        main: './scripts/main.ts',
        vendor: './scripts/vendor.ts',
        polyfills: './scripts/polyfills.ts',
    },
    output: {
        path: path.resolve(__dirname, 'public/'),
        filename: 'scripts/[name].js',
        chunkFilename: '[id].[hash].chunk.js',
    },
    resolve: {
        extensions: ['*', '.ts', '.js', '.json', '.css', '.scss', '.html'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    "babel-loader",
                    "awesome-typescript-loader"
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                exclude: /public/,
                use: ExtractTextPlugin.extract({
                    fallbackLoader: "to-string-loader",
                    loader: ['css-loader'],
                    publicPath: '../'
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallbackLoader: "to-string-loader",
                    loader: ['css-loader', 'sass-loader'],
                    publicPath: '../'
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
                exclude: /index.html/,
                use: {
                    loader: 'file-loader?name=templates/[name].[ext]'
                }
            }
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/styles.css',
            allChunks: true
        }),
        new CopyWebpackPlugin([{
            from: '../src/images',
            to: 'images'
        },{
            from: '../src/templates',
            to: 'templates'
        }]),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'polyfills']
        }),
        //生成したBundleを埋め込むhtmlファイルを指定します。
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body',
            chunksSortMode: 'dependency'
        }),
        new webpack.ContextReplacementPlugin(
            /angular[\/\\]core[\/\\]@angular/,
            path.resolve(__dirname, 'src'),
            {}
        )
    ]
};