const { resolve } = require("path");
const { promisify } = require("util");
const figlet = promisify(require("figlet"));
// chalk最新的5.0版本不再支持require方式引入，如果想在node中使用，目前只能使用4.0版本
const chalk = promisify(require("chalk"));
const clear = promisify(require("clear"));
const log = (content) => console.log(chalk.green(content));
const { clone } = require("./clone");
// 默认子进程的输出不会显示到命令行中，用流输出到命令行
const myspawn = function (...args) {
  const { spawn } = require("child_process");
  return new Promise((resolve) => {
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on("close", function () {
      resolve();
    });
  });
};
module.exports = async function (name) {
  clear(true);
  const a = await figlet("welcome hi");
  log(a);
  // clone('github:be-hard/digitScroll',name)
  console.log( `./${name}`)
  myspawn("npm", ["install"], { cwd: `./${name}` });
};
