### Node.js 非阻塞 I/O

- I/O 即系统的输入和输出
- 阻塞和非阻塞的区别在于系统在接受输入到输出期间能不能接受其他的输入

举个例子，我们去外面吃饭，碰到的一般有两种服务的模式，一种是食堂排队打饭，另一种是餐厅点菜模式，对于服务员或者打饭的阿姨来说，前者是阻塞 I/O，因为在前面一个人点菜到拿到菜的过程中，服务员不能去处理其他人的点菜，而后者是非阻塞 I/O，当前顾客点完菜后，在厨房菜做好的期间，服务员可以处理其他顾客的点菜。

I/O 操作：比如读取文件，网络请求

### 获取程序运行时间

console.time('name')
console.timeEnd('name')

### callback 参数的规范

第一个参数是错误信息，后面的才是执行的结果
第一个参数不为 null,说明有错误

### promisify 方法

```
const promisify = require(fs.readFile)
function promisify(fn){
return function(...args){
return new Promise((resolve,reject)=>{
  fn(...args,(err,data)=>{
    if(err){
      reject(err)
    }else{
      resolve(data)
    }
  })
})
}

}
```


### 为什么 try/catch 捕获不到 setTimeout 抛出的错误

try/catch 和 throw 和调用栈有很大的关系

#### 调用栈

我们的代码会有函数调用函数的情况，每一个函数调用其他函数，进入其他函数的时候，它会在调用栈里面再加一层，然后一层一层累加上去，形成了一个调用的链条关系。在程序里面就形成了一个栈。每往深处调用一次，这个栈就会在上面加多一个元素，

#### try/catch

比如在栈顶抛出错误，错误的流向是，先抛出栈顶第一个元素，如果没有被捕获，继续抛到栈顶的第二个元素，没有继续往上跑，直到被捕获，如果到了栈底仍然没有被捕获，则抛到全局，程序崩溃。
如果 throw 语句不是在 try/catch 包裹的调用里，它就不会被 try/catch 捕获
因为 setTimeout 里的回调函数是在下一个事件循环中调用的，每一个事件循环都是一个全新的调用栈，所以 setTimeout 和外面的 try/catch 不再同一个调用栈里，所以 try/catch 捕获不到 setTimeout 回调函数中抛出的错误。

#### 总结

在一个异步任务里面 throw 一个错误是不能被外面的 try/catch 所捕获到的

### 异步编程

#### callback

问题：异步流程控制问题

- 异步串行，回调地狱的问题
- 异步并发

### 事件循环
