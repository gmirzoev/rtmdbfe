module.exports = env => {
  const isProd = process.env.NODE_ENV && process.env.NODE_ENV === 'production';

  if (isProd) {
    return require('./webpack/webpack.prod.config')({env, projectRoot: __dirname});
  }
  return require('./webpack/webpack.dev.config')({env, projectRoot: __dirname});
};
