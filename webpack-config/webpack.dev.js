/**
 * Used to merge webpack configs
*/
const webpackMerge = require('webpack-merge');
/**
 * The settings that are common to prod and dev
*/
const commonConfig = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');

/**
* Defaut node environment for this script
*/
const DEFAULT_NODE_ENV = "development";

module.exports = function (options) {
  var node_env = options.env || DEFAULT_NODE_ENV;
  return webpackMerge(commonConfig({env: node_env}), {

    devtool: 'inline-source-map',

    output: {
      path: path.join(__dirname, '../build'),
      filename: '[name].dev.js',
      sourceMapFilename: '[name].js.map',
      publicPath: '/',
      chunkFilename: '[name].dev.js'
    },

    plugins: [
      new StyleLintPlugin({
        configFile: './.stylelintrc',
        files: 'app/**/*.css',
        failOnError: false
      }),
    ]
  });
}
