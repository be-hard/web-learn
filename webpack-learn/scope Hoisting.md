### 会导致什么问题？
模块由函数包裹着
大量函数闭包包裹代码，导致体积增大，（模块越多越明显）
运行代码时创建的函数作用域变多，内存开销变大。
### 为什么模块要用函数包裹？
现在浏览器对es module的模块支持不好，所以还需要打包工具做处理，被webpack转换后的模块会包裹上一层函数，import会被转换成__webpack_require，export转换为__webpack_exports
### 分析webpack的模块机制
分析：
打包出来的是一个IIFE（匿名闭包）
modules是一个数组，每一项都是一个模块初始化函数
__webpack_require用来加载模块，返回module.exports
通过WEBPACK_REQUIRE_METHOD(0)启动程序

### scope hoisting 原理
将所有模块的代码按照引用顺序放在一个函数作用域里，适当的重命名一些变量以防止变量名冲突。
可以减少函数声明代码和内存开销。

webpack mode为production默认就开启了，必须是ES6语法，CJS不支持,CJS动态引入没法分析导入顺序.

webpack3中需要自己引入插件webpack.optimize.ModuleconcatenationPlugin()

可以简单的把scope hoisting理解为是把每个模块被webpack处理成的模块初始化函数整理到一个统一的包裹函数里，也就是把多个作用域用一个作用域取代，以减少内存消耗并减少包裹块代码，从每个模块有一个包裹函数变成只有一个包裹函数包裹所有的模块，但是有一个前提就是，当模块的引用次数大于1时，比如被引用了两次或以上，那么这个效果会无效，也就是被引用多次的模块在被webpack处理后，会被独立的包裹函数所包裹
作者回复: 理解的完全正确。Scope housting对模块的引用次数大于1次是不产生效果的，这个其实也很好理解，如果一个模块引用次数大于1次，那么这个模块的代码会被内联多次，从而增加了打包出来的js bundle的体积。