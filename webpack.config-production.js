/* env: production */

var webpack = require('webpack');

var config = {
  entry: [
    './app/main.js'
  ],
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './public'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        path: './app',
        exclude: /(node_modules|public)/,
        loaders: ['babel-loader']
      },
    ]
  },
  resolve: {
    // make it possible to require('file') instead of require('file.jsx')
    extensions: ['', '.js', '.jsx']
  },

  plugins: [
    // moment.js: Just include 'pl' locale on top of default 'us'
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /pl/)
  ]
};

module.exports = config;
