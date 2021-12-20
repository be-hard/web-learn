### 模块化
一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量
### ES6设计思想
ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。是编译时加载。
ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。

CommonJS 和 AMD 模块，都只能在运行时确定这些东西。是运行时加载。比如，CommonJS 模块就是对象，输入时必须查找对象属性。
CommonJS是整体加载模块（即加载模块的所有方法），生成一个对象（_fs），然后再从这个对象上面读取方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

```
// ES6模块
import { stat, exists, readFile } from 'fs';
```
上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载


### export导出的是引用
export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新，
### 写法
// 报错
export 1;

// 报错
var m = 1;
export m;
上面两种写法都会报错，因为没有*提供对外的接口*。第一种写法直接输出 1，第二种写法通过变量m，还是直接输出 1。1只是一个值，不是接口。正确的写法是下面这样。


// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};
### import


### 写法
import语句会执行所加载的模块
```
import 'lodash';
```
上面代码仅仅执行lodash模块，但是不输入任何值。

import命令接受一对大括号（并不是解构赋值），里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块对外接口的名称相同。

```
import { lastName  } from './profile.js';
```
如果想为输入的变量重新取一个名字，import命令要使用*as*关键字，将输入的变量重命名。
```
import { lastName as surname } from './profile.js';
```
### 导入的变量只读
import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。
```
import {a} from './xxx.js'
a = {}; // Syntax Error : 'a' is read-only;
```
但是，如果a是一个对象，改写a的属性是允许的。
```
import {a} from './xxx.js'

a.foo = 'hello'; // 合法操作
```
上面代码中，a的属性可以成功改写，并且其他模块也可以读到改写后的值。不过，这种写法很难查错，建议凡是输入的变量，都当作完全只读，不要轻易改变它的属性。
### from 后的路径写法
import后面的from指定模块文件的位置，可以是相对路径，也可以是绝对路径。如果不带有路径，只是一个模块名，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。
### import静态执行
#### import命令具有提升效果，会提升到整个模块的头部，首先执行。
```
foo(); 正常运行

import { foo } from 'my_module'; 
```
这种行为的本质是，import命令是编译阶段执行的，在代码运行之前。
### import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。
// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
### 重复加载只会执行一次
```
import { foo } from 'my_module';
import { bar } from 'my_module';

// 等同于
import { foo, bar } from 'my_module';
```
上面代码中，虽然foo和bar在两个语句中加载，但是它们对应的是同一个my_module模块。也就是说，import语句是 Singleton 模式。
### es6和commonjs可以混用，但不建议用
目前阶段，通过 Babel 转码，CommonJS 模块的require命令和 ES6 模块的import命令，可以写在同一个模块里面，但是最好不要这样做。因为import在静态解析阶段执行，所以它是一个模块之中最早执行的。下面的代码可能不会得到预期结果。
```
require('core-js/modules/es6.symbol');
require('core-js/modules/es6.promise');
import React from 'React';
```
### export/import使用位置
export/import命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，
这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。
```
function foo() {
  export default 'bar' // SyntaxError
}
foo()
```
### 模块整体加载
使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。
```
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```
注意，模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的，所以不允许运行时改变。下面的写法都是不允许的。
```
import * as circle from './circle';

// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};
```
### 模块默认导出
export default命令用于指定模块的默认输出。一个模块只能有一个默认输出，因此export default命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应export default命令。
本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。
```
// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';

```
#### 因为export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句。
export default a的含义是将变量a的值赋给变量default。所以，最后一种写法会报错。

### export 与 import 的复合写法
如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。
```
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```
foo和bar实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用foo和bar。

### 跨模块常量
```

// constants/index.js
export {db} from './db';
export {users} from './users';
使用的时候，直接加载index.js就可以了。

// script.js
import {db, users} from './constants/index';
```
### 注意点
#### ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。
模块之中，顶层的this关键字返回undefined，而不是指向window。也就是说，在模块顶层使用this关键字，是无意义的。

### 动态加载模块import（）
import()返回一个 Promise 对象
import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。另外，import()函数与所加载的模块没有静态连接关系，这点也是与import语句不相同。
- import()类似于 Node 的require方法，区别主要是前者是异步加载，后者是同步加载。
#### 用途
- 按需加载
### 优势
- 静态分析
- 可以进一步拓宽 JavaScript 的语法，比如引入宏（macro）和类型检验（type system）
### module的实现
### 浏览器的实现
#### 浏览器异步加载js （async 和 defer）
defer与async的区别是：defer要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。一句话，defer是“渲染完再执行”，async是“下载完就执行”。另外，如果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的。

浏览器对于带有type="module"的<script>，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了<script>标签的defer属性。