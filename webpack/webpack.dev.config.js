const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = ({projectRoot}) => {
  let devConfig = require('./webpack.base.config')({projectRoot});

  devConfig.plugins.push(
    new DashboardPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.APP_CONFIG': JSON.stringify(require('../standConfig').DEV_CONFIG),
    }),
  );

  devConfig.devServer = {
    contentBase: path.join(projectRoot, 'src'),
    publicPath: '/',
    historyApiFallback: true,
  };

  devConfig.devtool = 'eval';

  return devConfig;
};
