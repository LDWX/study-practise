const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    publicPath: '/',
    clean: true,
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/chunk.[id].[chunkhash:6].js',
    assetModuleFilename: 'media/[hash][ext][query]'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: 'babel-loader'
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]
    }, {
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
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
      test: /\.(eot|pdf)$/,
      use: 'file-loader'
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].[chunkhash:6].css'
    }),
    new webpack.DefinePlugin({
      _DEV_: false
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.join(__dirname, 'src'),
    }
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendor: {
          name: 'vendors',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          priority: -1,
        },
        redux: {
          name: 'redux',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](redux|react-redux)[\\/]/,
          priority: -2,
        }
      }
    }
  }
}
