const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = ({ env, projectRoot }) => {
  const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    context: path.join(projectRoot, 'src'),
    entry: [ './index.tsx' ],
    output: {
      path: path.join(projectRoot, 'dist'),
      pathinfo: true,
      filename: '[name].[hash:5].js',
      chunkFilename: '[name].[chunkhash:5].js',
      publicPath: '/',
      devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
    },
    resolve: {
      modules: [ 'node_modules', './src' ],
      extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json' ]
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.tsx?$/,
          enforce: 'pre',
          include: path.join(projectRoot, 'src'),
          loader: 'tslint-loader'
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
              test: /\.tsx?$/,
              include: path.join(projectRoot, 'src'),
              options: {
                reportFiles: [ // ignore spec's compile errors for dev environment
                  'src/**/*.{ts,tsx}',
                  '!src/**/*.spec.{ts,tsx}'
                ]
              },
              loader: 'awesome-typescript-loader'
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
                    localIdentName: '[local]-[hash:base64:5]'
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
    optimization: {
      splitChunks: {
        cacheGroups: {
          default: false,
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all'
          }
        }
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: 'body'
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"',
        'window.__STAND_CONFIG__': JSON.stringify(require('../standConfig'))
      }),
      new webpack.HotModuleReplacementPlugin(),
      new CopyWebpackPlugin([
        {
          from: path.join(projectRoot, 'src/manifest.json'),
          to: '.'
        },
        {
          from: path.join(projectRoot, 'src/assets/manifest'),
          to: './assets/images'
        }
      ]),
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true
      })
    ],
    devServer: {
      compress: true,
      clientLogLevel: 'none',
      hot: true,
      publicPath: '/',
      watchOptions: {
        ignored: /node_modules/
      },
      overlay: true,
      historyApiFallback: {
        disableDotRule: true
      }
    },
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
    devConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static'
      })
    )
  }

  return devConfig
}
