/* eslint-disable no-undef */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

/**
 * Code to get the values of environment variables during compilation time for the front-end
 */
//Get the root path. Our .env files and webpack.config.js files are in the root path
const currentPath = path.join(__dirname);
const basePath = currentPath + "/.env";
// We're concatenating the environment name to our filename to specify the correct env file!
const envPath = basePath + "." + process.env.NODE_ENV;
// Check if the file exists, otherwise fall back to the production .env
const finalPath = fs.existsSync(envPath) ? envPath : basePath;
// Set the path parameter in the dotenv config
const fileEnv = dotenv.config({ path: finalPath }).parsed;
// reduce it to a nice object
const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
  return prev;
}, {});

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js'
  },
  plugins: [
    new HtmlWebpackPlugin({ //Plugins extend the abilities of webpack
      template: 'index.html',
      title: 'Development'
    }),
    new webpack.DefinePlugin(envKeys),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react']
        //   plugins: ['@babel/core'],
          },
      },
      {
        test: /scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'], //THIS ORDER MATTERS: it reads from right to left
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
      publicPath: '/'
    },
    compress: true,
    port: 8080,
    proxy: { //changes domain request comes from
        '/api': 'http://localhost:3000',
    }
  }
}