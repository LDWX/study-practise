const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const resolve = dir => path.join(__dirname, dir);

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: {
      directory: resolve('public'),
    },
    historyApiFallback: {
      index: '/index.html' //与 output 的 publicPath
    },
    hot: true,
    port: 8080,
    /* proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // pathRewrite: { '^/api': '' },
      },
    }, */
  },
  // entry: './src/redux/index.js', // 课堂学习部分
  entry: './src/mobx/index.js', // 课堂学习部分
  // entry: './src/main.js', // 真实的 redux 使用场景
  output: {
    publicPath: '/',
    path: resolve('dist'),
    filename: '[name].[hash:6].js',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        }
      }
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.less$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }
        },
        'less-loader'
      ]
    }, {
      test: /\.(jpe?g|png|gif|webp|svg)$/i,
      type: 'asset'
    }, {
      test: /\.(pdf|woff2?|ttf|eot)$/i,
      type: 'asset/resource'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/template.html'
    }),
    new webpack.DefinePlugin({
      _DEV_: true
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': resolve('src')
    }
  }
}
