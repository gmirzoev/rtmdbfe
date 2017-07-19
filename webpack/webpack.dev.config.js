const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = ({projectRoot}) => {
  const devStandConfig = Object.assign({ENV: 'dev'}, require('../standConfig').DEV_CONFIG);
  let devConfig = require('./webpack.base.config')({projectRoot});

  devConfig.plugins.push(
    new DashboardPlugin(),
    new webpack.DefinePlugin({
      'window.APP_CONFIG': JSON.stringify(devStandConfig),
    }),
  );

  devConfig.devServer = {
    contentBase: path.join(projectRoot, 'src'),
    publicPath: '/',
    historyApiFallback: true
  };

  devConfig.devtool = 'eval';

  return devConfig;
};
