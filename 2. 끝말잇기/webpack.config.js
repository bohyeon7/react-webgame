const path = require('path');

module.exports = {
  name: 'wordrelay-setting',
  mode: 'development', // 실서비스: production
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx'] // 생략된 파일확장자
  },

  // #1 입력될 파일
  entry: {
    app: ['./client']
  },
  // #2 적용될 모듈
  module: {
    rules: [{
      test: /\.jsx?/, // js, jsx 파일에 적용
      loader: 'babel-loader', // 적용할 rule 이름
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'] // preset 옵션 명시
      }
    }]
  },
  // #3 출력될 파일
  output: {
    path: path.join(__dirname, 'dist'), // 현재폴더(node 가 알아서 찾아줌) 안에 있는 dist
    filename: 'app.js'
  }
}