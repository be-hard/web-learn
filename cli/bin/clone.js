
const {promisify} = require('util')
// const ora = require('ora');

module.exports.clone = async function(repo,targetDir){
  const download = promisify(require('download-git-repo'))
  // const process = ora('下载中... ${repo}')
  // process.start()
  await download(repo,targetDir)
  // process.succeed()
}