const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = ({projectRoot}) => ({
  context: path.join(projectRoot, 'src'),
  entry: {
    vendor: [
      'babel-polyfill',
      'isomorphic-fetch',
      'prop-types',
      'react',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'redux',
      'redux-form',
      'redux-promise-middleware',
      'redux-thunk',
    ],
    app: './index.js',
  },
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name].bundle.[chunkhash].js',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
      minChunks: 4
    }),
    new ExtractTextPlugin({
      filename: '[name].bundle.[hash].css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
    }),
    new CopyWebpackPlugin([
      { from: './manifest.json' },
      { from: './sw.js' },
      { from: 'assets/images/rtmdbfe*.png' }
    ]),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
  ],
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules'),
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
