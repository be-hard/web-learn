// const Koa = require("koa");
// const mount = require("koa-mount");
// const static = require("koa-static");
// const fs = require("fs");
// const app = new Koa();

// app.use(static(__dirname + "/src/"));
// // app.use(mount('/',function(ctx){
// //   ctx.status = 200;

// //   ctx.body = fs.readFileSync('./src/index.html','utf-8');
// // }))
// app.listen(3000);
// 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

// 你可以假设数组中无重复元素。
function binarySearch(arr, num) {
  let left = 0;
  let right = arr.length - 1;
  let mid;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    if (arr[mid] === num) {
      return mid;
    } else if (arr[mid] < num) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
}
function binarySearch(arr, num) {
  let left = 0;
  let right = arr.length;
  let mid;
  while (left < right) {
    mid = Math.floor((left + right) / 2);
    if (arr[mid] === num) {
      return mid;
    } else if (arr[mid] < num) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return right;
}
function baseBinary(arr, num) {
  let left = 0;
  let right = arr.length;
  let mid;
  while (left < right) {
    mid = Math.floor((left + right) / 2);
    if (arr[mid] === num) {
      return mid;
    } else if (arr[mid] < num) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return -1;
}
function sqrt(num) {
  let left = 0;
  let right = num + 1;
  let mid;
  while (left < right) {
    mid = Math.floor((left + right) / 2);
    const temp = arr[mid] * arr[mid];
    if (temp === num) {
      return mid;
    } else if (temp < num) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left - 1;
}
function sqrt(num) {
  let left = 0;
  let right = num;
  let mid;
  while (left < right) {
    mid = Math.floor((left + right) / 2);
    const temp = arr[mid] * arr[mid];
    if (temp === num) {
      return mid;
    } else if (temp < num) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left - 1;
}
function getLeft(arr, num) {
  let left = 0;
  let right = arr.length - 1;
  let leftBroad = -2;
  while (left <= right) {
    const mid = Math.floor((left + rigth) / 2);
    if (num <= mid) {
      right = mid - 1;
      leftBroad = right;
    } else {
      left = mid + 1;
    }
  }
  return leftBroad;
}
// function findLeft(num) {

//   let left = 0;
//   let right = num;
//   let leftBroad = -2;
//   while (left <= right) {
//     const mid = Math.floor((left + right) / 2);
//     if (isBad(mid)) {
//       right = mid - 1;
//       leftBroad = right;
//     } else {
//       left = mid + 1;
//     }
//   }
//   return leftBroad;
// }
function getRight(arr, num) {
  let left = 0;
  let right = arr.length - 1;
  let rigthBroad = -2;
  while (left <= right) {
    const mid = Math.floor((left + rigth) / 2);
    if (num >= mid) {
      left = mid + 1;
      rigthBroad = left;
    } else {
      right = mid - 1;
    }
  }
  return rigthBroad;
}

// 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
function search(nums, target) {
  const leftBroad = getLeft();
  const rigthBroad = getRight();
  if (leftBroad === -2 || rigthBroad === -2) {
    return [-1, -1];
  } else if (rigthBroad - leftBroad > 1) {
    return [leftBroad + 1, rigthBroad - 1];
  }
  return [-1, -1];

  // if (targetId === -1) {
  //   return [-1, -1];
  // }
  // let left = targetId;
  // let right = targetId;
  // while (nums[left - 1] === target) {
  //   left--;
  // }
  // while (nums[right + 1] === target) {
  //   right++;
  // }
  // return [left, right];
}

var backspaceCompare = function (s, t) {
  function realStr(str) {
    const strL = str.length;
    let slowIndex = 0;
    let fastIndex = 0;
    while (fastIndex < strL) {
      if (str[fastIndex] === "#") {
        slowIndex--;
      } else {
        console.log(
          slowIndex,
          fastIndex,
          strL,
          str,
          str[slowIndex],
          str[fastIndex]
        );

        str[slowIndex++] = str[fastIndex];
        console.log(str, "after");
      }
      fastIndex++;
    }
    return str.slice(0, slowIndex);
  }
  console.log(realStr(s), realStr(t));
  // return realStr(s) === realStr(t)
};
backspaceCompare("ab#c", "ad#c");
let str2 = "12";
str2[1] = "3";
console.log(str2);

class myList {
  constructor(head) {
    this.head = head;
    this.tail = null;
    this.size = this.getListLength();
  }
  get(index) {
    if (index < 0 || index >= this.size) {
      return -1;
    }
    let start = new ListNode(null, this.head);
    for (let i = 0; i <= index; i++) {
      start = start.next;
    }
    return start;
  }
  getListLength() {
    let start = new ListNode(null, this.head);
    let count = 0;
    while (start.next) {
      count++;
      start = start.next;
    }
    return count;
  }
  addAtHead(val) {
    this.head = new ListNode(val, this.head);
    this.size++;
  }
  addAtTail(val) {
    let start = this.head;
    while (start.next) {
      start = start.next;
    }
    const tail = new ListNode(val, null);
    start.next = tail;
    this.tail = tail;
    this.size++;
  }
  addAtIndex(index, val) {
    const len = this.getListLength();
    if (index > len) {
      return;
    } else if (index <= 0) {
      this.addAtHead(val);
      this.size++;
    } else {
      const pre = this.get(index - 1);
      pre.next = new ListNode(val, pre.next);
      this.size++;
    }
  }
  deleteAtIndex(index) {
    if (index < 0 || index > this.size) {
      return;
    }
    const node = this.get(index);
    node.pre.next = node.next;
    node.next = null;
    this.size--;
  }
}

function deepClone() {
  const cache = new WeakMap();
  return function innerClone(obj) {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }
    console.log(cache.has(obj));
    if (cache.has(obj)) {
      return cache.get(obj);
    }

    const target = Array.isArray(obj) ? [] : {};
    cache.set(obj, target);

    for (let key in obj) {
      target[key] =
        typeof obj[key] === "object" && obj[key] !== null
          ? innerClone(obj[key])
          : obj[key];
    }
    return target;
  };
}
const clone = deepClone();
const c = {
  a: 1,
};
c.a = c;
console.log(clone(c))

