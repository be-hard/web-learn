### tree shaking 摇树优化
必须是ES6模块的语法，CJS的方式不支持。
tree shaking是对代码做静态分析，ES6模块的特点
- 只能在模块顶层的语句使用
- import模块名只能是字符串常量
- import绑定的是immutable的
满足静态分析的特点，
cmj是支持动态导入的，要运行时才能确定是否导入


使用：
webpack默认支持，在.babelrc里设置modules:false即可，production mode的情况下默认开启。

一个模块可能有多个方法，只要其中一个某个方法用到了，则整个文件都会被打到bundle里面去，tree shaking就是只把用到的方法打入bundle，没用到的方法在uglify阶段被擦除到。

DCE
dead code elimination
tree shaking分析不可达、不会执行到代码，标记这些无用代码，在uglify阶段清除掉.引入但代码逻辑上永远不会执行到，也是不会打包进入的。
### 代码不能有副作用，不然也会失效？
 副作用这个概念来源于函数式编程(FP)，纯函数是没有副作用的，也不依赖外界环境或者改变外界环境。纯函数的概念是：接受相同的输入，任何情况下输出都是一样的。

非纯函数存在副作用，副作用就是：相同的输入，输出不一定相同。或者这个函数会影响到外部变量、外部环境。

函数如果调用了全局对象或者改变函数外部变量，则说明这个函数有副作用

