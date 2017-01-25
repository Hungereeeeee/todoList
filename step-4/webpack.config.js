var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015'
      },
    ]
  },
    plugins: [
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  }
}