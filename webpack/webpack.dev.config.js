const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = ({env, projectRoot}) => {
  let devConfig = require('./webpack.base.config')({projectRoot});

  devConfig.plugins.push(
    new DashboardPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.APP_CONFIG': JSON.stringify(require('../standConfig').DEV_CONFIG),
    }),
  );

  if (env && env.debug) {
    devConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static'
      }),
    );
  }

  devConfig.devServer = {
    contentBase: path.join(projectRoot, 'src'),
    publicPath: '/',
    historyApiFallback: true,
  };

  devConfig.devtool = 'cheap-eval-source-map';

  return devConfig;
};
