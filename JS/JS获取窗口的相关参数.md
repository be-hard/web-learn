### 可视区域


### offsetTop、scrollTop
- offsetTop
元素上外边框至offsetparent（有定位的父元素/body）上内边框之间的像素距离、
- scrollTop
元素的 scrollTop 值是这个元素的内容顶部（包含padding）到它的视口可见内容（的顶部）的距离

### scrollLeft 和 scrollTop 
确定元素当前滚动的状态
可读可写


### scrollWidth、scrollHeight
元素内容的实际大小(不包含border)

### clientWidth、clientHeight
元素内容区宽度/高度加上左右内边距宽度（不包含border）

### offsetWidth、offsetHeight
元素内容区宽度/高度加上左右内边距宽度+border宽度+滚动条宽度

### 判断元素是否在可视区域内

#### el.offsetTop - document.documentElement.scrollTop <= viewPortHeight

#### getBoundingClientRect
其提供了元素的大小及其相对于视口的位置。除了 width 和 height 以外的属性是相对于视图窗口的左上角来计算的。
当页面发生滚动的时候，top与left属性值都会随之改变

如果一个元素在视窗之内的话，那么它一定满足下面四个条件：

top 大于等于 0
left 大于等于 0
bottom 小于等于视窗高度
right 小于等于视窗宽度
```
function isInViewPort(element) {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  const {
    top,
    right,
    bottom,
    left,
  } = element.getBoundingClientRect();

  return (
    top >= 0 &&
    left >= 0 &&
    right <= viewWidth &&
    bottom <= viewHeight
  );
}
```
### Intersection Observer
Intersection Observer 即重叠观察者，从这个命名就可以看出它用于判断两个元素是否重叠，因为不用进行事件的监听，性能方面相比getBoundingClientRect 会好很多.
使用步骤主要分为两步：创建观察者和传入被观察者
- 创建观察者
const options = {
  // 表示重叠面积占被观察者的比例，从 0 - 1 取值，
  // 1 表示完全被包含
  threshold: 1.0, 
  root:document.querySelector('#scrollArea') // 必须是目标元素的父级元素
};

const callback = (entries, observer) => { ....}
new IntersectionObserver(callback,options)
<!-- 通过new IntersectionObserver创建了观察者 observer，传入的参数 callback 在重叠比例超过 threshold 时会被执行 -->

关于callback回调函数常用属性如下：

// 上段代码中被省略的 callback
const callback = function(entries, observer) { 
    entries.forEach(entry => {
        entry.time;               // 触发的时间
        entry.rootBounds;         // 根元素的位置矩形，这种情况下为视窗位置
        entry.boundingClientRect; // 被观察者的位置举行
        entry.intersectionRect;   // 重叠区域的位置矩形
        entry.intersectionRatio;  // 重叠区域占被观察者面积的比例（被观察者不是矩形时也按照矩形计算）
        entry.target;             // 被观察者
    });
};
- 传入被观察者
通过 observer.observe(target) 这一行代码即可简单的注册被观察者



