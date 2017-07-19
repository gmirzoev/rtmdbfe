const webpack = require('webpack');

module.exports = ({projectRoot}) => {
  const prodStandConfig = Object.assign({ENV: 'production'}, require('../standConfig').CONFIG);
  let prodConfig = require('./webpack.base.config')({projectRoot});

  prodConfig.plugins.push(new webpack.DefinePlugin({
    'window.APP_CONFIG': JSON.stringify(prodStandConfig),
  }));

  prodConfig.devtool = 'source-map';

  return prodConfig;
};
