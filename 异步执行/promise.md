### Promise的含义
Promise 是异步编程的一种解决方案，解决回调地狱的问题。
回调函数嵌套的问题，一个函数的输入依赖另一个函数的输出。
简单的说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

> 当前事件循环得不到的结果，在未来的事件循环中会给你结果

从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。
then 方法返回的是一个新创建的 Promise。
### Promise对象的特点
- 对象的状态不受外界影响
只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）
- 一旦状态改变，就不会再变
Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。
> promise可以认为是一个状态机

promise的缺点：
- 无法取消Promise，一旦新建它就会立即执行，无法中途取消。
- 其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
内部的错误不会影响外部代码执行,不会退出进程、终止脚本执行。

如何理解？
setTimeout(()=>console.log('g'),800);
setTimeout(()=>{
    throw new Error()
},500);
仍然能够打印g
 new Promise(()=>{
        console.log(a)
    })
console.log(1)
为什么1仍然打出，但控制台仍然有报错





- 第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
### Promise的用法
#### 1. 创造一个Promise实例
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
#### resolve函数
resolve函数将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去。
#### resolve(promise)
resolve 入参传入为 Promise 对象会延迟两个 tick
promise.then(cb)
cb返回一个promise，也会延迟两个tick，
实际上，resolve或者then里面的return，最后调用的都是resolvePromise方法，在这个方法里面，如果result为promise，则会调用result的then方法，onfulfilled回调函数中，在nextmicrotask中调用能够改变原来promise状态的resolve方法。then本身会在下一个微任务中执行，而onfulfilled回调函数又设置了在下一个微任务中改变promise状态，所以是延迟了两个。

```
const resolvePromise = (newPromise, result, resolve, reject) => {
  /**
   * 规范2.3.1，避免循环引用
   * e.g. const p = MyPromise.resolve().then(() => p);
   */
  if (newPromise === result) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  /**
   * 用来判断resolvePormise是否已经执行过了，如果执行过resolve或者reject就不要再往下走resolve或者reject
   * 在一些返回thenable对象中，连续调用多次回调的情况
   * e.g. then(() => {
   *        return {
   *          then(resolve){
   *            resolve(1);
   *            resolve(2);
   *          }
   *        }
   *      })
   * 网上大部分的都没说这个情况到底是什么
   */
  let called = false;
  if (result !== null && (typeof result === 'object' || isFunction(result))) {
    try {
      const { then } = result;
      if (isFunction(then)) {
        // 规范2.3.3.3 如果result是个thenable对象，则调用其then方法，当他是Promise
        then.call(
          result,
          value => {
            if (!called) {
              called = true;
              // 现代浏览器中，如果then返回是thenable对象则会延迟一次执行，而本身的then又会延迟，所以其实是两次
              nextTaskQueue(() => {
                resolvePromise(newPromise, value, resolve, reject); // 这里需要递归取值，直到不是Promise为止
              });
            }
          },
          reason => {
            if (!called) {
              called = true;
              nextTaskQueue(() => {
                reject(reason);
              });
            }
          }
        );
      } else {
        // 规范2.3.3.4 如果 result不是thenable对象，则返回fulfilled
        resolve(result);
      }
    } catch (err) {
      if (!called) {
        called = true;
        reject(err);
      }
    }
  } else {
    resolve(result);
  }
};
```
```
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))
// Error: fail
```
p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。

p1是一个 Promise，3 秒之后变为rejected。p2的状态在 1 秒之后改变，resolve方法返回的是p1。由于p2返回的是另一个 Promise，导致p2自己的状态无效了，由p1的状态决定p2的状态。所以，后面的then语句都变成针对后者（p1）。又过了 2 秒，p1变为rejected，导致触发catch方法指定的回调函数。
### reject函数
reject函数将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作的报出的错误，作为参数传递出去.
#### 实例方法
1. promise.then()
它的作用是为 Promise 实例添加状态改变时的回调函数。Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
then方法返回的是一个新的Promise实例，该promise的状态根据then和catch的回调函数 执行结果决定。
如果回调函数最终结果是throw,该promise为rejected状态
如果回调函数最终结果是return,该promise为resolved状态
如果回调函数最终结果是return了一个promise,该promise状态与return的promise状态一致

#### then函数返回一个promise
前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。
2. promise.catch
.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。

Promise 在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。

### promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。
.catch()可以捕获前面then方法执行中的错误.因此，建议总是使用catch()方法，而不使用then()方法的第二个参数。

#### 在promise运行结束外抛出的错误仍然会抛出到外面，
```
const promise = new Promise(function (resolve, reject) {
  resolve('ok');
  setTimeout(function () { throw new Error('test') }, 0)
});
promise.then(function (value) { console.log(value) });
// ok
// Uncaught Error: test
```

promise 实例上有
[[Prototype]]: Promise
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: 3
属性
### Promise.prototype.finally()
不管promise最后的状态，在执行完then或catch指定的回调函数以后，都会执行finally方法指定的回调函数。
finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果


### 静态方法
#### 1. Promise.all()
将多个 Promise 实例，包装成一个新的 Promise 实例。当全部的promise成功后新的promise才是成功，只要有其中一个promise失败，则新的promise失败。
如果不是 Promise 实例，就会先调用Promise.resolve()方法，将参数转为 Promise 实例，再进一步处理。
数组中的promise实例p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
#### 2. Promise.race()
将多个 Promise 实例，包装成一个新的 Promise 实例。
一个实例率先改变状态，新的promise的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

超时状态改变
在数组加上等待时间的promise

#### 3. Promise.allSettled()
等到一组异步操作都结束了，不管每一个操作是成功还是失败，再进行下一步操作。但是，现有的 Promise 方法很难实现这个要求。
一旦发生状态变更，状态总是fulfilled，不会变成rejected。状态变成fulfilled后，它的回调函数会接收到一个数组作为参数，该数组的每个成员对应前面数组的每个 Promise 对象。


#### 4. Promise.any()
该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。

Promise.any()跟Promise.race()方法很像，只有一点不同，就是Promise.any()不会因为某个 Promise 变成rejected状态而结束，必须等到所有参数 Promise 变成rejected状态才会结束。
#### 5. Promise.resolve()
Promise.resolve()方法的参数分成四种情况。
1）如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
2）参数是一个thenable对象
thenable对象指的是具有then方法的对象，比如下面这个对象。
```
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
```
Promise.resolve()方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then()方法。
3)参数不是具有then()方法的对象，或根本就不是对象
Promise.resolve()方法返回一个新的 Promise 对象，状态为resolved。
4）不带有任何参数
Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。
是在本轮“事件循环”（event loop）的结束时执行
#### 6. Promise.reject() 
Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。

 Promise.resolve 传入 Promise 对象时会直接将其返回出去，Promise.reject 则不然
### 
Promise.resolve()
  .then(() => {
    return new Error('error!!!')
  })
  .then((res) => {
    console.log('then: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
  })
return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获，需要改成其中一种：



#### .then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。
const promise = Promise.resolve()
  .then(() => {
    return promise
  })
promise.catch(console.error)
#### .then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)

运行结果：

1

  then(onFulfilled, onRejected) {
    const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    const realOnRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

等待时间
异步加载图片

new Promise((res, rej) => {
  res(Promise.reject(123));
})
  .then(rs => console.log('then', rs))
  .catch(rs => console.log('catch', rs));


new Promise((res, rej) => {
  rej(Promise.resolve(123));
})
  .then(rs => console.log('then', rs))
  .catch(rs => console.log('catch', rs));



