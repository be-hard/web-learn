import { def } from "./utils";
import defineReactive from "./defineReactive";
import myArrayProto from "./array";
import observe from "./observe";
export default class Observer {
  constructor(val) {
    def(val, "__ob__", this, false);
    if (Array.isArray(val)) {
      this.observeArray(val);
    } else {
      this.walk(val);
    }
    return val;
  }
  walk(val) {
    for (let key in val) {
      defineReactive(val[key]);
    }
  }
  observeArray(arr) {
    Object.setPrototypeOf(arr, myArrayProto);
    arr.forEach((element) => {
      observe(element);
    });
  }
}
