const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'assets/[hash][ext]',
  },
  module: {
    rules: [
        {
            test: /\.[tj]s$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg)$/i,
          type: 'asset/resource', 
        },
        {
          test: /\.css$/i,
          type: [MiniCssExtractPlugin.loader, 'css-loader'], 
        },
        {
          test: /\.s[ac]ss$/i,
          type: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], 
        },
    ]
  },
  resolve : {
    extensions : ['.ts', '.js']
  },
  plugins : [
    new HtmlWebpackPlugin({
        title: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CopyPlugin({
      pattern: [
        { from: './public' }
      ]
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
  ]
}; 