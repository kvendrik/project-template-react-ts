const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

function configHelper(paths = {}, options = {}) {
  const dirPath = __dirname;

  const PATHS = {
    app: paths.app || `${dirPath}/app`,
    public: paths.public || `${dirPath}/public`,
  };

  let baseConfig = {
    mode: process.env.PRODUCTION ? 'production' : 'development',
    devServer: {
      contentBase: PATHS.public,
      port: 9000,
      compress: true,
      historyApiFallback: {
        rewrites: [
          { from: /^\/[^\.]+$/, to: '/index.html' },
        ],
      },
    },
    devtool: 'cheap-module-eval-source-map',
    entry: {
      app: ['babel-polyfill', PATHS.app],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      modules: [
        path.resolve('./node_modules'),
      ],
    },
    output: {
      path: PATHS.public,
      filename: 'bundle.js',
      publicPath: '/',
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [autoprefixer()],
        },
      }),
      new HtmlWebpackPlugin({
        template: 'index-template.html',
      }),
      new WebpackShellPlugin({
        onBuildStart: ['yarn build:style-types'],
      }),
      new webpack.WatchIgnorePlugin([
        /scss\.d\.ts$/
      ])
    ],
    module: {
      rules: [
        {
          test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg|otf)(\?.*$|$)/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        },
        {
          test: /\.scss$/,
          loader: [
            'style-loader',
            {
              loader: 'css-loader',
              query: {
                namedExport: true,
                modules: true,
                importLoaders: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                includePaths: ['./app/styles/modules'],
              },
            },
          ],
        },
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
          exclude: /(node_modules)/,
          query: {
            cacheDirectory: true,
            presets: ['react', 'es2015'],
            plugins: ['transform-decorators-legacy', 'transform-object-rest-spread']
          },
        },
      ],
    },
  };

  return baseConfig;
}

module.exports = configHelper();
