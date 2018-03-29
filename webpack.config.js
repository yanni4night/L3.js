const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './index.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'l3.js',
        library: 'L3',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd'
    }
};