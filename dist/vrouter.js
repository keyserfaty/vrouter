(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.vrouter = factory());
}(this, (function () { 'use strict';

var ifElse = function ifElse(i, e) {
  return function (cond) {
    return cond ? i : e;
  };
};

var redirect = function redirect(routes, root) {
  var route = location.hash.split('/')[1] || '';
  var hasIndexRedirect = routes.hasOwnProperty('indexRedirect');

  var isIndex = function isIndex(i, e) {
    return ifElse(i, e)(route === '');
  };

  root.innerHTML = isIndex(ifElse(routes[routes.indexRedirect], '')(hasIndexRedirect), routes[route])();
};

function router(routes, root) {
  window.addEventListener('load', function () {
    redirect(routes, root);
  }, false);

  window.addEventListener('hashchange', function () {
    redirect(routes, root);
  }, false);
}

return router;

})));
//# sourceMappingURL=vrouter.js.map
