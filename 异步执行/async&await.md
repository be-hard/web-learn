async/await是基于Promise 和生成器应用，往低层说就是微任务和协程应用。
async 是一个通过异步执行并隐式返回 Promise 作为结果的函数。
await等待一个promise对象，如果不是promise，会默认创建一个 Promise 对象
​在协程中执行异步任务时，先用promise封装该异步任务，如果异步任务完成，会将其结果放入微任务队列中，然后通过yield 让出主线程执行权，继续执行主线程js，主线程js执行完毕后，会去扫描微任务队列，如果有任务则取出任务进行执行，这时通过调用迭代器的next(result)方法，并传入任务执行结果result，将主线程执行权转交给该协程继续执行，并且将result赋值给yield 表达式左边的变量，从而以同步的方式实现了异步编程。
所以说到底async function 还是通过协程+微任务+浏览器事件循环机制来实现的


### 题目
```
async function foo() {
    console.log('foo')
}
async function bar() {
    console.log('bar start')
    await foo()
    console.log('bar end')
}
console.log('script start')
setTimeout(function () {
    console.log('setTimeout')
}, 0)
bar();
new Promise(function (resolve) {
    console.log('promise executor')
    resolve();
}).then(function () {
    console.log('promise then')
})
console.log('script end')
```

1.首先执行console.log('script start');打印出script start
2.接着遇到定时器，创建一个新任务，放在延迟队列中
3.紧接着执行bar函数，由于bar函数被async标记的，所以进入该函数时，JS引擎会保存当前调用栈等信息，然后执行bar函数中的console.log('bar start');语句，打印bar start。
4.接下来执行到bar函数中的await foo();语句，执行foo函数，也由于foo函数被async标记的，所以进入该函数时，JS引擎会保存当前调用栈等信息，然后执行foo函数中的console.log('foo');语句，打印foo。
5.执行到await foo()时，会默认创建一个Promise对象
6.在创建Promise对象过程中，调用了resolve()函数，且JS引擎将该任务交给微任务队列
7.然后JS引擎会暂停当前协程的执行，将主线程的控制权交给父协程，同时将创建的Promise对象返回给父协程
8.主线程的控制权交给父协程后，父协程就调用该Promise对象的then()方法监控该Promise对象的状态改变
9.接下来继续父协程的流程，执行new Promise()，打印输出promise executor，其中调用了 resolve 函数，JS引擎将该任务添加到微任务队列队尾
10.继续执行父协程上的流程，执行console.log('script end');，打印出来script end
11.随后父协程将执行结束，在结束前，会进入微任务检查点，然后执行微任务队列，微任务队列中有两个微任务等待执行，先执行第一个微任务，触发第一个promise.then()中的回调函数，将主线程的控制权交给bar函数的协程，bar函数的协程激活后，继续执行后续语句，执行 console.log('bar end');，打印输出bar end
12.bar函数协程执行完成后，执行微任务队列中的第二个微任务，触发第二个promise.then()中的回调函数，该回调函数被激活后，执行console.log('promise then');，打印输出promise then
13.执行完之后，将控制权归还给主线程，当前任务执行完毕，取出延迟队列中的任务，执行console.log('setTimeout');，打印输出setTimeout。

故：最终输出顺序是：script start => bar start => foo => promise executor => script end => bar end => promise then => setTimeout