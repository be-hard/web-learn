## Vue Router

路由管理器的插件

### 实现要点

### 点击链接，改变 URL 的时候，不刷新页面

- hash 实现
- history api

### 但页面视图要更新

- hashchange 事件，通知 router-view 更新
- popstate 以及调用 pushstate 或者 replacestate

利用 Vue 数据响应式，制造一个响应式的数据表示当前的 URL，在 router-view 的 render 函数中使用它，这样 router-view 的 watcher 就会被收集，当数据变化时，就会通知该 watcher 去更新

### Vue.use

Vue.use( plugin )
参数：

{Object | Function} plugin

用法：

安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。
如果插件是一个函数，它会被作为 install 方法。
install 方法调用时，会将 Vue 作为参数传入。

该方法需要在调用 new Vue() 之前被调用。

当 install 方法被同一个插件多次调用，插件将只会被安装一次。

```
let myVue;
export default class MyRouter {
  constructor(options) {
    this.$options = options;
    this.routes = options.routes;
    //路由组件匹配表 path=>component
    this.pathRoutes = this.routes.reduce((routesMap, route) => {
      routesMap[route.path] = route.component;
      return routesMap;
    }, {});
    const inital = window.location.hash.slice(1) || "/";
    //将表示当前路由的数据变成响应式，利用Vue数据响应式，制造一个响应式的数据表示当前的URL，在
    //router-view的render函数中使用它，这样router-view的watcher就会被收集，当数据变化时，就
    //会通知该watcher去更新
    myVue.util.defineReactive(this, "current", inital);
    window.addEventListener("hashchange", this.onHashChange.bind(this));
    //直接加载当前路由的
    window.addEventListener("load", this.onHashChange.bind(this));
  }
  onHashChange() {
    const hash = window.location.hash.slice(1);
    this.current = hash;
  }
}

MyRouter.install = function(_Vue) {
  // 保存构造函数 插件是一个独立的包，在打包的时候我们是不希望把Vue给打包进去的，二是保持Vue版本的一致性
  myVue = _Vue;
  // 挂载$router，install方法被调用的时候，VueRouter实例还没创建，使用mixin延迟挂载,在beforeCreate钩子函数中挂载
  myVue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        myVue.prototype.$router = this.$options.router;
      }
    }
  });
  myVue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      return h(
        "a",
        {
          attrs: {
            href: "#" + this.to,
          },
        },
        this.$slots.default
      );
    },
  });
  myVue.component("router-view", {
    render(h) {
      const {current,pathRoutes} = this.$router;
      const route = pathRoutes[current]||null;
      return h(route);
    },
  });
};
```

### MVVM 模式

M:表示 model，代表数据模型，负责业务逻辑和数据封装
V:表示 view，代表 UI 视图层，负责界面的显示
VM:表示 viewmodel，监听数据层的变化和控制视图的更新，处理用户交互，简单的说是通过双向数据绑定将数据层和视图层连接起来。
在 MVVM 模式下，model 层和 view 层没有直接的联系，而是通过 viewmodel 进行交互。我们只需要业务逻辑，不需要手动操作 DOM，不需要关注 model 和 view 同步的问题。

### 动态路由

动态路由的创建，主要是使用 path 属性过程中，使用动态路径参数，以冒号开头，如下

```
const routes = [
  //访问details目录下的所有文件，如果details/a，details/b等，都会映射到Details组件上。
  {
    path:'/detail/:id',
    components:Detail
  }
]
```

获取 id 参数：

当匹配到/detail 下的路由时，参数值会被设置到 this.$route.params 下，所以通过这个属性可以获取动态参数

```
console.log(this.$route.params.id)
```

### 路由钩子函数

vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航

#### 1.全局钩子函数
  全局前置守卫， 
  在v3版本中，next 方法必须调用，否则钩子函数无法resolved，确保 next 函数在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错。
  在v4版本中，通过return返回值决定导航结果

- router.beforeEach((to,from,next)=>{
  //to: 即将要进入的目标；from: 当前导航正要离开的路由
  return false;//表示取消导航
  return 一个路由地址;
  如果什么都没有，undefined 或返回 true，则导航是有效的，并调用下一个导航守卫
  })
- router.beforeResolve((to,from)=>{})
- router.afterEach((to,from)=>{})
  全局后置钩子，后置钩子并没有next函数，也不会改变导航本身。


router.afterEach((to, from,failure) => {
sendToAnalytics(to.fullPath)
})

#### 2.路由独享守卫

