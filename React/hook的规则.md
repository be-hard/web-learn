#### hook 解决了什么问题

（1）复用状态逻辑
一些无关 UI 的逻辑复用，之前解决此类状态逻辑复用问题的方法：从早期的 Mixin，到高阶组件（HOC），再到 Render Props，但这类的方法需要重新组织组件结构，使代码难以理解
自定义 hook
（2）复杂组件变得难以理解
之前使用 class 组件，常常在一个生命周期中包含了很多不相关的逻辑，比如，我们常常在组件的 componentDidMount 中请求数据，但也可能包含其他逻辑如监听事件，而之后又需要在 componentWillUNmount 中清除监听，这样就使得相互关联的代码逻辑被拆分，而不相关的代码却在同一个方法中组合在一起，这样难以维护和理解，容易导致逻辑不一致。如果组件复杂，在一个生命周期的逻辑可能就会变得更加臃肿。
hook 将组件中相互关联的部分拆分成更小的函数，而不是强制按生命周期拆分
颗粒度更小
(3)令人难以理解的 class
需要理解 this

#### 高阶组件复用状态逻辑存在的问题

#### 为什么不能在条件语句、循环语句中写 hook

不要在循环、嵌套、条件语句中使用 Hook——因为这些动态的语句很有可能会导致每次执行组件函数时调用 Hook 的顺序不能完全一致，导致 Hook 链表记录的数据失效。hook 在每次渲染时的查找是根据一个“全局”的下标对链表进行查找的，如果放在条件语句中使用，有一定几率会造成拿到的状态出现错乱。
对于 react，你每生成一个新的状态，React 并不知道这个状态名字叫啥，所以需要通过顺序来索引到对应的状态值。

hook 只在 React 函数组件或者自定义 hook 中调用。
自定义 Hook 本质上只是把调用内置 Hook 的过程封装成一个个可以复用的函数，并不影响 Hook 链表的生成和读取。

### useState

使函数式组件也拥有状态

#### useState 怎么知道是初次渲染还是更新?

initialState 参数只会在组件的初始化渲染中起作用，后续渲染时会被忽略
如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用

#### 为什么 useState 要返回一个数组

因为我们一般在一个函数组件内会多次使用 useState，返回数组方便我们解构命名变量不冲突

函数式组件的每次渲染都是独立的，都是函数的执行过程，具有独立的状态值。注意闭包陷阱

```
function Counter() {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={handleAlertClick}>
        Show alert
      </button>
    </div>
  );
}

```

，按如下步骤操作：1）点击 Click me 按钮，把数字增加到 3；2）点击 Show alert 按钮；3）在 setTimeout 触发之前点击 Click me，把数字增加到 5。

在初次渲染时，我们通过 useState 定义了多个状态；
每调用一次 useState ，都会在组件之外生成一条 Hook 记录，同时包括状态值（用 useState 给定的初始值初始化）和修改状态的 Setter 函数；
多次调用 useState 生成的 Hook 记录形成了一条链表；
触发 onClick 回调函数，调用 setS2 函数修改 s2 的状态，不仅修改了 Hook 记录中的状态值，还即将触发重渲染。
重渲染时，当我们逐个调用 useState 的时候，按顺序查找链表， 便返回了 Hook 链表中存储的状态，以及修改状态的 Setter。

value 和 setValue 配对，后者一定影响前者，前者仅被后者影响，作为一个整体它们完全不受外界的影响。

#### useEffect

useEffect(effectFn, deps)
effectFn 是一个执行某些可能具有副作用的 Effect 函数（例如数据获取、设置/销毁定时器等），它可以返回一个清理函数。deps 是依赖数组，控制是否执行 effectFn 函数，只要所依赖的每一项与上一次渲染相比没有改变，则不执行 effectFn。

- 每个 effEffectectFn 在渲染完后执行，因此不会阻塞渲染，提高了性能
- 在运行每个 Effect 之前会先执行上一次渲染的 effect 清除函数
- 在组件销毁前也会执行清除函数
  deps 数组在判断每一项是否改变时采用的是 Object.is().有个问题就是当 deps 中某一元素为非原始类型时（例如函数、对象等），每次渲染都会发生改变，从而失去了 deps 本身的意义（条件式地触发 Effect）。我们会在接下来讲解如何规避这个困境。

##### useEffect 中的 effectFn 不能是 async 函数

useEffect 约定 Effect 函数要么没有返回值，要么返回一个 Cleanup 函数。而这里 async 函数会隐式地返回一个 Promise，直接违反了这一约定，会造成不可预测的结果。
如果想要执行异步逻辑，可以在 effectFn 中写立即执行函数

#### useEffect 的执行

useState 和 useEffect 在每次调用时都被添加到 Hook 链表中；
useEffect 还会额外地在一个队列中添加一个等待执行的 Effect 函数；
在渲染完成后，依次调用 Effect 队列中的每一个 Effect 函数。

