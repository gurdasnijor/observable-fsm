var path = require('path');

module.exports = {
  entry: __dirname + '/src/index.ts',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: 'index.js',
    library: 'index',
    libraryTarget: 'commonjs'
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        loader: 'ts',
        exclude: /node_modules/
      }
    ],
    resolve: {
      root: path.resolve('./src'),
      extensions: ['', '.js', '.ts']
    }
  },
  externals: {
    ['@reactivex/rxjs']: '@reactivex/rxjs'
  }
};
