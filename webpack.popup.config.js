const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SassPlugin = require('sass-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');
const project = require('./project.config')
const WebpackNotifierPlugin = require('webpack-notifier');
const inProject = path.resolve.bind(path, project.basePath)

const inPopupDir = (file) => inProject(project.popupDir, file)

const __DEV__  = project.env === 'development'
const __PROD__ = project.env === 'production'

const popupConfig = {
  mode: 'development',
  entry: {
    popup: [
      inPopupDir(project.popup),
    ]
  },
  node: {
    fs: "empty"
  },
  output: {
    path: inProject(project.outPopupDir),
    filename: '[name].js',
    publicPath: project.publicPath,
  },
  devtool: 'inline-source-map',
  resolve: {
    modules: [
      inProject(project.srcDir),
      'node_modules',
    ],
    extensions: ['*', '.js', '.jsx', '.json'],
  },
  externals: project.externals,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          query: {
            presets: ['es2015', 'react']
          }
        }
      },
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: 'src/static/media/[name].[hash:8].[ext]'
        },
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [{
        loader: "style-loader" // creates style nodes from JS strings
        }, {
        loader: "css-loader" // translates CSS into CommonJS
        }, {
        loader: "sass-loader" // compiles Sass to CSS
        }],
        exclude: [/node_modules/]
      },
      {
        test: /\.svg$/,
        exclude: [ /node_modules/, /IntegrationsImages/],
        loader: '@svgr/webpack',
        options: {
          keepUselessDefs: true,
          replaceAttrValues: ['#0099ff', 'currentColor'],
          icon: true,
        },
      },
      // {
      //   test: /\.svg$/,
      //   loader: 'raw-loader',
      //   exclude: [/node_modules/]
      // }
    ]
  },
  plugins: [
    new WebpackNotifierPlugin(),
    new webpack.DefinePlugin({
      __DEV__,
      __PROD__
    })
  ],

  // devServer: {
  //   host: 'localhost',
  //   port: port,
  //   historyApiFallback: true,
  //   open: true
  // }
};

const extractHtml = new HtmlWebpackPlugin({
  template: 'data-list/index.html',
  //favicon: 'build-extension/favicon.ico'
});

if (!__DEV__){
  config.plugins.push(extractHtml)
}

module.exports = popupConfig;
