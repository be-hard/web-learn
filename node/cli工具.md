### cli工具
实现一个
1 package.json中添加
"bin": {
    "lala": "./bin/index.js"
  },
  表示执行lala这个指令，即执行对应的文件
2 npm link建立软连接，即相当于在全局安装了这个包，对应的指令可以生效
3 执行文件中要指定执行环境
#!/usr/bin/env node
console.log('hi')