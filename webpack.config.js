const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { ProvidePlugin } = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    login: './src/login.js',
  },
  output: {
    filename: 'static/js/[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new ProvidePlugin({
      $: 'jquery',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['login', 'common'],
      template: './src/html/login.html',
      filename: 'login.html',
    }),
    new ProgressBarPlugin({
      format: `${chalk.green('Progressing')}[:bar]${chalk.green(':percent')}(:elapsed seconds)`,
      clear: false,
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash:8].css',
      chunkFilename: 'static/css/[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: ['html-withimg-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: '/node_modlues',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              esModule: false,
              name: 'static/img/[name].[hash:6].[ext]',
              publicPath: 'http://localhost:8081',
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        common: {
          name: 'common',
          minChunks: 2,
        },
      },
    },
  },
};
