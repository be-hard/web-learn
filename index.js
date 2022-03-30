const Koa = require('koa');
const mount  = require('koa-mount');
const static = require('koa-static');
const fs = require('fs')
const app = new Koa();

app.use(static(__dirname+'/src/'));
// app.use(mount('/',function(ctx){
//   ctx.status = 200;

//   ctx.body = fs.readFileSync('./src/index.html','utf-8');
// }))
app.listen(3000)