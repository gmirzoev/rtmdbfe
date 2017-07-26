const webpack = require('webpack');

module.exports = ({projectRoot}) => {
  let prodConfig = require('./webpack.base.config')({projectRoot});

  prodConfig.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.APP_CONFIG': JSON.stringify(require('../standConfig').CONFIG),
  }));

  prodConfig.devtool = 'source-map';

  return prodConfig;
};
