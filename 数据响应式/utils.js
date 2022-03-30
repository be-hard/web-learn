export const def = function (obj, key, enumerable) {
  Object.defineProperty(obj, key, {
    enumerable,
    configurable:true,
    writable:true,
  });
};
