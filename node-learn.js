// const game = require('./playAction');
const fs = require("fs");
const http = require("http");
const url = require("url");
const playAction = require("./playAction");
const querystring = require("querystring");
http
  .createServer(function (req, res) {
    console.log(new URL(req.url, `http://${req.headers.host}`));
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = reqUrl.pathname;
    if (pathname === "/favicon.ico") {
      res.writeHead(200);
      res.end();
      return;
    } else if (pathname === "/game") {
      const search = new URLSearchParams(reqUrl.search);
      console.log(search);
      const playerAction = search.get("playerAction");
      console.log(playAction);
      const result = playAction(playerAction);
      let resultStr;
      if (result === 0) {
        resultStr = "平局";
      } else if (result === -1) {
        res.writeHead(200);
        resultStr = "你赢了";
      } else if (result === 1) {
        res.writeHead(200);
        resultStr = "你输了";
      }
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(resultStr)
    } else if (pathname === "/") {
      fs.createReadStream(__dirname + "/index.html").pipe(res);
    }

    // console.log(req, res);
    // res.writeHead(200);
    // res.end("hello");
  })
  .listen(4000);
