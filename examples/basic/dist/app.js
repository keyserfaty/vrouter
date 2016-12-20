(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.vhtml = factory());
}(this, (function () { 'use strict';

var emptyTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

var esc = function esc(str) {
	return String(str).replace(/[&<>"']/g, function (s) {
		return '&' + map[s] + ';';
	});
};
var map = { '&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot', "'": 'apos' };

var sanitized = {};

function h(name, attrs) {
	var stack = [];
	for (var i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}

	if (typeof name === 'function') {
		(attrs || (attrs = {})).children = stack.reverse();
		return name(attrs);
	}

	var s = '<' + name;
	if (attrs) for (var _i in attrs) {
		if (attrs[_i] !== false && attrs[_i] != null) {
			s += ' ' + esc(_i) + '="' + esc(attrs[_i]) + '"';
		}
	}

	if (emptyTags.indexOf(name) === -1) {
		s += '>';

		while (stack.length) {
			var child = stack.pop();
			if (child) {
				if (child.pop) {
					for (var _i2 = child.length; _i2--;) {
						stack.push(child[_i2]);
					}
				} else {
					s += sanitized[child] === true ? child : esc(child);
				}
			}
		}

		s += '</' + name + '>';
	} else {
		s += '>';
	}

	sanitized[s] = true;
	return s;
}

return h;

})));


},{}],2:[function(require,module,exports){
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


},{}],3:[function(require,module,exports){
'use strict';

var _vhtml = require('vhtml');

var _vhtml2 = _interopRequireDefault(_vhtml);

var _vrouter = require('vrouter');

var _vrouter2 = _interopRequireDefault(_vrouter);

var _Layout = require('./views/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _PostContainer = require('./views/Post/PostContainer');

var _PostContainer2 = _interopRequireDefault(_PostContainer);

var _PostsListsContainer = require('./views/PostsList/PostsListsContainer');

var _PostsListsContainer2 = _interopRequireDefault(_PostsListsContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _vrouter2.default)({
  indexRedirect: 'posts',
  'posts': function posts() {
    return (0, _vhtml2.default)(
      _Layout2.default,
      null,
      (0, _vhtml2.default)(_PostsListsContainer2.default, null)
    );
  },
  'post': function post() {
    return (0, _vhtml2.default)(_PostContainer2.default, null);
  }
}, document.querySelector('.root'));

},{"./views/Layout":4,"./views/Post/PostContainer":5,"./views/PostsList/PostsListsContainer":6,"vhtml":1,"vrouter":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vhtml = require("vhtml");

var _vhtml2 = _interopRequireDefault(_vhtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Layout = function Layout(props) {
  return (0, _vhtml2.default)(
    "span",
    null,
    (0, _vhtml2.default)(
      "section",
      { "class": "container" },
      "This is part of the Layout",
      (0, _vhtml2.default)("hr", null),
      props.children[0]
    )
  );
};

exports.default = Layout;

},{"vhtml":1}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vhtml = require("vhtml");

var _vhtml2 = _interopRequireDefault(_vhtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostContainer = function PostContainer(props) {
  return (0, _vhtml2.default)(
    "span",
    null,
    (0, _vhtml2.default)(
      "section",
      { "class": "container" },
      "This is a simple post"
    )
  );
};

exports.default = PostContainer;

},{"vhtml":1}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vhtml = require("vhtml");

var _vhtml2 = _interopRequireDefault(_vhtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostListsContainer = function PostListsContainer(props) {
  return (0, _vhtml2.default)(
    "span",
    { "class": "list" },
    (0, _vhtml2.default)(
      "div",
      { "class": "post" },
      (0, _vhtml2.default)(
        "a",
        { href: "#/post" },
        (0, _vhtml2.default)(
          "h1",
          null,
          "This could be a list of posts"
        )
      )
    )
  );
};

exports.default = PostListsContainer;

},{"vhtml":1}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdmh0bWwvZGlzdC92aHRtbC5qcyIsIm5vZGVfbW9kdWxlcy92cm91dGVyL2Rpc3QvdnJvdXRlci5qcyIsInNyYy9hcHAuanMiLCJzcmMvdmlld3MvTGF5b3V0LmpzIiwic3JjL3ZpZXdzL1Bvc3QvUG9zdENvbnRhaW5lci5qcyIsInNyYy92aWV3cy9Qb3N0c0xpc3QvUG9zdHNMaXN0c0NvbnRhaW5lci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNyQ0E7Ozs7QUFFQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsdUJBQ0U7QUFDRSxpQkFBZSxPQURqQjtBQUVFLFdBQVM7QUFBQSxXQUNQO0FBQUE7QUFBQTtBQUNFO0FBREYsS0FETztBQUFBLEdBRlg7QUFPRSxVQUFRO0FBQUEsV0FBTSxtREFBTjtBQUFBO0FBUFYsQ0FERixFQVVFLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQVZGOzs7Ozs7Ozs7QUNSQTs7Ozs7O0FBRUEsSUFBTSxTQUFTLFNBQVQsTUFBUyxRQUFTO0FBQ3RCLFNBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLFFBQVMsU0FBTSxXQUFmO0FBQUE7QUFFRSxzQ0FGRjtBQUdJLFlBQU0sUUFBTixDQUFlLENBQWY7QUFISjtBQURGLEdBREY7QUFTRCxDQVZEOztrQkFZZSxNOzs7Ozs7Ozs7QUNkZjs7Ozs7O0FBRUEsSUFBTSxnQkFBZ0IsU0FBaEIsYUFBZ0IsUUFBUztBQUM3QixTQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxRQUFTLFNBQU0sV0FBZjtBQUFBO0FBQUE7QUFERixHQURGO0FBT0QsQ0FSRDs7a0JBVWUsYTs7Ozs7Ozs7O0FDWmY7Ozs7OztBQUVBLElBQU0scUJBQXFCLFNBQXJCLGtCQUFxQixRQUFTO0FBQ2xDLFNBQ0U7QUFBQTtBQUFBLE1BQU0sU0FBTSxNQUFaO0FBQ0U7QUFBQTtBQUFBLFFBQUssU0FBTSxNQUFYO0FBQ0k7QUFBQTtBQUFBLFVBQUcsTUFBSyxRQUFSO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBREo7QUFERixHQURGO0FBV0QsQ0FaRDs7a0JBY2Usa0IiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuXHQoZ2xvYmFsLnZodG1sID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlUYWdzID0gWydhcmVhJywgJ2Jhc2UnLCAnYnInLCAnY29sJywgJ2NvbW1hbmQnLCAnZW1iZWQnLCAnaHInLCAnaW1nJywgJ2lucHV0JywgJ2tleWdlbicsICdsaW5rJywgJ21ldGEnLCAncGFyYW0nLCAnc291cmNlJywgJ3RyYWNrJywgJ3diciddO1xuXG52YXIgZXNjID0gZnVuY3Rpb24gZXNjKHN0cikge1xuXHRyZXR1cm4gU3RyaW5nKHN0cikucmVwbGFjZSgvWyY8PlwiJ10vZywgZnVuY3Rpb24gKHMpIHtcblx0XHRyZXR1cm4gJyYnICsgbWFwW3NdICsgJzsnO1xuXHR9KTtcbn07XG52YXIgbWFwID0geyAnJic6ICdhbXAnLCAnPCc6ICdsdCcsICc+JzogJ2d0JywgJ1wiJzogJ3F1b3QnLCBcIidcIjogJ2Fwb3MnIH07XG5cbnZhciBzYW5pdGl6ZWQgPSB7fTtcblxuZnVuY3Rpb24gaChuYW1lLCBhdHRycykge1xuXHR2YXIgc3RhY2sgPSBbXTtcblx0Zm9yICh2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGg7IGktLSA+IDI7KSB7XG5cdFx0c3RhY2sucHVzaChhcmd1bWVudHNbaV0pO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBuYW1lID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0KGF0dHJzIHx8IChhdHRycyA9IHt9KSkuY2hpbGRyZW4gPSBzdGFjay5yZXZlcnNlKCk7XG5cdFx0cmV0dXJuIG5hbWUoYXR0cnMpO1xuXHR9XG5cblx0dmFyIHMgPSAnPCcgKyBuYW1lO1xuXHRpZiAoYXR0cnMpIGZvciAodmFyIF9pIGluIGF0dHJzKSB7XG5cdFx0aWYgKGF0dHJzW19pXSAhPT0gZmFsc2UgJiYgYXR0cnNbX2ldICE9IG51bGwpIHtcblx0XHRcdHMgKz0gJyAnICsgZXNjKF9pKSArICc9XCInICsgZXNjKGF0dHJzW19pXSkgKyAnXCInO1xuXHRcdH1cblx0fVxuXG5cdGlmIChlbXB0eVRhZ3MuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcblx0XHRzICs9ICc+JztcblxuXHRcdHdoaWxlIChzdGFjay5sZW5ndGgpIHtcblx0XHRcdHZhciBjaGlsZCA9IHN0YWNrLnBvcCgpO1xuXHRcdFx0aWYgKGNoaWxkKSB7XG5cdFx0XHRcdGlmIChjaGlsZC5wb3ApIHtcblx0XHRcdFx0XHRmb3IgKHZhciBfaTIgPSBjaGlsZC5sZW5ndGg7IF9pMi0tOykge1xuXHRcdFx0XHRcdFx0c3RhY2sucHVzaChjaGlsZFtfaTJdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cyArPSBzYW5pdGl6ZWRbY2hpbGRdID09PSB0cnVlID8gY2hpbGQgOiBlc2MoY2hpbGQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cyArPSAnPC8nICsgbmFtZSArICc+Jztcblx0fSBlbHNlIHtcblx0XHRzICs9ICc+Jztcblx0fVxuXG5cdHNhbml0aXplZFtzXSA9IHRydWU7XG5cdHJldHVybiBzO1xufVxuXG5yZXR1cm4gaDtcblxufSkpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZodG1sLmpzLm1hcFxuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAoZ2xvYmFsLnZyb3V0ZXIgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbnZhciBpZkVsc2UgPSBmdW5jdGlvbiBpZkVsc2UoaSwgZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKGNvbmQpIHtcbiAgICByZXR1cm4gY29uZCA/IGkgOiBlO1xuICB9O1xufTtcblxudmFyIHJlZGlyZWN0ID0gZnVuY3Rpb24gcmVkaXJlY3Qocm91dGVzLCByb290KSB7XG4gIHZhciByb3V0ZSA9IGxvY2F0aW9uLmhhc2guc3BsaXQoJy8nKVsxXSB8fCAnJztcbiAgdmFyIGhhc0luZGV4UmVkaXJlY3QgPSByb3V0ZXMuaGFzT3duUHJvcGVydHkoJ2luZGV4UmVkaXJlY3QnKTtcblxuICB2YXIgaXNJbmRleCA9IGZ1bmN0aW9uIGlzSW5kZXgoaSwgZSkge1xuICAgIHJldHVybiBpZkVsc2UoaSwgZSkocm91dGUgPT09ICcnKTtcbiAgfTtcblxuICByb290LmlubmVySFRNTCA9IGlzSW5kZXgoaWZFbHNlKHJvdXRlc1tyb3V0ZXMuaW5kZXhSZWRpcmVjdF0sICcnKShoYXNJbmRleFJlZGlyZWN0KSwgcm91dGVzW3JvdXRlXSkoKTtcbn07XG5cbmZ1bmN0aW9uIHJvdXRlcihyb3V0ZXMsIHJvb3QpIHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmVkaXJlY3Qocm91dGVzLCByb290KTtcbiAgfSwgZmFsc2UpO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgIHJlZGlyZWN0KHJvdXRlcywgcm9vdCk7XG4gIH0sIGZhbHNlKTtcbn1cblxucmV0dXJuIHJvdXRlcjtcblxufSkpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZyb3V0ZXIuanMubWFwXG4iLCJpbXBvcnQgaCBmcm9tICd2aHRtbCdcblxuaW1wb3J0IHJvdXRlciBmcm9tICd2cm91dGVyJ1xuXG5pbXBvcnQgTGF5b3V0IGZyb20gJy4vdmlld3MvTGF5b3V0J1xuaW1wb3J0IFBvc3RDb250YWluZXIgZnJvbSAnLi92aWV3cy9Qb3N0L1Bvc3RDb250YWluZXInXG5pbXBvcnQgUG9zdHNMaXN0c0NvbnRhaW5lciBmcm9tICcuL3ZpZXdzL1Bvc3RzTGlzdC9Qb3N0c0xpc3RzQ29udGFpbmVyJ1xuXG5yb3V0ZXIoXG4gIHtcbiAgICBpbmRleFJlZGlyZWN0OiAncG9zdHMnLFxuICAgICdwb3N0cyc6ICgpID0+IChcbiAgICAgIDxMYXlvdXQ+XG4gICAgICAgIDxQb3N0c0xpc3RzQ29udGFpbmVyIC8+XG4gICAgICA8L0xheW91dD5cbiAgICApLFxuICAgICdwb3N0JzogKCkgPT4gPFBvc3RDb250YWluZXIgLz5cbiAgfSxcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvb3QnKVxuKVxuIiwiaW1wb3J0IGggZnJvbSAndmh0bWwnXG5cbmNvbnN0IExheW91dCA9IHByb3BzID0+IHtcbiAgcmV0dXJuIChcbiAgICA8c3Bhbj5cbiAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgIFRoaXMgaXMgcGFydCBvZiB0aGUgTGF5b3V0XG4gICAgICAgIDxoci8+XG4gICAgICAgIHsgcHJvcHMuY2hpbGRyZW5bMF0gfVxuICAgICAgPC9zZWN0aW9uPlxuICAgIDwvc3Bhbj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBMYXlvdXRcbiIsImltcG9ydCBoIGZyb20gJ3ZodG1sJ1xuXG5jb25zdCBQb3N0Q29udGFpbmVyID0gcHJvcHMgPT4ge1xuICByZXR1cm4gKFxuICAgIDxzcGFuPlxuICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgVGhpcyBpcyBhIHNpbXBsZSBwb3N0XG4gICAgICA8L3NlY3Rpb24+XG4gICAgPC9zcGFuPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvc3RDb250YWluZXJcbiIsImltcG9ydCBoIGZyb20gJ3ZodG1sJ1xuXG5jb25zdCBQb3N0TGlzdHNDb250YWluZXIgPSBwcm9wcyA9PiB7XG4gIHJldHVybiAoXG4gICAgPHNwYW4gY2xhc3M9XCJsaXN0XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicG9zdFwiPlxuICAgICAgICAgIDxhIGhyZWY9JyMvcG9zdCc+XG4gICAgICAgICAgICA8aDE+XG4gICAgICAgICAgICAgIFRoaXMgY291bGQgYmUgYSBsaXN0IG9mIHBvc3RzXG4gICAgICAgICAgICA8L2gxPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9zcGFuPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvc3RMaXN0c0NvbnRhaW5lclxuIl19
