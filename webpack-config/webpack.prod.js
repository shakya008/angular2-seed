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
/**
 * Webpack Plugins
 */
const SplitByPathPlugin = require('webpack-split-by-path');
const OptimizeJsPlugin = require('optimize-js-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const BrotliPlugin = require("brotli-webpack-plugin");
/**
* Defaut node environment for this script
*/
const DEFAULT_NODE_ENV = "production";

module.exports = function (config) {
  // var node_env = options.env || DEFAULT_NODE_ENV;

  return webpackMerge(commonConfig(config), {
    devtool: 'cheap-module-source-map',
    output: {
      path: path.join(__dirname, '../build'),
      filename: '[name].[hash].js',
      sourceMapFilename: '[name].js.map',
      publicPath: '/',
      chunkFilename: '[name].chunk.[hash].js'
    },

    /**
     * Add additional plugins to the compiler.
     */
    plugins: [

      new OptimizeJsPlugin({
        sourceMap: false
      }),

      new BrotliPlugin({
        asset: "[path].br[query]",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.7
      }),
      new webpack.optimize.AggressiveMergingPlugin(),

      new CommonsChunkPlugin({
        name: 'vendor',
        minChunks: module => /node_modules/.test(module.resource)
      }),

      new CommonsChunkPlugin({
        name: ['manifest'],
        minChunks: Infinity,
      }),

      new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: {
          warnings: false
        },
        minimize: true,
        output: {
          comment: false
        }
      }),
    ]
  });
}
