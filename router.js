class BaseRouter {
  constructor(routerMap, ele) {
    this.routerMap = routerMap;
    this.ele = ele;
  }
  render(path) {
    const hashInfo = this.routerMap.find((router) => router.path === path);
    this.ele.innerHTML = hashInfo.component;
  }
}

class HashRouter extends BaseRouter {
  constructor(routerMap, ele) {
    super(routerMap, ele);
    window.addEventListener("hashchange", handleRender);
    handleRender();
  }
  handleRender() {
    const curHash = window.location.hash.slice(1);
    this.render(curHash);
  }
  push(path) {
    window.location.hash = "#" + path;
  }
  replace(path) {
    window.location.replace(this.getUrl(path));
  }
  getUrl(path) {
    const { origin, pathname, search } = window.location;
    return `${origin}${pathname}${search}#${path}`;
  }
  go(n) {
    window.history.go(n);
  }
}

class HistoryRouter extends BaseRouter {
  constructor(routerMap, ele) {
    super(routerMap, ele);
    this.renderHandle();
    window.addEventListener("popstate", this.renderHandle);
  }
  renderHandle() {
    const curPath = window.location.pathname || "/";
    this.render(curPath);
  }
  push(path) {
    window.history.pushState(null, null, path);
    this.renderHandle();
  }
  replace(path) {
    window.history.replaceState(null, null, path);
    this.renderHandle();
  }
  go(n) {
    window.history.go(n);
  }
}
