var webpack = require("webpack");

module.exports = {
  entry: './app/main.js',
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
        loader: 'babel'
      },
    ]
  },
  resolve: {
    // make it possible to require('file') instead of require('file.jsx')
    extensions: ['', '.js', '.jsx']
  },

  plugins: [
    // just include 'pl' locale on top of default 'us'
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /pl/)
  ]
};