### 1.创建实例的方法改变

import Vue from 'vue';
const app = Vue.createApp({

}).mount('#app')

没有 el,render,$mount 变成 mount
可以设置 template，如果没有设置那么 mount 里面的选择器的内容就是 template

以前的静态方法，变成实例方法
app.component('',{

})
以前 Vue.component('',{

})

### 2. 组合式 API
当组件比较复杂，代码量比较庞大的时候，我们的数据和修改数据的逻辑常常是碎片化的分散在不同的区域，我们必须不断地“跳转”相关代码的选项块。这造成了组件的理解和维护的困难，而组合式 API将同一个逻辑关注点的相关代码收集在一起。
### 代码逻辑复用
对比mixin，数据来源清晰，不会与data,props等发生命名冲突

### setup(){}
// setup是一个新的组件选项，它是组件内使用Composition API的入口
会在 beforecreate 之后，created 之前执行。此时实例还未创建，不能使用this。
摒弃 this。对 TS 的类型推断支持性更好，并且使用者不需要关注 this 的指向


computed API
### ref的响应式变量
返回的是引用的对象，如果要修改它的值，要通过value属性
import { ref } from 'vue'

const counter = ref(0)
console.log(counter.value) // 0

### reactive API
// 响应化：接收一个对象，返回一个响应式的代理对象
const data = reactive({
message:'',
count:1,
price:computed(()=>data.count*2)
})
用reactive得到的响应式数据，使用时得data.xx，比较麻烦，如果直接解构会使得响应式失效，因为Vue3的响应式是基于proxy的，是整个对象代理的，所以就有了toRefs的API，能够将解构出来的每个属性变成ref引用，从而变成响应式
// 返回对象将和渲染函数上下文合并
return {...toRefs(data)}

### 响应式革新，使用proxy
### 更好的类型支持
### 兼容性问题

