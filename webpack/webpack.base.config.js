const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const excludedVendorLibs = ['normalize.css'];
const vendorLibs = Object.keys(require('../package.json').dependencies)
  .filter(lib => !excludedVendorLibs.includes(lib));

module.exports = ({projectRoot}) => ({
  context: path.join(projectRoot, 'src'),
  entry: {
    vendor: vendorLibs,
    app: './index.js',
  },
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name].[chunkhash:5].js',
    chunkFilename: '[name].[chunkhash:5].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash:5].css',
      allChunks: true,
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
      minChunks: 4
    }),
    new CopyWebpackPlugin([
      { from: './manifest.json' },
      { from: 'assets/images/rtmdbfe*.png' }
    ]),
    // todo: replace with custom sw
    new SWPrecacheWebpackPlugin({
      cacheId: 'rtmdbfe.v2',
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'sw.js',
      minify: true,
      navigateFallback: '/index.html',
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
  ],
  resolve: {
    modules: [
      path.resolve('./node_modules'),
      path.resolve('./src'),
    ],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        include: [
          path.join(projectRoot, 'src'),
        ],
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        include: [
          path.join(projectRoot, 'src'),
        ],
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        include: path.join(projectRoot, 'src', 'styles'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: true,
              },
            },
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.scss$/,
        include: path.join(projectRoot, 'src'),
        exclude: path.join(projectRoot, 'src', 'styles'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: true,
                modules: true,
                camelCase: 'dashes',
                localIdentName: '[name]-[hash:base64:5]__[local]',
              },
            },
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        include: path.join(projectRoot, 'src', 'assets', 'images'),
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/images/[name].[ext]',
          },
        }],
      }
    ],
  },
});
