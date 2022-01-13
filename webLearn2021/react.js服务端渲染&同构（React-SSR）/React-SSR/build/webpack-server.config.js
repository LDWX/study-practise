const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry:{
    index:path.resolve(__dirname,'../server.js')
  },
  mode:'development',
  target:'node',//不将node自带的诸如path、fs这类的包打进去
  devtool: 'cheap-module-eval-source-map',
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'../dist/server')
  },
  externals:[nodeExternals()], //不将node_modules里面的包打进去
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'../src')
    },
    extensions:['.js']
  },
  module:{
    rules:[{
      test:/\.js$/,
      use:'babel-loader',
      exclude:/node_modules/
    }]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from:path.resolve(__dirname,'../public'),
      to:path.resolve(__dirname,'../dist')
    }])
  ]
}