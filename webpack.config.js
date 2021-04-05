const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
const webpack = require("webpack");
const {CleanWebpackPlugin}  = require("clean-webpack-plugin");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.join(__dirname, `src`, `index.js`), // первый входной файл
    mode: 'development', // файлы после сборки (console: webpack)
    output: {
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: `vue-loader`,
                        options: {
                            transformAssetUrls: {
                                source: './src/'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['css-loader']
            },
            {
                test: /\.js$/,
                loader: `babel-loader`,
                include: [path.join(__dirname, `src`)]
            },
            {
                test: /\.styl/,
                use: [
                    {
                        loader: `style-loader`
                    },
                    {
                        loader: `css-loader`
                    },
                    {
                        loader: `stylus-loader`
                    }
                ]
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            // шаблон html для гинерации
            template: path.join(__dirname, `public`, `index.html`),
            inject: true,
            env: "development",
            hash: true,
            minify: false
        }),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
    ],
}