#### 依赖数组写的不对，容易引起无限循环

尤其是在对象、函数引用的时候

#### useLayoutEffect

将 Effect 推迟到渲染完成之后执行是出于性能的考虑，如果你想在渲染之前执行某些逻辑（不惜牺牲渲染性能），那么可使用 useLayoutEffect 钩子，使用方法与 useEffect 完全一致，只是执行的时机不同。

#### useCallback

缓存一个函数，在依赖项改变时更新函数，没有改变时直接返回上一次缓存的函数
useCallback 可以通过 useMemo 实现，useMemo 返回一个函数即可。

> 我们并不需要把 useState 返回的第二个 Setter 函数作为 Effect 的依赖。实际上，React 内部已经对 Setter 函数做了 Memoization 处理，因此每次渲染拿到的 Setter 函数都是完全一样的，deps 加不加都是没有影响的。

#### useMemo

在依赖项改变时重新执行函数计算值，没有改变就直接返回上一次的值。

const a = useMemo(()=>{
return value
},[])
第一个参数是一个函数，这个函数返回值的返回值（也就是上面 computeExpensiveValue 的结果）将返回给 memoizedValue

### useReducer

它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法.
在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。并且，使用 useReducer 还能给那些会触发深更新的组件做性能优化，因为你可以向子组件传递 dispatch 而不是回调函数 。
不要直接改变state 
const reducer = (state,action)=>{
switch(action.type){
case increse:
  return {
    ...state,
    number:state.number+1;
  }
        break;
    default:
    break;

}
}
const [state,dispatch] = useReducer(reducer,initValue)

### Redux

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/15/16f09beb5be3d5b4~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
这时候，不仅要把 handleClick 方法通过很深的层级传给组件 B，当组件 B 调用 handleClick 方法时，修改组件 A 的 state，再反过来传递给组件 C 时，组件 A 到组件 C 之间的所有组件都会触发重新渲染，这带来了巨额的渲染开销，当我们的应用越来越复杂，这种开销显然是承受不起的。所以需要 redux 这样的集中状态管理器

#### store

中心化的状态树，所有 React 应用中的状态修改都是对这棵 JavaScript 对象树的修改，所有状态的获取都是从这棵 JavaScript 对象树获取。

### action

更新 store 状态的唯一方式就是调用 dispatch 函数，传递一个 action 给 dispatch 函数，action 是一个简单的 JS 对象，包含动作的类型和更新状态需要的数据。type 属性是必须的，其他数据是可选的。

### reducer

响应 action 指令。
reducer(state, action) {
// 对 state 进行操作
return newState;
}
reducer 是一个普通的 JavaScript 函数，它接收两个参数：state 和 action，前者为 Store 中存储的那棵 JavaScript 对象状态树，后者即为我们在组件中 dispatch 的那个 Action。
Redux 官方社区对 reducer 的约定是一个纯函数，即我们不能直接修改 state ，而是可以使用 {...} 等对象解构手段返回一个被修改后的新 state。

- dispatch(action) 用来在 React 组件中发出修改 Store 中保存状态的指令。在我们需要新加一个待办事项时，它取代了之前定义在组件中的 onSubmit 方法。
- reducer(state, action) 用来根据这一指令修改 Store 中保存状态对应的部分。在我们需要新加一个待办事项时，它取代了之前定义在组件中的 this.setState 操作。
- connect(mapStateToProps) 用来将更新好的数据传给组件，然后触发 React 重新渲染，显示最新的状态。它架设起 Redux 和 React 之间的数据通信桥梁。
  首先从 react-redux 中导出 connect 函数，它负责给 组件 传入 dispatch 函数，使得我们可以在 组件中 dispatch Action。
  connect()(TodoList)

useReducer 和 useState 的使用目的几乎是一样的：定义状态和修改状态的逻辑。useReducer 使用起来较为繁琐，但如果你的状态管理出现了至少一个以下所列举的问题：

需要维护的状态本身比较复杂，多个状态之间相互依赖
修改状态的过程比较复杂

对于更复杂的场景，只要逻辑的分层合理，使用 HOC 或 render prop 形式进行嵌套，在组件树中可以让开发者快速地通过检查每一层的 props 快速将问题定位缩小至很小的一个范围内，随后基于纯函数的高可测性来进行问题的复现和修复，同时能够固化为单元测试的用例。

而 Hooks 的诞生，无疑在释放一种信号，让开发者通过一个函数组件，使用不同的 hook 声明其前置依赖，将这些信息都压缩在一起，并且（至少当前）在 Devtools 中将不会保留任何痕迹。这样的结果是，也许在开发的过程中是非常痛快而流畅的，但凡遇到线上相对不易复现的 BUG，其跟踪和调试过程将表现出成倍的痛苦。
