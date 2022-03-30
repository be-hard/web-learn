function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get() {
      console.log(`访问${key}属性：${val}`);
      return val;
    },
    set(newVal) {
      if (newVal === val) {
        return;
      }
      console.log(`修改${key}属性：原始值：${val}新值：${newVal}`);
      val = newVal;
    },
  });
}
function typeMap(val) {
  const typeNameMap = {
    "[object Object]": "Object",
    "[object Array]": "Array",
    "[object Boolean]": "Boolean",
    "[object String]": "String",
    "[object Number]": "Number",
  };
  return typeNameMap[Object.prototype.toString(val)];
}
function cirDefineProperty(obj) {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    const typeName = typeof obj[key];
    if (
      typeName === "object" &&
      typeName !== null &&
      obj[key].constructor === Object
    ) {
      console.log(obj[key]);
      defineReactive(newObj, key, cirDefineProperty(obj[key]));
    } else {
      defineReactive(newObj, key, obj[key]);
    }
  });
  return newObj;
}
const reactiveObj = cirDefineProperty({
  a: 1,
  b: [],
  c: {},
  d: {
    f: 1,
    r: 2,
  },
});
reactiveObj.a = 2;
reactiveObj.d.f = 4;
reactiveObj.b = {};
