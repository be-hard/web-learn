### 虚拟DOM是什么
描述真实DOM的js对象，通常含有标签名，标签上的属性，事件监听和子元素，以及其他属性

### 虚拟DOM的优点
- 可以减少DOM的操作
+ 可以将多次DOM操作合并成一次操作。比如往页面添加100个节点，虚拟DOM可以将这100个DOM操作合并成一次，一次性往页面添加。
+ 借助DOM diff，最小量更新DOM，减少了不必要的DOM操作.比如添加100个节点,只有10个是新增的.
- 跨平台
+ 虚拟DOM不仅可以转换成DOM，也可以转换成小程序，iOS应用或者安卓应用

### 虚拟DOM的缺点
- 需要额外的函数创建虚拟DOM
- 依赖打包工具，需要babel或者loader解析，需要额外的构建过程

规模比较合理的时候，虚拟DOM会快一点。


### 创建虚拟DOM
    (Babel)
JSX ======> React.createElement(type,props,children)
babel是用来解析JS文件的，为什么可以解析JSX？
- react作者和babel作者关系
- react默认JS语法

            (vue-loader)
vue template ===========> Vue中的h函数h(tag,props,children)

vue是单文件.vue的形式，没办法用JS来解析，
### 虚拟DOM
通过JS的Object对象模拟DOM中的节点，
通过状态生成一个虚拟节点树，然后使用虚拟节点树进行渲染。在渲染之前，会使用新生成的虚拟节点树和上一次生成的虚拟节点树进行对比，只渲染不同的部分。

Angular和React的变化侦测有一个共同点，那就是它们都不知道哪些状态（state）变了。因此，就需要进行比较暴力的比对，React是通过虚拟DOM的比对，Angular是使用脏检查的流程。
Vue.js的变化侦测和它们都不一样，它在一定程度上知道具体哪些状态发生了变化，这样就可以通过更细粒度的绑定来更新视图。也就是说，在Vue.js 1.x版本中，粒度为节点维度，当状态发生变化时，它在一定程度上知道哪些节点使用了这个状态。因为粒度太细，每一个绑定都会有一个对应的watcher来观察状态的变化，这样就会有一些内存开销以及一些依赖追踪的开销。当状态被越多的节点使用时，开销就越大。对于一个大型项目来说，这个开销是非常大的。

Vue2开始使用中等粒度的解决方案，引入了虚拟DOM。组件级别的对应一个watcher实例，就是说即便一个组件内有10个节点使用了某个状态，但其实也只有一个watcher在观察这个状态的变化。当这个状态发生变化时，只能通知到组件，然后组件内部通过虚拟DOM去进行比对与渲染

### 虚拟DOM做的事
- 生成与真实DOM对应的虚拟节点
- 将新虚拟DOM和旧虚拟DOM比对,然后更新视图

最核心的算法（即patch），它可以判断出哪些节点发生了变化，从而只对发生了变化的节点进行更新操作
### 模板=>render=>虚拟DOM=>DOM diff后渲染成真实DOM
在Vue.js中，我们使用模板来描述状态与DOM之间的映射关系。Vue.js通过编译将模板转换成渲染函数（render），执行渲染函数就可以得到一个虚拟节点树，使用这个虚拟节点树就可以渲染页面


虚拟DOM是将状态映射成视图的众多解决方案中的一种，它的运作原理是使用状态生成虚拟节点，然后使用虚拟节点渲染视图。之所以需要先使用状态生成虚拟节点，是因为如果直接用状态生成真实DOM，会有一定程度的性能浪费。而先创建虚拟节点再渲染视图，就可以将虚拟节点缓存，然后使用新创建的虚拟节点和上一次渲染时缓存的虚拟节点进行对比，然后根据对比结果只更新需要更新的真实DOM节点，从而避免不必要的DOM操作，节省一定的性能开销。
vnode只是一个名字，本质上其实是JavaScript中一个普通的对象，是从VNode类实例化的对象.该DOM元素上的所有属性在VNode这个对象上都存在对应的属性。

渲染视图的过程是先创建vnode，然后再使用vnode去生成真实的DOM元素，最后插入到页面渲染视图。
### 变化侦测只通知到组件级别
只要组件使用的众多状态中有一个发生了变化，那么整个组件就要重新渲染。

### vnode节点类型
#### 注释节点
isComment:true
#### 文本节点
#### 克隆节点
克隆节点是将现有节点的属性复制到新节点中，让新创建的节点和被克隆节点的属性保持一致，从而实现克隆效果。它的作用是优化静态节点和插槽节点（slotnode）。
### 静态节点
当组件内的某个状态发生变化后，静态节点的内容不会改变。 
静态节点指的是那些一旦渲染到界面上之后，无论日后状态如何变化，都不会发生任何变化的节点。   
静态节点因为它的内容不会改变，所以除了首次渲染需要执行渲染函数获取vnode之外，后续更新不需要执行渲染函数重新生成vnode。因此，这时就会使用创建克隆节点的方法将vnode克隆一份，使用克隆节点进行渲染。这样就不需要重新执行渲染函数生成新的静态节点的vnode，从而提升一定程度的性能。
节点的isCloned属性位true
如果是静态节点，就不需要进行更新操作，可以直接跳过更新节点的过程。
#### 元素节点
有效属性
tag：顾名思义，tag就是一个节点的名称，例如p、ul、li和div等。● data：该属性包含了一些节点上的数据，比如attrs、class和style等。● children：当前节点的子节点列表。● context：它是当前组件的Vue.js实例。
#### 组件节点
● componentOptions：顾名思义，就是组件节点的选项参数，其中包含propsData、tag和children等信息。
● componentInstance：组件的实例，也是Vue.js的实例。事实上，在Vue.js中，每个组件都是一个Vue.js实例。

#### 函数组件
它有两个独有的属性functionalContext和functionalOptions。

### patch
patches = patch(oldVnode,newVnode)
其实际作用是在现有DOM上进行修改来实现更新视图的目的。
之所以要这么做，主要是因为DOM操作的执行速度远不如JavaScript的运算速度快

Tree Diff
新旧两棵树逐层对比，找出哪些节点需要更新
如果节点是组件，则走Component diff
如果节点是标签，则走Element diff
Component diff
如果组件类型不同，直接删除旧的，生成新的
如果类型相同，则只更新属性
然后深入组件做Tree diff
Element diff
如果标签名不同，直接替换
相同则更新属性
子元素继续Tree diff

### 缺点
同层比较有bug

### DOM diff的key有什么作用



