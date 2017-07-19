module.exports = () => {
  const isProd = process.env.NODE_ENV && process.env.NODE_ENV === 'production';

  if (isProd) {
    return require('./webpack/webpack.prod.config')({projectRoot: __dirname});
  }
  return require('./webpack/webpack.dev.config')({projectRoot: __dirname});
};
