import observe from "./observe";
export default function defineReactive(obj, key, val) {
  observe(val);
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get() {
      console.log(`访问${key}属性,值为${val}`);
      return val;
    },
    set(newVal) {
      if (newVal === val) {
        return;
      }
      console.log(`访问${key}属性,值为由${val}变成${newVal}`);
      observe(newVal);
      val = newVal;
    },
  });
}
