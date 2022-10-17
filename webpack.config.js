require('dotenv').config()
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public' },
      ],
    }),
    new webpack.DefinePlugin({
      'process.env.DEBUG_MODE': JSON.stringify(parseInt(process.env.DEBUG_MODE) === 1),
    }),
  ],
  mode: 'development',
}
