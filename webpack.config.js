const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    app: './client/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  mode: 'development',
  devServer: {
    static: {
      directory: path.resolve(__dirname, './'),
    },
    proxy: { '/': 'http://localhost:3000' },
    compress: true,
    port: 8080,
    // hot: true,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv()
  ]
};
