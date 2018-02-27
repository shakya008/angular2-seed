const path = require('path');
const webpack = require('webpack');

/**
 * Webpack Plugins
 *
 * problem with copy-webpack-plugin
 */
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Webpack configuration
 */
module.exports = function (options) {
  return {
    entry: {
      'app': './src/index.ts'
    },

    /**
     * Options affecting the resolving of modules.
     */
    resolve: {
      /**
       * An array of extensions that should be used to resolve modules.
       */
      extensions: ['.ts', '.js', '.json'],
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          enforce: "pre",
          loader: 'tslint-loader',
          exclude: [
            path.join(__dirname, "../node_modules"),
            path.join(__dirname, "../build")
          ]
        },
        {
          test: /^(?!.*\.spec\.js$).*\.js$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
          ],
        },
        {
          test: /\.css$/,
          use: [
            'to-string-loader',
            { loader: 'css-loader' },
            'postcss-loader',
          ],
          exclude: /node_modules/
        },
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: /node_modules/
        },
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader',
          exclude: /node_modules/
        },

        {
          test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loaders: ['url-loader?limit=10000&minetype=application/font-woff&name=/fonts/[name].[ext]'],
          include: /fonts/,
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loaders: ['url-loader?name=/fonts/[name].[ext]'],
          include: /fonts/,
        },
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/i,
          loaders: [
            'file-loader?hash=sha512&digest=hex&name=/media/[name].[ext]',
            'image-webpack?bypassOnDebug=false&optimizationLevel=7&interlaced=false',
          ],
          include: /media/,
        },
        {
          test: /\.json$/,
          loaders: ['json-loader'],
          exclude: /node_modules/
        }
      ],
      noParse: [ /zone\.js\/dist\/.+/, /angular2\/bundles\/.+/ ]
    },

    plugins: [
      new CheckerPlugin(),

      new HtmlWebpackPlugin({
        filename: './index.html',
        template: './src/index.html',
        inject: 'body',
        minify: {
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true
        }
      }),
      new webpack.DefinePlugin({
        // https://webpack.js.org/plugins/define-plugin/#feature-flags
        'process.env.NODE_ENV': JSON.stringify(options.env)
      }),

      new webpack.NoEmitOnErrorsPlugin(),

      new CopyWebpackPlugin([
        { from: 'src/assets', to: '../build/assets' },
        { from: 'src/assets/icon-fonts', to: '../build/assets/icon-fonts' }
      ]),

      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      })
    ],

    node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    }
  };
}