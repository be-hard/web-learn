### 一些术语
runtime:仅包含运行时，不包含编译器
common：commonjs规范，用于webpack1
esm:ES模块，用于webpack2
umd:兼容cjs和amd,用于浏览器

### new Vue（）中都做了什么
```
new Vue({
  el:'#app',
  template:"<div></div>",
  render(h){
    return h()
  }
  以上三种方式哪种优先级最高？
})
```
el和template的写法都需要编译成render函数，因为我们运行的是不带编译器的，所以我们得使用render的写法


执行了_init()方法，在_init()方法中，
- merge options合并选项，用户设置的和系统默认的选项（比如directives,components等）合并
- 核心的初始化过程
+ initLifecycle()
初始化$parent,$children,$root...
+ initEvents
事件监听，将父元素写的监听事件初始化到自己
<child @click="/>

+ initRender
slots, $createElement(h方法)

+ callback(vm,beforeCreate) 调用beforeCreate钩子函数
+ initInjections 注入祖辈传递的数据
+ initState()

组件数据初始化，包括 props,data,methods,watch,computed
+ initProvide 向后代传递数据


$mount()方法：执行mountComponent
+ new Watcher(vm,updateComponent)
一个组件对应一个watcher，初始化时执行updateComponent，关联的是组件实例，所以组件实例内部的任何值发生变化，updateComponent都会重新执行
updateComponent中调用_update。
render函数生成虚拟DOM,_update函数将虚拟DOM和旧虚拟DOMpatch之后变成真实DOM
首次创建没有旧虚拟DOM,所以直接追加生成真实DOM


### initData()
初始化data
如果data是一个函数，则执行
#### 问题：为什么组件的data得是一个函数，而根组件却可以是对象呢？
因为组件可以有多个实例，如果data用一个对象，那么会多个组件实例共用同一个对象，这样数据就产生了污染，根组件只有一个。
#### data的key不能和methods和props重名，是先初始化的methods和props，再初始化data

observe
每一个对象对应一个Observe实例，__ob__

### 组件的生命周期
