
### webpack-dev-server
WDS不刷新浏览器，不输出文件到磁盘中，而是放在内存中。
WDS需要和HotModuleReplacementPlugin插件一起使用，开启热更新的功能，实现更改后自动重新编译，刷新浏览器的功能。

开发环境才需要用到，生产环境不需要用到.

- package.json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "compiler": "babel src --out-dir lib --watch",
    "dev":"webpack-dev-server --open"
  },

- 
```
webpack4中用contentBase
module.exports = {
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
}
webpack5用
static: {
      directory: path.join(__dirname, 'public'),
    },

module.exports = {
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
}
```
### 使用webpack-dev-middleware
WDM将webpack输出的文件传输给服务器，适用于灵活的定制场景

```
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware')
const app = express()
const config = require('./webpack.config.js')
const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler,{
  pubilcPath:config.output.publicPath
}))
app.listen(3000,function(){

})
```

### 原理分析
Webpack Compiler:将JS编译成bundle
HMR Server :用来将变化的 js 模块通过 websocket 的消息通知给浏览器端。
Bundle Server:提供文件在浏览器的访问
HMR Runtime：是浏览器端，用于接受  HMR Server 传递的模块数据，浏览器端可以看到 .hot-update.json 的文件过来。
bundle.js 构建输出的文件

热更新的过程：
文件系统编译：将源代码经过webpack compiler打包成bundle文件，编译好的文件传输给Bundle server，Bundle server就是个服务器，使得打包好的文件以server的方式能够让浏览器能够访问到。
本地开发的时候有文件变化：
文件系统变化：将源代码经过webpack compiler打包成bundle文件，编译好的文件传输给HMR Server,HMR Server（服务端）发现模块发生了变化，则会通知HMR runtime（客户端）哪些模块发生了变化。