/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
/* eslint-enable import/no-extraneous-dependencies */
const path = require('path');

module.exports = {
  entry: {
    app: './app/index.ts',
  },

  output: {
    path: path.resolve(__dirname, '_build'),
    filename: '[name].[chunkhash].js',
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.ts$/,
        loaders: ['ts-loader']
      }
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['_build']),
    new HtmlWebpackPlugin({
      template: 'app/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new CopyWebpackPlugin([{
      from: 'app/assets',
      to: 'assets',
    }]),
  ],
};
