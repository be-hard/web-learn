#!/usr/bin/env babel-node
const { program, Command } = require("commander");
program.version(require("../package.json").version);
const init  = require('./init')
const refresh = require('./refresh')
const commander = new Command();
// require('./a')
commander.command("init <name>")
.description('init project')
.action((name) => {
  console.log(name);
  init(name)
});
commander.command("refresh")
.description('refresh project')
.action((name) => {
  console.log(name);
  refresh()

});
commander.parse(process.argv);
