export default function observe(val) {
  if (typeof val !== "object") {
    return;
  }
  let ob;
  if (val.__ob__) {
    ob = val;
  } else {
    ob = new Observer(val);
  }
  return ob;
}

