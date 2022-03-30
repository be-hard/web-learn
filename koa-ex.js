const Koa = require("koa");
const app = new Koa();
const playRule = require("./playAction");

let sameAction = 0;
let lastAction;
app.use(async function (ctx, next) {
  const playerAction = ctx.query.playerAction;
  ctx.playerAction = playerAction;
  if (playerAction === lastAction) {
    sameAction++;
  } else {
    sameAction = 0;
    lastAction = playerAction;
  }
  await next();
});
//  耍赖情况处理
app.use(async function (ctx, next) {
  if (sameAction >= 3) {
    ctx.body = "你作弊";
    ctx.status = 500;
  } else {
    await next();
  }
});
app.use(async function (ctx, next) {
  const result = playRule(ctx.playerAction);
  let resultStr;
  if (result === 0) {
    resultStr = "平局";
  } else if (result === -1) {
    resultStr = "你赢了";
  } else if (result === 1) {
    resultStr = "你输了";
  }
  ctx.body = resultStr;
  ctx.status = 200;
});
module.exports = app;
