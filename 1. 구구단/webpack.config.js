const path = require('path');
const webpack = require('webpack');

module.exports = {
  name: 'gugudan',
  mode: 'development',
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: {
    app: ['./client']
  },
  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {
              // 해당 옵션을 적용할 타겟 브라우저 설정
              browsers: ['> 1% in KR']
            },
            debug: true
          }], 
          '@babel/preset-react'
        ]
      }
    }]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true // loader(module)의 각 옵션에 모두 debug 설정넣는 플러그인
    })
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  }
}