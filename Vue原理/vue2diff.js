const mount = require("koa-mount");

const patch = () => {};
const vue2diff = (oldChildren, newChildren, parent) => {
  let oldStartId = 0;
  let oldEndId = oldChildren.length - 1;
  let newStartId = 0;
  let newEndId = newChildren.length - 1;
  let oldStartNode = oldChildren[oldStartId];
  let oldEndNode = oldChildren[oldEndId];
  let newStartNode = newChildren[newStartId];
  let newEndNode = newChildren[newEndId];
  while (oldStartId <= oldEndId && newStartId <= newEndId) {
    if (!oldStartNode) {
      oldStartNode = oldChildren[++oldStartId];
    }
    if (!oldEndNode) {
      oldEndNode = oldChildren[--oldEndId];
    }

    if (oldStartNode.key === newStartNode.key) {
      patch(oldStartNode, newStartNode);
      oldStartNode = oldChildren[++oldStartId];
      newStartNode = newChildren[++newStartId];
    } else if (oldEndNode.key === oldEndNode.key) {
      patch(oldEndNode, newEndNode);
      oldEndNode = oldChildren[--oldEndId];
      newEndNode = newChildren[--newEndId];
    } else if (oldStartNode.key === newEndNode.key) {
      patch(oldStartNode, newEndNode);
      parent.insertBefore(oldStartNode.el, oldEndNode.el.nextSibling);
      oldStartNode = oldChildren[++oldStartId];
      newEndNode = newChildren[--newEndId];
    } else if (oldEndNode.key === newStartNode.key) {
      patch(oldEndNode, newStartNode);
      parent.insertBefore(oldEndNode.el, newStartNode.el);
      oldEndNode = oldChildren[--oldEndId];
      oldStartNode = oldChildren[++oldStartId];
    } else {
      const oldFindId = oldChildren
        .slice(oldStartId, oldEndId + 1)
        .findIndex((curOldNode) => (curOldNode.key = newStartNode.key));
      if (oldFindId > -1) {
        patch(oldChildren[oldFindId], newStartNode);
        parent.insertBefore(oldChildren[oldFindId].el, newStartNode.el);
        oldChildren[oldFindId] = undefined;
      } else {
        mount(newStartNode, oldStartNode.el, parent);
      }
    }
  }
  if(oldEndId<oldStartId){
    for(let i = newStartId;i <= newEndId;i++){
      mount(newChildren[i], oldStartNode.el, parent);
    }
  }else{
    for(let i = oldStartId;i <= oldEndId;i++){
      if(oldChildren[i]){
        parent.removeChild(oldChildren[i].el)
      }
    }
  }
};
