// const game = require('./playAction');
const Koa = require("koa");
const mount = require("koa-mount");
const fs = require("fs");
const app = new Koa();
const url = require("url");
const playAction = require("./playAction");
const querystring = require("querystring");
const koaex = require('./koa-ex')
app.use(
  mount("/favicon.ico", function (ctx, res) {
    ctx.status = 200;
  })
);

app.use(
  mount("/game", koaex)
);
app.use(
  mount("/", function (ctx, res) {
    ctx.status = 200;
    ctx.body = fs.readFileSync("./index.html", "utf-8");
  })
);

app.listen(4000);
