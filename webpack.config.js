module.exports = env => {
  const isProd = process.env.NODE_ENV && process.env.NODE_ENV === 'production'
  if (isProd) {
    return require('./config/webpack.config.prod')({ env, projectRoot: __dirname })
  }
  return require('./config/webpack.config.dev')({ env, projectRoot: __dirname })
}
