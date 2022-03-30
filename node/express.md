
### express框架
#### 强壮的路由系统
一个请求包到服务器，服务器根据请求包内容进行分发，分发到不同的逻辑单元处理
#### 简化HTTP操作
调用api重定向、304缓存相关组包
模板引擎：HTML中嵌入数据
提供了一系列脚手架，快速上手express
#### 高性能

能自动根据返回的数据格式组包
### 缺点
对异步支持差，中间件next洋葱模型不完善。当后面的回调异步执行，而前面的回调又依赖该执行结果时，就出现不能返回正确结果的情况
```
const app = express();
app.get("/game", function (req, res) {
  const search = req.query;
  console.log(search);
  const playerAction = search.playerAction;
  console.log(playAction);
  const result = playAction(playerAction);
  let resultStr;
  if (result === 0) {
    resultStr = "平局";
  } else if (result === -1) {
    resultStr = "你赢了";
  } else if (result === 1) {
    resultStr = "你输了";
  }
  res.status(200);
  res.send(resultStr);
  return;
});
app.listen(4000);

```

### koa框架
- 不绑定任何中间件，没有路由
  需要的话自己引入其他中间件
    - 路由：koa-mount
- request和response组合到ctx
- async/await


比express更极致的request/response简化
ctx.status = 200;
ctx.body = '';

### express vs koa
express门槛更低，可以快速上手，koa更强大优雅
express封装了很多东西，模板引擎，路由等，koa可定制型更高
总的来说，express更适合小型的应用，koa适合大型的应用，需要更高的可维护性的场景
他们针对的场景是不同的，没有谁好谁坏


