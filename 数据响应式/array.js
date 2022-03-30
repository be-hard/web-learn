import { def } from "./utils";
export const myArrayProto = {};

const arrayMethods = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
];
const originArray = Array.prototype;
arrayMethods.forEach((methodName) => {
  const origin = originArray[methodName];
  def(
    myArrayProto,
    methodName,
    function () {
      const ob = this.__ob__;
      const result = origin.apply(this, arguments);
      let inserted = [];
      switch (methodName) {
        case "push":
        case "unshift":
          inserted = [...arguments];
          break;
        case "splice":
          inserted = [...arguments].slice(2);
      }
      ob.observeArray(inserted)


      return result;
    },
    false
  );
});
