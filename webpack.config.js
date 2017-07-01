"use strict";

var path = require("path");
var webpack = require("webpack");
var autoprefixer = require('autoprefixer');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  
  entry: {
    bundle: "./index.js",
    index: "./index.html",
  },
    
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: "[name].js"
  },

  devServer: {
    hot: true,
	inline: true,
	historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  
  externals: {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  
  module: {
    rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
	  {
		test: /\.html$/,
		loader: "file-loader?name=[name].[ext]",
	  },
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000',
      }
    ]
  },
  
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
	new webpack.optimize.UglifyJsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [
          autoprefixer
        ]
      }
    })
  ]
  
};
