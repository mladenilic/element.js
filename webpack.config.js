const path = require('path');

module.exports = [{
  entry: require.resolve('./src/element.js'),
  context: __dirname,
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'dist/element.min.js',
    library: 'element',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }]
  }
}];
