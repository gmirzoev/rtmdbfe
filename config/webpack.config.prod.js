const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = ({ env, projectRoot }) => {
  const sourceFilesDir = path.join(projectRoot, 'src')
  const prodConfig = {
    mode: 'production',
    bail: true,
    devtool: 'hidden-source-map',
    context: sourceFilesDir,
    entry: './index.tsx',
    output: {
      path: path.join(projectRoot, 'dist'),
      pathinfo: true,
      filename: '[name].[hash:5].js',
      chunkFilename: '[name].[chunkhash:5].js',
      publicPath: '/',
      devtoolModuleFilenameTemplate: info => {
        return path.relative(sourceFilesDir, info.absoluteResourcePath).replace(/\\/g, '/')
      }
    },
    resolve: {
      modules: [ './node_modules', './src' ],
      extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json' ]
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.(ts|tsx)$/,
          enforce: 'pre',
          include: path.join(projectRoot, 'src'),
          loader: 'tslint-loader',
          options: {
            typeCheck: true
          }
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          include: path.join(projectRoot, 'src'),
          loader: 'source-map-loader'
        },
        {
          oneOf: [
            {
              test: /\.(ts|tsx)$/,
              include: path.join(projectRoot, 'src'),
              loader: 'ts-loader'
            },
            { // global level styles
              test: /\.scss$/,
              include: path.join(projectRoot, 'src/styles'),
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: { url: true }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      autoprefixer({
                        browsers: [ 'last 2 versions' ],
                        flexbox: 'no-2009'
                      })
                    ]
                  }
                },
                'sass-loader'
              ]
            },
            { // component level styles
              test: /\.scss$/,
              include: path.join(projectRoot, 'src'),
              exclude: path.join(projectRoot, 'src/styles'),
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    url: true,
                    modules: true,
                    camelCase: 'dashes',
                    localIdentName: '[hash:base64:5]'
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      autoprefixer({
                        browsers: [ 'last 2 versions' ],
                        flexbox: 'no-2009'
                      })
                    ]
                  }
                },
                'sass-loader'
              ]
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/,
              include: path.join(projectRoot, 'src/assets/images'),
              use: [{
                loader: 'file-loader',
                options: {
                  name: 'assets/images/[name].[ext]'
                }
              }]
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: 'body',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        }
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        'window.__STAND_CONFIG__': JSON.stringify(require('../standConfig'))
      }),
      new ExtractTextPlugin({
        filename: '[name].[contenthash:5].css',
        allChunks: true
      })
    ],
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    },
    performance: { hints: false }
  }

  if (env && env.details) {
    prodConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static'
      })
    )
  }

  return prodConfig
}