- beforeEnter: (to, from,next) => {
  // reject the navigation
  return false
  },
  beforeEnter 守卫 只在进入路由时触发，不会在 params、query 或 hash 改变时触发。例如，从 /users/2 进入到 /users/3 或者从 /users/2#info 进入到 /users/2#projects。它们只有在 从一个不同的 路由导航时，才会被触发。

#### 3.路由组件钩子函数（组件内的守卫）

- beforeRouteEnter((to,from,next)=>{
  // 在渲染该组件的对应路由被验证前调用
  // 不能获取组件实例 `this` ！
  // 因为当守卫执行时，组件实例还没被创建！
  beforeRouteEnter 守卫 不能 访问 this，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。不过，你可以通过传一个回调给 next 来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数：
  next(vm => {
    // 通过 `vm` 访问组件实例
  })

})

- beforeRouteUpdate((to,from,next)=>{
  // 在当前路由改变，但是该组件被复用时调用
  // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
  // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`

})

- beforeRouteLeave((to,from,next)=>{
  // 在导航离开渲染该组件的对应路由时调用
  // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
})
这个 离开守卫 通常用来预防用户在还未保存修改前突然离开。该导航可以通过返回 false 来取消。
### 完整的导航解析过程 
导航被触发。
在失活的组件里调用 beforeRouteLeave 守卫。
调用全局的 beforeEach 守卫。
在重用的组件里调用 beforeRouteUpdate 守卫(2.2+)。
在路由配置里调用 beforeEnter。
解析异步路由组件。
在被激活的组件里调用 beforeRouteEnter。
调用全局的 beforeResolve 守卫(2.5+)。
导航被确认。
调用全局的 afterEach 钩子。
触发 DOM 更新。
调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

beforeRouteEnter 是支持给 next 传递回调的唯一守卫

### $route和 $router的区别是什么？
- router为VueRouter的实例，是一个全局路由对象，包含了路由跳转的方法、钩子函数等。
- route 是路由信息对象||跳转的路由对象，每一个路由都会有一个route对象，是一个局部对象，包含path,params,hash,query,fullPath,matched,name等路由信息参数。

### vue-router响应路由参数的变化
- 用watch检测
```
watch:{
  $route(to,from){
    console.log(to.path)
  }
}
```
- 用路由组件守卫beforeRouteUpdate((to,from)=>{
})
### vue-router传递参数
#### params
- path不能使用，只能使用name
- 参数不会显示在路径上
- 浏览器强制刷新参数会被清除
```
  // 传递参数
  this.$router.push({
    name: Home，
    params: {
    	number: 1 ,
  	}
  })
  // 接收参数
  const p = this.$route.params
```
#### query
- 可以使用name或path
- 参数会显示在路径上
- 浏览器强制刷新不会被清空
### meta元信息
有时，你可能希望将任意信息附加到路由上，如过渡名称、谁可以访问路由等。这些事情可以通过接收属性对象的meta属性来实现，并且它可以在路由地址和导航守卫上都被访问到。定义路由的时候你可以这样配置 meta 字段：
```
const routes = [
  {
    path: '/posts',
    component: PostsLayout,
    children: [
      {
        path: 'new',
        component: PostsNew,
        // 只有经过身份验证的用户才能创建帖子
        meta: { requiresAuth: true }
      },
      {
        path: ':id',
        component: PostsDetail
        // 任何人都可以阅读文章
        meta: { requiresAuth: false }
      }
    ]
  }
]
router.beforeEach((to, from) => {
  // 而不是去检查每条路由记录
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !auth.isLoggedIn()) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    return {
      path: '/login',
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath },
    }
  }
})
```
### vue-router实现路由懒加载（动态加载路由）
把不同路由对应的组件分割成不同的代码块，然后当路由被访问时才加载对应的组件即为路由的懒加载，可以加快项目的加载速度，提高效率
```
const router = new VueRouter({
  routes: [
    {
      path: '/home',
      name: 'Home'，
      component:() = import('../views/home')
		}
  ]
})

```
### 嵌套路由
源码中遍历router-view组件，往上找，直到找到根，每找到一个depth加一，由depth就可以得知router-view的深度，通过depth作为索引，在匹配的结果的数组中可以找到对应的项
route.matched[depth]
Vue.set( target, propertyName/index, value )
参数：

{Object | Array} target
{string | number} propertyName/index
{any} value
返回值：设置的值。

用法：

向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property (比如 this.myObject.newProperty = 'hi')

注意对象不能是 Vue 实例，或者 Vue 实例的根数据对象。
