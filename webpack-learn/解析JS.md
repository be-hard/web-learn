### 解析JS
使用babel-loader
babel-loader需要依赖babel
npm i @babel/core @babel/preset-env babel-loader -D
#### babel的配置文件
.babelrc  babel.config.*
babel配置的两大部分：presets和plugins
#### presets
是一系列bebel plugins的集合
```
module.exports = {
  module:{
    rules:[
      {
        test:'js',
        use:"babel-loader"
      }
    ]
  }

}
.babelrc文件
{
  "presets":[
    "@babel/preset-env"
  ],
  "plugins":[
    "@babel/proposal-class-properties"
  ]
}
```

### 解析JSX
babel解析，添加React的babel preset配置@babel/preset-react
npm i @babel/preset-react