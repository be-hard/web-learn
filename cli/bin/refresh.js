const handlebars = require("handlebars");
const fs = require("fs");
const chalk = require('chalk')

function compile(meta,filePath,templatePath){
  // if(!fs.existsSync(templatePath)){
  //   return;
  // }
  const content = fs.readFileSync(templatePath).toString()
  console.log(content)
  const result = handlebars.compile(content)(meta)
  fs.writeFileSync(filePath,result)
  console.log(chalk.blue(`${filePath } 创建成功`))
}
module.exports = async function(){
  const dirList = fs.readdirSync("./");
  console.log(dirList)
  const meta = dirList.filter((item) => {
    return !/^\./g.test(item)&&fs.statSync(item).isDirectory;
  }).map(item=>({
    name:item
  }));

  console.log(meta)
  compile(meta,'../result1.js','../result.js')
}