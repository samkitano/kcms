/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 601);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tools; });


var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools');



/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Widget; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tooltip__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Control__ = __webpack_require__(63);





var _tooltip = void 0;

var Widget = __WEBPACK_IMPORTED_MODULE_1__Control__["a" /* Control */].extend({
  init: function init(settings) {
    var self = this;

    self._super(settings);
    settings = self.settings;
    self.canFocus = true;

    if (settings.tooltip && Widget.tooltips !== false) {
      self.on('mouseenter', function (e) {
        var tooltip = self.tooltip().moveTo(-65535);

        if (e.control === self) {
          var rel = tooltip.text(settings.tooltip).show().testMoveRel(self.getEl(), ['bc-tc', 'bc-tl', 'bc-tr']);

          tooltip.classes.toggle('tooltip-n', rel === 'bc-tc');
          tooltip.classes.toggle('tooltip-nw', rel === 'bc-tl');
          tooltip.classes.toggle('tooltip-ne', rel === 'bc-tr');
          tooltip.moveRel(self.getEl(), rel);
        } else {
          tooltip.hide();
        }
      });

      self.on('mouseleave mousedown click', function () {
        self.tooltip().hide();
      });
    }

    self.aria('label', settings.ariaLabel || settings.tooltip);
  },
  tooltip: function tooltip() {
    if (!_tooltip) {
      _tooltip = new __WEBPACK_IMPORTED_MODULE_0__Tooltip__["a" /* Tooltip */]({ type: 'tooltip' });
      _tooltip.renderTo();
    }

    return _tooltip;
  },
  postRender: function postRender() {
    var self = this;
    var settings = self.settings;

    self._super();

    if (!self.parent() && (settings.width || settings.height)) {
      self.initLayoutRect();
      self.repaint();
    }

    if (settings.autofocus) {
      self.focus();
    }
  },
  bindStates: function bindStates() {
    var self = this;

    function disable(state) {
      self.aria('disabled', state);
      self.classes.toggle('disabled', state);
    }

    function active(state) {
      self.aria('pressed', state);
      self.classes.toggle('active', state);
    }

    self.state.on('change:disabled', function (e) {
      disable(e.value);
    });

    self.state.on('change:active', function (e) {
      active(e.value);
    });

    if (self.state.get('disabled')) {
      disable(true);
    }

    if (self.state.get('active')) {
      active(true);
    }

    return self._super();
  },
  remove: function remove() {
    this._super();

    if (_tooltip) {
      _tooltip.remove();
      _tooltip = null;
    }
  }
});



/***/ }),
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return funcs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Env__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DOMUtils__ = __webpack_require__(49);






var count = 0;
var funcs = {
  id: function id() {
    return 'mceu_' + count++;
  },
  create: function create(name, attrs, children) {
    var elm = document.createElement(name);

    __WEBPACK_IMPORTED_MODULE_2__DOMUtils__["a" /* DOMUtils */].DOM.setAttribs(elm, attrs);

    if (typeof children === 'string') {
      elm.innerHTML = children;
    } else {
      __WEBPACK_IMPORTED_MODULE_1__Tools__["a" /* Tools */].each(children, function (child) {
        if (child.nodeType) {
          elm.appendChild(child);
        }
      });
    }

    return elm;
  },
  createFragment: function createFragment(html) {
    return __WEBPACK_IMPORTED_MODULE_2__DOMUtils__["a" /* DOMUtils */].DOM.createFragment(html);
  },
  getWindowSize: function getWindowSize() {
    return __WEBPACK_IMPORTED_MODULE_2__DOMUtils__["a" /* DOMUtils */].DOM.getViewPort();
  },
  getSize: function getSize(elm) {
    var width = void 0,
        height = void 0;

    if (elm.getBoundingClientRect) {
      var rect = elm.getBoundingClientRect();

      width = Math.max(rect.width || rect.right - rect.left, elm.offsetWidth);
      height = Math.max(rect.height || rect.bottom - rect.bottom, elm.offsetHeight);
    } else {
      width = elm.offsetWidth;
      height = elm.offsetHeight;
    }

    return { width: width, height: height };
  },
  getPos: function getPos(elm, root) {
    return __WEBPACK_IMPORTED_MODULE_2__DOMUtils__["a" /* DOMUtils */].DOM.getPos(elm, root || funcs.getContainer());
  },
  getContainer: function getContainer() {
    return __WEBPACK_IMPORTED_MODULE_0__Env__["a" /* Env */].container ? __WEBPACK_IMPORTED_MODULE_0__Env__["a" /* Env */].container : document.body;
  },
  getViewPort: function getViewPort(win) {
    return __WEBPACK_IMPORTED_MODULE_2__DOMUtils__["a" /* DOMUtils */].DOM.getViewPort(win);
  },
  get: function get(id) {
    return document.getElementById(id);
  },
  addClass: function addClass(elm, cls) {
    return __WEBPACK_IMPORTED_MODULE_2__DOMUtils__["a" /* DOMUtils */].DOM.addClass(elm, cls);
  },
  removeClass: function removeClass(elm, cls) {
    return __WEBPACK_IMPORTED_MODULE_2__DOMUtils__["a" /* DOMUtils */].DOM.removeClass(elm, cls);
  },
  hasClass: function hasClass(elm, cls) {
    return __WEBPACK_IMPORTED_MODULE_2__DOMUtils__["a" /* DOMUtils */].DOM.hasClass(elm, cls);
  },
  toggleClass: function toggleClass(elm, cls, state) {
    return __WEBPACK_IMPORTED_MODULE_2__DOMUtils__["a" /* DOMUtils */].DOM.toggleClass(elm, cls, state);
  },
  css: function css(elm, name, value) {
    return __WEBPACK_IMPORTED_MODULE_2__DOMUtils__["a" /* DOMUtils */].DOM.setStyle(elm, name, value);
  },
  getRuntimeStyle: function getRuntimeStyle(elm, name) {
    return __WEBPACK_IMPORTED_MODULE_2__DOMUtils__["a" /* DOMUtils */].DOM.getStyle(elm, name, true);
  },
  on: function on(target, name, callback, scope) {
    return __WEBPACK_IMPORTED_MODULE_2__DOMUtils__["a" /* DOMUtils */].DOM.bind(target, name, callback, scope);
  },
  off: function off(target, name, callback) {
    return __WEBPACK_IMPORTED_MODULE_2__DOMUtils__["a" /* DOMUtils */].DOM.unbind(target, name, callback);
  },
  fire: function fire(target, name, args) {
    return __WEBPACK_IMPORTED_MODULE_2__DOMUtils__["a" /* DOMUtils */].DOM.fire(target, name, args);
  },
  innerHtml: function innerHtml(elm, html) {
    __WEBPACK_IMPORTED_MODULE_2__DOMUtils__["a" /* DOMUtils */].DOM.setHTML(elm, html);
  }
};



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Utils; });


var _arguments = arguments;
var noop = function noop() {};
var noarg = function noarg(f) {
  return function () {
    return f();
  };
};
var compose = function compose(fa, fb) {
  return function () {
    return fa(fb.apply(null, _arguments));
  };
};
var constant = function constant(value) {
  return function () {
    return value;
  };
};
var identity = function identity(x) {
  return x;
};
var tripleEquals = function tripleEquals(a, b) {
  return a === b;
};
var apply = function apply(f) {
  return f();
};
var call = function call(f) {
  f();
};
var not = function not(f) {
  return function () {
    return !f.apply(null, _arguments);
  };
};
var die = function die(msg) {
  return function () {
    throw new Error(msg);
  };
};

var curry = function curry(f) {
  var args = new Array(_arguments.length - 1);

  for (var i = 1; i < _arguments.length; i++) {
    args[i - 1] = _arguments[i];
  }

  return function () {
    var newArgs = new Array(_arguments.length);

    for (var j = 0; j < newArgs.length; j++) {
      newArgs[j] = _arguments[j];
    }

    var all = args.concat(newArgs);

    return f.apply(null, all);
  };
};

var never = constant(false);
var always = constant(true);
var Utils = {
  noop: noop,
  noarg: noarg,
  compose: compose,
  constant: constant,
  identity: identity,
  tripleEquals: tripleEquals,
  curry: curry,
  not: not,
  die: die,
  apply: apply,
  call: call,
  never: never,
  always: always
};



/***/ }),
/* 18 */,
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObjectTools; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Retrieve__ = __webpack_require__(33);




var pure = function pure(x) {
  return [x];
};
var push = Array.prototype.push;
var slice = Array.prototype.slice;
var contains = function contains(xs, x) {
  return rawIndexOf(xs, x) > -1;
};
var exists = function exists(xs, pred) {
  return findIndex(xs, pred).isSome();
};
var difference = function difference(a1, a2) {
  return filter(a1, function (x) {
    return !contains(a2, x);
  });
};
var head = function head(xs) {
  return xs.length === 0 ? __WEBPACK_IMPORTED_MODULE_0__Retrieve__["a" /* Retrieve */].none() : __WEBPACK_IMPORTED_MODULE_0__Retrieve__["a" /* Retrieve */].some(xs[0]);
};
var equal = function equal(a1, a2) {
  return a1.length === a2.length && forall(a1, function (x, i) {
    return x === a2[i];
  });
};
var last = function last(xs) {
  return xs.length === 0 ? __WEBPACK_IMPORTED_MODULE_0__Retrieve__["a" /* Retrieve */].none() : __WEBPACK_IMPORTED_MODULE_0__Retrieve__["a" /* Retrieve */].some(xs[xs.length - 1]);
};

var rawIndexOf = function () {
  var pIndexOf = Array.prototype.indexOf;
  var slowIndex = function slowIndex(xs, x) {
    return slowIndexOf(xs, x);
  };
  var fastIndex = function fastIndex(xs, x) {
    return pIndexOf.call(xs, x);
  };

  return pIndexOf === undefined ? slowIndex : fastIndex;
}();

var indexOf = function indexOf(xs, x) {
  var r = rawIndexOf(xs, x);

  return r === -1 ? __WEBPACK_IMPORTED_MODULE_0__Retrieve__["a" /* Retrieve */].none() : __WEBPACK_IMPORTED_MODULE_0__Retrieve__["a" /* Retrieve */].some(r);
};

var range = function range(num, f) {
  var r = [];

  for (var i = 0; i < num; i++) {
    r.push(f(i));
  }

  return r;
};

var chunk = function chunk(array, size) {
  var r = [];

  for (var i = 0; i < array.length; i += size) {
    var s = array.slice(i, i + size);

    r.push(s);
  }

  return r;
};

var map = function map(xs, f) {
  var len = xs.length;
  var r = new Array(len);

  for (var i = 0; i < len; i++) {
    var x = xs[i];
    r[i] = f(x, i, xs);
  }

  return r;
};

var each = function each(xs, f) {
  for (var i = 0, len = xs.length; i < len; i++) {
    var x = xs[i];

    f(x, i, xs);
  }
};

var eachr = function eachr(xs, f) {
  for (var i = xs.length - 1; i >= 0; i--) {
    var x = xs[i];

    f(x, i, xs);
  }
};

var partition = function partition(xs, pred) {
  var pass = [];
  var fail = [];

  for (var i = 0, len = xs.length; i < len; i++) {
    var x = xs[i];
    var arr = pred(x, i, xs) ? pass : fail;

    arr.push(x);
  }

  return { pass: pass, fail: fail };
};

var filter = function filter(xs, pred) {
  var r = [];

  for (var i = 0, len = xs.length; i < len; i++) {
    var x = xs[i];

    if (pred(x, i, xs)) {
      r.push(x);
    }
  }

  return r;
};

var groupBy = function groupBy(xs, f) {
  if (xs.length === 0) {
    return [];
  } else {
    var wasType = f(xs[0]);
    var r = [];
    var group = [];

    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      var type = f(x);

      if (type !== wasType) {
        r.push(group);
        group = [];
      }

      wasType = type;
      group.push(x);
    }

    if (group.length !== 0) {
      r.push(group);
    }

    return r;
  }
};

var foldr = function foldr(xs, f, acc) {
  eachr(xs, function (x) {
    acc = f(acc, x);
  });

  return acc;
};

var foldl = function foldl(xs, f, acc) {
  each(xs, function (x) {
    acc = f(acc, x);
  });

  return acc;
};

var find = function find(xs, pred) {
  for (var i = 0, len = xs.length; i < len; i++) {
    var x = xs[i];

    if (pred(x, i, xs)) {
      return __WEBPACK_IMPORTED_MODULE_0__Retrieve__["a" /* Retrieve */].some(x);
    }
  }

  return __WEBPACK_IMPORTED_MODULE_0__Retrieve__["a" /* Retrieve */].none();
};

var findIndex = function findIndex(xs, pred) {
  for (var i = 0, len = xs.length; i < len; i++) {
    var x = xs[i];

    if (pred(x, i, xs)) {
      return __WEBPACK_IMPORTED_MODULE_0__Retrieve__["a" /* Retrieve */].some(i);
    }
  }

  return __WEBPACK_IMPORTED_MODULE_0__Retrieve__["a" /* Retrieve */].none();
};

var slowIndexOf = function slowIndexOf(xs, x) {
  for (var i = 0, len = xs.length; i < len; ++i) {
    if (xs[i] === x) {
      return i;
    }
  }

  return -1;
};

var flatten = function flatten(xs) {
  var r = [];

  for (var i = 0, len = xs.length; i < len; ++i) {
    if (!Array.prototype.isPrototypeOf(xs[i])) {
      throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
    }

    push.apply(r, xs[i]);
  }

  return r;
};

var bind = function bind(xs, f) {
  var output = map(xs, f);

  return flatten(output);
};

var forall = function forall(xs, pred) {
  for (var i = 0, len = xs.length; i < len; ++i) {
    var x = xs[i];

    if (pred(x, i, xs) !== true) {
      return false;
    }
  }

  return true;
};

var reverse = function reverse(xs) {
  var r = slice.call(xs, 0);

  r.reverse();

  return r;
};

var mapToObject = function mapToObject(xs, f) {
  var r = {};

  for (var i = 0, len = xs.length; i < len; i++) {
    var x = xs[i];

    r[String(x)] = f(x, i);
  }

  return r;
};

var sort = function sort(xs, comparator) {
  var copy = slice.call(xs, 0);

  copy.sort(comparator);

  return copy;
};

var ObjectTools = {
  map: map,
  each: each,
  eachr: eachr,
  partition: partition,
  filter: filter,
  groupBy: groupBy,
  indexOf: indexOf,
  foldr: foldr,
  foldl: foldl,
  find: find,
  findIndex: findIndex,
  flatten: flatten,
  bind: bind,
  forall: forall,
  exists: exists,
  contains: contains,
  equal: equal,
  reverse: reverse,
  chunk: chunk,
  difference: difference,
  mapToObject: mapToObject,
  pure: pure,
  sort: sort,
  range: range,
  head: head,
  last: last
};



/***/ }),
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return $; });
/* global tinymce */


var $ = tinymce.util.Tools.resolve('tinymce.dom.DomQuery');



/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Retrieve; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(17);




var never = __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utils */].never;
var always = __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utils */].always;
var none = function none() {
  return NONE;
};

var NONE = function () {
  var eq = function eq(o) {
    return o.isNone();
  };
  var call = function call(thunk) {
    return thunk();
  };
  var id = function id(n) {
    return n;
  };
  var noop = function noop() {};
  var me = {
    fold: function fold(n, s) {
      return n();
    },
    is: never,
    isSome: never,
    isNone: always,
    getOr: id,
    getOrThunk: call,
    getOrDie: function getOrDie(msg) {
      throw new Error(msg || 'error: getOrDie called on none.');
    },
    or: id,
    orThunk: call,
    map: none,
    ap: none,
    each: noop,
    bind: none,
    flatten: none,
    exists: never,
    forall: always,
    filter: none,
    equals: eq,
    equals_: eq,
    toArray: function toArray() {
      return [];
    },
    toString: __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utils */].constant('none()')
  };

  if (Object.freeze) {
    Object.freeze(me);
  }

  return me;
}();

var some = function some(a) {
  var cnstt = function cnstt() {
    return a;
  };
  var self = function self() {
    return me;
  };
  var map = function map(f) {
    return some(f(a));
  };
  var bind = function bind(f) {
    return f(a);
  };

  var me = {
    fold: function fold(n, s) {
      return s(a);
    },
    is: function is(v) {
      return a === v;
    },
    isSome: always,
    isNone: never,
    getOr: cnstt,
    getOrThunk: cnstt,
    getOrDie: cnstt,
    or: self,
    orThunk: self,
    map: map,
    ap: function ap(optfab) {
      return optfab.fold(none, function (fab) {
        return some(fab(a));
      });
    },
    each: function each(f) {
      f(a);
    },
    bind: bind,
    flatten: cnstt,
    exists: bind,
    forall: bind,
    filter: function filter(f) {
      return f(a) ? me : NONE;
    },
    equals: function equals(o) {
      return o.is(a);
    },
    equals_: function equals_(o, elementEq) {
      return o.fold(never, function (b) {
        return elementEq(a, b);
      });
    },
    toArray: function toArray() {
      return [a];
    },
    toString: function toString() {
      return 'some(' + a + ')';
    }
  };

  return me;
};

var from = function from(value) {
  return value === null || value === undefined ? NONE : some(value);
};

var Retrieve = { some: some, none: none, from: from };



/***/ }),
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Factory; });


var Factory = tinymce.util.Tools.resolve('tinymce.ui.Factory');



/***/ }),
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Env; });


var Env = tinymce.util.Tools.resolve('tinymce.Env');



/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Delay; });


var Delay = tinymce.util.Tools.resolve('tinymce.util.Delay');



/***/ }),
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DOMUtils; });


var DOMUtils = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');



/***/ }),
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Control; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Box__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__funcs__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Class__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ClassList__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Collection__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ReflowQueue__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__EventDispatcher__ = __webpack_require__(603);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ObservableObject__ = __webpack_require__(604);













var Control = void 0;
var idCounter = 0;
var classPrefix = 'mce-';
var hasWheelEventSupport = false;
var hasMouseWheelEventSupport = 'onmousewheel' in document;

var proto = {
  Statics: { classPrefix: classPrefix },
  isRtl: function isRtl() {
    return Control.rtl;
  },
  classPrefix: classPrefix,
  init: function init(settings) {
    var classes = void 0,
        defaultClasses = void 0;
    var self = this;

    function applyClasses(classes) {
      var i = void 0;

      classes = classes.split(' ');

      for (i = 0; i < classes.length; i++) {
        self.classes.add(classes[i]);
      }
    }

    self.settings = settings = __WEBPACK_IMPORTED_MODULE_3__Tools__["a" /* Tools */].extend({}, self.Defaults, settings);
    self._id = settings.id || 'mceu_' + idCounter++;
    self._aria = { role: settings.role };
    self._elmCache = {};
    self.$ = __WEBPACK_IMPORTED_MODULE_0____["a" /* $ */];

    self.state = new __WEBPACK_IMPORTED_MODULE_9__ObservableObject__["a" /* ObservableObject */]({
      visible: true,
      active: false,
      disabled: false,
      value: ''
    });

    self.data = new __WEBPACK_IMPORTED_MODULE_9__ObservableObject__["a" /* ObservableObject */](settings.data);

    self.classes = new __WEBPACK_IMPORTED_MODULE_5__ClassList__["a" /* ClassList */](function () {
      if (self.state.get('rendered')) {
        self.getEl().className = this.toString();
      }
    });

    self.classes.prefix = self.classPrefix;
    classes = settings.classes;

    if (classes) {
      if (self.Defaults) {
        defaultClasses = self.Defaults.classes;

        if (defaultClasses && classes !== defaultClasses) {
          applyClasses(defaultClasses);
        }
      }

      applyClasses(classes);
    }

    __WEBPACK_IMPORTED_MODULE_3__Tools__["a" /* Tools */].each('title text name visible disabled active value'.split(' '), function (name) {
      if (name in settings) {
        self[name](settings[name]);
      }
    });

    self.on('click', function () {
      if (self.disabled()) {
        return false;
      }
    });

    self.settings = settings;
    self.borderBox = __WEBPACK_IMPORTED_MODULE_1__Box__["a" /* Box */].parseBox(settings.border);
    self.paddingBox = __WEBPACK_IMPORTED_MODULE_1__Box__["a" /* Box */].parseBox(settings.padding);
    self.marginBox = __WEBPACK_IMPORTED_MODULE_1__Box__["a" /* Box */].parseBox(settings.margin);

    if (settings.hidden) {
      self.hide();
    }
  },
  Properties: 'parent,name',
  getContainerElm: function getContainerElm() {
    return __WEBPACK_IMPORTED_MODULE_2__funcs__["a" /* funcs */].getContainer();
  },
  getParentCtrl: function getParentCtrl(elm) {
    var ctrl = void 0;
    var lookup = this.getRoot().controlIdLookup;

    while (elm && lookup) {
      ctrl = lookup[elm.id];

      if (ctrl) {
        break;
      }

      elm = elm.parentNode;
    }

    return ctrl;
  },
  initLayoutRect: function initLayoutRect() {
    var width = void 0,
        height = void 0,
        minWidth = void 0,
        minHeight = void 0,
        autoResize = void 0;
    var startMinWidth = void 0,
        startMinHeight = void 0,
        initialSize = void 0;
    var borderBox = void 0,
        layoutRect = void 0;
    var self = this;
    var settings = self.settings;
    var elm = self.getEl();

    borderBox = self.borderBox = self.borderBox || __WEBPACK_IMPORTED_MODULE_1__Box__["a" /* Box */].measureBox(elm, 'border');
    self.paddingBox = self.paddingBox || __WEBPACK_IMPORTED_MODULE_1__Box__["a" /* Box */].measureBox(elm, 'padding');
    self.marginBox = self.marginBox || __WEBPACK_IMPORTED_MODULE_1__Box__["a" /* Box */].measureBox(elm, 'margin');
    initialSize = __WEBPACK_IMPORTED_MODULE_2__funcs__["a" /* funcs */].getSize(elm);
    startMinWidth = settings.minWidth;
    startMinHeight = settings.minHeight;
    minWidth = startMinWidth || initialSize.width;
    minHeight = startMinHeight || initialSize.height;
    width = settings.width;
    height = settings.height;
    autoResize = settings.autoResize;
    autoResize = typeof autoResize !== 'undefined' ? autoResize : !width && !height;
    width = width || minWidth;
    height = height || minHeight;

    var deltaW = borderBox.left + borderBox.right;
    var deltaH = borderBox.top + borderBox.bottom;
    var maxW = settings.maxWidth || 65535;
    var maxH = settings.maxHeight || 65535;

    self._layoutRect = layoutRect = {
      x: settings.x || 0,
      y: settings.y || 0,
      w: width,
      h: height,
      deltaW: deltaW,
      deltaH: deltaH,
      contentW: width - deltaW,
      contentH: height - deltaH,
      innerW: width - deltaW,
      innerH: height - deltaH,
      startMinWidth: startMinWidth || 0,
      startMinHeight: startMinHeight || 0,
      minW: Math.min(minWidth, maxW),
      minH: Math.min(minHeight, maxH),
      maxW: maxW,
      maxH: maxH,
      autoResize: autoResize,
      scrollW: 0
    };

    self._lastLayoutRect = {};

    return layoutRect;
  },
  layoutRect: function layoutRect(newRect) {
    var lastLayoutRect = void 0,
        size = void 0,
        deltaWidth = void 0,
        deltaHeight = void 0,
        repaintControls = void 0;
    var self = this;
    var curRect = self._layoutRect;

    if (!curRect) {
      curRect = self.initLayoutRect();
    }

    if (newRect) {
      deltaWidth = curRect.deltaW;
      deltaHeight = curRect.deltaH;

      if (newRect.x !== undefined) {
        curRect.x = newRect.x;
      }

      if (newRect.y !== undefined) {
        curRect.y = newRect.y;
      }

      if (newRect.minW !== undefined) {
        curRect.minW = newRect.minW;
      }

      if (newRect.minH !== undefined) {
        curRect.minH = newRect.minH;
      }

      size = newRect.w;

      if (size !== undefined) {
        size = size < curRect.minW ? curRect.minW : size;
        size = size > curRect.maxW ? curRect.maxW : size;
        curRect.w = size;
        curRect.innerW = size - deltaWidth;
      }

      size = newRect.h;

      if (size !== undefined) {
        size = size < curRect.minH ? curRect.minH : size;
        size = size > curRect.maxH ? curRect.maxH : size;
        curRect.h = size;
        curRect.innerH = size - deltaHeight;
      }

      size = newRect.innerW;

      if (size !== undefined) {
        size = size < curRect.minW - deltaWidth ? curRect.minW - deltaWidth : size;
        size = size > curRect.maxW - deltaWidth ? curRect.maxW - deltaWidth : size;
        curRect.innerW = size;
        curRect.w = size + deltaWidth;
      }

      size = newRect.innerH;

      if (size !== undefined) {
        size = size < curRect.minH - deltaHeight ? curRect.minH - deltaHeight : size;
        size = size > curRect.maxH - deltaHeight ? curRect.maxH - deltaHeight : size;
        curRect.innerH = size;
        curRect.h = size + deltaHeight;
      }

      if (newRect.contentW !== undefined) {
        curRect.contentW = newRect.contentW;
      }

      if (newRect.contentH !== undefined) {
        curRect.contentH = newRect.contentH;
      }

      lastLayoutRect = self._lastLayoutRect;

      if (lastLayoutRect.x !== curRect.x || lastLayoutRect.y !== curRect.y) {
        repaintControls = Control.repaintControls;

        if (repaintControls) {
          if (repaintControls.map && !repaintControls.map[self._id]) {
            repaintControls.push(self);
            repaintControls.map[self._id] = true;
          }
        }

        lastLayoutRect.x = curRect.x;
        lastLayoutRect.y = curRect.y;
        lastLayoutRect.w = curRect.w;
        lastLayoutRect.h = curRect.h;
      } else if (lastLayoutRect.w !== curRect.w) {
        repaintControls = Control.repaintControls;

        if (repaintControls) {
          if (repaintControls.map && !repaintControls.map[self._id]) {
            repaintControls.push(self);
            repaintControls.map[self._id] = true;
          }
        }

        lastLayoutRect.x = curRect.x;
        lastLayoutRect.y = curRect.y;
        lastLayoutRect.w = curRect.w;
        lastLayoutRect.h = curRect.h;
      } else if (lastLayoutRect.h !== curRect.h) {
        repaintControls = Control.repaintControls;

        if (repaintControls) {
          if (repaintControls.map && !repaintControls.map[self._id]) {
            repaintControls.push(self);
            repaintControls.map[self._id] = true;
          }
        }

        lastLayoutRect.x = curRect.x;
        lastLayoutRect.y = curRect.y;
        lastLayoutRect.w = curRect.w;
        lastLayoutRect.h = curRect.h;
      }

      return self;
    }

    return curRect;
  },
  repaint: function repaint() {
    var style = void 0,
        bodyStyle = void 0,
        bodyElm = void 0,
        rect = void 0,
        borderBox = void 0;
    var borderW = void 0,
        borderH = void 0,
        lastRepaintRect = void 0,
        round = void 0,
        value = void 0;
    var self = this;

    round = !document.createRange ? Math.round : function (value) {
      return value;
    };

    style = self.getEl().style;
    rect = self._layoutRect;
    lastRepaintRect = self._lastRepaintRect || {};
    borderBox = self.borderBox;
    borderW = borderBox.left + borderBox.right;
    borderH = borderBox.top + borderBox.bottom;

    if (rect.x !== lastRepaintRect.x) {
      style.left = round(rect.x) + 'px';
      lastRepaintRect.x = rect.x;
    }

    if (rect.y !== lastRepaintRect.y) {
      style.top = round(rect.y) + 'px';
      lastRepaintRect.y = rect.y;
    }

    if (rect.w !== lastRepaintRect.w) {
      value = round(rect.w - borderW);
      style.width = (value >= 0 ? value : 0) + 'px';
      lastRepaintRect.w = rect.w;
    }

    if (rect.h !== lastRepaintRect.h) {
      value = round(rect.h - borderH);
      style.height = (value >= 0 ? value : 0) + 'px';
      lastRepaintRect.h = rect.h;
    }

    if (self._hasBody && rect.innerW !== lastRepaintRect.innerW) {
      value = round(rect.innerW);
      bodyElm = self.getEl('body');

      if (bodyElm) {
        bodyStyle = bodyElm.style;
        bodyStyle.width = (value >= 0 ? value : 0) + 'px';
      }

      lastRepaintRect.innerW = rect.innerW;
    }

    if (self._hasBody && rect.innerH !== lastRepaintRect.innerH) {
      value = round(rect.innerH);
      bodyElm = bodyElm || self.getEl('body');

      if (bodyElm) {
        bodyStyle = bodyStyle || bodyElm.style;
        bodyStyle.height = (value >= 0 ? value : 0) + 'px';
      }

      lastRepaintRect.innerH = rect.innerH;
    }

    self._lastRepaintRect = lastRepaintRect;
    self.fire('repaint', {}, false);
  },
  updateLayoutRect: function updateLayoutRect() {
    var self = this;

    self.parent()._lastRect = null;
    __WEBPACK_IMPORTED_MODULE_2__funcs__["a" /* funcs */].css(self.getEl(), {
      width: '',
      height: ''
    });

    self._layoutRect = self._lastRepaintRect = self._lastLayoutRect = null;
    self.initLayoutRect();
  },
  on: function on(name, callback) {
    var self = this;

    function resolveCallbackName(name) {
      var callback = void 0,
          scope = void 0;

      if (typeof name !== 'string') {
        return name;
      }

      return function (e) {
        if (!callback) {
          self.parentsAndSelf().each(function (ctrl) {
            var callbacks = ctrl.settings.callbacks;

            if (callbacks && (callback = callbacks[name])) {
              scope = ctrl;

              return false;
            }
          });
        }

        if (!callback) {
          e.action = name;

          this.fire('execute', e);

          return;
        }

        return callback.call(scope, e);
      };
    }

    getEventDispatcher(self).on(name, resolveCallbackName(callback));

    return self;
  },
  off: function off(name, callback) {
    getEventDispatcher(this).off(name, callback);

    return this;
  },
  fire: function fire(name, args, bubble) {
    var self = this;

    args = args || {};

    if (!args.control) {
      args.control = self;
    }

    args = getEventDispatcher(self).fire(name, args);

    if (bubble !== false && self.parent) {
      var prnt = self.parent();

      while (prnt && !args.isPropagationStopped()) {
        prnt.fire(name, args, false);
        prnt = prnt.parent();
      }
    }

    return args;
  },
  hasEventListeners: function hasEventListeners(name) {
    return getEventDispatcher(this).has(name);
  },
  parents: function parents(selector) {
    var ctrl = void 0;
    var self = this;
    var parents = new __WEBPACK_IMPORTED_MODULE_6__Collection__["a" /* Collection */]();

    for (ctrl = self.parent(); ctrl; ctrl = ctrl.parent()) {
      parents.add(ctrl);
    }

    if (selector) {
      parents = parents.filter(selector);
    }

    return parents;
  },
  parentsAndSelf: function parentsAndSelf(selector) {
    return new __WEBPACK_IMPORTED_MODULE_6__Collection__["a" /* Collection */](this).add(this.parents(selector));
  },
  next: function next() {
    var parentControls = this.parent().items();

    return parentControls[parentControls.indexOf(this) + 1];
  },
  prev: function prev() {
    var parentControls = this.parent().items();

    return parentControls[parentControls.indexOf(this) - 1];
  },
  innerHtml: function innerHtml(html) {
    this.$el.html(html);
    return this;
  },
  getEl: function getEl(suffix) {
    var id = '' + (suffix ? this._id + '-' + suffix : this._id);

    if (!this._elmCache[id]) {
      this._elmCache[id] = Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])('#' + id)[0];
    }

    return this._elmCache[id];
  },
  show: function show() {
    return this.visible(true);
  },
  hide: function hide() {
    return this.visible(false);
  },
  focus: function focus() {
    try {
      this.getEl().focus();
    } catch (ex) {}

    return this;
  },
  blur: function blur() {
    this.getEl().blur();

    return this;
  },
  aria: function aria(name, value) {
    var self = this;
    var elm = self.getEl(self.ariaTarget);

    if (typeof value === 'undefined') {
      return self._aria[name];
    }

    self._aria[name] = value;

    if (self.state.get('rendered')) {
      elm.setAttribute(name === 'role' ? name : 'aria-' + name, value);
    }

    return self;
  },
  encode: function encode(text, translate) {
    if (translate !== false) {
      text = this.translate(text);
    }

    return (text || '').replace(/[&<>"]/g, function (match) {
      return '&#' + match.charCodeAt(0) + ';';
    });
  },
  translate: function translate(text) {
    return Control.translate ? Control.translate(text) : text;
  },
  before: function before(items) {
    var self = this;
    var parent = self.parent();

    if (parent) {
      parent.insert(items, parent.items().indexOf(self), true);
    }

    return self;
  },
  after: function after(items) {
    var self = this;
    var parent = self.parent();

    if (parent) {
      parent.insert(items, parent.items().indexOf(self));
    }

    return self;
  },
  remove: function remove() {
    var newItems = void 0,
        i = void 0;
    var self = this;
    var elm = self.getEl();
    var parent = self.parent();

    if (self.items) {
      var controls = self.items().toArray();

      i = controls.length;

      while (i--) {
        controls[i].remove();
      }
    }

    if (parent && parent.items) {
      newItems = [];

      parent.items().each(function (item) {
        if (item !== self) {
          newItems.push(item);
        }
      });

      parent.items().set(newItems);
      parent._lastRect = null;
    }

    if (self._eventsRoot && self._eventsRoot === self) {
      Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(elm).off();
    }

    var lookup = self.getRoot().controlIdLookup;

    if (lookup) {
      delete lookup[self._id];
    }

    if (elm && elm.parentNode) {
      elm.parentNode.removeChild(elm);
    }

    self.state.set('rendered', false);
    self.state.destroy();
    self.fire('remove');

    return self;
  },
  renderBefore: function renderBefore(elm) {
    Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(elm).before(this.renderHtml());

    this.postRender();

    return this;
  },
  renderTo: function renderTo(elm) {
    Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(elm || this.getContainerElm()).append(this.renderHtml());

    this.postRender();

    return this;
  },
  preRender: function preRender() {},
  render: function render() {},
  renderHtml: function renderHtml() {
    return '<div id="' + this._id + '" class="' + this.classes + '"></div>';
  },
  postRender: function postRender() {
    var elm = void 0,
        box = void 0,
        parent = void 0,
        name = void 0,
        parentEventsRoot = void 0;
    var self = this;
    var settings = self.settings;

    self.$el = Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(self.getEl());
    self.state.set('rendered', true);

    for (name in settings) {
      if (name.indexOf('on') === 0) {
        self.on(name.substr(2), settings[name]);
      }
    }

    if (self._eventsRoot) {
      for (parent = self.parent(); !parentEventsRoot && parent; parent = parent.parent()) {
        parentEventsRoot = parent._eventsRoot;
      }

      if (parentEventsRoot) {
        for (name in parentEventsRoot._nativeEvents) {
          self._nativeEvents[name] = true;
        }
      }
    }

    bindPendingEvents(self);

    if (settings.style) {
      elm = self.getEl();

      if (elm) {
        elm.setAttribute('style', settings.style);
        elm.style.cssText = settings.style;
      }
    }

    if (self.settings.border) {
      box = self.borderBox;

      self.$el.css({
        'border-top-width': box.top,
        'border-right-width': box.right,
        'border-bottom-width': box.bottom,
        'border-left-width': box.left
      });
    }

    var root = self.getRoot();

    if (!root.controlIdLookup) {
      root.controlIdLookup = {};
    }

    root.controlIdLookup[self._id] = self;

    for (var key in self._aria) {
      self.aria(key, self._aria[key]);
    }

    if (self.state.get('visible') === false) {
      self.getEl().style.display = 'none';
    }

    self.bindStates();

    self.state.on('change:visible', function (e) {
      var parentCtrl = void 0;
      var state = e.value;

      if (self.state.get('rendered')) {
        self.getEl().style.display = state === false ? 'none' : '';
        self.getEl().getBoundingClientRect();
      }

      parentCtrl = self.parent();

      if (parentCtrl) {
        parentCtrl._lastRect = null;
      }

      self.fire(state ? 'show' : 'hide');

      __WEBPACK_IMPORTED_MODULE_7__ReflowQueue__["a" /* ReflowQueue */].add(self);
    });

    self.fire('postrender', {}, false);
  },
  bindStates: function bindStates() {},
  scrollIntoView: function scrollIntoView(align) {
    function getOffset(elm, rootElm) {
      var x = void 0,
          y = void 0;
      var parent = elm;

      x = y = 0;

      while (parent && parent !== rootElm && parent.nodeType) {
        x += parent.offsetLeft || 0;
        y += parent.offsetTop || 0;

        parent = parent.offsetParent;
      }

      return { x: x, y: y };
    }

    var x = void 0,
        y = void 0,
        width = void 0,
        height = void 0,
        parentWidth = void 0,
        parentHeight = void 0;
    var elm = this.getEl();
    var parentElm = elm.parentNode;
    var pos = getOffset(elm, parentElm);

    x = pos.x;
    y = pos.y;
    width = elm.offsetWidth;
    height = elm.offsetHeight;
    parentWidth = parentElm.clientWidth;
    parentHeight = parentElm.clientHeight;

    if (align === 'end') {
      x -= parentWidth - width;
      y -= parentHeight - height;
    } else if (align === 'center') {
      x -= parentWidth / 2 - width / 2;
      y -= parentHeight / 2 - height / 2;
    }

    parentElm.scrollLeft = x;
    parentElm.scrollTop = y;

    return this;
  },
  getRoot: function getRoot() {
    var rootControl = void 0;
    var ctrl = this;
    var parents = [];

    while (ctrl) {
      if (ctrl.rootControl) {
        rootControl = ctrl.rootControl;
        break;
      }

      parents.push(ctrl);
      rootControl = ctrl;
      ctrl = ctrl.parent();
    }

    if (!rootControl) {
      rootControl = this;
    }

    var i = parents.length;

    while (i--) {
      parents[i].rootControl = rootControl;
    }

    return rootControl;
  },
  reflow: function reflow() {
    __WEBPACK_IMPORTED_MODULE_7__ReflowQueue__["a" /* ReflowQueue */].remove(this);
    var parent = this.parent();

    if (parent && parent._layout && !parent._layout.isNative()) {
      parent.reflow();
    }

    return this;
  }
};

__WEBPACK_IMPORTED_MODULE_3__Tools__["a" /* Tools */].each('text title visible disabled active value'.split(' '), function (name) {
  proto[name] = function (value) {
    if (arguments.length === 0) {
      return this.state.get(name);
    }

    if (typeof value !== 'undefined') {
      this.state.set(name, value);
    }

    return this;
  };
});

Control = __WEBPACK_IMPORTED_MODULE_4__Class__["a" /* Class */].extend(proto);

function getEventDispatcher(obj) {
  if (!obj._eventDispatcher) {
    obj._eventDispatcher = new __WEBPACK_IMPORTED_MODULE_8__EventDispatcher__["a" /* EventDispatcher */]({
      scope: obj,
      toggleEvent: function toggleEvent(name, state) {
        if (state && __WEBPACK_IMPORTED_MODULE_8__EventDispatcher__["a" /* EventDispatcher */].isNative(name)) {
          if (!obj._nativeEvents) {
            obj._nativeEvents = {};
          }

          obj._nativeEvents[name] = true;

          if (obj.state.get('rendered')) {
            bindPendingEvents(obj);
          }
        }
      }
    });
  }

  return obj._eventDispatcher;
}

function bindPendingEvents(eventCtrl) {
  var i = void 0,
      l = void 0,
      parents = void 0,
      eventRootCtrl = void 0,
      nativeEvents = void 0,
      name = void 0;

  function delegate(e) {
    var control = eventCtrl.getParentCtrl(e.target);

    if (control) {
      control.fire(e.type, e);
    }
  }

  function mouseLeaveHandler() {
    var ctrl = eventRootCtrl._lastHoverCtrl;

    if (ctrl) {
      ctrl.fire('mouseleave', { target: ctrl.getEl() });

      ctrl.parents().each(function (ctrl) {
        ctrl.fire('mouseleave', { target: ctrl.getEl() });
      });

      eventRootCtrl._lastHoverCtrl = null;
    }
  }

  function mouseEnterHandler(e) {
    var i = void 0,
        parents = void 0,
        lastParents = void 0;
    var ctrl = eventCtrl.getParentCtrl(e.target);
    var lastCtrl = eventRootCtrl._lastHoverCtrl;
    var idx = 0;

    if (ctrl !== lastCtrl) {
      eventRootCtrl._lastHoverCtrl = ctrl;
      parents = ctrl.parents().toArray().reverse();
      parents.push(ctrl);

      if (lastCtrl) {
        lastParents = lastCtrl.parents().toArray().reverse();
        lastParents.push(lastCtrl);

        for (idx = 0; idx < lastParents.length; idx++) {
          if (parents[idx] !== lastParents[idx]) {
            break;
          }
        }

        for (i = lastParents.length - 1; i >= idx; i--) {
          lastCtrl = lastParents[i];
          lastCtrl.fire('mouseleave', { target: lastCtrl.getEl() });
        }
      }

      for (i = idx; i < parents.length; i++) {
        ctrl = parents[i];
        ctrl.fire('mouseenter', { target: ctrl.getEl() });
      }
    }
  }

  function fixWheelEvent(e) {
    e.preventDefault();

    if (e.type === 'mousewheel') {
      e.deltaY = -1 / 40 * e.wheelDelta;

      if (e.wheelDeltaX) {
        e.deltaX = -1 / 40 * e.wheelDeltaX;
      }
    } else {
      e.deltaX = 0;
      e.deltaY = e.detail;
    }

    e = eventCtrl.fire('wheel', e);
  }

  nativeEvents = eventCtrl._nativeEvents;
  if (nativeEvents) {
    parents = eventCtrl.parents().toArray();

    parents.unshift(eventCtrl);

    for (i = 0, l = parents.length; !eventRootCtrl && i < l; i++) {
      eventRootCtrl = parents[i]._eventsRoot;
    }

    if (!eventRootCtrl) {
      eventRootCtrl = parents[parents.length - 1] || eventCtrl;
    }

    eventCtrl._eventsRoot = eventRootCtrl;

    for (l = i, i = 0; i < l; i++) {
      parents[i]._eventsRoot = eventRootCtrl;
    }

    var eventRootDelegates = eventRootCtrl._delegates;

    if (!eventRootDelegates) {
      eventRootDelegates = eventRootCtrl._delegates = {};
    }

    for (name in nativeEvents) {
      if (!nativeEvents) {
        return false;
      }

      if (name === 'wheel' && !hasWheelEventSupport) {
        if (hasMouseWheelEventSupport) {
          Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(eventCtrl.getEl()).on('mousewheel', fixWheelEvent);
        } else {
          Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(eventCtrl.getEl()).on('DOMMouseScroll', fixWheelEvent);
        }

        continue;
      }

      if (name === 'mouseenter' || name === 'mouseleave') {
        if (!eventRootCtrl._hasMouseEnter) {
          Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(eventRootCtrl.getEl()).on('mouseleave', mouseLeaveHandler).on('mouseover', mouseEnterHandler);
          eventRootCtrl._hasMouseEnter = 1;
        }
      } else if (!eventRootDelegates[name]) {
        Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(eventRootCtrl.getEl()).on(name, delegate);

        eventRootDelegates[name] = true;
      }

      nativeEvents[name] = false;
    }
  }
}



/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Body; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Retrieve__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CheckType__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Cache__ = __webpack_require__(249);







var fromHtml = function fromHtml(html, scope) {
  var doc = scope || document;
  var div = doc.createElement('div');

  div.innerHTML = html;

  if (!div.hasChildNodes() || div.childNodes.length > 1) {
    console.error('HTML does not have a single root node', html);

    throw new Error('HTML must have a single root node');
  }

  return fromDom(div.childNodes[0]);
};

var fromTag = function fromTag(tag, scope) {
  var doc = scope || document;
  var node = doc.createElement(tag);

  return fromDom(node);
};

var fromText = function fromText(text, scope) {
  var doc = scope || document;
  var node = doc.createTextNode(text);

  return fromDom(node);
};

var fromDom = function fromDom(node) {
  if (node === null || node === undefined) {
    throw new Error('Node cannot be null or undefined');
  }

  return { dom: __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utils */].constant(node) };
};

var fromPoint = function fromPoint(doc, x, y) {
  return __WEBPACK_IMPORTED_MODULE_1__Retrieve__["a" /* Retrieve */].from(doc.dom().elementFromPoint(x, y)).map(fromDom);
};

var inBody = function inBody(element) {
  var dom = __WEBPACK_IMPORTED_MODULE_2__CheckType__["a" /* CheckType */].isText(element) ? element.dom().parentNode : element.dom();

  return dom !== undefined && dom !== null && dom.ownerDocument.body.contains(dom);
};

var body = __WEBPACK_IMPORTED_MODULE_3__Cache__["a" /* Cache */].cached(function () {
  return getBody(Body.fromDom(document));
});

var getBody = function getBody(doc) {
  var body = doc.dom().body;

  if (body === null || body === undefined) {
    throw new Error('Body is not available yet');
  }

  return Body.fromDom(body);
};

var Body = {
  fromHtml: fromHtml,
  fromTag: fromTag,
  fromText: fromText,
  fromDom: fromDom,
  fromPoint: fromPoint,
  body: body,
  getBody: getBody,
  inBody: inBody
};



/***/ }),
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Container; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Control__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Factory__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Selector__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ClassList__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Collection__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ReflowQueue__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__KeyboardNavigation__ = __webpack_require__(235);












var selectorCache = {};

var Container = __WEBPACK_IMPORTED_MODULE_2__Control__["a" /* Control */].extend({
  init: function init(settings) {
    var self = this;

    self._super(settings);
    settings = self.settings;

    if (settings.fixed) {
      self.state.set('fixed', true);
    }

    self._items = new __WEBPACK_IMPORTED_MODULE_6__Collection__["a" /* Collection */]();

    if (self.isRtl()) {
      self.classes.add('rtl');
    }

    self.bodyClasses = new __WEBPACK_IMPORTED_MODULE_5__ClassList__["a" /* ClassList */](function () {
      if (self.state.get('rendered')) {
        self.getEl('body').className = this.toString();
      }
    });

    self.bodyClasses.prefix = self.classPrefix;
    self.classes.add('container');
    self.bodyClasses.add('container-body');

    if (settings.containerCls) {
      self.classes.add(settings.containerCls);
    }

    self._layout = __WEBPACK_IMPORTED_MODULE_3__Factory__["a" /* Factory */].create((settings.layout || '') + 'layout');

    if (self.settings.items) {
      self.add(self.settings.items);
    } else {
      self.add(self.render());
    }

    self._hasBody = true;
  },
  items: function items() {
    return this._items;
  },
  find: function find(selector) {
    selector = selectorCache[selector] = selectorCache[selector] || new __WEBPACK_IMPORTED_MODULE_4__Selector__["a" /* Selector */](selector);
    return selector.find(this);
  },
  add: function add(items) {
    var self = this;
    self.items().add(self.create(items)).parent(self);
    return self;
  },
  focus: function focus(keyboard) {
    var focusCtrl = void 0,
        keyboardNav = void 0,
        items = void 0;
    var self = this;

    if (keyboard) {
      keyboardNav = self.keyboardNav || self.parents().eq(-1)[0].keyboardNav;

      if (keyboardNav) {
        keyboardNav.focusFirst(self);
        return;
      }
    }

    items = self.find('*');

    if (self.statusbar) {
      items.add(self.statusbar.items());
    }

    items.each(function (ctrl) {
      if (ctrl.settings.autofocus) {
        focusCtrl = null;
        return false;
      }

      if (ctrl.canFocus) {
        focusCtrl = focusCtrl || ctrl;
      }
    });

    if (focusCtrl) {
      focusCtrl.focus();
    }

    return self;
  },
  replace: function replace(oldItem, newItem) {
    var ctrlElm = void 0;
    var items = this.items();
    var i = items.length;

    while (i--) {
      if (items[i] === oldItem) {
        items[i] = newItem;
        break;
      }
    }

    if (i >= 0) {
      ctrlElm = newItem.getEl();

      if (ctrlElm) {
        ctrlElm.parentNode.removeChild(ctrlElm);
      }

      ctrlElm = oldItem.getEl();

      if (ctrlElm) {
        ctrlElm.parentNode.removeChild(ctrlElm);
      }
    }

    newItem.parent(this);
  },
  create: function create(items) {
    var settings = void 0;
    var self = this;
    var ctrlItems = [];

    if (!__WEBPACK_IMPORTED_MODULE_1__Tools__["a" /* Tools */].isArray(items)) {
      items = [items];
    }

    __WEBPACK_IMPORTED_MODULE_1__Tools__["a" /* Tools */].each(items, function (item) {
      if (item) {
        if (!(item instanceof __WEBPACK_IMPORTED_MODULE_2__Control__["a" /* Control */])) {
          if (typeof item === 'string') {
            item = { type: item };
          }

          settings = __WEBPACK_IMPORTED_MODULE_1__Tools__["a" /* Tools */].extend({}, self.settings.defaults, item);
          item.type = settings.type = settings.type || item.type || self.settings.defaultType || (settings.defaults ? settings.defaults.type : null);
          item = __WEBPACK_IMPORTED_MODULE_3__Factory__["a" /* Factory */].create(settings);
        }

        ctrlItems.push(item);
      }
    });

    return ctrlItems;
  },
  renderNew: function renderNew() {
    var self = this;

    self.items().each(function (ctrl, index) {
      var containerElm = void 0;

      ctrl.parent(self);

      if (!ctrl.state.get('rendered')) {
        containerElm = self.getEl('body');

        if (containerElm.hasChildNodes() && index <= containerElm.childNodes.length - 1) {
          Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(containerElm.childNodes[index]).before(ctrl.renderHtml());
        } else {
          Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(containerElm).append(ctrl.renderHtml());
        }

        ctrl.postRender();
        __WEBPACK_IMPORTED_MODULE_7__ReflowQueue__["a" /* ReflowQueue */].add(ctrl);
      }
    });

    self._layout.applyClasses(self.items().filter(':visible'));
    self._lastRect = null;

    return self;
  },
  append: function append(items) {
    return this.add(items).renderNew();
  },
  prepend: function prepend(items) {
    var self = this;

    self.items().set(self.create(items).concat(self.items().toArray()));

    return self.renderNew();
  },
  insert: function insert(items, index, before) {
    var curItems = void 0,
        beforeItems = void 0,
        afterItems = void 0;
    var self = this;

    items = self.create(items);
    curItems = self.items();

    if (!before && index < curItems.length - 1) {
      index += 1;
    }

    if (index >= 0 && index < curItems.length) {
      beforeItems = curItems.slice(0, index).toArray();
      afterItems = curItems.slice(index).toArray();
      curItems.set(beforeItems.concat(items, afterItems));
    }

    return self.renderNew();
  },
  fromJSON: function fromJSON(data) {
    var self = this;

    for (var n in data) {
      self.find('#' + n).value(data[n]);
    }
    return self;
  },
  toJSON: function toJSON() {
    var self = this;
    var data = {};

    self.find('*').each(function (ctrl) {
      var name = ctrl.name();
      var value = ctrl.value();

      if (name && typeof value !== 'undefined') {
        data[name] = value;
      }
    });

    return data;
  },
  renderHtml: function renderHtml() {
    var self = this;
    var layout = self._layout;
    var role = this.settings.role;

    self.preRender();
    layout.preRender(self);

    return '<div id="' + self._id + '" class="' + self.classes + '"' + (role ? ' role="' + this.settings.role + '"' : '') + '><div id="' + self._id + '-body" class="' + self.bodyClasses + '">' + (self.settings.html || '') + layout.renderHtml(self) + '</div>' + '</div>';
  },
  postRender: function postRender() {
    var box = void 0;
    var self = this;

    self.items().exec('postRender');
    self._super();
    self._layout.postRender(self);
    self.state.set('rendered', true);

    if (self.settings.style) {
      self.$el.css(self.settings.style);
    }

    if (self.settings.border) {
      box = self.borderBox;
      self.$el.css({
        'border-top-width': box.top,
        'border-right-width': box.right,
        'border-bottom-width': box.bottom,
        'border-left-width': box.left
      });
    }

    if (!self.parent()) {
      self.keyboardNav = Object(__WEBPACK_IMPORTED_MODULE_8__KeyboardNavigation__["a" /* KeyboardNavigation */])({ root: self });
    }

    return self;
  },
  initLayoutRect: function initLayoutRect() {
    var self = this;
    var layoutRect = self._super();

    self._layout.recalc(self);

    return layoutRect;
  },
  recalc: function recalc() {
    var self = this;
    var rect = self._layoutRect;
    var lastRect = self._lastRect;

    if (!lastRect || lastRect.w !== rect.w || lastRect.h !== rect.h) {
      self._layout.recalc(self);
      rect = self.layoutRect();

      self._lastRect = {
        x: rect.x,
        y: rect.y,
        w: rect.w,
        h: rect.h
      };

      return true;
    }
  },
  reflow: function reflow() {
    var i = void 0;

    __WEBPACK_IMPORTED_MODULE_7__ReflowQueue__["a" /* ReflowQueue */].remove(this);
    if (this.visible()) {
      __WEBPACK_IMPORTED_MODULE_2__Control__["a" /* Control */].repaintControls = [];
      __WEBPACK_IMPORTED_MODULE_2__Control__["a" /* Control */].repaintControls.map = {};

      this.recalc();

      i = __WEBPACK_IMPORTED_MODULE_2__Control__["a" /* Control */].repaintControls.length;

      while (i--) {
        __WEBPACK_IMPORTED_MODULE_2__Control__["a" /* Control */].repaintControls[i].repaint();
      }

      if (this.settings.layout !== 'flow' && this.settings.layout !== 'stack') {
        this.repaint();
      }

      __WEBPACK_IMPORTED_MODULE_2__Control__["a" /* Control */].repaintControls = [];
    }

    return this;
  }
});



/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DragHelper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(32);




function getDocumentSize(doc) {
  var documentElement = void 0,
      body = void 0,
      scrollWidth = void 0,
      clientWidth = void 0;
  var offsetWidth = void 0,
      scrollHeight = void 0,
      clientHeight = void 0,
      offsetHeight = void 0;
  var max = Math.max;

  documentElement = doc.documentElement;
  body = doc.body;
  scrollWidth = max(documentElement.scrollWidth, body.scrollWidth);
  clientWidth = max(documentElement.clientWidth, body.clientWidth);
  offsetWidth = max(documentElement.offsetWidth, body.offsetWidth);
  scrollHeight = max(documentElement.scrollHeight, body.scrollHeight);
  clientHeight = max(documentElement.clientHeight, body.clientHeight);
  offsetHeight = max(documentElement.offsetHeight, body.offsetHeight);

  return {
    width: scrollWidth < offsetWidth ? clientWidth : scrollWidth,
    height: scrollHeight < offsetHeight ? clientHeight : scrollHeight
  };
}

function updateWithTouchData(e) {
  var keys = void 0,
      i = void 0;

  if (e.changedTouches) {
    keys = 'screenX screenY pageX pageY clientX clientY'.split(' ');

    for (i = 0; i < keys.length; i++) {
      e[keys[i]] = e.changedTouches[0][keys[i]];
    }
  }
}

function DragHelper(id, settings) {
  var $eventOverlay = void 0;
  var downButton = void 0;
  var start = void 0,
      _stop = void 0,
      drag = void 0,
      startX = void 0,
      startY = void 0;
  var doc = settings.document || document;

  settings = settings || {};

  function getHandleElm() {
    return doc.getElementById(settings.handle || id);
  }

  start = function start(e) {
    var handleElm = void 0,
        cursor = void 0;
    var docSize = getDocumentSize(doc);

    updateWithTouchData(e);

    e.preventDefault();

    downButton = e.button;
    handleElm = getHandleElm();
    startX = e.screenX;
    startY = e.screenY;

    if (window.getComputedStyle) {
      cursor = window.getComputedStyle(handleElm, null).getPropertyValue('cursor');
    } else {
      cursor = handleElm.runtimeStyle.cursor;
    }

    $eventOverlay = Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])('<div></div>').css({
      position: 'absolute',
      top: 0,
      left: 0,
      width: docSize.width,
      height: docSize.height,
      zIndex: 2147483647,
      opacity: 0.0001,
      cursor: cursor
    }).appendTo(doc.body);

    Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(doc).on('mousemove touchmove', drag).on('mouseup touchend', _stop);

    settings.start(e);
  };

  drag = function drag(e) {
    updateWithTouchData(e);

    if (e.button !== downButton) {
      return _stop(e);
    }

    e.deltaX = e.screenX - startX;
    e.deltaY = e.screenY - startY;

    e.preventDefault();

    settings.drag(e);
  };

  _stop = function stop(e) {
    updateWithTouchData(e);

    Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(doc).off('mousemove touchmove', drag).off('mouseup touchend', _stop);
    $eventOverlay.remove();

    if (settings.stop) {
      settings.stop(e);
    }
  };

  this.destroy = function () {
    Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(getHandleElm()).off();
  };

  Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(getHandleElm()).on('mousedown touchstart', start);
}



/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FloatPanel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Panel__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Delay__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__funcs__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Movable__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Resizable__ = __webpack_require__(237);









var hasModal = void 0;
var zOrder = [];
var visiblePanels = [];
var windowResizeHandler = void 0;
var documentClickHandler = void 0;
var documentScrollHandler = void 0;

function isChildOf(ctrl, parent) {
  while (ctrl) {
    if (ctrl === parent) {
      return true;
    }

    ctrl = ctrl.parent();
  }
}

function skipOrHidePanels(e) {
  var i = visiblePanels.length;

  while (i--) {
    var panel = visiblePanels[i];
    var clickCtrl = panel.getParentCtrl(e.target);

    if (panel.settings.autohide) {
      if (clickCtrl) {
        if (isChildOf(clickCtrl, panel) || panel.parent() === clickCtrl) {
          continue;
        }
      }

      e = panel.fire('autohide', { target: e.target });

      if (!e.isDefaultPrevented()) {
        panel.hide();
      }
    }
  }
}

function bindDocumentClickHandler() {
  if (!documentClickHandler) {
    documentClickHandler = function documentClickHandler(e) {
      if (e.button === 2) {
        return;
      }

      skipOrHidePanels(e);
    };

    Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(document).on('click touchstart', documentClickHandler);
  }
}

function bindDocumentScrollHandler() {
  if (!documentScrollHandler) {
    documentScrollHandler = function documentScrollHandler() {
      var i = visiblePanels.length;

      while (i--) {
        repositionPanel(visiblePanels[i]);
      }
    };

    Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(window).on('scroll', documentScrollHandler);
  }
}

function bindWindowResizeHandler() {
  if (!windowResizeHandler) {
    var docElm = document.documentElement;
    var clientWidth = docElm.clientWidth;
    var clientHeight = docElm.clientHeight;

    windowResizeHandler = function windowResizeHandler() {
      if (!document.all || clientWidth !== docElm.clientWidth || clientHeight !== docElm.clientHeight) {
        clientWidth = docElm.clientWidth;
        clientHeight = docElm.clientHeight;

        FloatPanel.hideAll();
      }
    };

    Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(window).on('resize', windowResizeHandler);
  }
}

function repositionPanel(panel) {
  var scrollY = __WEBPACK_IMPORTED_MODULE_3__funcs__["a" /* funcs */].getViewPort().y;

  function toggleFixedChildPanels(fixed, deltaY) {
    var parent = void 0;

    for (var i = 0; i < visiblePanels.length; i++) {
      if (visiblePanels[i] !== panel) {
        parent = visiblePanels[i].parent();

        while (parent && (parent = parent.parent())) {
          if (parent === panel) {
            visiblePanels[i].fixed(fixed).moveBy(0, deltaY).repaint();
          }
        }
      }
    }
  }

  if (panel.settings.autofix) {
    if (!panel.state.get('fixed')) {
      panel._autoFixY = panel.layoutRect().y;

      if (panel._autoFixY < scrollY) {
        panel.fixed(true).layoutRect({ y: 0 }).repaint();
        toggleFixedChildPanels(true, scrollY - panel._autoFixY);
      }
    } else {
      if (panel._autoFixY > scrollY) {
        panel.fixed(false).layoutRect({ y: panel._autoFixY }).repaint();
        toggleFixedChildPanels(false, panel._autoFixY - scrollY);
      }
    }
  }
}

function addRemove(add, ctrl) {
  var i = void 0,
      topModal = void 0;
  var zIndex = FloatPanel.zIndex || 65535;

  if (add) {
    zOrder.push(ctrl);
  } else {
    i = zOrder.length;

    while (i--) {
      if (zOrder[i] === ctrl) {
        zOrder.splice(i, 1);
      }
    }
  }

  if (zOrder.length) {
    for (i = 0; i < zOrder.length; i++) {
      if (zOrder[i].modal) {
        zIndex++;
        topModal = zOrder[i];
      }

      zOrder[i].getEl().style.zIndex = zIndex;
      zOrder[i].zIndex = zIndex;
      zIndex++;
    }
  }

  var modalBlockEl = Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])('#' + ctrl.classPrefix + 'modal-block', ctrl.getContainerElm())[0];

  if (topModal) {
    Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(modalBlockEl).css('z-index', topModal.zIndex - 1);
  } else if (modalBlockEl) {
    modalBlockEl.parentNode.removeChild(modalBlockEl);
    hasModal = false;
  }

  FloatPanel.currentZIndex = zIndex;
}

var FloatPanel = __WEBPACK_IMPORTED_MODULE_1__Panel__["a" /* Panel */].extend({
  Mixins: [__WEBPACK_IMPORTED_MODULE_4__Movable__["a" /* Movable */], __WEBPACK_IMPORTED_MODULE_5__Resizable__["a" /* Resizable */]],
  init: function init(settings) {
    var self = this;

    self._super(settings);
    self._eventsRoot = self;
    self.classes.add('floatpanel');

    if (settings.autohide) {
      bindDocumentClickHandler();
      bindWindowResizeHandler();
      visiblePanels.push(self);
    }

    if (settings.autofix) {
      bindDocumentScrollHandler();

      self.on('move', function () {
        repositionPanel(this);
      });
    }

    self.on('postrender show', function (e) {
      if (e.control === self) {
        var modal = void 0;
        var prefix = self.classPrefix;

        if (self.modal && !hasModal) {
          modal = Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])('#' + prefix + 'modal-block', self.getContainerElm());

          if (!modal[0]) {
            modal = Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])('<div id="' + prefix + 'modal-block" class="' + prefix + 'reset ' + prefix + 'fade"></div>').appendTo(self.getContainerElm());
          }

          __WEBPACK_IMPORTED_MODULE_2__Delay__["a" /* Delay */].setTimeout(function () {
            modal.addClass(prefix + 'in');
            Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(self.getEl()).addClass(prefix + 'in');
          });

          hasModal = true;
        }

        addRemove(true, self);
      }
    });

    self.on('show', function () {
      self.parents().each(function (ctrl) {
        if (ctrl.state.get('fixed')) {
          self.fixed(true);

          return false;
        }
      });
    });

    if (settings.popover) {
      self._preBodyHtml = '<div class="' + self.classPrefix + 'arrow"></div>';
      self.classes.add('popover').add('bottom').add(self.isRtl() ? 'end' : 'start');
    }

    self.aria('label', settings.ariaLabel);
    self.aria('labelledby', self._id);
    self.aria('describedby', self.describedBy || self._id + '-none');
  },
  fixed: function fixed(state) {
    var self = this;

    if (self.state.get('fixed') !== state) {
      if (self.state.get('rendered')) {
        var viewport = __WEBPACK_IMPORTED_MODULE_3__funcs__["a" /* funcs */].getViewPort();

        if (state) {
          self.layoutRect().y -= viewport.y;
        } else {
          self.layoutRect().y += viewport.y;
        }
      }

      self.classes.toggle('fixed', state);
      self.state.set('fixed', state);
    }

    return self;
  },
  show: function show() {
    var i = visiblePanels.length;
    var self = this;
    var state = self._super();

    while (i--) {
      if (visiblePanels[i] === self) {
        break;
      }
    }

    if (i === -1) {
      visiblePanels.push(self);
    }

    return state;
  },
  hide: function hide() {
    removeVisiblePanel(this);
    addRemove(false, this);

    return this._super();
  },
  hideAll: function hideAll() {
    FloatPanel.hideAll();
  },
  close: function close() {
    var self = this;

    if (!self.fire('close').isDefaultPrevented()) {
      self.remove();
      addRemove(false, self);
    }

    return self;
  },
  remove: function remove() {
    removeVisiblePanel(this);

    this._super();
  },
  postRender: function postRender() {
    var self = this;

    if (self.settings.bodyRole) {
      this.getEl('body').setAttribute('role', self.settings.bodyRole);
    }

    return self._super();
  }
});

FloatPanel.hideAll = function () {
  var i = visiblePanels.length;

  while (i--) {
    var panel = visiblePanels[i];

    if (panel && panel.settings.autohide) {
      panel.hide();
      visiblePanels.splice(i, 1);
    }
  }
};

function removeVisiblePanel(panel) {
  var i = visiblePanels.length;

  while (i--) {
    if (visiblePanels[i] === panel) {
      visiblePanels.splice(i, 1);
    }
  }

  i = zOrder.length;

  while (i--) {
    if (zOrder[i] === panel) {
      zOrder.splice(i, 1);
    }
  }
}



/***/ }),
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Class; });


var Class = tinymce.util.Tools.resolve('tinymce.util.Class');



/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VarTypes; });


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var typeOf = function typeOf(x) {
  if (x === null) {
    return 'null';
  }

  var t = typeof x === 'undefined' ? 'undefined' : _typeof(x);

  if (t === 'object' && Array.prototype.isPrototypeOf(x)) {
    return 'array';
  }

  if (t === 'object' && String.prototype.isPrototypeOf(x)) {
    return 'string';
  }

  return t;
};

var isType = function isType(type) {
  return function (value) {
    return typeOf(value) === type;
  };
};

var VarTypes = {
  isString: isType('string'),
  isObject: isType('object'),
  isArray: isType('array'),
  isNull: isType('null'),
  isBoolean: isType('boolean'),
  isUndefined: isType('undefined'),
  isFunction: isType('function'),
  isNumber: isType('number')
};



/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FireThemeItems; });


var fireSkinLoaded = function fireSkinLoaded(editor) {
  return editor.fire('SkinLoaded');
};
var fireResizeEditor = function fireResizeEditor(editor) {
  return editor.fire('ResizeEditor');
};
var fireBeforeRenderUI = function fireBeforeRenderUI(editor) {
  return editor.fire('BeforeRenderUI');
};

var FireThemeItems = { fireSkinLoaded: fireSkinLoaded, fireResizeEditor: fireResizeEditor, fireBeforeRenderUI: fireBeforeRenderUI };



/***/ }),
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Window; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return handleWindowResize; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Box__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Env__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Panel__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Delay__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__funcs__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__DragHelper__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__FloatPanel__ = __webpack_require__(75);











var windows = [];
var oldMetaValue = '';

function toggleFullScreenState(state) {
  var contentValue = void 0;
  var noScaleMetaValue = 'width=device-width,initial-scale=1.0,user-scalable=0,minimum-scale=1.0,maximum-scale=1.0';
  var viewport = Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])('meta[name=viewport]')[0];

  if (__WEBPACK_IMPORTED_MODULE_2__Env__["a" /* Env */].overrideViewPort === false) {
    return;
  }

  if (!viewport) {
    viewport = document.createElement('meta');
    viewport.setAttribute('name', 'viewport');
    document.getElementsByTagName('head')[0].appendChild(viewport);
  }

  contentValue = viewport.getAttribute('content');

  if (contentValue && typeof oldMetaValue !== 'undefined') {
    oldMetaValue = contentValue;
  }

  viewport.setAttribute('content', state ? noScaleMetaValue : oldMetaValue);
}

function toggleBodyFullScreenClasses(classPrefix, state) {
  if (checkFullscreenWindows() && state === false) {
    Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])([document.documentElement, document.body]).removeClass(classPrefix + 'fullscreen');
  }
}

function checkFullscreenWindows() {
  for (var i = 0; i < windows.length; i++) {
    if (windows[i]._fullscreen) {
      return true;
    }
  }

  return false;
}

function handleWindowResize() {
  if (!__WEBPACK_IMPORTED_MODULE_2__Env__["a" /* Env */].desktop) {
    var lastSize = {
      w: window.innerWidth,
      h: window.innerHeight
    };

    __WEBPACK_IMPORTED_MODULE_4__Delay__["a" /* Delay */].setInterval(function () {
      var w = window.innerWidth;
      var h = window.innerHeight;

      if (lastSize.w !== w || lastSize.h !== h) {
        lastSize = { w: w, h: h };

        Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(window).trigger('resize');
      }
    }, 100);
  }

  function reposition() {
    var i = void 0,
        layoutRect = void 0;
    var rect = __WEBPACK_IMPORTED_MODULE_5__funcs__["a" /* funcs */].getWindowSize();

    for (i = 0; i < windows.length; i++) {
      layoutRect = windows[i].layoutRect();

      windows[i].moveTo(windows[i].settings.x || Math.max(0, rect.w / 2 - layoutRect.w / 2), windows[i].settings.y || Math.max(0, rect.h / 2 - layoutRect.h / 2));
    }
  }

  Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(window).on('resize', reposition);
}

var Window = __WEBPACK_IMPORTED_MODULE_7__FloatPanel__["a" /* FloatPanel */].extend({
  modal: true,
  Defaults: {
    border: 1,
    layout: 'flex',
    containerCls: 'panel',
    role: 'dialog',
    callbacks: {
      submit: function submit() {
        this.fire('submit', { data: this.toJSON() });
      },
      close: function close() {
        this.close();
      }
    }
  },
  init: function init(settings) {
    var self = this;

    self._super(settings);

    if (self.isRtl()) {
      self.classes.add('rtl');
    }

    self.classes.add('window');
    self.bodyClasses.add('window-body');
    self.state.set('fixed', true);

    if (settings.buttons) {
      self.statusbar = new __WEBPACK_IMPORTED_MODULE_3__Panel__["a" /* Panel */]({
        layout: 'flex',
        border: '1 0 0 0',
        spacing: 3,
        padding: 10,
        align: 'center',
        pack: self.isRtl() ? 'start' : 'end',
        defaults: { type: 'button' },
        items: settings.buttons
      });

      self.statusbar.classes.add('foot');
      self.statusbar.parent(self);
    }

    self.on('click', function (e) {
      var closeClass = self.classPrefix + 'close';

      if (__WEBPACK_IMPORTED_MODULE_5__funcs__["a" /* funcs */].hasClass(e.target, closeClass) || __WEBPACK_IMPORTED_MODULE_5__funcs__["a" /* funcs */].hasClass(e.target.parentNode, closeClass)) {
        self.close();
      }
    });

    self.on('cancel', function () {
      self.close();
    });

    self.aria('describedby', self.describedBy || self._id + '-none');
    self.aria('label', settings.title);
    self._fullscreen = false;
  },
  recalc: function recalc() {
    var layoutRect = void 0,
        width = void 0,
        x = void 0,
        needsRecalc = void 0;
    var self = this;
    var statusbar = self.statusbar;

    if (self._fullscreen) {
      self.layoutRect(__WEBPACK_IMPORTED_MODULE_5__funcs__["a" /* funcs */].getWindowSize());
      self.layoutRect().contentH = self.layoutRect().innerH;
    }

    self._super();
    layoutRect = self.layoutRect();

    if (self.settings.title && !self._fullscreen) {
      width = layoutRect.headerW;

      if (width > layoutRect.w) {
        x = layoutRect.x - Math.max(0, width / 2);

        self.layoutRect({
          w: width,
          x: x
        });

        needsRecalc = true;
      }
    }

    if (statusbar) {
      statusbar.layoutRect({ w: self.layoutRect().innerW }).recalc();
      width = statusbar.layoutRect().minW + layoutRect.deltaW;

      if (width > layoutRect.w) {
        x = layoutRect.x - Math.max(0, width - layoutRect.w);

        self.layoutRect({
          w: width,
          x: x
        });

        needsRecalc = true;
      }
    }

    if (needsRecalc) {
      self.recalc();
    }
  },
  initLayoutRect: function initLayoutRect() {
    var headEl = void 0;
    var self = this;
    var layoutRect = self._super();
    var deltaH = 0;

    if (self.settings.title && !self._fullscreen) {
      headEl = self.getEl('head');

      var size = __WEBPACK_IMPORTED_MODULE_5__funcs__["a" /* funcs */].getSize(headEl);

      layoutRect.headerW = size.width;
      layoutRect.headerH = size.height;
      deltaH += layoutRect.headerH;
    }

    if (self.statusbar) {
      deltaH += self.statusbar.layoutRect().h;
    }

    layoutRect.deltaH += deltaH;
    layoutRect.minH += deltaH;
    layoutRect.h += deltaH;

    var rect = __WEBPACK_IMPORTED_MODULE_5__funcs__["a" /* funcs */].getWindowSize();

    layoutRect.x = self.settings.x || Math.max(0, rect.w / 2 - layoutRect.w / 2);
    layoutRect.y = self.settings.y || Math.max(0, rect.h / 2 - layoutRect.h / 2);

    return layoutRect;
  },
  renderHtml: function renderHtml() {
    var self = this;
    var layout = self._layout;
    var id = self._id;
    var prefix = self.classPrefix;
    var settings = self.settings;
    var headerHtml = '';
    var footerHtml = '';
    var html = settings.html;

    self.preRender();
    layout.preRender(self);

    if (settings.title) {
      headerHtml = '<div id="' + id + '-head" class="' + prefix + 'window-head"><div id="' + id + '-title" class="' + prefix + 'title">' + self.encode(settings.title) + '</div><div id="' + id + '-dragh" class="' + prefix + 'dragh"></div><button type="button" class="' + prefix + 'close" aria-hidden="true"><i class="mce-ico mce-i-remove"></i></button></div>';
    }

    if (settings.url) {
      html = '<iframe src="' + settings.url + '" tabindex="-1"></iframe>';
    }

    if (typeof html === 'undefined') {
      html = layout.renderHtml(self);
    }

    if (self.statusbar) {
      footerHtml = self.statusbar.renderHtml();
    }

    return '<div id="' + id + '" class="' + self.classes + '" hidefocus="1"><div class="' + self.classPrefix + 'reset" role="application">' + headerHtml + '<div id="' + id + '-body" class="' + self.bodyClasses + '">' + html + '</div>' + footerHtml + '</div></div>';
  },
  fullscreen: function fullscreen(state) {
    var layoutRect = void 0,
        slowRendering = void 0;
    var self = this;
    var documentElement = document.documentElement;
    var prefix = self.classPrefix;

    if (state !== self._fullscreen) {
      Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(window).on('resize', function () {
        var time = void 0;

        if (self._fullscreen) {
          if (!slowRendering) {
            time = new Date().getTime();

            var rect = __WEBPACK_IMPORTED_MODULE_5__funcs__["a" /* funcs */].getWindowSize();

            self.moveTo(0, 0).resizeTo(rect.w, rect.h);

            if (new Date().getTime() - time > 50) {
              slowRendering = true;
            }
          } else {
            if (!self._timer) {
              self._timer = __WEBPACK_IMPORTED_MODULE_4__Delay__["a" /* Delay */].setTimeout(function () {
                var rect = __WEBPACK_IMPORTED_MODULE_5__funcs__["a" /* funcs */].getWindowSize();

                self.moveTo(0, 0).resizeTo(rect.w, rect.h);
                self._timer = 0;
              }, 50);
            }
          }
        }
      });

      layoutRect = self.layoutRect();
      self._fullscreen = state;

      if (!state) {
        self.borderBox = __WEBPACK_IMPORTED_MODULE_1__Box__["a" /* Box */].parseBox(self.settings.border);
        self.getEl('head').style.display = '';
        layoutRect.deltaH += layoutRect.headerH;

        Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])([documentElement, document.body]).removeClass(prefix + 'fullscreen');

        self.classes.remove('fullscreen');
        self.moveTo(self._initial.x, self._initial.y).resizeTo(self._initial.w, self._initial.h);
      } else {
        self._initial = {
          x: layoutRect.x,
          y: layoutRect.y,
          w: layoutRect.w,
          h: layoutRect.h
        };

        self.borderBox = __WEBPACK_IMPORTED_MODULE_1__Box__["a" /* Box */].parseBox('0');
        self.getEl('head').style.display = 'none';

        layoutRect.deltaH -= layoutRect.headerH + 2;

        Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])([documentElement, document.body]).addClass(prefix + 'fullscreen');

        self.classes.add('fullscreen');

        var rect = __WEBPACK_IMPORTED_MODULE_5__funcs__["a" /* funcs */].getWindowSize();

        self.moveTo(0, 0).resizeTo(rect.w, rect.h);
      }
    }

    return self.reflow();
  },
  postRender: function postRender() {
    var startPos = void 0;
    var self = this;

    setTimeout(function () {
      self.classes.add('in');
      self.fire('open');
    }, 0);

    self._super();

    if (self.statusbar) {
      self.statusbar.postRender();
    }

    self.focus();

    this.dragHelper = new __WEBPACK_IMPORTED_MODULE_6__DragHelper__["a" /* DragHelper */](self._id + '-dragh', {
      start: function start() {
        startPos = {
          x: self.layoutRect().x,
          y: self.layoutRect().y
        };
      },
      drag: function drag(e) {
        self.moveTo(startPos.x + e.deltaX, startPos.y + e.deltaY);
      }
    });

    self.on('submit', function (e) {
      if (!e.isDefaultPrevented()) {
        self.close();
      }
    });

    windows.push(self);

    toggleFullScreenState(true);
  },
  submit: function submit() {
    return this.fire('submit', { data: this.toJSON() });
  },
  remove: function remove() {
    var i = void 0;
    var self = this;

    self.dragHelper.destroy();
    self._super();

    if (self.statusbar) {
      this.statusbar.remove();
    }

    toggleBodyFullScreenClasses(self.classPrefix, false);
    i = windows.length;

    while (i--) {
      if (windows[i] === self) {
        windows.splice(i, 1);
      }
    }
    toggleFullScreenState(windows.length > 0);
  },
  getContentWindow: function getContentWindow() {
    var ifr = this.getEl().getElementsByTagName('iframe')[0];

    return ifr ? ifr.contentWindow : null;
  }
});



/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Panel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Container__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Scrollable__ = __webpack_require__(236);





var Panel = __WEBPACK_IMPORTED_MODULE_0__Container__["a" /* Container */].extend({
  Defaults: {
    layout: 'fit',
    containerCls: 'panel'
  },
  Mixins: [__WEBPACK_IMPORTED_MODULE_1__Scrollable__["a" /* Scrollable */]],
  renderHtml: function renderHtml() {
    var self = this;
    var layout = self._layout;
    var innerHtml = self.settings.html;

    self.preRender();
    layout.preRender(self);

    if (typeof innerHtml === 'undefined') {
      innerHtml = '<div id="' + self._id + '-body" class="' + self.bodyClasses + '">' + layout.renderHtml(self) + '</div>';
    } else {
      if (typeof innerHtml === 'function') {
        innerHtml = innerHtml.call(self);
      }

      self._hasBody = false;
    }

    return '<div id="' + self._id + '" class="' + self.classes + '" hidefocus="1" tabindex="-1" role="group">' + (self._preBodyHtml || '') + innerHtml + '</div>';
  }
});



/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Movable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__funcs__ = __webpack_require__(16);




function calculateRelativePosition(ctrl, targetElm, rel) {
  var viewport = __WEBPACK_IMPORTED_MODULE_0__funcs__["a" /* funcs */].getViewPort();
  var pos = __WEBPACK_IMPORTED_MODULE_0__funcs__["a" /* funcs */].getPos(targetElm);
  var x = pos.x;
  var y = pos.y;

  if (ctrl.state.get('fixed') && __WEBPACK_IMPORTED_MODULE_0__funcs__["a" /* funcs */].getRuntimeStyle(document.body, 'position') === 'static') {
    x -= viewport.x;
    y -= viewport.y;
  }

  var ctrlElm = ctrl.getEl();
  var size = __WEBPACK_IMPORTED_MODULE_0__funcs__["a" /* funcs */].getSize(ctrlElm);
  var selfW = size.width;
  var selfH = size.height;

  size = __WEBPACK_IMPORTED_MODULE_0__funcs__["a" /* funcs */].getSize(targetElm);

  var targetW = size.width;
  var targetH = size.height;

  rel = (rel || '').split('');

  if (rel[0] === 'b') {
    y += targetH;
  }

  if (rel[1] === 'r') {
    x += targetW;
  }

  if (rel[0] === 'c') {
    y += Math.round(targetH / 2);
  }

  if (rel[1] === 'c') {
    x += Math.round(targetW / 2);
  }

  if (rel[3] === 'b') {
    y -= selfH;
  }

  if (rel[4] === 'r') {
    x -= selfW;
  }

  if (rel[3] === 'c') {
    y -= Math.round(selfH / 2);
  }

  if (rel[4] === 'c') {
    x -= Math.round(selfW / 2);
  }

  return {
    x: x,
    y: y,
    w: selfW,
    h: selfH
  };
}

var Movable = {
  testMoveRel: function testMoveRel(elm, rels) {
    var viewPortRect = __WEBPACK_IMPORTED_MODULE_0__funcs__["a" /* funcs */].getViewPort();

    for (var i = 0; i < rels.length; i++) {
      var pos = calculateRelativePosition(this, elm, rels[i]);

      if (this.state.get('fixed')) {
        if (pos.x > 0 && pos.x + pos.w < viewPortRect.w && pos.y > 0 && pos.y + pos.h < viewPortRect.h) {
          return rels[i];
        }
      } else {
        if (pos.x > viewPortRect.x && pos.x + pos.w < viewPortRect.w + viewPortRect.x && pos.y > viewPortRect.y && pos.y + pos.h < viewPortRect.h + viewPortRect.y) {
          return rels[i];
        }
      }
    }

    return rels[0];
  },
  moveRel: function moveRel(elm, rel) {
    if (typeof rel !== 'string') {
      rel = this.testMoveRel(elm, rel);
    }

    var pos = calculateRelativePosition(this, elm, rel);

    return this.moveTo(pos.x, pos.y);
  },
  moveBy: function moveBy(dx, dy) {
    var self = this;
    var rect = self.layoutRect();

    self.moveTo(rect.x + dx, rect.y + dy);

    return self;
  },
  moveTo: function moveTo(x, y) {
    var self = this;

    function constrain(value, max, size) {
      if (value < 0) {
        return 0;
      }

      if (value + size > max) {
        value = max - size;

        return value < 0 ? 0 : value;
      }

      return value;
    }

    if (self.settings.constrainToViewport) {
      var viewPortRect = __WEBPACK_IMPORTED_MODULE_0__funcs__["a" /* funcs */].getViewPort(window);
      var layoutRect = self.layoutRect();

      x = constrain(x, viewPortRect.w + viewPortRect.x, layoutRect.w);
      y = constrain(y, viewPortRect.h + viewPortRect.y, layoutRect.h);
    }

    if (self.state.get('rendered')) {
      self.layoutRect({ x: x, y: y }).repaint();
    } else {
      self.settings.x = x;
      self.settings.y = y;
    }

    self.fire('move', { x: x, y: y });

    return self;
  }
};



/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Button; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Widget__ = __webpack_require__(13);




var Button = __WEBPACK_IMPORTED_MODULE_0__Widget__["a" /* Widget */].extend({
  Defaults: {
    classes: 'widget btn',
    role: 'button'
  },
  init: function init(settings) {
    var size = void 0;
    var self = this;

    self._super(settings);
    settings = self.settings;
    size = self.settings.size;

    self.on('click mousedown', function (e) {
      e.preventDefault();
    });

    self.on('touchstart', function (e) {
      self.fire('click', e);
      e.preventDefault();
    });

    if (settings.subtype) {
      self.classes.add(settings.subtype);
    }

    if (size) {
      self.classes.add('btn-' + size);
    }

    if (settings.icon) {
      self.icon(settings.icon);
    }
  },
  icon: function icon(_icon) {
    if (!arguments.length) {
      return this.state.get('icon');
    }

    this.state.set('icon', _icon);

    return this;
  },
  repaint: function repaint() {
    var btnElm = this.getEl().firstChild;
    var btnStyle = void 0;
    if (btnElm) {
      btnStyle = btnElm.style;
      btnStyle.width = btnStyle.height = '100%';
    }

    this._super();
  },
  renderHtml: function renderHtml() {
    var image = void 0,
        ariaPressed = void 0;
    var self = this;
    var id = self._id;
    var prefix = self.classPrefix;
    var icon = self.state.get('icon');
    var text = self.state.get('text');
    var textHtml = '';
    var settings = self.settings;

    image = settings.image;

    if (image) {
      icon = 'none';

      if (typeof image !== 'string') {
        image = window.getSelection ? image[0] : image[1];
      }

      image = ' style="background-image: url(\'' + image + '\')"';
    } else {
      image = '';
    }

    if (text) {
      self.classes.add('btn-has-text');
      textHtml = '<span class="' + prefix + 'txt">' + self.encode(text) + '</span>';
    }

    icon = '' + (icon ? prefix + 'ico ' + prefix + 'i-' + icon : '');
    ariaPressed = '' + (typeof settings.active === 'boolean' ? ' aria-pressed="' + settings.active + '"' : '');

    return '<div id="' + id + '" class="' + self.classes + '" tabindex="-1"' + ariaPressed + '><button id="' + id + '-button" role="presentation" type="button" tabindex="-1">' + (icon ? '<i class="' + icon + '"' + image + '></i>' : '') + textHtml + '</button></div>';
  },
  bindStates: function bindStates() {
    var self = this;
    var $ = self.$;
    var textCls = self.classPrefix + 'txt';

    function setButtonText(text) {
      var $span = $('span.' + textCls, self.getEl());

      if (text) {
        if (!$span[0]) {
          $('button:first', self.getEl()).append('<span class="' + textCls + '"></span>');
          $span = $('span.' + textCls, self.getEl());
        }
        $span.html(self.encode(text));
      } else {
        $span.remove();
      }

      self.classes.toggle('btn-has-text', !!text);
    }

    self.state.on('change:text', function (e) {
      setButtonText(e.value);
    });

    self.state.on('change:icon', function (e) {
      var icon = e.value;
      var prefix = self.classPrefix;

      self.settings.icon = icon;
      icon = '' + (icon ? prefix + 'ico ' + prefix + 'i-' + self.settings.icon : '');

      var btnElm = self.getEl().firstChild;
      var iconElm = btnElm.getElementsByTagName('i')[0];

      if (icon) {
        if (!iconElm || iconElm !== btnElm.firstChild) {
          iconElm = document.createElement('i');
          btnElm.insertBefore(iconElm, btnElm.firstChild);
        }
        iconElm.className = icon;
      } else if (iconElm) {
        btnElm.removeChild(iconElm);
      }

      setButtonText(self.state.get('text'));
    });

    return self._super();
  }
});



/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbsoluteLayout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Layout__ = __webpack_require__(177);




var AbsoluteLayout = __WEBPACK_IMPORTED_MODULE_0__Layout__["a" /* Layout */].extend({
  Defaults: {
    containerClass: 'abs-layout',
    controlClass: 'abs-layout-item'
  },
  recalc: function recalc(container) {
    container.items().filter(':visible').each(function (ctrl) {
      var settings = ctrl.settings;

      ctrl.layoutRect({
        x: settings.x,
        y: settings.y,
        w: settings.w,
        h: settings.h
      });

      if (ctrl.recalc) {
        ctrl.recalc();
      }
    });
  },
  renderHtml: function renderHtml(container) {
    return '<div id="' + container._id + '-absend" class="' + container.classPrefix + 'abs-end"></div>' + this._super(container);
  }
});



/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Format; });


var toggleFormat = function toggleFormat(editor, fmt) {
  return function () {
    editor.execCommand('mceToggleFormat', false, fmt);
  };
};

var postRenderFormat = function postRenderFormat(editor, name) {
  return function () {
    var self = this;

    if (editor.formatter) {
      editor.formatter.formatChanged(name, function (state) {
        self.active(state);
      });
    } else {
      editor.on('init', function () {
        editor.formatter.formatChanged(name, function (state) {
          self.active(state);
        });
      });
    }
  };
};

var Format = {
  toggleFormat: toggleFormat,
  postRenderFormat: postRenderFormat
};



/***/ }),
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Collection; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Class__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Selector__ = __webpack_require__(174);






var Collection = void 0;
var proto = void 0;
var push = Array.prototype.push;
var _slice = Array.prototype.slice;

proto = {
  length: 0,
  init: function init(items) {
    if (items) {
      this.add(items);
    }
  },
  add: function add(items) {
    var self = this;

    if (!__WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].isArray(items)) {
      if (items instanceof Collection) {
        self.add(items.toArray());
      } else {
        push.call(self, items);
      }
    } else {
      push.apply(self, items);
    }

    return self;
  },
  set: function set(items) {
    var self = this;
    var len = self.length;
    var i = void 0;

    self.length = 0;
    self.add(items);

    for (i = self.length; i < len; i++) {
      delete self[i];
    }

    return self;
  },
  filter: function filter(selector) {
    var self = this;
    var i = void 0,
        l = void 0;
    var matches = [];
    var item = void 0,
        match = void 0;

    if (typeof selector === 'string') {
      selector = new __WEBPACK_IMPORTED_MODULE_2__Selector__["a" /* Selector */](selector);

      match = function match(item) {
        return selector.match(item);
      };
    } else {
      match = selector;
    }

    for (i = 0, l = self.length; i < l; i++) {
      item = self[i];

      if (match(item)) {
        matches.push(item);
      }
    }

    return new Collection(matches);
  },
  slice: function slice() {
    return new Collection(_slice.apply(this, arguments));
  },
  eq: function eq(index) {
    return index === -1 ? this.slice(index) : this.slice(index, +index + 1);
  },
  each: function each(callback) {
    __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].each(this, callback);

    return this;
  },
  toArray: function toArray() {
    return __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].toArray(this);
  },
  indexOf: function indexOf(ctrl) {
    var self = this;
    var i = self.length;

    while (i--) {
      if (self[i] === ctrl) {
        break;
      }
    }

    return i;
  },
  reverse: function reverse() {
    return new Collection(__WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].toArray(this).reverse());
  },
  hasClass: function hasClass(cls) {
    return this[0] ? this[0].classes.contains(cls) : false;
  },
  prop: function prop(name, value) {
    var self = this;
    var item = void 0;

    if (value !== undefined) {
      self.each(function (item) {
        if (item[name]) {
          item[name](value);
        }
      });

      return self;
    }

    item = self[0];

    if (item && item[name]) {
      return item[name]();
    }
  },
  exec: function exec(name) {
    var self = this;
    var args = __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].toArray(arguments).slice(1);

    self.each(function (item) {
      if (item[name]) {
        item[name].apply(item, args);
      }
    });

    return self;
  },
  remove: function remove() {
    var i = this.length;

    while (i--) {
      this[i].remove();
    }

    return this;
  },
  addClass: function addClass(cls) {
    return this.each(function (item) {
      item.classes.add(cls);
    });
  },
  removeClass: function removeClass(cls) {
    return this.each(function (item) {
      item.classes.remove(cls);
    });
  }
};

__WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].each('fire on off show hide append prepend before after reflow'.split(' '), function (name) {
  proto[name] = function () {
    var args = __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].toArray(arguments);

    this.each(function (ctrl) {
      if (name in ctrl) {
        ctrl[name].apply(ctrl, args);
      }
    });

    return this;
  };
});

__WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].each('text name disabled active selected checked visible parent value data'.split(' '), function (name) {
  proto[name] = function (value) {
    return this.prop(name, value);
  };
});

Collection = __WEBPACK_IMPORTED_MODULE_1__Class__["a" /* Class */].extend(proto);
__WEBPACK_IMPORTED_MODULE_2__Selector__["a" /* Selector */].Collection = Collection;



/***/ }),
/* 174 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Selector; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Class__ = __webpack_require__(85);




function unique(array) {
  var item = void 0;
  var uniqueItems = [];
  var i = array.length;

  while (i--) {
    item = array[i];

    if (!item.__checked) {
      uniqueItems.push(item);
      item.__checked = 1;
    }
  }

  i = uniqueItems.length;

  while (i--) {
    delete uniqueItems[i].__checked;
  }

  return uniqueItems;
}

var expression = /^([\w\\*]+)?(?:#([\w\-\\]+))?(?:\.([\w\\.]+))?(?:\[@?([\w\\]+)([\^\$*!~]?=)([\w\\]+)\])?(?:\:(.+))?/i;
var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*]|['"][^'"]*['"]|[^[\]'"]+)+]|\\.|[^ >+~,([\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;
var whiteSpace = /^\s*|\s*$/g;
var Collection = void 0;

var Selector = __WEBPACK_IMPORTED_MODULE_0__Class__["a" /* Class */].extend({
  init: function init(selector) {
    var match = this.match;

    function compileNameFilter(name) {
      if (name) {
        name = name.toLowerCase();

        return function (item) {
          return name === '*' || item.type === name;
        };
      }
    }

    function compileIdFilter(id) {
      if (id) {
        return function (item) {
          return item._name === id;
        };
      }
    }

    function compileClassesFilter(classes) {
      if (classes) {
        classes = classes.split('.');

        return function (item) {
          var i = classes.length;

          while (i--) {
            if (!item.classes.contains(classes[i])) {
              return false;
            }
          }

          return true;
        };
      }
    }

    function compileAttrFilter(name, cmp, check) {
      if (name) {
        return function (item) {
          var value = item[name] ? item[name]() : '';

          if (!cmp) {
            return !!check;
          } else {
            if (cmp === '=') {
              return value === check;
            } else {
              if (cmp === '*=') {
                return value.indexOf(check) >= 0;
              } else {
                if (cmp === '~=') {
                  return (' ' + value + ' ').indexOf(' ' + check + ' ') >= 0;
                } else {
                  if (cmp === '!=') {
                    return value !== check;
                  } else {
                    if (cmp === '^=') {
                      return value.indexOf(check) === 0;
                    } else {
                      if (cmp === '$=') {
                        return value.substr(value.length - check.length) === check;
                      } else {
                        return false;
                      }
                    }
                  }
                }
              }
            }
          }
        };
      }
    }

    function compilePsuedoFilter(name) {
      var notSelectors = void 0;
      if (name) {
        name = /(?:not\((.+)\))|(.+)/i.exec(name);

        if (!name[1]) {
          name = name[2];

          return function (item, index, length) {
            if (name === 'first') {
              return index === 0;
            } else {
              if (name === 'last') {
                return index === length - 1;
              } else {
                if (name === 'even') {
                  return index % 2 === 0;
                } else {
                  if (name === 'odd') {
                    return index % 2 === 1;
                  } else {
                    if (item[name]) {
                      return item[name]();
                    } else {
                      return false;
                    }
                  }
                }
              }
            }
          };
        }

        notSelectors = parseChunks(name[1], []);

        return function (item) {
          return !match(item, notSelectors);
        };
      }
    }

    function compile(selector, filters, direct) {
      var parts = void 0;

      function add(filter) {
        if (filter) {
          filters.push(filter);
        }
      }

      parts = expression.exec(selector.replace(whiteSpace, ''));

      add(compileNameFilter(parts[1]));
      add(compileIdFilter(parts[2]));
      add(compileClassesFilter(parts[3]));
      add(compileAttrFilter(parts[4], parts[5], parts[6]));
      add(compilePsuedoFilter(parts[7]));

      filters.pseudo = !!parts[7];
      filters.direct = direct;

      return filters;
    }

    function parseChunks(selector, selectors) {
      var extra = void 0,
          matches = void 0,
          i = void 0;
      var parts = [];

      do {
        chunker.exec('');
        matches = chunker.exec(selector);

        if (matches) {
          selector = matches[3];
          parts.push(matches[1]);

          if (matches[2]) {
            extra = matches[3];

            break;
          }
        }
      } while (matches);

      if (extra) {
        parseChunks(extra, selectors);
      }

      selector = [];

      for (i = 0; i < parts.length; i++) {
        if (parts[i] !== '>') {
          selector.push(compile(parts[i], [], parts[i - 1] === '>'));
        }
      }

      selectors.push(selector);

      return selectors;
    }

    this._selectors = parseChunks(selector, []);
  },
  match: function match(control, selectors) {
    var i = void 0,
        l = void 0,
        si = void 0,
        sl = void 0,
        selector = void 0,
        fi = void 0,
        fl = void 0,
        filters = void 0,
        index = void 0,
        length = void 0,
        siblings = void 0,
        count = void 0,
        item = void 0;
    selectors = selectors || this._selectors;

    for (i = 0, l = selectors.length; i < l; i++) {
      selector = selectors[i];
      sl = selector.length;
      item = control;
      count = 0;

      for (si = sl - 1; si >= 0; si--) {
        filters = selector[si];

        while (item) {
          if (filters.pseudo) {
            siblings = item.parent().items();
            index = length = siblings.length;

            while (index--) {
              if (siblings[index] === item) {
                break;
              }
            }
          }

          for (fi = 0, fl = filters.length; fi < fl; fi++) {
            if (!filters[fi](item, index, length)) {
              fi = fl + 1;

              break;
            }
          }

          if (fi === fl) {
            count++;
            break;
          } else {
            if (si === sl - 1) {
              break;
            }
          }

          item = item.parent();
        }
      }

      if (count === sl) {
        return true;
      }
    }

    return false;
  },
  find: function find(container) {
    var i = void 0,
        l = void 0;
    var matches = [];
    var selectors = this._selectors;

    function collect(items, selector, index) {
      var i = void 0,
          l = void 0,
          fi = void 0,
          fl = void 0,
          item = void 0;
      var filters = selector[index];

      for (i = 0, l = items.length; i < l; i++) {
        item = items[i];

        for (fi = 0, fl = filters.length; fi < fl; fi++) {
          if (!filters[fi](item, i, l)) {
            fi = fl + 1;

            break;
          }
        }

        if (fi === fl) {
          if (index === selector.length - 1) {
            matches.push(item);
          } else {
            if (item.items) {
              collect(item.items(), selector, index + 1);
            }
          }
        } else if (filters.direct) {
          return;
        }

        if (item.items) {
          collect(item.items(), selector, index);
        }
      }
    }

    if (container.items) {
      for (i = 0, l = selectors.length; i < l; i++) {
        collect(container.items(), selectors[i], 0);
      }

      if (l > 1) {
        matches = unique(matches);
      }
    }

    if (!Collection) {
      Collection = Selector.Collection;
    }

    return new Collection(matches);
  }
});



/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReflowQueue; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Delay__ = __webpack_require__(45);




var animationFrameRequested = void 0;
var dirtyCtrls = {};

var ReflowQueue = {
  add: function add(ctrl) {
    var parent = ctrl.parent();

    if (parent) {
      if (!parent._layout || parent._layout.isNative()) {
        return;
      }

      if (!dirtyCtrls[parent._id]) {
        dirtyCtrls[parent._id] = parent;
      }

      if (!animationFrameRequested) {
        animationFrameRequested = true;

        __WEBPACK_IMPORTED_MODULE_0__Delay__["a" /* Delay */].requestAnimationFrame(function () {
          var id = void 0,
              ctrl = void 0;
          animationFrameRequested = false;

          for (id in dirtyCtrls) {
            ctrl = dirtyCtrls[id];

            if (ctrl.state.get('rendered')) {
              ctrl.reflow();
            }
          }

          dirtyCtrls = {};
        }, document.body);
      }
    }
  },
  remove: function remove(ctrl) {
    if (dirtyCtrls[ctrl._id]) {
      delete dirtyCtrls[ctrl._id];
    }
  }
};



/***/ }),
/* 176 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Throbber; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Delay__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Control__ = __webpack_require__(63);






function Throbber(elm, inline) {
  var timer = void 0,
      state = void 0;
  var classPrefix = __WEBPACK_IMPORTED_MODULE_2__Control__["a" /* Control */].classPrefix;
  var self = this;

  self.show = function (time, callback) {
    function render() {
      if (state) {
        Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(elm).append('<div class="' + classPrefix + 'throbber' + (inline ? ' ' + classPrefix + 'throbber-inline' : '') + '"></div>');
        if (callback) {
          callback();
        }
      }
    }

    self.hide();
    state = true;

    if (time) {
      timer = __WEBPACK_IMPORTED_MODULE_1__Delay__["a" /* Delay */].setTimeout(render, time);
    } else {
      render();
    }

    return self;
  };

  self.hide = function () {
    var child = elm.lastChild;

    __WEBPACK_IMPORTED_MODULE_1__Delay__["a" /* Delay */].clearTimeout(timer);

    if (child && child.className.indexOf('throbber') !== -1) {
      child.parentNode.removeChild(child);
    }

    state = false;

    return self;
  };
}



/***/ }),
/* 177 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Layout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Class__ = __webpack_require__(85);





var Layout = __WEBPACK_IMPORTED_MODULE_1__Class__["a" /* Class */].extend({
  Defaults: {
    firstControlClass: 'first',
    lastControlClass: 'last'
  },
  init: function init(settings) {
    this.settings = __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].extend({}, this.Defaults, settings);
  },
  preRender: function preRender(container) {
    container.bodyClasses.add(this.settings.containerClass);
  },
  applyClasses: function applyClasses(items) {
    var firstClass = void 0,
        lastClass = void 0,
        firstItem = void 0,
        lastItem = void 0;
    var self = this;
    var settings = self.settings;

    firstClass = settings.firstControlClass;
    lastClass = settings.lastControlClass;

    items.each(function (item) {
      item.classes.remove(firstClass).remove(lastClass).add(settings.controlClass);

      if (item.visible()) {
        if (!firstItem) {
          firstItem = item;
        }

        lastItem = item;
      }
    });

    if (firstItem) {
      firstItem.classes.add(firstClass);
    }

    if (lastItem) {
      lastItem.classes.add(lastClass);
    }
  },
  renderHtml: function renderHtml(container) {
    var self = this;
    var html = '';

    self.applyClasses(container.items());
    container.items().each(function (item) {
      html += item.renderHtml();
    });

    return html;
  },
  recalc: function recalc() {},
  postRender: function postRender() {},
  isNative: function isNative() {
    return false;
  }
});



/***/ }),
/* 178 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Button__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MenuBar__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Factory__ = __webpack_require__(40);






function isChildOf(node, parent) {
  while (node) {
    if (parent === node) {
      return true;
    }

    node = node.parentNode;
  }

  return false;
}

var MenuButton = __WEBPACK_IMPORTED_MODULE_0__Button__["a" /* Button */].extend({
  init: function init(settings) {
    var self = this;

    self._renderOpen = true;
    self._super(settings);
    settings = self.settings;
    self.classes.add('menubtn');

    if (settings.fixedWidth) {
      self.classes.add('fixed-width');
    }

    self.aria('haspopup', true);
    self.state.set('menu', settings.menu || self.render());
  },
  showMenu: function showMenu(toggle) {
    var menu = void 0;
    var self = this;

    if (self.menu && self.menu.visible() && toggle !== false) {
      return self.hideMenu();
    }

    if (!self.menu) {
      menu = self.state.get('menu') || [];
      self.classes.add('opened');

      if (menu.length) {
        menu = {
          type: 'menu',
          animate: true,
          items: menu
        };
      } else {
        menu.type = menu.type || 'menu';
        menu.animate = true;
      }

      if (!menu.renderTo) {
        self.menu = __WEBPACK_IMPORTED_MODULE_2__Factory__["a" /* Factory */].create(menu).parent(self).renderTo();
      } else {
        self.menu = menu.parent(self).show().renderTo();
      }

      self.fire('createmenu');
      self.menu.reflow();

      self.menu.on('cancel', function (e) {
        if (e.control.parent() === self.menu) {
          e.stopPropagation();
          self.focus();
          self.hideMenu();
        }
      });

      self.menu.on('select', function () {
        self.focus();
      });

      self.menu.on('show hide', function (e) {
        if (e.control === self.menu) {
          self.activeMenu(e.type === 'show');
          self.classes.toggle('opened', e.type === 'show');
        }
        self.aria('expanded', e.type === 'show');
      }).fire('show');
    }

    self.menu.show();
    self.menu.layoutRect({ w: self.layoutRect().w });
    self.menu.repaint();
    self.menu.moveRel(self.getEl(), self.isRtl() ? ['br-tr', 'tr-br'] : ['bl-tl', 'tl-bl']);
    self.fire('showmenu');
  },
  hideMenu: function hideMenu() {
    var self = this;

    if (self.menu) {
      self.menu.items().each(function (item) {
        if (item.hideMenu) {
          item.hideMenu();
        }
      });

      self.menu.hide();
    }
  },
  activeMenu: function activeMenu(state) {
    this.classes.toggle('active', state);
  },
  renderHtml: function renderHtml() {
    var image = void 0;
    var self = this;
    var id = self._id;
    var prefix = self.classPrefix;
    var icon = self.settings.icon;
    var text = self.state.get('text');
    var textHtml = '';

    image = self.settings.image;
    if (image) {
      icon = 'none';

      if (typeof image !== 'string') {
        image = window.getSelection ? image[0] : image[1];
      }
      image = ' style="background-image: url(\'' + image + '\')"';
    } else {
      image = '';
    }

    if (text) {
      self.classes.add('btn-has-text');
      textHtml = '<span class="' + prefix + 'txt">' + self.encode(text) + '</span>';
    }

    if (self.settings.icon) {
      icon = prefix + 'ico ' + prefix + 'i-' + icon;
    } else {
      icon = '';
    }

    self.aria('role', self.parent() instanceof __WEBPACK_IMPORTED_MODULE_1__MenuBar__["a" /* MenuBar */] ? 'menuitem' : 'button');

    return '<div id="' + id + '" class="' + self.classes + '" tabindex="-1" aria-labelledby="' + id + '">\n<button id="' + id + '-open" role="presentation" type="button" \ntabindex="-1">' + (icon ? '<i class="' + icon + '"' + image + '></i>' : '') + textHtml + ' \n<i class="' + prefix + 'caret"></i></button></div>';
  },
  postRender: function postRender() {
    var self = this;

    self.on('click', function (e) {
      if (e.control === self && isChildOf(e.target, self.getEl())) {
        self.focus();
        self.showMenu(!e.aria);

        if (e.aria) {
          self.menu.items().filter(':visible')[0].focus();
        }
      }
    });

    self.on('mouseenter', function (e) {
      var overCtrl = e.control;
      var parent = self.parent();
      var hasVisibleSiblingMenu = void 0;

      if (overCtrl && parent && overCtrl instanceof MenuButton && overCtrl.parent() === parent) {
        parent.items().filter('MenuButton').each(function (ctrl) {
          if (ctrl.hideMenu && ctrl !== overCtrl) {
            if (ctrl.menu && ctrl.menu.visible()) {
              hasVisibleSiblingMenu = true;
            }
            ctrl.hideMenu();
          }
        });

        if (hasVisibleSiblingMenu) {
          overCtrl.focus();
          overCtrl.showMenu();
        }
      }
    });

    return self._super();
  },
  bindStates: function bindStates() {
    var self = this;

    self.state.on('change:menu', function () {
      if (self.menu) {
        self.menu.remove();
      }

      self.menu = null;
    });

    return self._super();
  },
  remove: function remove() {
    this._super();

    if (this.menu) {
      this.menu.remove();
    }
  }
});



/***/ }),
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComboBox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VK__ = __webpack_require__(619);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__funcs__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Widget__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Factory__ = __webpack_require__(40);









var ComboBox = __WEBPACK_IMPORTED_MODULE_4__Widget__["a" /* Widget */].extend({
  init: function init(settings) {
    var self = this;
    self._super(settings);
    settings = self.settings;
    self.classes.add('combobox');
    self.subinput = true;
    self.ariaTarget = 'inp';
    settings.menu = settings.menu || settings.values;

    if (settings.menu) {
      settings.icon = 'caret';
    }

    self.on('click', function (e) {
      var elm = e.target;
      var root = self.getEl();

      if (!__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */].contains(root, elm) && elm !== root) {
        return;
      }

      while (elm && elm !== root) {
        if (elm.id && elm.id.indexOf('-open') !== -1) {
          self.fire('action');

          if (settings.menu) {
            self.showMenu();

            if (e.aria) {
              self.menu.items()[0].focus();
            }
          }
        }

        elm = elm.parentNode;
      }
    });

    self.on('keydown', function (e) {
      var rootControl = void 0;

      if (e.keyCode === 13 && e.target.nodeName === 'INPUT') {
        e.preventDefault();

        self.parents().reverse().each(function (ctrl) {
          if (ctrl.toJSON) {
            rootControl = ctrl;

            return false;
          }
        });

        self.fire('submit', { data: rootControl.toJSON() });
      }
    });

    self.on('keyup', function (e) {
      if (e.target.nodeName === 'INPUT') {
        var oldValue = self.state.get('value');
        var newValue = e.target.value;

        if (newValue !== oldValue) {
          self.state.set('value', newValue);
          self.fire('autocomplete', e);
        }
      }
    });

    self.on('mouseover', function (e) {
      var tooltip = self.tooltip().moveTo(-65535);

      if (self.statusLevel() && e.target.className.indexOf(self.classPrefix + 'status') !== -1) {
        var statusMessage = self.statusMessage() || 'Ok';
        var rel = tooltip.text(statusMessage).show().testMoveRel(e.target, ['bc-tc', 'bc-tl', 'bc-tr']);

        tooltip.classes.toggle('tooltip-n', rel === 'bc-tc');
        tooltip.classes.toggle('tooltip-nw', rel === 'bc-tl');
        tooltip.classes.toggle('tooltip-ne', rel === 'bc-tr');
        tooltip.moveRel(e.target, rel);
      }
    });
  },
  statusLevel: function statusLevel(value) {
    if (arguments.length > 0) {
      this.state.set('statusLevel', value);
    }

    return this.state.get('statusLevel');
  },
  statusMessage: function statusMessage(value) {
    if (arguments.length > 0) {
      this.state.set('statusMessage', value);
    }

    return this.state.get('statusMessage');
  },
  showMenu: function showMenu() {
    var menu = void 0;
    var self = this;
    var settings = self.settings;

    if (!self.menu) {
      menu = settings.menu || [];

      if (menu.length) {
        menu = {
          type: 'menu',
          items: menu
        };
      } else {
        menu.type = menu.type || 'menu';
      }

      self.menu = __WEBPACK_IMPORTED_MODULE_5__Factory__["a" /* Factory */].create(menu).parent(self).renderTo(self.getContainerElm());
      self.fire('createmenu');
      self.menu.reflow();

      self.menu.on('cancel', function (e) {
        if (e.control === self.menu) {
          self.focus();
        }
      });

      self.menu.on('show hide', function (e) {
        e.control.items().each(function (ctrl) {
          ctrl.active(ctrl.value() === self.value());
        });
      }).fire('show');

      self.menu.on('select', function (e) {
        self.value(e.control.value());
      });

      self.on('focusin', function (e) {
        if (e.target.tagName.toUpperCase() === 'INPUT') {
          self.menu.hide();
        }
      });

      self.aria('expanded', true);
    }

    self.menu.show();
    self.menu.layoutRect({ w: self.layoutRect().w });
    self.menu.moveRel(self.getEl(), self.isRtl() ? ['br-tr', 'tr-br'] : ['bl-tl', 'tl-bl']);
  },
  focus: function focus() {
    this.getEl('inp').focus();
  },
  repaint: function repaint() {
    var width = void 0,
        lineHeight = void 0;
    var self = this;
    var elm = self.getEl();
    var openElm = self.getEl('open');
    var rect = self.layoutRect();
    var innerPadding = 0;
    var inputElm = elm.firstChild;

    if (self.statusLevel() && self.statusLevel() !== 'none') {
      innerPadding = parseInt(__WEBPACK_IMPORTED_MODULE_3__funcs__["a" /* funcs */].getRuntimeStyle(inputElm, 'padding-right'), 10) - parseInt(__WEBPACK_IMPORTED_MODULE_3__funcs__["a" /* funcs */].getRuntimeStyle(inputElm, 'padding-left'), 10);
    }

    if (openElm) {
      width = rect.w - __WEBPACK_IMPORTED_MODULE_3__funcs__["a" /* funcs */].getSize(openElm).width - 10;
    } else {
      width = rect.w - 10;
    }

    var doc = document;

    if (doc.all && (!doc.documentMode || doc.documentMode <= 8)) {
      lineHeight = self.layoutRect().h - 2 + 'px';
    }

    Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(inputElm).css({
      width: width - innerPadding,
      lineHeight: lineHeight
    });

    self._super();

    return self;
  },
  postRender: function postRender() {
    var self = this;

    Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(this.getEl('inp')).on('change', function (e) {
      self.state.set('value', e.target.value);
      self.fire('change', e);
    });

    return self._super();
  },
  renderHtml: function renderHtml() {
    var icon = void 0,
        text = void 0;
    var self = this;
    var id = self._id;
    var settings = self.settings;
    var prefix = self.classPrefix;
    var value = self.state.get('value') || '';
    var openBtnHtml = '';
    var extraAttrs = '';
    var statusHtml = '';

    if ('spellcheck' in settings) {
      extraAttrs += ' spellcheck="' + settings.spellcheck + '"';
    }

    if (settings.maxLength) {
      extraAttrs += ' maxlength="' + settings.maxLength + '"';
    }

    if (settings.size) {
      extraAttrs += ' size="' + settings.size + '"';
    }

    if (settings.subtype) {
      extraAttrs += ' type="' + settings.subtype + '"';
    }

    statusHtml = '<i id="' + id + '-status" class="mce-status mce-ico" style="display: none"></i>';

    if (self.disabled()) {
      extraAttrs += ' disabled="disabled"';
    }

    icon = settings.icon;

    if (icon && icon !== 'caret') {
      icon = prefix + 'ico ' + prefix + 'i-' + settings.icon;
    }

    text = self.state.get('text');

    if (icon || text) {
      openBtnHtml = '<div id="' + id + '-open" class="' + prefix + 'btn ' + prefix + 'open" \ntabIndex="-1" role="button"><button id="' + id + '-action" type="button" hidefocus="1" \ntabindex="-1">' + (icon !== 'caret' ? '<i class="' + icon + '"></i>' : '<i class="' + prefix + 'caret"></i>') + '\n' + (text ? (icon ? ' ' : '') + text : '') + '</button></div>';

      self.classes.add('has-open');
    }

    return '<div id="' + id + '" class="' + self.classes + '"><input id="' + id + '-inp" class="' + prefix + 'textbox" \nvalue="' + self.encode(value, false) + '" hidefocus="1"' + extraAttrs + ' placeholder="\n' + self.encode(settings.placeholder) + '" />' + statusHtml + openBtnHtml + '</div>';
  },
  value: function value(_value) {
    if (arguments.length) {
      this.state.set('value', _value);

      return this;
    }

    if (this.state.get('rendered')) {
      this.state.set('value', this.getEl('inp').value);
    }

    return this.state.get('value');
  },
  showAutoComplete: function showAutoComplete(items, term) {
    var self = this;

    if (items.length === 0) {
      self.hideMenu();

      return;
    }

    var insert = function insert(value, title) {
      return function () {
        self.fire('selectitem', {
          title: title,
          value: value
        });
      };
    };

    if (self.menu) {
      self.menu.items().remove();
    } else {
      self.menu = __WEBPACK_IMPORTED_MODULE_5__Factory__["a" /* Factory */].create({
        type: 'menu',
        classes: 'combobox-menu',
        layout: 'flow'
      }).parent(self).renderTo();
    }

    __WEBPACK_IMPORTED_MODULE_2__Tools__["a" /* Tools */].each(items, function (item) {
      self.menu.add({
        text: item.title,
        url: item.previewUrl,
        match: term,
        classes: 'menu-item-ellipsis',
        onclick: insert(item.value, item.title)
      });
    });

    self.menu.renderNew();
    self.hideMenu();

    self.menu.on('cancel', function (e) {
      if (e.control.parent() === self.menu) {
        e.stopPropagation();
        self.focus();
        self.hideMenu();
      }
    });

    self.menu.on('select', function () {
      self.focus();
    });

    var maxW = self.layoutRect().w;

    self.menu.layoutRect({
      w: maxW,
      minW: 0,
      maxW: maxW
    });

    self.menu.repaint();
    self.menu.reflow();
    self.menu.show();
    self.menu.moveRel(self.getEl(), self.isRtl() ? ['br-tr', 'tr-br'] : ['bl-tl', 'tl-bl']);
  },
  hideMenu: function hideMenu() {
    if (this.menu) {
      this.menu.hide();
    }
  },
  bindStates: function bindStates() {
    var self = this;

    self.state.on('change:value', function (e) {
      if (self.getEl('inp').value !== e.value) {
        self.getEl('inp').value = e.value;
      }
    });

    self.state.on('change:disabled', function (e) {
      self.getEl('inp').disabled = e.value;
    });

    self.state.on('change:statusLevel', function (e) {
      var statusIconElm = self.getEl('status');
      var prefix = self.classPrefix;
      var value = e.value;

      __WEBPACK_IMPORTED_MODULE_3__funcs__["a" /* funcs */].css(statusIconElm, 'display', value === 'none' ? 'none' : '');
      __WEBPACK_IMPORTED_MODULE_3__funcs__["a" /* funcs */].toggleClass(statusIconElm, prefix + 'i-checkmark', value === 'ok');
      __WEBPACK_IMPORTED_MODULE_3__funcs__["a" /* funcs */].toggleClass(statusIconElm, prefix + 'i-warning', value === 'warn');
      __WEBPACK_IMPORTED_MODULE_3__funcs__["a" /* funcs */].toggleClass(statusIconElm, prefix + 'i-error', value === 'error');
      self.classes.toggle('has-status', value !== 'none');
      self.repaint();
    });

    __WEBPACK_IMPORTED_MODULE_3__funcs__["a" /* funcs */].on(self.getEl('status'), 'mouseleave', function () {
      self.tooltip().hide();
    });

    self.on('cancel', function (e) {
      if (self.menu && self.menu.visible()) {
        e.stopPropagation();
        self.hideMenu();
      }
    });

    var focusIdx = function focusIdx(idx, menu) {
      if (menu && menu.items().length > 0) {
        menu.items().eq(idx)[0].focus();
      }
    };

    self.on('keydown', function (e) {
      var keyCode = e.keyCode;

      if (e.target.nodeName === 'INPUT') {
        if (keyCode === __WEBPACK_IMPORTED_MODULE_1__VK__["a" /* VK */].DOWN) {
          e.preventDefault();

          self.fire('autocomplete');
          focusIdx(0, self.menu);
        } else if (keyCode === __WEBPACK_IMPORTED_MODULE_1__VK__["a" /* VK */].UP) {
          e.preventDefault();

          focusIdx(-1, self.menu);
        }
      }
    });

    return self._super();
  },
  remove: function remove() {
    Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(this.getEl('inp')).off();

    if (this.menu) {
      this.menu.remove();
    }

    this._super();
  }
});



/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Nus; });


var firstMatch = function firstMatch(regexes, s) {
  for (var i = 0; i < regexes.length; i++) {
    var x = regexes[i];

    if (x.test(s)) {
      return x;
    }
  }

  return undefined;
};

var find = function find(regexes, agent) {
  var r = firstMatch(regexes, agent);

  if (!r) {
    return { major: 0, minor: 0 };
  }

  var group = function group(i) {
    return Number(agent.replace(r, '$' + i));
  };

  return nu(group(1), group(2));
};

var detect = function detect(versionRegexes, agent) {
  var cleanedAgent = String(agent).toLowerCase();

  if (versionRegexes.length === 0) {
    return unknown();
  }

  return find(versionRegexes, cleanedAgent);
};

var unknown = function unknown() {
  return nu(0, 0);
};

var nu = function nu(major, minor) {
  return { major: major, minor: minor };
};

var Nus = { nu: nu, detect: detect, unknown: unknown };



/***/ }),
/* 181 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectorUtils; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Body__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Types__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Retrieve__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ObjectTools__ = __webpack_require__(19);







var ELEMENT = __WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Types */].ELEMENT;
var DOCUMENT = __WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Types */].DOCUMENT;

var is = function is(element, selector) {
  var elem = element.dom();

  if (elem.nodeType !== ELEMENT) {
    return false;
  } else if (elem.matches !== undefined) {
    return elem.matches(selector);
  } else if (elem.msMatchesSelector !== undefined) {
    return elem.msMatchesSelector(selector);
  } else if (elem.webkitMatchesSelector !== undefined) {
    return elem.webkitMatchesSelector(selector);
  } else if (elem.mozMatchesSelector !== undefined) {
    return elem.mozMatchesSelector(selector);
  } else {
    throw new Error('Browser lacks native selectors');
  }
};

var bypassSelector = function bypassSelector(dom) {
  return dom.nodeType !== ELEMENT && dom.nodeType !== DOCUMENT || dom.childElementCount === 0;
};

var all = function all(selector, scope) {
  var base = scope === undefined ? document : scope.dom();

  return bypassSelector(base) ? [] : __WEBPACK_IMPORTED_MODULE_3__ObjectTools__["a" /* ObjectTools */].map(base.querySelectorAll(selector), __WEBPACK_IMPORTED_MODULE_0__Body__["a" /* Body */].fromDom);
};

var one = function one(selector, scope) {
  var base = scope === undefined ? document : scope.dom();

  return bypassSelector(base) ? __WEBPACK_IMPORTED_MODULE_2__Retrieve__["a" /* Retrieve */].none() : __WEBPACK_IMPORTED_MODULE_2__Retrieve__["a" /* Retrieve */].from(base.querySelector(selector)).map(__WEBPACK_IMPORTED_MODULE_0__Body__["a" /* Body */].fromDom);
};

var SelectorUtils = { all: all, is: is, one: one };



/***/ }),
/* 182 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditorManager; });


var EditorManager = tinymce.util.Tools.resolve('tinymce.EditorManager');



/***/ }),
/* 183 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToolbarCreator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Factory__ = __webpack_require__(40);





var getToolbars = function getToolbars(editor) {
  var toolbar = editor.getParam('toolbar');
  var defaultToolbar = 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image';

  if (toolbar === false) {
    return [];
  } else if (__WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].isArray(toolbar)) {
    return __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].grep(toolbar, function (toolbar) {
      return toolbar.length > 0;
    });
  } else {
    return getIndexedToolbars(editor.settings, defaultToolbar);
  }
};

var getIndexedToolbars = function getIndexedToolbars(settings, defaultToolbar) {
  var toolbars = [];

  for (var i = 1; i < 10; i++) {
    var tb = settings['toolbar' + i];

    if (!tb) {
      break;
    }

    toolbars.push(tb);
  }

  var mainToolbar = settings.toolbar ? [settings.toolbar] : [defaultToolbar];

  return toolbars.length > 0 ? toolbars : mainToolbar;
};

var createToolbar = function createToolbar(editor, items, size) {
  var toolbarItems = [];
  var buttonGroup = void 0;

  if (!items) {
    return;
  }

  __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].each(items.split(/[ ,]/), function (item) {
    var itemName = void 0;
    var bindSelectorChanged = function bindSelectorChanged() {
      var selection = editor.selection;

      if (item.settings.stateSelector) {
        selection.selectorChanged(item.settings.stateSelector, function (state) {
          item.active(state);
        }, true);
      }

      if (item.settings.disabledStateSelector) {
        selection.selectorChanged(item.settings.disabledStateSelector, function (state) {
          item.disabled(state);
        });
      }
    };

    if (item === '|') {
      buttonGroup = null;
    } else {
      if (!buttonGroup) {
        buttonGroup = {
          type: 'buttongroup',
          items: []
        };

        toolbarItems.push(buttonGroup);
      }

      if (editor.buttons[item]) {
        itemName = item;
        item = editor.buttons[itemName];

        if (typeof item === 'function') {
          item = item();
        }

        item.type = item.type || 'button';
        item.size = size;
        item = __WEBPACK_IMPORTED_MODULE_1__Factory__["a" /* Factory */].create(item);
        buttonGroup.items.push(item);

        if (editor.initialized) {
          bindSelectorChanged();
        } else {
          editor.on('init', bindSelectorChanged);
        }
      }
    }
  });

  return {
    type: 'toolbar',
    layout: 'flow',
    items: toolbarItems
  };
};

var createToolbars = function createToolbars(editor, size) {
  var toolbars = [];

  var addToolbar = function addToolbar(items) {
    if (items) {
      toolbars.push(createToolbar(editor, items, size));
    }
  };

  __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].each(getToolbars(editor), function (toolbar) {
    addToolbar(toolbar);
  });

  if (toolbars.length) {
    return {
      type: 'panel',
      layout: 'stack',
      classes: 'toolbar-grp',
      ariaRoot: true,
      ariaRemember: true,
      items: toolbars
    };
  }
};

var ToolbarCreator = { createToolbar: createToolbar, createToolbars: createToolbars };



/***/ }),
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Box; });


var Box = {
  parseBox: function parseBox(value) {
    var len = void 0;
    var radix = 10;

    if (!value) {
      return;
    }

    if (typeof value === 'number') {
      value = value || 0;

      return {
        top: value,
        left: value,
        bottom: value,
        right: value
      };
    }

    value = value.split(' ');
    len = value.length;

    if (len === 1) {
      value[1] = value[2] = value[3] = value[0];
    } else if (len === 2) {
      value[2] = value[0];
      value[3] = value[1];
    } else if (len === 3) {
      value[3] = value[1];
    }

    return {
      top: parseInt(value[0], radix) || 0,
      right: parseInt(value[1], radix) || 0,
      bottom: parseInt(value[2], radix) || 0,
      left: parseInt(value[3], radix) || 0
    };
  },
  measureBox: function measureBox(elm, prefix) {
    function getStyle(name) {
      var defaultView = elm.ownerDocument.defaultView;

      if (defaultView) {
        var computedStyle = defaultView.getComputedStyle(elm, null);

        if (computedStyle) {
          name = name.replace(/[A-Z]/g, function (a) {
            return '-' + a;
          });
          return computedStyle.getPropertyValue(name);
        } else {
          return null;
        }
      }

      return elm.currentStyle[name];
    }

    function getSide(name) {
      var val = parseFloat(getStyle(name));

      return isNaN(val) ? 0 : val;
    }

    return {
      top: getSide(prefix + 'TopWidth'),
      right: getSide(prefix + 'RightWidth'),
      bottom: getSide(prefix + 'BottomWidth'),
      left: getSide(prefix + 'LeftWidth')
    };
  }
};



/***/ }),
/* 234 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClassList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tools__ = __webpack_require__(5);




function noop() {}

function ClassList(onchange) {
  this.cls = [];
  this.cls._map = {};
  this.onchange = onchange || noop;
  this.prefix = '';
}

__WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].extend(ClassList.prototype, {
  add: function add(cls) {
    if (cls && !this.contains(cls)) {
      this.cls._map[cls] = true;
      this.cls.push(cls);
      this._change();
    }

    return this;
  },
  remove: function remove(cls) {
    if (this.contains(cls)) {
      var i = void 0;

      for (i = 0; i < this.cls.length; i++) {
        if (this.cls[i] === cls) {
          break;
        }
      }

      this.cls.splice(i, 1);

      delete this.cls._map[cls];

      this._change();
    }

    return this;
  },
  toggle: function toggle(cls, state) {
    var curState = this.contains(cls);

    if (curState !== state) {
      if (curState) {
        this.remove(cls);
      } else {
        this.add(cls);
      }

      this._change();
    }

    return this;
  },
  contains: function contains(cls) {
    return !!this.cls._map[cls];
  },
  _change: function _change() {
    delete this.clsValue;

    this.onchange.call(this);
  }
});

ClassList.prototype.toString = function () {
  var value = void 0;

  if (this.clsValue) {
    return this.clsValue;
  }

  value = '';

  for (var i = 0; i < this.cls.length; i++) {
    if (i > 0) {
      value += ' ';
    }

    value += this.prefix + this.cls[i];
  }

  return value;
};



/***/ }),
/* 235 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeyboardNavigation; });
/* eslint-disable no-cond-assign */


var hasTabstopData = function hasTabstopData(elm) {
  return !!elm.getAttribute('data-mce-tabstop');
};

function KeyboardNavigation(settings) {
  var focusedElement = void 0,
      focusedControl = void 0;
  var root = settings.root;

  function isElement(node) {
    return node && node.nodeType === 1;
  }

  try {
    focusedElement = document.activeElement;
  } catch (ex) {
    focusedElement = document.body;
  }

  focusedControl = root.getParentCtrl(focusedElement);

  function getRole(elm) {
    elm = elm || focusedElement;

    if (isElement(elm)) {
      return elm.getAttribute('role');
    }

    return null;
  }

  function getParentRole(elm) {
    var role = void 0;
    var parent = elm || focusedElement;

    while (parent = parent.parentNode) {
      if (role = getRole(parent)) {
        return role;
      }
    }
  }

  function getAriaProp(name) {
    var elm = focusedElement;

    if (isElement(elm)) {
      return elm.getAttribute('aria-' + name);
    }
  }

  function isTextInputElement(elm) {
    var tagName = elm.tagName.toUpperCase();

    return tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT';
  }

  function canFocus(elm) {
    if (isTextInputElement(elm) && !elm.hidden) {
      return true;
    }

    if (hasTabstopData(elm)) {
      return true;
    }

    if (/^(button|menuitem|checkbox|tab|menuitemcheckbox|option|gridcell|slider)$/.test(getRole(elm))) {
      return true;
    }

    return false;
  }
  function getFocusElements(elm) {
    var elements = [];

    function collect(elm) {
      if (elm.nodeType !== 1 || elm.style.display === 'none' || elm.disabled) {
        return;
      }

      if (canFocus(elm)) {
        elements.push(elm);
      }

      for (var i = 0; i < elm.childNodes.length; i++) {
        collect(elm.childNodes[i]);
      }
    }

    collect(elm || root.getEl());

    return elements;
  }

  function getNavigationRoot(targetControl) {
    var navigationRoot = void 0,
        controls = void 0;

    targetControl = targetControl || focusedControl;
    controls = targetControl.parents().toArray();
    controls.unshift(targetControl);

    for (var i = 0; i < controls.length; i++) {
      navigationRoot = controls[i];

      if (navigationRoot.settings.ariaRoot) {
        break;
      }
    }

    return navigationRoot;
  }

  function focusFirst(targetControl) {
    var navigationRoot = getNavigationRoot(targetControl);
    var focusElements = getFocusElements(navigationRoot.getEl());

    if (navigationRoot.settings.ariaRemember && 'lastAriaIndex' in navigationRoot) {
      moveFocusToIndex(navigationRoot.lastAriaIndex, focusElements);
    } else {
      moveFocusToIndex(0, focusElements);
    }
  }

  function moveFocusToIndex(idx, elements) {
    if (idx < 0) {
      idx = elements.length - 1;
    } else if (idx >= elements.length) {
      idx = 0;
    }

    if (elements[idx]) {
      elements[idx].focus();
    }

    return idx;
  }

  function moveFocus(dir, elements) {
    var idx = -1;
    var navigationRoot = getNavigationRoot();

    elements = elements || getFocusElements(navigationRoot.getEl());

    for (var i = 0; i < elements.length; i++) {
      if (elements[i] === focusedElement) {
        idx = i;
      }
    }

    idx += dir;
    navigationRoot.lastAriaIndex = moveFocusToIndex(idx, elements);
  }

  function left() {
    var parentRole = getParentRole();

    if (parentRole === 'tablist') {
      moveFocus(-1, getFocusElements(focusedElement.parentNode));
    } else if (focusedControl.parent().submenu) {
      cancel();
    } else {
      moveFocus(-1);
    }
  }

  function right() {
    var role = getRole();
    var parentRole = getParentRole();

    if (parentRole === 'tablist') {
      moveFocus(1, getFocusElements(focusedElement.parentNode));
    } else if (role === 'menuitem' && parentRole === 'menu' && getAriaProp('haspopup')) {
      enter();
    } else {
      moveFocus(1);
    }
  }

  function up() {
    moveFocus(-1);
  }

  function down() {
    var role = getRole();
    var parentRole = getParentRole();

    if (role === 'menuitem' && parentRole === 'menubar') {
      enter();
    } else if (role === 'button' && getAriaProp('haspopup')) {
      enter({ key: 'down' });
    } else {
      moveFocus(1);
    }
  }

  function tab(e) {
    var parentRole = getParentRole();

    if (parentRole === 'tablist') {
      var elm = getFocusElements(focusedControl.getEl('body'))[0];

      if (elm) {
        elm.focus();
      }
    } else {
      moveFocus(e.shiftKey ? -1 : 1);
    }
  }

  function cancel() {
    focusedControl.fire('cancel');
  }

  function enter(aria) {
    aria = aria || {};

    focusedControl.fire('click', {
      target: focusedElement,
      aria: aria
    });
  }

  root.on('keydown', function (e) {
    function handleNonTabOrEscEvent(e, handler) {
      if (isTextInputElement(focusedElement) || hasTabstopData(focusedElement)) {
        return;
      }

      if (getRole(focusedElement) === 'slider') {
        return;
      }

      if (handler(e) !== false) {
        e.preventDefault();
      }
    }

    if (e.isDefaultPrevented()) {
      return;
    }

    switch (e.keyCode) {
      case 37:
        handleNonTabOrEscEvent(e, left);
        break;
      case 39:
        handleNonTabOrEscEvent(e, right);
        break;
      case 38:
        handleNonTabOrEscEvent(e, up);
        break;
      case 40:
        handleNonTabOrEscEvent(e, down);
        break;
      case 27:
        cancel();
        break;
      case 14:
      case 13:
      case 32:
        handleNonTabOrEscEvent(e, enter);
        break;
      case 9:
        tab(e);
        e.preventDefault();
        break;
    }
  });

  root.on('focusin', function (e) {
    focusedElement = e.target;
    focusedControl = e.control;
  });

  return { focusFirst: focusFirst };
}



/***/ }),
/* 236 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Scrollable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DragHelper__ = __webpack_require__(74);





var Scrollable = {
  init: function init() {
    var self = this;
    self.on('repaint', self.renderScroll);
  },
  renderScroll: function renderScroll() {
    var self = this;
    var margin = 2;

    function repaintScroll() {
      var hasScrollH = void 0,
          hasScrollV = void 0,
          bodyElm = void 0;

      function repaintAxis(axisName, posName, sizeName, contentSizeName, hasScroll, ax) {
        var containerElm = void 0,
            scrollBarElm = void 0,
            scrollThumbElm = void 0;
        var containerSize = void 0,
            scrollSize = void 0,
            ratio = void 0,
            rect = void 0;
        var posNameLower = void 0,
            sizeNameLower = void 0;

        scrollBarElm = self.getEl('scroll' + axisName);

        if (scrollBarElm) {
          posNameLower = posName.toLowerCase();
          sizeNameLower = sizeName.toLowerCase();
          Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(self.getEl('absend')).css(posNameLower, self.layoutRect()[contentSizeName] - 1);

          if (!hasScroll) {
            Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(scrollBarElm).css('display', 'none');
            return;
          }

          Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(scrollBarElm).css('display', 'block');

          containerElm = self.getEl('body');
          scrollThumbElm = self.getEl('scroll' + axisName + 't');
          containerSize = containerElm['client' + sizeName] - margin * 2;
          containerSize -= hasScrollH && hasScrollV ? scrollBarElm['client' + ax] : 0;
          scrollSize = containerElm['scroll' + sizeName];
          ratio = containerSize / scrollSize;
          rect = {};
          rect[posNameLower] = containerElm['offset' + posName] + margin;
          rect[sizeNameLower] = containerSize;

          Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(scrollBarElm).css(rect);

          rect = {};
          rect[posNameLower] = containerElm['scroll' + posName] * ratio;
          rect[sizeNameLower] = containerSize * ratio;

          Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(scrollThumbElm).css(rect);
        }
      }

      bodyElm = self.getEl('body');
      hasScrollH = bodyElm.scrollWidth > bodyElm.clientWidth;
      hasScrollV = bodyElm.scrollHeight > bodyElm.clientHeight;

      repaintAxis('h', 'Left', 'Width', 'contentW', hasScrollH, 'Height');
      repaintAxis('v', 'Top', 'Height', 'contentH', hasScrollV, 'Width');
    }

    function addScroll() {
      function addScrollAxis(axisName, posName, sizeName, deltaPosName, ax) {
        var scrollStart = void 0;
        var axisId = self._id + '-scroll' + axisName;
        var prefix = self.classPrefix;

        Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(self.getEl()).append('<div id="' + axisId + '" class="' + prefix + 'scrollbar ' + prefix + 'scrollbar-' + axisName + '"><div id="' + axisId + 't" class="' + prefix + 'scrollbar-thumb"></div></div>');

        self.draghelper = new __WEBPACK_IMPORTED_MODULE_1__DragHelper__["a" /* DragHelper */](axisId + 't', {
          start: function start() {
            scrollStart = self.getEl('body')['scroll' + posName];
            Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])('#' + axisId).addClass(prefix + 'active');
          },
          drag: function drag(e) {
            var ratio = void 0,
                hasScrollH = void 0,
                hasScrollV = void 0,
                containerSize = void 0;
            var layoutRect = self.layoutRect();

            hasScrollH = layoutRect.contentW > layoutRect.innerW;
            hasScrollV = layoutRect.contentH > layoutRect.innerH;
            containerSize = self.getEl('body')['client' + sizeName] - margin * 2;

            containerSize -= hasScrollH && hasScrollV ? self.getEl('scroll' + axisName)['client' + ax] : 0;

            ratio = containerSize / self.getEl('body')['scroll' + sizeName];

            self.getEl('body')['scroll' + posName] = scrollStart + e['delta' + deltaPosName] / ratio;
          },
          stop: function stop() {
            Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])('#' + axisId).removeClass(prefix + 'active');
          }
        });
      }

      self.classes.add('scroll');

      addScrollAxis('v', 'Top', 'Height', 'Y', 'Width');
      addScrollAxis('h', 'Left', 'Width', 'X', 'Height');
    }

    if (self.settings.autoScroll) {
      if (!self._hasScroll) {
        self._hasScroll = true;
        addScroll();

        self.on('wheel', function (e) {
          var bodyEl = self.getEl('body');

          bodyEl.scrollLeft += (e.deltaX || 0) * 10;
          bodyEl.scrollTop += e.deltaY * 10;

          repaintScroll();
        });

        Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(self.getEl('body')).on('scroll', repaintScroll);
      }
      repaintScroll();
    }
  }
};



/***/ }),
/* 237 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Resizable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__funcs__ = __webpack_require__(16);




var Resizable = {
  resizeToContent: function resizeToContent() {
    this._layoutRect.autoResize = true;
    this._lastRect = null;

    this.reflow();
  },
  resizeTo: function resizeTo(w, h) {
    if (w <= 1 || h <= 1) {
      var rect = __WEBPACK_IMPORTED_MODULE_0__funcs__["a" /* funcs */].getWindowSize();

      w = w <= 1 ? w * rect.w : w;
      h = h <= 1 ? h * rect.h : h;
    }

    this._layoutRect.autoResize = false;

    return this.layoutRect({
      minW: w,
      minH: h,
      w: w,
      h: h
    }).reflow();
  },
  resizeBy: function resizeBy(dw, dh) {
    var self = this;
    var rect = self.layoutRect();

    return self.resizeTo(rect.w + dw, rect.h + dh);
  }
};



/***/ }),
/* 238 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Path; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Widget__ = __webpack_require__(13);
/* eslint-disable no-cond-assign */




var Path = __WEBPACK_IMPORTED_MODULE_0__Widget__["a" /* Widget */].extend({
  init: function init(settings) {
    var self = this;

    if (!settings.delimiter) {
      settings.delimiter = '\xBB';
    }

    self._super(settings);
    self.classes.add('path');
    self.canFocus = true;

    self.on('click', function (e) {
      var index = void 0;
      var target = e.target;

      if (index = target.getAttribute('data-index')) {
        self.fire('select', {
          value: self.row()[index],
          index: index
        });
      }
    });

    self.row(self.settings.row);
  },
  focus: function focus() {
    var self = this;

    self.getEl().firstChild.focus();

    return self;
  },
  row: function row(_row) {
    if (!arguments.length) {
      return this.state.get('row');
    }

    this.state.set('row', _row);

    return this;
  },
  renderHtml: function renderHtml() {
    var self = this;
    return '<div id="' + self._id + '" class="' + self.classes + '">\n' + self._getDataPathHtml(self.state.get('row')) + '</div>';
  },
  bindStates: function bindStates() {
    var self = this;

    self.state.on('change:row', function (e) {
      self.innerHtml(self._getDataPathHtml(e.value));
    });

    return self._super();
  },
  _getDataPathHtml: function _getDataPathHtml(data) {
    var i = void 0,
        l = void 0;
    var self = this;
    var parts = data || [];
    var html = '';
    var prefix = self.classPrefix;

    for (i = 0, l = parts.length; i < l; i++) {
      html += (i > 0 ? '<div class="' + prefix + 'divider" ' + 'aria-hidden="true"> ' + self.settings.delimiter + ' </div>' : '') + '<div \nrole="button" class="' + prefix + 'path-item' + (i === l - 1 ? ' ' + prefix + 'last' : '') + '" \ndata-index="' + i + '" tabindex="-1" id="' + self._id + '-' + i + '" aria-level="' + (i + 1) + '">' + parts[i].name + '</div>';
    }

    if (!html) {
      html = '<div class="' + prefix + 'path-item">\xA0</div>';
    }

    return html;
  }
});



/***/ }),
/* 239 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tooltip; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Movable__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Control__ = __webpack_require__(63);





var Tooltip = __WEBPACK_IMPORTED_MODULE_1__Control__["a" /* Control */].extend({
  Mixins: [__WEBPACK_IMPORTED_MODULE_0__Movable__["a" /* Movable */]],
  Defaults: { classes: 'widget tooltip tooltip-n' },
  renderHtml: function renderHtml() {
    var self = this;
    var prefix = self.classPrefix;

    return '<div id="' + self._id + '" class="' + self.classes + '" role="presentation"><div class="' + prefix + 'tooltip-arrow"></div><div class="' + prefix + 'tooltip-inner">' + self.encode(self.state.get('text')) + '</div></div>';
  },
  bindStates: function bindStates() {
    var self = this;

    self.state.on('change:text', function (e) {
      self.getEl().lastChild.innerHTML = self.encode(e.value);
    });

    return self._super();
  },
  repaint: function repaint() {
    var style = void 0,
        rect = void 0;
    var self = this;

    style = self.getEl().style;
    rect = self._layoutRect;
    style.left = rect.x + 'px';
    style.top = rect.y + 'px';
    style.zIndex = 65535 + 65535;
  }
});



/***/ }),
/* 240 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Menu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Env__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Delay__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Throbber__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__FloatPanel__ = __webpack_require__(75);








var Menu = __WEBPACK_IMPORTED_MODULE_4__FloatPanel__["a" /* FloatPanel */].extend({
  Defaults: {
    defaultType: 'menuitem',
    border: 1,
    layout: 'stack',
    role: 'application',
    bodyRole: 'menu',
    ariaRoot: true
  },
  init: function init(settings) {
    var self = this;

    settings.autohide = true;
    settings.constrainToViewport = true;

    if (typeof settings.items === 'function') {
      settings.itemsFactory = settings.items;
      settings.items = [];
    }

    if (settings.itemDefaults) {
      var items = settings.items;
      var i = items.length;

      while (i--) {
        items[i] = __WEBPACK_IMPORTED_MODULE_1__Tools__["a" /* Tools */].extend({}, settings.itemDefaults, items[i]);
      }
    }

    self._super(settings);
    self.classes.add('menu');

    if (settings.animate && __WEBPACK_IMPORTED_MODULE_0__Env__["a" /* Env */].ie !== 11) {
      self.classes.add('animate');
    }
  },
  repaint: function repaint() {
    this.classes.toggle('menu-align', true);
    this._super();
    this.getEl().style.height = '';
    this.getEl('body').style.height = '';

    return this;
  },
  cancel: function cancel() {
    var self = this;

    self.hideAll();
    self.fire('select');
  },
  load: function load() {
    var time = void 0,
        factory = void 0;
    var self = this;

    function hideThrobber() {
      if (self.throbber) {
        self.throbber.hide();
        self.throbber = null;
      }
    }

    factory = self.settings.itemsFactory;

    if (!factory) {
      return;
    }

    if (!self.throbber) {
      self.throbber = new __WEBPACK_IMPORTED_MODULE_3__Throbber__["a" /* Throbber */](self.getEl('body'), true);

      if (self.items().length === 0) {
        self.throbber.show();
        self.fire('loading');
      } else {
        self.throbber.show(100, function () {
          self.items().remove();
          self.fire('loading');
        });
      }

      self.on('hide close', hideThrobber);
    }

    self.requestTime = time = new Date().getTime();

    self.settings.itemsFactory(function (items) {
      if (items.length === 0) {
        self.hide();
        return;
      }

      if (self.requestTime !== time) {
        return;
      }

      self.getEl().style.width = '';
      self.getEl('body').style.width = '';
      hideThrobber();
      self.items().remove();
      self.getEl('body').innerHTML = '';
      self.add(items);
      self.renderNew();
      self.fire('loaded');
    });
  },
  hideAll: function hideAll() {
    var self = this;

    this.find('menuitem').exec('hideMenu');

    return self._super();
  },
  preRender: function preRender() {
    var self = this;

    self.items().each(function (ctrl) {
      var settings = ctrl.settings;

      if (settings.icon || settings.image || settings.selectable) {
        self._hasIcons = true;
        return false;
      }
    });

    if (self.settings.itemsFactory) {
      self.on('postrender', function () {
        if (self.settings.itemsFactory) {
          self.load();
        }
      });
    }

    self.on('show hide', function (e) {
      if (e.control === self) {
        if (e.type === 'show') {
          __WEBPACK_IMPORTED_MODULE_2__Delay__["a" /* Delay */].setTimeout(function () {
            self.classes.add('in');
          }, 0);
        } else {
          self.classes.remove('in');
        }
      }
    });

    return self._super();
  }
});



/***/ }),
/* 241 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Form; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FormItem__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Container__ = __webpack_require__(73);






var Form = __WEBPACK_IMPORTED_MODULE_2__Container__["a" /* Container */].extend({
  Defaults: {
    containerCls: 'form',
    layout: 'flex',
    direction: 'column',
    align: 'stretch',
    flex: 1,
    padding: 15,
    labelGap: 30,
    spacing: 10,
    callbacks: {
      submit: function submit() {
        this.submit();
      }
    }
  },
  preRender: function preRender() {
    var self = this;
    var items = self.items();

    if (!self.settings.formItemDefaults) {
      self.settings.formItemDefaults = {
        layout: 'flex',
        autoResize: 'overflow',
        defaults: { flex: 1 }
      };
    }

    items.each(function (ctrl) {
      var formItem = void 0;
      var label = ctrl.settings.label;

      if (label) {
        formItem = new __WEBPACK_IMPORTED_MODULE_1__FormItem__["a" /* FormItem */](__WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].extend({
          items: {
            type: 'label',
            id: ctrl._id + '-l',
            text: label,
            flex: 0,
            forId: ctrl._id,
            disabled: ctrl.disabled()
          }
        }, self.settings.formItemDefaults));

        formItem.type = 'formitem';
        ctrl.aria('labelledby', ctrl._id + '-l');

        if (typeof ctrl.settings.flex === 'undefined') {
          ctrl.settings.flex = 1;
        }

        self.replace(ctrl, formItem);
        formItem.add(ctrl);
      }
    });
  },
  submit: function submit() {
    return this.fire('submit', { data: this.toJSON() });
  },
  postRender: function postRender() {
    var self = this;

    self._super();
    self.fromJSON(self.settings.data);
  },
  bindStates: function bindStates() {
    var self = this;
    self._super();

    function recalcLabels() {
      var i = void 0,
          labelGap = void 0,
          items = void 0;
      var maxLabelWidth = 0;
      var labels = [];

      if (self.settings.labelGapCalc === false) {
        return;
      }

      if (self.settings.labelGapCalc === 'children') {
        items = self.find('formitem');
      } else {
        items = self.items();
      }

      items.filter('formitem').each(function (item) {
        var labelCtrl = item.items()[0];
        var labelWidth = labelCtrl.getEl().clientWidth;

        maxLabelWidth = labelWidth > maxLabelWidth ? labelWidth : maxLabelWidth;

        labels.push(labelCtrl);
      });

      labelGap = self.settings.labelGap || 0;
      i = labels.length;

      while (i--) {
        labels[i].settings.minWidth = maxLabelWidth + labelGap;
      }
    }

    self.on('show', recalcLabels);

    recalcLabels();
  }
});



/***/ }),
/* 242 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormItem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Container__ = __webpack_require__(73);




var FormItem = __WEBPACK_IMPORTED_MODULE_0__Container__["a" /* Container */].extend({
  Defaults: {
    layout: 'flex',
    align: 'center',
    defaults: { flex: 1 }
  },
  renderHtml: function renderHtml() {
    var self = this;
    var layout = self._layout;
    var prefix = self.classPrefix;

    self.classes.add('formitem');
    layout.preRender(self);

    return '<div id="' + self._id + '" class="' + self.classes + '" hidefocus="1" \ntabindex="-1">' + (self.settings.title ? '<div id="' + self._id + '-title" class="' + prefix + 'title">' + self.settings.title + '</div>' : '') + '<div id="' + self._id + '-body" class="' + self.bodyClasses + '">' + (self.settings.html || '') + layout.renderHtml(self) + '</div>' + '</div>';
  }
});



/***/ }),
/* 243 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Checkbox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Widget__ = __webpack_require__(13);




var Checkbox = __WEBPACK_IMPORTED_MODULE_0__Widget__["a" /* Widget */].extend({
  Defaults: {
    classes: 'checkbox',
    role: 'checkbox',
    checked: false
  },
  init: function init(settings) {
    var self = this;

    self._super(settings);

    self.on('click mousedown', function (e) {
      e.preventDefault();
    });

    self.on('click', function (e) {
      e.preventDefault();

      if (!self.disabled()) {
        self.checked(!self.checked());
      }
    });

    self.checked(self.settings.checked);
  },
  checked: function checked(state) {
    if (!arguments.length) {
      return this.state.get('checked');
    }

    this.state.set('checked', state);

    return this;
  },
  value: function value(state) {
    if (!arguments.length) {
      return this.checked();
    }

    return this.checked(state);
  },
  renderHtml: function renderHtml() {
    var self = this;
    var id = self._id;
    var prefix = self.classPrefix;

    return '<div id="' + id + '" class="' + self.classes + '" unselectable="on" aria-labelledby="' + id + '-al" tabindex="-1"><i class="' + prefix + 'ico ' + prefix + 'i-checkbox"></i><span id="' + id + '-al" class="' + prefix + 'label">' + self.encode(self.state.get('text')) + '</span></div>';
  },
  bindStates: function bindStates() {
    var self = this;

    function checked(state) {
      self.classes.toggle('checked', state);
      self.aria('checked', state);
    }

    self.state.on('change:text', function (e) {
      self.getEl('al').firstChild.data = self.translate(e.value);
    });

    self.state.on('change:checked change:value', function (e) {
      self.fire('change');
      checked(e.value);
    });

    self.state.on('change:icon', function (e) {
      var icon = e.value;
      var prefix = self.classPrefix;

      if (typeof icon === 'undefined') {
        return self.settings.icon;
      }

      self.settings.icon = icon;
      icon = '' + (icon ? prefix + 'ico ' + prefix + 'i-' + self.settings.icon : '');

      var btnElm = self.getEl().firstChild;
      var iconElm = btnElm.getElementsByTagName('i')[0];

      if (icon) {
        if (!iconElm || iconElm !== btnElm.firstChild) {
          iconElm = document.createElement('i');
          btnElm.insertBefore(iconElm, btnElm.firstChild);
        }

        iconElm.className = icon;
      } else if (iconElm) {
        btnElm.removeChild(iconElm);
      }
    });

    if (self.state.get('checked')) {
      checked(true);
    }

    return self._super();
  }
});



/***/ }),
/* 244 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuBar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Toolbar__ = __webpack_require__(245);




var MenuBar = __WEBPACK_IMPORTED_MODULE_0__Toolbar__["a" /* Toolbar */].extend({
  Defaults: {
    role: 'menubar',
    containerCls: 'menubar',
    ariaRoot: true,
    defaults: { type: 'menubutton' }
  }
});



/***/ }),
/* 245 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Toolbar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Container__ = __webpack_require__(73);




var Toolbar = __WEBPACK_IMPORTED_MODULE_0__Container__["a" /* Container */].extend({
  Defaults: {
    role: 'toolbar',
    layout: 'flow'
  },
  init: function init(settings) {
    var self = this;
    self._super(settings);
    self.classes.add('toolbar');
  },
  postRender: function postRender() {
    var self = this;

    self.items().each(function (ctrl) {
      ctrl.classes.add('toolbar-item');
    });

    return self._super();
  }
});



/***/ }),
/* 246 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Progress; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Widget__ = __webpack_require__(13);




var Progress = __WEBPACK_IMPORTED_MODULE_0__Widget__["a" /* Widget */].extend({
  Defaults: { value: 0 },
  init: function init(settings) {
    var self = this;

    self._super(settings);
    self.classes.add('progress');

    if (!self.settings.filter) {
      self.settings.filter = function (value) {
        return Math.round(value);
      };
    }
  },
  renderHtml: function renderHtml() {
    var self = this;
    var id = self._id;
    var prefix = this.classPrefix;

    return '<div id="' + id + '" class="' + self.classes + '"><div class="' + prefix + 'bar-container"><div class="' + prefix + 'bar"></div></div><div class="' + prefix + 'text">0%</div></div>';
  },
  postRender: function postRender() {
    var self = this;

    self._super();
    self.value(self.settings.value);

    return self;
  },
  bindStates: function bindStates() {
    var self = this;

    function setValue(value) {
      value = self.settings.filter(value);
      self.getEl().lastChild.innerHTML = value + '%';
      self.getEl().firstChild.firstChild.style.width = value + '%';
    }

    self.state.on('change:value', function (e) {
      setValue(e.value);
    });

    setValue(self.state.get('value'));

    return self._super();
  }
});



/***/ }),
/* 247 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckType; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Types__ = __webpack_require__(248);




var name = function name(element) {
  return element.dom().nodeName.toLowerCase();
};
var type = function type(element) {
  return element.dom().nodeType;
};
var value = function value(element) {
  return element.dom().nodeValue;
};
var isType = function isType(t) {
  return function (element) {
    return type(element) === t;
  };
};
var isComment = function isComment(element) {
  return type(element) === __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Types */].COMMENT || name(element) === '#comment';
};

var isElement = isType(__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Types */].ELEMENT);
var isText = isType(__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Types */].TEXT);
var isDocument = isType(__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Types */].DOCUMENT);

var CheckType = {
  name: name,
  type: type,
  value: value,
  isElement: isElement,
  isText: isText,
  isDocument: isDocument,
  isComment: isComment
};



/***/ }),
/* 248 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Types; });


var Types = {
  ATTRIBUTE: 2,
  CDATA_SECTION: 4,
  COMMENT: 8,
  DOCUMENT: 9,
  DOCUMENT_TYPE: 10,
  DOCUMENT_FRAGMENT: 11,
  ELEMENT: 1,
  TEXT: 3,
  PROCESSING_INSTRUCTION: 7,
  ENTITY_REFERENCE: 5,
  ENTITY: 6,
  NOTATION: 12
};



/***/ }),
/* 249 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cache; });


var cached = function cached(f) {
  var called = false;
  var r = void 0;

  return function () {
    if (!called) {
      called = true;
      r = f.apply(null, arguments);
    }

    return r;
  };
};

var Cache = { cached: cached };



/***/ }),
/* 250 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Selection; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__UA__ = __webpack_require__(632);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SelectorUtils__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__DocPosition__ = __webpack_require__(641);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ObjectTools__ = __webpack_require__(19);








var eq = function eq(e1, e2) {
  return e1.dom() === e2.dom();
};
var isEqualNode = function isEqualNode(e1, e2) {
  return e1.dom().isEqualNode(e2.dom());
};
var ieContains = function ieContains(e1, e2) {
  return __WEBPACK_IMPORTED_MODULE_3__DocPosition__["a" /* DocPosition */].documentPositionContainedBy(e1.dom(), e2.dom());
};
var member = function member(element, elements) {
  return __WEBPACK_IMPORTED_MODULE_4__ObjectTools__["a" /* ObjectTools */].exists(elements, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utils */].curry(eq, element));
};

var regularContains = function regularContains(e1, e2) {
  var d1 = e1.dom();
  var d2 = e2.dom();

  return d1 === d2 ? false : d1.contains(d2);
};

var browser = __WEBPACK_IMPORTED_MODULE_1__UA__["a" /* UA */].detect().browser;
var contains = browser.isIE() ? ieContains : regularContains;

var Selection = {
  eq: eq,
  isEqualNode: isEqualNode,
  member: member,
  contains: contains,
  is: __WEBPACK_IMPORTED_MODULE_2__SelectorUtils__["a" /* SelectorUtils */].is
};



/***/ }),
/* 251 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageBox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Window__ = __webpack_require__(112);




var MessageBox = __WEBPACK_IMPORTED_MODULE_0__Window__["a" /* Window */].extend({
  init: function init(settings) {
    settings = {
      border: 1,
      padding: 20,
      layout: 'flex',
      pack: 'center',
      align: 'center',
      containerCls: 'panel',
      autoScroll: true,
      buttons: {
        type: 'button',
        text: 'Ok',
        action: 'ok'
      },
      items: {
        type: 'label',
        multiline: true,
        maxWidth: 500,
        maxHeight: 200
      }
    };

    this._super(settings);
  },
  Statics: {
    OK: 1,
    OK_CANCEL: 2,
    YES_NO: 3,
    YES_NO_CANCEL: 4,
    msgBox: function msgBox(settings) {
      var buttons = void 0;
      var callback = settings.callback || function () {};

      function createButton(text, status, primary) {
        return {
          type: 'button',
          text: text,
          subtype: primary ? 'primary' : '',
          onClick: function onClick(e) {
            e.control.parents()[1].close();
            callback(status);
          }
        };
      }

      switch (settings.buttons) {
        case MessageBox.OK_CANCEL:
          buttons = [createButton('Ok', true, true), createButton('Cancel', false)];
          break;
        case MessageBox.YES_NO:
        case MessageBox.YES_NO_CANCEL:
          buttons = [createButton('Yes', 1, true), createButton('No', 0)];

          if (settings.buttons === MessageBox.YES_NO_CANCEL) {
            buttons.push(createButton('Cancel', -1));
          }

          break;
        default:
          buttons = [createButton('Ok', true, true)];
          break;
      }

      return new __WEBPACK_IMPORTED_MODULE_0__Window__["a" /* Window */]({
        padding: 20,
        x: settings.x,
        y: settings.y,
        minWidth: 300,
        minHeight: 100,
        layout: 'flex',
        pack: 'center',
        align: 'center',
        buttons: buttons,
        title: settings.title,
        role: 'alertdialog',
        items: {
          type: 'label',
          multiline: true,
          maxWidth: 500,
          maxHeight: 200,
          text: settings.text
        },
        onPostRender: function onPostRender() {
          this.aria('describedby', this.items()[0]._id);
        },
        onClose: settings.onClose,
        onCancel: function onCancel() {
          callback(false);
        }
      }).renderTo(document.body).reflow();
    },
    alert: function alert(settings, callback) {
      if (typeof settings === 'string') {
        settings = { text: settings };
      }

      settings.callback = callback;

      return MessageBox.msgBox(settings);
    },
    confirm: function confirm(settings, callback) {
      if (typeof settings === 'string') {
        settings = { text: settings };
      }

      settings.callback = callback;
      settings.buttons = MessageBox.OK_CANCEL;

      return MessageBox.msgBox(settings);
    }
  }
});



/***/ }),
/* 252 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlowLayout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Layout__ = __webpack_require__(177);




var FlowLayout = __WEBPACK_IMPORTED_MODULE_0__Layout__["a" /* Layout */].extend({
  Defaults: {
    containerClass: 'flow-layout',
    controlClass: 'flow-layout-item',
    endClass: 'break'
  },
  recalc: function recalc(container) {
    container.items().filter(':visible').each(function (ctrl) {
      if (ctrl.recalc) {
        ctrl.recalc();
      }
    });
  },
  isNative: function isNative() {
    return true;
  }
});



/***/ }),
/* 253 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PanelButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Button__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FloatPanel__ = __webpack_require__(75);





var PanelButton = __WEBPACK_IMPORTED_MODULE_0__Button__["a" /* Button */].extend({
  showPanel: function showPanel() {
    var self = this;
    var settings = self.settings;

    self.classes.add('opened');

    if (!self.panel) {
      var panelSettings = settings.panel;

      if (panelSettings.type) {
        panelSettings = {
          layout: 'grid',
          items: panelSettings
        };
      }

      panelSettings.role = panelSettings.role || 'dialog';
      panelSettings.popover = true;
      panelSettings.autohide = true;
      panelSettings.ariaRoot = true;

      self.panel = new __WEBPACK_IMPORTED_MODULE_1__FloatPanel__["a" /* FloatPanel */](panelSettings).on('hide', function () {
        self.classes.remove('opened');
      }).on('cancel', function (e) {
        e.stopPropagation();
        self.focus();
        self.hidePanel();
      }).parent(self).renderTo(self.getContainerElm());
      self.panel.fire('show');
      self.panel.reflow();
    } else {
      self.panel.show();
    }

    var rel = self.panel.testMoveRel(self.getEl(), settings.popoverAlign || (self.isRtl() ? ['bc-tc', 'bc-tl', 'bc-tr'] : ['bc-tc', 'bc-tr', 'bc-tl']));

    self.panel.classes.toggle('start', rel === 'bc-tl');
    self.panel.classes.toggle('end', rel === 'bc-tr');
    self.panel.moveRel(self.getEl(), rel);
  },
  hidePanel: function hidePanel() {
    var self = this;

    if (self.panel) {
      self.panel.hide();
    }
  },
  postRender: function postRender() {
    var self = this;

    self.aria('haspopup', true);

    self.on('click', function (e) {
      if (e.control === self) {
        if (self.panel && self.panel.visible()) {
          self.hidePanel();
        } else {
          self.showPanel();
          self.panel.focus(!!e.aria);
        }
      }
    });

    return self._super();
  },
  remove: function remove() {
    if (this.panel) {
      this.panel.remove();
      this.panel = null;
    }

    return this._super();
  }
});



/***/ }),
/* 254 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Notification; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Delay__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Movable__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Control__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Progress__ = __webpack_require__(246);







var updateLiveRegion = function updateLiveRegion(ctx, text) {
  ctx.getEl().lastChild.textContent = '' + text + (ctx.progressBar ? ' ' + ctx.progressBar.value() + '%' : '');
};

var Notification = __WEBPACK_IMPORTED_MODULE_2__Control__["a" /* Control */].extend({
  Mixins: [__WEBPACK_IMPORTED_MODULE_1__Movable__["a" /* Movable */]],
  Defaults: { classes: 'widget notification' },
  init: function init(settings) {
    var self = this;

    self._super(settings);
    self.maxWidth = settings.maxWidth;

    if (settings.text) {
      self.text(settings.text);
    }

    if (settings.icon) {
      self.icon = settings.icon;
    }

    if (settings.color) {
      self.color = settings.color;
    }

    if (settings.type) {
      self.classes.add('notification-' + settings.type);
    }

    if (settings.timeout && (settings.timeout < 0 || settings.timeout > 0) && !settings.closeButton) {
      self.closeButton = false;
    } else {
      self.classes.add('has-close');
      self.closeButton = true;
    }

    if (settings.progressBar) {
      self.progressBar = new __WEBPACK_IMPORTED_MODULE_3__Progress__["a" /* Progress */]();
    }

    self.on('click', function (e) {
      if (e.target.className.indexOf(self.classPrefix + 'close') !== -1) {
        self.close();
      }
    });
  },
  renderHtml: function renderHtml() {
    var self = this;
    var prefix = self.classPrefix;
    var icon = '';
    var closeButton = '';
    var progressBar = '';
    var notificationStyle = '';

    if (self.icon) {
      icon = '<i class="' + prefix + 'ico ' + prefix + 'i-' + self.icon + '"></i>';
    }

    notificationStyle = ' style="max-width: ' + self.maxWidth + 'px;' + (self.color ? 'background-color: ' + self.color + ';"' : '"');

    if (self.closeButton) {
      closeButton = '<button type="button" class="' + prefix + 'close" aria-hidden="true">\xD7</button>';
    }

    if (self.progressBar) {
      progressBar = self.progressBar.renderHtml();
    }

    return '<div id="' + self._id + '" class="' + self.classes + '"' + notificationStyle + ' role="presentation">' + icon + '<div class="' + prefix + 'notification-inner">' + self.state.get('text') + '</div>' + progressBar + closeButton + '<div style="clip: rect(1px, 1px, 1px, 1px);height: 1px;overflow: hidden;position: absolute;width: 1px;" aria-live="assertive" aria-relevant="additions" aria-atomic="true"></div></div>';
  },
  postRender: function postRender() {
    var self = this;

    __WEBPACK_IMPORTED_MODULE_0__Delay__["a" /* Delay */].setTimeout(function () {
      self.$el.addClass(self.classPrefix + 'in');

      updateLiveRegion(self, self.state.get('text'));
    }, 100);

    return self._super();
  },
  bindStates: function bindStates() {
    var self = this;

    self.state.on('change:text', function (e) {
      self.getEl().firstChild.innerHTML = e.value;
      updateLiveRegion(self, e.value);
    });

    if (self.progressBar) {
      self.progressBar.bindStates();
      self.progressBar.state.on('change:value', function (e) {
        updateLiveRegion(self, self.state.get('text'));
      });
    }

    return self._super();
  },
  close: function close() {
    var self = this;

    if (!self.fire('close').isDefaultPrevented()) {
      self.remove();
    }

    return self;
  },
  repaint: function repaint() {
    var style = void 0,
        rect = void 0;
    var self = this;

    style = self.getEl().style;
    rect = self._layoutRect;
    style.left = rect.x + 'px';
    style.top = rect.y + 'px';
    style.zIndex = 65535 - 1;
  }
});



/***/ }),
/* 255 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormatControls; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Env__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Body__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Utils__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Widget__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Parent__ = __webpack_require__(660);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Control__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__UndoRedo__ = __webpack_require__(662);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Registrar__ = __webpack_require__(663);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__CustomMenu__ = __webpack_require__(664);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__VisualAids__ = __webpack_require__(665);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__FloatPanel__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Formatting__ = __webpack_require__(666);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__FontPicker__ = __webpack_require__(667);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__FormatMenu__ = __webpack_require__(668);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__FormatButtons__ = __webpack_require__(669);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__EditorManager__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__FontSizePicker__ = __webpack_require__(670);




















var setupEnvironment = function setupEnvironment() {
  __WEBPACK_IMPORTED_MODULE_3__Widget__["a" /* Widget */].tooltips = !__WEBPACK_IMPORTED_MODULE_0__Env__["a" /* Env */].iOS;
  __WEBPACK_IMPORTED_MODULE_5__Control__["a" /* Control */].translate = function (text) {
    return __WEBPACK_IMPORTED_MODULE_15__EditorManager__["a" /* EditorManager */].translate(text);
  };
};

var setupUiContainer = function setupUiContainer(editor) {
  if (editor.settings.ui_container) {
    __WEBPACK_IMPORTED_MODULE_0__Env__["a" /* Env */].container = __WEBPACK_IMPORTED_MODULE_4__Parent__["a" /* Parent */].descendant(__WEBPACK_IMPORTED_MODULE_1__Body__["a" /* Body */].fromDom(document.body), editor.settings.ui_container).fold(__WEBPACK_IMPORTED_MODULE_2__Utils__["a" /* Utils */].constant(null), function (elm) {
      return elm.dom();
    });
  }
};

var setupRtlMode = function setupRtlMode(editor) {
  if (editor.rtl) {
    __WEBPACK_IMPORTED_MODULE_5__Control__["a" /* Control */].rtl = true;
  }
};

var setupHideFloatPanels = function setupHideFloatPanels(editor) {
  editor.on('mousedown', function () {
    __WEBPACK_IMPORTED_MODULE_10__FloatPanel__["a" /* FloatPanel */].hideAll();
  });
};

var setup = function setup(editor) {
  setupRtlMode(editor);
  setupHideFloatPanels(editor);
  setupUiContainer(editor);
  setupEnvironment();
  __WEBPACK_IMPORTED_MODULE_11__Formatting__["a" /* Formatting */].register(editor);
  __WEBPACK_IMPORTED_MODULE_7__Registrar__["a" /* Registrar */].register(editor);
  __WEBPACK_IMPORTED_MODULE_14__FormatButtons__["a" /* FormatButtons */].register(editor);
  __WEBPACK_IMPORTED_MODULE_6__UndoRedo__["a" /* UndoRedo */].register(editor);
  __WEBPACK_IMPORTED_MODULE_16__FontSizePicker__["a" /* FontSizePicker */].register(editor);
  __WEBPACK_IMPORTED_MODULE_12__FontPicker__["a" /* FontPicker */].register(editor);
  __WEBPACK_IMPORTED_MODULE_13__FormatMenu__["a" /* FormatMenu */].register(editor);
  __WEBPACK_IMPORTED_MODULE_9__VisualAids__["a" /* VisualAids */].register(editor);
  __WEBPACK_IMPORTED_MODULE_8__CustomMenu__["a" /* CustomMenu */].register(editor);
};

var FormatControls = { setup: setup };



/***/ }),
/* 256 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClosestOrAncestor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Retrieve__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VarTypes__ = __webpack_require__(86);





function ClosestOrAncestor(is, ancestor, scope, a, isRoot) {
  if (__WEBPACK_IMPORTED_MODULE_1__VarTypes__["a" /* VarTypes */].isFunction(isRoot) && isRoot(scope)) {
    if (is(scope, a)) {
      return __WEBPACK_IMPORTED_MODULE_0__Retrieve__["a" /* Retrieve */].some(scope);
    } else {
      return __WEBPACK_IMPORTED_MODULE_0__Retrieve__["a" /* Retrieve */].none();
    }
  } else {
    if (is(scope, a)) {
      return __WEBPACK_IMPORTED_MODULE_0__Retrieve__["a" /* Retrieve */].some(scope);
    } else {
      return ancestor(scope, a, isRoot);
    }
  }
}



/***/ }),
/* 257 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Fonts; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Body__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Retrieve__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__DOMUtils__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__CheckType__ = __webpack_require__(247);








var normalizeFontFamily = function normalizeFontFamily(fontFamily) {
  return fontFamily.replace(/['"]/g, '').replace(/,\s+/g, ',');
};
var getComputedFontProp = function getComputedFontProp(propName, elm) {
  return __WEBPACK_IMPORTED_MODULE_2__Retrieve__["a" /* Retrieve */].from(__WEBPACK_IMPORTED_MODULE_3__DOMUtils__["a" /* DOMUtils */].DOM.getStyle(elm, propName, true));
};

var getSpecifiedFontProp = function getSpecifiedFontProp(propName, rootElm, elm) {
  while (elm !== rootElm) {
    if (elm.style[propName]) {
      var foundStyle = elm.style[propName];

      return foundStyle !== '' ? __WEBPACK_IMPORTED_MODULE_2__Retrieve__["a" /* Retrieve */].some(foundStyle) : __WEBPACK_IMPORTED_MODULE_2__Retrieve__["a" /* Retrieve */].none();
    }

    elm = elm.parentNode;
  }

  return __WEBPACK_IMPORTED_MODULE_2__Retrieve__["a" /* Retrieve */].none();
};

var round = function round(number, precision) {
  var factor = Math.pow(10, precision);

  return Math.round(number * factor) / factor;
};

var toPt = function toPt(fontSize, precision) {
  if (/[0-9.]+px$/.test(fontSize)) {
    return round(parseInt(fontSize, 10) * 72 / 96, precision || 0) + 'pt';
  }

  return fontSize;
};

var getFontProp = function getFontProp(propName) {
  return function (rootElm, elm) {
    return __WEBPACK_IMPORTED_MODULE_2__Retrieve__["a" /* Retrieve */].from(elm).map(__WEBPACK_IMPORTED_MODULE_0__Body__["a" /* Body */].fromDom).filter(__WEBPACK_IMPORTED_MODULE_4__CheckType__["a" /* CheckType */].isElement).bind(function (element) {
      return getSpecifiedFontProp(propName, rootElm, element.dom()).or(getComputedFontProp(propName, element.dom()));
    }).getOr('');
  };
};

var Fonts = {
  getFontSize: getFontProp('fontSize'),
  getFontFamily: __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utils */].compose(normalizeFontFamily, getFontProp('fontFamily')),
  toPt: toPt
};



/***/ }),
/* 258 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Resizer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DOMUtils__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FireThemeItems__ = __webpack_require__(87);





var DOM = __WEBPACK_IMPORTED_MODULE_0__DOMUtils__["a" /* DOMUtils */].DOM;

var getMinWidth = function getMinWidth(editor) {
  return editor.getParam('min_width', 100, 'number');
};
var getMaxWidth = function getMaxWidth(editor) {
  return editor.getParam('max_width', 65535, 'number');
};
var getMinHeight = function getMinHeight(editor) {
  return editor.getParam('min_height', 100, 'number');
};
var getMaxHeight = function getMaxHeight(editor) {
  return editor.getParam('max_height', 65535, 'number');
};

var getSize = function getSize(elm) {
  return {
    width: elm.clientWidth,
    height: elm.clientHeight
  };
};

var resizeTo = function resizeTo(editor, width, height) {
  var containerElm = void 0,
      iframeElm = void 0,
      containerSize = void 0,
      iframeSize = void 0;

  containerElm = editor.getContainer();
  iframeElm = editor.getContentAreaContainer().firstChild;
  containerSize = getSize(containerElm);
  iframeSize = getSize(iframeElm);

  if (width !== null) {
    width = Math.max(getMinWidth(editor), width);
    width = Math.min(getMaxWidth(editor), width);
    DOM.setStyle(containerElm, 'width', width + (containerSize.width - iframeSize.width));
    DOM.setStyle(iframeElm, 'width', width);
  }

  height = Math.max(getMinHeight(editor), height);
  height = Math.min(getMaxHeight(editor), height);

  DOM.setStyle(iframeElm, 'height', height);

  __WEBPACK_IMPORTED_MODULE_1__FireThemeItems__["a" /* FireThemeItems */].fireResizeEditor(editor);
};

var resizeBy = function resizeBy(editor, dw, dh) {
  var elm = editor.getContentAreaContainer();

  resizeTo(editor, elm.clientWidth + dw, elm.clientHeight + dh);
};

var Resizer = { resizeTo: resizeTo, resizeBy: resizeBy };



/***/ }),
/* 259 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeyMan; });


var focus = function focus(panel, type) {
  return function () {
    var item = panel.find(type)[0];
    if (item) {
      item.focus(true);
    }
  };
};

var addKeys = function addKeys(editor, panel) {
  editor.shortcuts.add('Alt+F9', '', focus(panel, 'menubar'));
  editor.shortcuts.add('Alt+F10,F10', '', focus(panel, 'toolbar'));
  editor.shortcuts.add('Alt+F11', '', focus(panel, 'elementpath'));

  panel.on('cancel', function () {
    editor.focus();
  });
};

var KeyMan = { addKeys: addKeys };



/***/ }),
/* 260 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SkinLoaded; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FireThemeItems__ = __webpack_require__(87);




var fireSkinLoaded = function fireSkinLoaded(editor) {
  var done = function done() {
    editor._skinLoaded = true;
    __WEBPACK_IMPORTED_MODULE_0__FireThemeItems__["a" /* FireThemeItems */].fireSkinLoaded(editor);
  };

  return function () {
    if (editor.initialized) {
      done();
    } else {
      editor.on('init', done);
    }
  };
};

var SkinLoaded = { fireSkinLoaded: fireSkinLoaded };



/***/ }),
/* 261 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hasMenubar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getMenubar__ = __webpack_require__(262);




var hasMenubar = function hasMenubar(editor) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__getMenubar__["a" /* getMenubar */])(editor) !== false;
};



/***/ }),
/* 262 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getMenubar; });


var getMenubar = function getMenubar(editor) {
  return editor.getParam('menubar');
};



/***/ }),
/* 263 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getToolbarSize; });


var getToolbarSize = function getToolbarSize(editor) {
  return editor.getParam('toolbar_items_size');
};



/***/ }),
/* 264 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isSkinDisabled; });


var isSkinDisabled = function isSkinDisabled(editor) {
  return editor.settings.skin === false;
};



/***/ }),
/* 265 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuBarButtons; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getMenubar__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ObjectTools__ = __webpack_require__(19);






var getMenu = function getMenu(editor) {
  return editor.getParam('menu');
};
var getRemovedMenuItems = function getRemovedMenuItems(editor) {
  return editor.getParam('removed_menuitems', '');
};
var isSeparator = function isSeparator(namedMenuItem) {
  return namedMenuItem && namedMenuItem.item.text === '|';
};

var defaultMenus = {
  file: {
    title: 'File',
    items: 'newdocument restoredraft | preview | print'
  },
  edit: {
    title: 'Edit',
    items: 'undo redo | cut copy paste pastetext | selectall'
  },
  view: {
    title: 'View',
    items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen'
  },
  insert: {
    title: 'Insert',
    items: 'image link media template codesample inserttable | charmap hr | pagebreak nonbreaking anchor toc | insertdatetime'
  },
  format: {
    title: 'Format',
    items: 'bold italic underline strikethrough superscript subscript codeformat | blockformats align | removeformat'
  },
  tools: {
    title: 'Tools',
    items: 'spellchecker spellcheckerlanguage | a11ycheck'
  },
  table: { title: 'Table' /*,
                          help: { title: 'Help' } */
  } };

var delimiterMenuNamePair = function delimiterMenuNamePair() {
  return {
    name: '|',
    item: { text: '|' }
  };
};

var createMenuNameItemPair = function createMenuNameItemPair(name, item) {
  var menuItem = item ? {
    name: name,
    item: item
  } : null;

  return name === '|' ? delimiterMenuNamePair() : menuItem;
};

var hasItemName = function hasItemName(namedMenuItems, name) {
  return __WEBPACK_IMPORTED_MODULE_2__ObjectTools__["a" /* ObjectTools */].findIndex(namedMenuItems, function (namedMenuItem) {
    return namedMenuItem.name === name;
  }).isSome();
};

var cleanupMenu = function cleanupMenu(namedMenuItems, removedMenuItems) {
  var menuItemsPass1 = __WEBPACK_IMPORTED_MODULE_2__ObjectTools__["a" /* ObjectTools */].filter(namedMenuItems, function (namedMenuItem) {
    return removedMenuItems.hasOwnProperty(namedMenuItem.name) === false;
  });

  var menuItemsPass2 = __WEBPACK_IMPORTED_MODULE_2__ObjectTools__["a" /* ObjectTools */].filter(menuItemsPass1, function (namedMenuItem, i, namedMenuItems) {
    return !isSeparator(namedMenuItem) || !isSeparator(namedMenuItems[i - 1]);
  });

  return __WEBPACK_IMPORTED_MODULE_2__ObjectTools__["a" /* ObjectTools */].filter(menuItemsPass2, function (namedMenuItem, i, namedMenuItems) {
    return !isSeparator(namedMenuItem) || i > 0 && i < namedMenuItems.length - 1;
  });
};

var createMenu = function createMenu(editorMenuItems, menus, removedMenuItems, context) {
  var menuButton = void 0,
      menu = void 0,
      namedMenuItems = void 0,
      isUserDefined = void 0;

  if (menus) {
    menu = menus[context];
    isUserDefined = true;
  } else {
    menu = defaultMenus[context];
  }

  if (menu) {
    menuButton = { text: menu.title };
    namedMenuItems = [];

    __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].each((menu.items || '').split(/[ ,]/), function (name) {
      var namedMenuItem = createMenuNameItemPair(name, editorMenuItems[name]);

      if (namedMenuItem) {
        namedMenuItems.push(namedMenuItem);
      }
    });

    if (!isUserDefined) {
      __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].each(editorMenuItems, function (item, name) {
        if (item.context === context && !hasItemName(namedMenuItems, name)) {
          if (item.separator === 'before') {
            namedMenuItems.push(delimiterMenuNamePair());
          }

          if (item.prependToContext) {
            namedMenuItems.unshift(createMenuNameItemPair(name, item));
          } else {
            namedMenuItems.push(createMenuNameItemPair(name, item));
          }

          if (item.separator === 'after') {
            namedMenuItems.push(delimiterMenuNamePair());
          }
        }
      });
    }

    menuButton.menu = __WEBPACK_IMPORTED_MODULE_2__ObjectTools__["a" /* ObjectTools */].map(cleanupMenu(namedMenuItems, removedMenuItems), function (menuItem) {
      return menuItem.item;
    });

    if (!menuButton.menu.length) {
      return null;
    }
  }
  return menuButton;
};

var getDefaultMenubar = function getDefaultMenubar(editor) {
  var name = void 0;
  var defaultMenuBar = [];
  var menu = getMenu(editor);

  if (menu) {
    for (name in menu) {
      defaultMenuBar.push(name);
    }
  } else {
    for (name in defaultMenus) {
      defaultMenuBar.push(name);
    }
  }

  return defaultMenuBar;
};

var createMenuButtons = function createMenuButtons(editor) {
  var menuButtons = [];
  var defaultMenuBar = getDefaultMenubar(editor);
  var removedMenuItems = __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].makeMap(getRemovedMenuItems(editor).split(/[ ,]/));
  var menubar = Object(__WEBPACK_IMPORTED_MODULE_1__getMenubar__["a" /* getMenubar */])(editor);
  var enabledMenuNames = typeof menubar === 'string' ? menubar.split(/[ ,]/) : defaultMenuBar;

  for (var i = 0; i < enabledMenuNames.length; i++) {
    var menuItems = enabledMenuNames[i];
    var menu = createMenu(editor.menuItems, getMenu(editor), removedMenuItems, menuItems);

    if (menu) {
      menuButtons.push(menu);
    }
  }

  return menuButtons;
};

var MenuBarButtons = { createMenuButtons: createMenuButtons };



/***/ }),
/* 266 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContextualToolbars; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Env__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Rect__ = __webpack_require__(675);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Delay__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__DOMUtils__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ToolbarCreator__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__UiContainerDelta__ = __webpack_require__(676);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Factory__ = __webpack_require__(40);











var DOM = __WEBPACK_IMPORTED_MODULE_4__DOMUtils__["a" /* DOMUtils */].DOM;

var toClientRect = function toClientRect(geomRect) {
  return {
    left: geomRect.x,
    top: geomRect.y,
    width: geomRect.w,
    height: geomRect.h,
    right: geomRect.x + geomRect.w,
    bottom: geomRect.y + geomRect.h
  };
};

var hideAllFloatingPanels = function hideAllFloatingPanels(editor) {
  __WEBPACK_IMPORTED_MODULE_1__Tools__["a" /* Tools */].each(editor.contextToolbars, function (toolbar) {
    if (toolbar.panel) {
      toolbar.panel.hide();
    }
  });
};

var movePanelTo = function movePanelTo(panel, pos) {
  panel.moveTo(pos.left, pos.top);
};

var togglePositionClass = function togglePositionClass(panel, relPos, predicate) {
  relPos = relPos ? relPos.substr(0, 2) : '';

  __WEBPACK_IMPORTED_MODULE_1__Tools__["a" /* Tools */].each({
    t: 'down',
    b: 'up'
  }, function (cls, pos) {
    panel.classes.toggle('arrow-' + cls, predicate(pos, relPos.substr(0, 1)));
  });

  __WEBPACK_IMPORTED_MODULE_1__Tools__["a" /* Tools */].each({
    l: 'left',
    r: 'right'
  }, function (cls, pos) {
    panel.classes.toggle('arrow-' + cls, predicate(pos, relPos.substr(1, 1)));
  });
};

var userConstrain = function userConstrain(handler, x, y, elementRect, contentAreaRect, panelRect) {
  panelRect = toClientRect({
    x: x,
    y: y,
    w: panelRect.w,
    h: panelRect.h
  });

  if (handler) {
    panelRect = handler({
      elementRect: toClientRect(elementRect),
      contentAreaRect: toClientRect(contentAreaRect),
      panelRect: panelRect
    });
  }

  return panelRect;
};

var addContextualToolbars = function addContextualToolbars(editor) {
  var scrollContainer = void 0;

  var getContextToolbars = function getContextToolbars() {
    return editor.contextToolbars || [];
  };

  var getElementRect = function getElementRect(elm) {
    var pos = void 0,
        targetRect = void 0,
        root = void 0;

    pos = DOM.getPos(editor.getContentAreaContainer());
    targetRect = editor.dom.getRect(elm);
    root = editor.dom.getRoot();

    if (root.nodeName === 'BODY') {
      targetRect.x -= root.ownerDocument.documentElement.scrollLeft || root.scrollLeft;
      targetRect.y -= root.ownerDocument.documentElement.scrollTop || root.scrollTop;
    }

    targetRect.x += pos.x;
    targetRect.y += pos.y;

    return targetRect;
  };

  var getInlineToolbarPositionHandler = function getInlineToolbarPositionHandler(editor) {
    return editor.getParam('inline_toolbar_position_handler');
  };

  var reposition = function reposition(match, shouldShow) {
    var relPos = void 0,
        panelRect = void 0,
        elementRect = void 0,
        contentAreaRect = void 0,
        panel = void 0,
        relRect = void 0,
        testPositions = void 0,
        smallElementWidthThreshold = void 0;
    var handler = getInlineToolbarPositionHandler(editor);

    if (editor.removed) {
      return;
    }

    if (!match || !match.toolbar.panel) {
      hideAllFloatingPanels(editor);
      return;
    }

    testPositions = ['bc-tc', 'tc-bc', 'tl-bl', 'bl-tl', 'tr-br', 'br-tr'];

    panel = match.toolbar.panel;

    if (shouldShow) {
      panel.show();
    }

    elementRect = getElementRect(match.element);
    panelRect = DOM.getRect(panel.getEl());
    contentAreaRect = DOM.getRect(editor.getContentAreaContainer() || editor.getBody());

    var delta = __WEBPACK_IMPORTED_MODULE_6__UiContainerDelta__["a" /* UiContainerDelta */].getUiContainerDelta().getOr({
      x: 0,
      y: 0
    });

    elementRect.x += delta.x;
    elementRect.y += delta.y;
    panelRect.x += delta.x;
    panelRect.y += delta.y;
    contentAreaRect.x += delta.x;
    contentAreaRect.y += delta.y;
    smallElementWidthThreshold = 25;

    if (DOM.getStyle(match.element, 'display', true) !== 'inline') {
      var clientRect = match.element.getBoundingClientRect();

      elementRect.w = clientRect.width;
      elementRect.h = clientRect.height;
    }

    if (!editor.inline) {
      contentAreaRect.w = editor.getDoc().documentElement.offsetWidth;
    }

    if (editor.selection.controlSelection.isResizable(match.element)) {
      if (elementRect.w < smallElementWidthThreshold) {
        elementRect = __WEBPACK_IMPORTED_MODULE_2__Rect__["a" /* Rect */].inflate(elementRect, 0, 8);
      }
    }

    relPos = __WEBPACK_IMPORTED_MODULE_2__Rect__["a" /* Rect */].findBestRelativePosition(panelRect, elementRect, contentAreaRect, testPositions);
    elementRect = __WEBPACK_IMPORTED_MODULE_2__Rect__["a" /* Rect */].clamp(elementRect, contentAreaRect);

    if (relPos) {
      relRect = __WEBPACK_IMPORTED_MODULE_2__Rect__["a" /* Rect */].relativePosition(panelRect, elementRect, relPos);

      movePanelTo(panel, userConstrain(handler, relRect.x, relRect.y, elementRect, contentAreaRect, panelRect));
    } else {
      contentAreaRect.h += panelRect.h;
      elementRect = __WEBPACK_IMPORTED_MODULE_2__Rect__["a" /* Rect */].intersect(contentAreaRect, elementRect);

      if (elementRect) {
        relPos = __WEBPACK_IMPORTED_MODULE_2__Rect__["a" /* Rect */].findBestRelativePosition(panelRect, elementRect, contentAreaRect, ['bc-tc', 'bl-tl', 'br-tr']);

        if (relPos) {
          relRect = __WEBPACK_IMPORTED_MODULE_2__Rect__["a" /* Rect */].relativePosition(panelRect, elementRect, relPos);
          movePanelTo(panel, userConstrain(handler, relRect.x, relRect.y, elementRect, contentAreaRect, panelRect));
        } else {
          movePanelTo(panel, userConstrain(handler, elementRect.x, elementRect.y, elementRect, contentAreaRect, panelRect));
        }
      } else {
        panel.hide();
      }
    }

    togglePositionClass(panel, relPos, function (pos1, pos2) {
      return pos1 === pos2;
    });
  };

  var repositionHandler = function repositionHandler(show) {
    return function () {
      var execute = function execute() {
        if (editor.selection) {
          reposition(findFrontMostMatch(editor.selection.getNode()), show);
        }
      };

      __WEBPACK_IMPORTED_MODULE_3__Delay__["a" /* Delay */].requestAnimationFrame(execute);
    };
  };

  var bindScrollEvent = function bindScrollEvent() {
    if (!scrollContainer) {
      var repos = repositionHandler(true);

      scrollContainer = editor.selection.getScrollContainer() || editor.getWin();

      DOM.bind(scrollContainer, 'scroll', repos);
      DOM.bind(__WEBPACK_IMPORTED_MODULE_0__Env__["a" /* Env */].container, 'scroll', repos);

      editor.on('remove', function () {
        DOM.unbind(scrollContainer, 'scroll', repos);
        DOM.unbind(__WEBPACK_IMPORTED_MODULE_0__Env__["a" /* Env */].container, 'scroll', repos);
      });
    }
  };

  var showContextToolbar = function showContextToolbar(match) {
    var panel = void 0;

    if (match.toolbar.panel) {
      match.toolbar.panel.show();
      reposition(match);
      return;
    }

    bindScrollEvent();

    panel = __WEBPACK_IMPORTED_MODULE_7__Factory__["a" /* Factory */].create({
      type: 'floatpanel',
      role: 'dialog',
      classes: 'tinymce tinymce-inline arrow',
      ariaLabel: 'Inline toolbar',
      layout: 'flex',
      direction: 'column',
      align: 'stretch',
      autohide: false,
      autofix: true,
      fixed: true,
      border: 1,
      items: __WEBPACK_IMPORTED_MODULE_5__ToolbarCreator__["a" /* ToolbarCreator */].createToolbar(editor, match.toolbar.items),
      oncancel: function oncancel() {
        editor.focus();
      }
    });

    match.toolbar.panel = panel;
    panel.renderTo().reflow();
    reposition(match);
  };

  var hideAllContextToolbars = function hideAllContextToolbars() {
    __WEBPACK_IMPORTED_MODULE_1__Tools__["a" /* Tools */].each(getContextToolbars(), function (toolbar) {
      if (toolbar.panel) {
        toolbar.panel.hide();
      }
    });
  };

  var findFrontMostMatch = function findFrontMostMatch(targetElm) {
    var i = void 0,
        y = void 0,
        parentsAndSelf = void 0;
    var toolbars = getContextToolbars();

    parentsAndSelf = editor.$(targetElm).parents().add(targetElm);

    for (i = parentsAndSelf.length - 1; i >= 0; i--) {
      for (y = toolbars.length - 1; y >= 0; y--) {
        if (toolbars[y].predicate(parentsAndSelf[i])) {
          return {
            toolbar: toolbars[y],
            element: parentsAndSelf[i]
          };
        }
      }
    }

    return null;
  };

  editor.on('click keyup setContent ObjectResized', function (e) {
    if (e.type === 'setcontent' && !e.selection) {
      return;
    }

    __WEBPACK_IMPORTED_MODULE_3__Delay__["a" /* Delay */].setEditorTimeout(editor, function () {
      var match = findFrontMostMatch(editor.selection.getNode());

      if (match) {
        hideAllContextToolbars();
        showContextToolbar(match);
      } else {
        hideAllContextToolbars();
      }
    });
  });

  editor.on('blur hide contextmenu', hideAllContextToolbars);

  editor.on('ObjectResizeStart', function () {
    var match = findFrontMostMatch(editor.selection.getNode());

    if (match && match.toolbar.panel) {
      match.toolbar.panel.hide();
    }
  });

  editor.on('ResizeEditor ResizeWindow', repositionHandler(true));
  editor.on('nodeChange', repositionHandler(false));

  editor.on('remove', function () {
    __WEBPACK_IMPORTED_MODULE_1__Tools__["a" /* Tools */].each(getContextToolbars(), function (toolbar) {
      if (toolbar.panel) {
        toolbar.panel.remove();
      }
    });

    editor.contextToolbars = {};
  });

  editor.shortcuts.add('ctrl+shift+e > ctrl+shift+p', '', function () {
    var match = findFrontMostMatch(editor.selection.getNode());

    if (match && match.toolbar.panel) {
      match.toolbar.panel.items()[0].focus();
    }
  });
};

var ContextualToolbars = { addContextualToolbars: addContextualToolbars };



/***/ }),
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */,
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */,
/* 479 */,
/* 480 */,
/* 481 */,
/* 482 */,
/* 483 */,
/* 484 */,
/* 485 */,
/* 486 */,
/* 487 */,
/* 488 */,
/* 489 */,
/* 490 */,
/* 491 */,
/* 492 */,
/* 493 */,
/* 494 */,
/* 495 */,
/* 496 */,
/* 497 */,
/* 498 */,
/* 499 */,
/* 500 */,
/* 501 */,
/* 502 */,
/* 503 */,
/* 504 */,
/* 505 */,
/* 506 */,
/* 507 */,
/* 508 */,
/* 509 */,
/* 510 */,
/* 511 */,
/* 512 */,
/* 513 */,
/* 514 */,
/* 515 */,
/* 516 */,
/* 517 */,
/* 518 */,
/* 519 */,
/* 520 */,
/* 521 */,
/* 522 */,
/* 523 */,
/* 524 */,
/* 525 */,
/* 526 */,
/* 527 */,
/* 528 */,
/* 529 */,
/* 530 */,
/* 531 */,
/* 532 */,
/* 533 */,
/* 534 */,
/* 535 */,
/* 536 */,
/* 537 */,
/* 538 */,
/* 539 */,
/* 540 */,
/* 541 */,
/* 542 */,
/* 543 */,
/* 544 */,
/* 545 */,
/* 546 */,
/* 547 */,
/* 548 */,
/* 549 */,
/* 550 */,
/* 551 */,
/* 552 */,
/* 553 */,
/* 554 */,
/* 555 */,
/* 556 */,
/* 557 */,
/* 558 */,
/* 559 */,
/* 560 */,
/* 561 */,
/* 562 */,
/* 563 */,
/* 564 */,
/* 565 */,
/* 566 */,
/* 567 */,
/* 568 */,
/* 569 */,
/* 570 */,
/* 571 */,
/* 572 */,
/* 573 */,
/* 574 */,
/* 575 */,
/* 576 */,
/* 577 */,
/* 578 */,
/* 579 */,
/* 580 */,
/* 581 */,
/* 582 */,
/* 583 */,
/* 584 */,
/* 585 */,
/* 586 */,
/* 587 */,
/* 588 */,
/* 589 */,
/* 590 */,
/* 591 */,
/* 592 */,
/* 593 */,
/* 594 */,
/* 595 */,
/* 596 */,
/* 597 */,
/* 598 */,
/* 599 */,
/* 600 */,
/* 601 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(602);


/***/ }),
/* 602 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__m_Window__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__m_registerTheme__ = __webpack_require__(607);
/* eslint-disable no-unused-vars */



(function () {
  var kcms = function () {
    'use strict';

    Object(__WEBPACK_IMPORTED_MODULE_0__m_Window__["b" /* handleWindowResize */])();
    Object(__WEBPACK_IMPORTED_MODULE_1__m_registerTheme__["a" /* registerTheme */])();
  }();
})();

/***/ }),
/* 603 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventDispatcher; });


var EventDispatcher = tinymce.util.Tools.resolve('tinymce.util.EventDispatcher');



/***/ }),
/* 604 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObservableObject; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Class__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Binding__ = __webpack_require__(605);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Observable__ = __webpack_require__(606);


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };






function isNode(node) {
  return node.nodeType > 0;
}

function isEqual(a, b) {
  var k = void 0,
      checked = void 0;

  if (a === b) {
    return true;
  }

  if (a === null || b === null) {
    return a === b;
  }

  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) !== 'object') {
    return a === b;
  }

  if (__WEBPACK_IMPORTED_MODULE_1__Tools__["a" /* Tools */].isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    k = a.length;

    while (k--) {
      if (!isEqual(a[k], b[k])) {
        return false;
      }
    }
  }

  if (isNode(a) || isNode(b)) {
    return a === b;
  }

  checked = {};

  for (k in b) {
    if (!isEqual(a[k], b[k])) {
      return false;
    }

    checked[k] = true;
  }

  for (k in a) {
    if (!checked[k] && !isEqual(a[k], b[k])) {
      return false;
    }
  }

  return true;
}

var ObservableObject = __WEBPACK_IMPORTED_MODULE_0__Class__["a" /* Class */].extend({
  Mixins: [__WEBPACK_IMPORTED_MODULE_3__Observable__["a" /* Observable */]],
  init: function init(data) {
    var name = void 0,
        value = void 0;

    data = data || {};

    for (name in data) {
      value = data[name];

      if (value instanceof __WEBPACK_IMPORTED_MODULE_2__Binding__["a" /* Binding */]) {
        data[name] = value.create(this, name);
      }
    }

    this.data = data;
  },
  set: function set(name, value) {
    var key = void 0,
        args = void 0;
    var oldValue = this.data[name];

    if (value instanceof __WEBPACK_IMPORTED_MODULE_2__Binding__["a" /* Binding */]) {
      value = value.create(this, name);
    }

    if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
      for (key in name) {
        this.set(key, name[key]);
      }

      return this;
    }

    if (!isEqual(oldValue, value)) {
      this.data[name] = value;

      args = {
        target: this,
        name: name,
        value: value,
        oldValue: oldValue
      };

      this.fire('change:' + name, args);
      this.fire('change', args);
    }

    return this;
  },
  get: function get(name) {
    return this.data[name];
  },
  has: function has(name) {
    return name in this.data;
  },
  bind: function bind(name) {
    return __WEBPACK_IMPORTED_MODULE_2__Binding__["a" /* Binding */].create(this, name);
  },
  destroy: function destroy() {
    this.fire('destroy');
  }
});



/***/ }),
/* 605 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Binding; });


var Binding = function Binding(settings) {
  this.create = settings.create;
};

Binding.create = function (model, name) {
  return new Binding({
    create: function create(otherModel, otherName) {
      var bindings = void 0;

      var fromSelfToOther = function fromSelfToOther(e) {
        otherModel.set(otherName, e.value);
      };

      var fromOtherToSelf = function fromOtherToSelf(e) {
        model.set(name, e.value);
      };

      otherModel.on('change:' + otherName, fromOtherToSelf);
      model.on('change:' + name, fromSelfToOther);
      bindings = otherModel._bindings;

      if (!bindings) {
        bindings = otherModel._bindings = [];

        otherModel.on('destroy', function () {
          var i = bindings.length;

          while (i--) {
            bindings[i]();
          }
        });
      }

      bindings.push(function () {
        model.off('change:' + name, fromSelfToOther);
      });

      return model.get(name);
    }
  });
};



/***/ }),
/* 606 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Observable; });


var Observable = tinymce.util.Tools.resolve('tinymce.util.Observable');



/***/ }),
/* 607 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return registerTheme; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Api__ = __webpack_require__(608);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ThemeManager__ = __webpack_require__(671);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Notifications__ = __webpack_require__(672);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FormatControls__ = __webpack_require__(255);







function registerTheme() {
  __WEBPACK_IMPORTED_MODULE_0__Api__["a" /* Api */].registerToFactory();
  __WEBPACK_IMPORTED_MODULE_0__Api__["a" /* Api */].appendTo(window.tinymce ? window.tinymce : {});

  __WEBPACK_IMPORTED_MODULE_1__ThemeManager__["a" /* ThemeManager */].add('kcms', function (editor) {
    __WEBPACK_IMPORTED_MODULE_3__FormatControls__["a" /* FormatControls */].setup(editor);

    return __WEBPACK_IMPORTED_MODULE_2__Notifications__["a" /* Notifications */].get(editor);
  });

  function Theme() {}

  return Theme;
}



/***/ }),
/* 608 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Api; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Path__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Menu__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Form__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Panel__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Radio__ = __webpack_require__(609);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Label__ = __webpack_require__(610);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Widget__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Spacer__ = __webpack_require__(611);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Window__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Layout__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Iframe__ = __webpack_require__(612);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Slider__ = __webpack_require__(613);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Button__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__MenuBar__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ListBox__ = __webpack_require__(614);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__Toolbar__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__Factory__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__InfoBox__ = __webpack_require__(615);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__Tooltip__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__Control__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__Movable__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__TextBox__ = __webpack_require__(616);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__DropZone__ = __webpack_require__(617);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__TabPanel__ = __webpack_require__(618);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ComboBox__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__FieldSet__ = __webpack_require__(620);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__MenuItem__ = __webpack_require__(621);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__Checkbox__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__Selector__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__FormItem__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__Throbber__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__Progress__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ColorBox__ = __webpack_require__(622);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__FitLayout__ = __webpack_require__(623);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__Resizable__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__Container__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__SelectBox__ = __webpack_require__(624);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__FilePicker__ = __webpack_require__(625);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__GridLayout__ = __webpack_require__(649);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__Scrollable__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__FloatPanel__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__MessageBox__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__FlexLayout__ = __webpack_require__(650);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__FlowLayout__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__DragHelper__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__Collection__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__MenuButton__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__ReflowQueue__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__SplitButton__ = __webpack_require__(651);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__ColorButton__ = __webpack_require__(652);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__StackLayout__ = __webpack_require__(653);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__ButtonGroup__ = __webpack_require__(654);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__ElementPath__ = __webpack_require__(655);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__PanelButton__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__ColorPicker__ = __webpack_require__(656);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__ResizeHandle__ = __webpack_require__(658);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__Notification__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__BrowseButton__ = __webpack_require__(659);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__FormatControls__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__AbsoluteLayout__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__KeyboardNavigation__ = __webpack_require__(235);

































































var getApi = function getApi() {
  return {
    Selector: __WEBPACK_IMPORTED_MODULE_29__Selector__["a" /* Selector */],
    Collection: __WEBPACK_IMPORTED_MODULE_46__Collection__["a" /* Collection */],
    ReflowQueue: __WEBPACK_IMPORTED_MODULE_48__ReflowQueue__["a" /* ReflowQueue */],
    Control: __WEBPACK_IMPORTED_MODULE_20__Control__["a" /* Control */],
    Factory: __WEBPACK_IMPORTED_MODULE_17__Factory__["a" /* Factory */],
    KeyboardNavigation: __WEBPACK_IMPORTED_MODULE_61__KeyboardNavigation__["a" /* KeyboardNavigation */],
    Container: __WEBPACK_IMPORTED_MODULE_36__Container__["a" /* Container */],
    DragHelper: __WEBPACK_IMPORTED_MODULE_45__DragHelper__["a" /* DragHelper */],
    Scrollable: __WEBPACK_IMPORTED_MODULE_40__Scrollable__["a" /* Scrollable */],
    Panel: __WEBPACK_IMPORTED_MODULE_3__Panel__["a" /* Panel */],
    Movable: __WEBPACK_IMPORTED_MODULE_21__Movable__["a" /* Movable */],
    Resizable: __WEBPACK_IMPORTED_MODULE_35__Resizable__["a" /* Resizable */],
    FloatPanel: __WEBPACK_IMPORTED_MODULE_41__FloatPanel__["a" /* FloatPanel */],
    Window: __WEBPACK_IMPORTED_MODULE_9__Window__["a" /* Window */],
    MessageBox: __WEBPACK_IMPORTED_MODULE_42__MessageBox__["a" /* MessageBox */],
    Tooltip: __WEBPACK_IMPORTED_MODULE_19__Tooltip__["a" /* Tooltip */],
    Widget: __WEBPACK_IMPORTED_MODULE_7__Widget__["a" /* Widget */],
    Progress: __WEBPACK_IMPORTED_MODULE_32__Progress__["a" /* Progress */],
    Notification: __WEBPACK_IMPORTED_MODULE_57__Notification__["a" /* Notification */],
    Layout: __WEBPACK_IMPORTED_MODULE_10__Layout__["a" /* Layout */],
    AbsoluteLayout: __WEBPACK_IMPORTED_MODULE_60__AbsoluteLayout__["a" /* AbsoluteLayout */],
    Button: __WEBPACK_IMPORTED_MODULE_13__Button__["a" /* Button */],
    ButtonGroup: __WEBPACK_IMPORTED_MODULE_52__ButtonGroup__["a" /* ButtonGroup */],
    Checkbox: __WEBPACK_IMPORTED_MODULE_28__Checkbox__["a" /* Checkbox */],
    ComboBox: __WEBPACK_IMPORTED_MODULE_25__ComboBox__["a" /* ComboBox */],
    ColorBox: __WEBPACK_IMPORTED_MODULE_33__ColorBox__["a" /* ColorBox */],
    PanelButton: __WEBPACK_IMPORTED_MODULE_54__PanelButton__["a" /* PanelButton */],
    ColorButton: __WEBPACK_IMPORTED_MODULE_50__ColorButton__["a" /* ColorButton */],
    ColorPicker: __WEBPACK_IMPORTED_MODULE_55__ColorPicker__["a" /* ColorPicker */],
    Path: __WEBPACK_IMPORTED_MODULE_0__Path__["a" /* Path */],
    ElementPath: __WEBPACK_IMPORTED_MODULE_53__ElementPath__["a" /* ElementPath */],
    FormItem: __WEBPACK_IMPORTED_MODULE_30__FormItem__["a" /* FormItem */],
    Form: __WEBPACK_IMPORTED_MODULE_2__Form__["a" /* Form */],
    FieldSet: __WEBPACK_IMPORTED_MODULE_26__FieldSet__["a" /* FieldSet */],
    FilePicker: __WEBPACK_IMPORTED_MODULE_38__FilePicker__["a" /* FilePicker */],
    FitLayout: __WEBPACK_IMPORTED_MODULE_34__FitLayout__["a" /* FitLayout */],
    FlexLayout: __WEBPACK_IMPORTED_MODULE_43__FlexLayout__["a" /* FlexLayout */],
    FlowLayout: __WEBPACK_IMPORTED_MODULE_44__FlowLayout__["a" /* FlowLayout */],
    FormatControls: __WEBPACK_IMPORTED_MODULE_59__FormatControls__["a" /* FormatControls */],
    GridLayout: __WEBPACK_IMPORTED_MODULE_39__GridLayout__["a" /* GridLayout */],
    Iframe: __WEBPACK_IMPORTED_MODULE_11__Iframe__["a" /* Iframe */],
    InfoBox: __WEBPACK_IMPORTED_MODULE_18__InfoBox__["a" /* InfoBox */],
    Label: __WEBPACK_IMPORTED_MODULE_5__Label__["a" /* Label */],
    Toolbar: __WEBPACK_IMPORTED_MODULE_16__Toolbar__["a" /* Toolbar */],
    MenuBar: __WEBPACK_IMPORTED_MODULE_14__MenuBar__["a" /* MenuBar */],
    MenuButton: __WEBPACK_IMPORTED_MODULE_47__MenuButton__["a" /* MenuButton */],
    MenuItem: __WEBPACK_IMPORTED_MODULE_27__MenuItem__["a" /* MenuItem */],
    Throbber: __WEBPACK_IMPORTED_MODULE_31__Throbber__["a" /* Throbber */],
    Menu: __WEBPACK_IMPORTED_MODULE_1__Menu__["a" /* Menu */],
    ListBox: __WEBPACK_IMPORTED_MODULE_15__ListBox__["a" /* ListBox */],
    Radio: __WEBPACK_IMPORTED_MODULE_4__Radio__["a" /* Radio */],
    ResizeHandle: __WEBPACK_IMPORTED_MODULE_56__ResizeHandle__["a" /* ResizeHandle */],
    SelectBox: __WEBPACK_IMPORTED_MODULE_37__SelectBox__["a" /* SelectBox */],
    Slider: __WEBPACK_IMPORTED_MODULE_12__Slider__["a" /* Slider */],
    Spacer: __WEBPACK_IMPORTED_MODULE_8__Spacer__["a" /* Spacer */],
    SplitButton: __WEBPACK_IMPORTED_MODULE_49__SplitButton__["a" /* SplitButton */],
    StackLayout: __WEBPACK_IMPORTED_MODULE_51__StackLayout__["a" /* StackLayout */],
    TabPanel: __WEBPACK_IMPORTED_MODULE_24__TabPanel__["a" /* TabPanel */],
    TextBox: __WEBPACK_IMPORTED_MODULE_22__TextBox__["a" /* TextBox */],
    DropZone: __WEBPACK_IMPORTED_MODULE_23__DropZone__["a" /* DropZone */],
    BrowseButton: __WEBPACK_IMPORTED_MODULE_58__BrowseButton__["a" /* BrowseButton */]
  };
};

var appendTo = function appendTo(target) {
  if (target.ui) {
    __WEBPACK_IMPORTED_MODULE_6__Tools__["a" /* Tools */].each(getApi(), function (ref, key) {
      target.ui[key] = ref;
    });
  } else {
    target.ui = getApi();
  }
};

var registerToFactory = function registerToFactory() {
  __WEBPACK_IMPORTED_MODULE_6__Tools__["a" /* Tools */].each(getApi(), function (ref, key) {
    __WEBPACK_IMPORTED_MODULE_17__Factory__["a" /* Factory */].add(key, ref);
  });
};

var Api = { appendTo: appendTo, registerToFactory: registerToFactory };



/***/ }),
/* 609 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Radio; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Checkbox__ = __webpack_require__(243);




var Radio = __WEBPACK_IMPORTED_MODULE_0__Checkbox__["a" /* Checkbox */].extend({
  Defaults: {
    classes: 'radio',
    role: 'radio'
  }
});



/***/ }),
/* 610 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Label; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__funcs__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Widget__ = __webpack_require__(13);





var Label = __WEBPACK_IMPORTED_MODULE_1__Widget__["a" /* Widget */].extend({
  init: function init(settings) {
    var self = this;

    self._super(settings);
    self.classes.add('widget').add('label');
    self.canFocus = false;

    if (settings.multiline) {
      self.classes.add('autoscroll');
    }

    if (settings.strong) {
      self.classes.add('strong');
    }
  },
  initLayoutRect: function initLayoutRect() {
    var self = this;
    var layoutRect = self._super();

    if (self.settings.multiline) {
      var size = __WEBPACK_IMPORTED_MODULE_0__funcs__["a" /* funcs */].getSize(self.getEl());

      if (size.width > layoutRect.maxW) {
        layoutRect.minW = layoutRect.maxW;
        self.classes.add('multiline');
      }

      self.getEl().style.width = layoutRect.minW + 'px';
      layoutRect.startMinH = layoutRect.h = layoutRect.minH = Math.min(layoutRect.maxH, __WEBPACK_IMPORTED_MODULE_0__funcs__["a" /* funcs */].getSize(self.getEl()).height);
    }

    return layoutRect;
  },
  repaint: function repaint() {
    var self = this;

    if (!self.settings.multiline) {
      self.getEl().style.lineHeight = self.layoutRect().h + 'px';
    }

    return self._super();
  },
  severity: function severity(level) {
    this.classes.remove('error');
    this.classes.remove('warning');
    this.classes.remove('success');
    this.classes.add(level);
  },
  renderHtml: function renderHtml() {
    var targetCtrl = void 0,
        forName = void 0;
    var self = this;
    var forId = self.settings.forId;
    var text = self.settings.html ? self.settings.html : self.encode(self.state.get('text'));

    if (!forId && (forName = self.settings.forName)) {
      targetCtrl = self.getRoot().find('#' + forName)[0];

      if (targetCtrl) {
        forId = targetCtrl._id;
      }
    }

    if (forId) {
      return '<label id="' + self._id + '" class="' + self.classes + '"' + (forId ? ' for="' + forId + '"' : '') + '>\n' + text + '</label>';
    }

    return '<span id="' + self._id + '" class="' + self.classes + '">' + text + '</span>';
  },
  bindStates: function bindStates() {
    var self = this;

    self.state.on('change:text', function (e) {
      self.innerHtml(self.encode(e.value));

      if (self.state.get('rendered')) {
        self.updateLayoutRect();
      }
    });

    return self._super();
  }
});



/***/ }),
/* 611 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Spacer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Widget__ = __webpack_require__(13);




var Spacer = __WEBPACK_IMPORTED_MODULE_0__Widget__["a" /* Widget */].extend({
  renderHtml: function renderHtml() {
    var self = this;

    self.classes.add('spacer');
    self.canFocus = false;

    return '<div id="' + self._id + '" class="' + self.classes + '"></div>';
  }
});



/***/ }),
/* 612 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Iframe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Delay__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Widget__ = __webpack_require__(13);





var Iframe = __WEBPACK_IMPORTED_MODULE_1__Widget__["a" /* Widget */].extend({
  renderHtml: function renderHtml() {
    var self = this;

    self.classes.add('iframe');
    self.canFocus = false;

    return '<iframe id="' + self._id + '" class="' + self.classes + '" \ntabindex="-1" src="' + (self.settings.url || 'javascript:\'\'') + '" frameborder="0"></iframe>';
  },
  src: function src(_src) {
    this.getEl().src = _src;
  },
  html: function html(_html, callback) {
    var self = this;
    var body = this.getEl().contentWindow.document.body;

    if (!body) {
      __WEBPACK_IMPORTED_MODULE_0__Delay__["a" /* Delay */].setTimeout(function () {
        self.html(_html);
      });
    } else {
      body.innerHTML = _html;

      if (callback) {
        callback();
      }
    }

    return this;
  }
});



/***/ }),
/* 613 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Slider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__funcs__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Widget__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VarTypes__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__DragHelper__ = __webpack_require__(74);







function constrain(value, minVal, maxVal) {
  if (value < minVal) {
    value = minVal;
  }

  if (value > maxVal) {
    value = maxVal;
  }

  return value;
}

function setAriaProp(el, name, value) {
  el.setAttribute('aria-' + name, value);
}

function updateSliderHandle(ctrl, value) {
  var maxHandlePos = void 0,
      shortSizeName = void 0,
      sizeName = void 0,
      stylePosName = void 0,
      styleValue = void 0,
      handleEl = void 0;

  if (ctrl.settings.orientation === 'v') {
    stylePosName = 'top';
    sizeName = 'height';
    shortSizeName = 'h';
  } else {
    stylePosName = 'left';
    sizeName = 'width';
    shortSizeName = 'w';
  }

  handleEl = ctrl.getEl('handle');
  maxHandlePos = (ctrl.layoutRect()[shortSizeName] || 100) - __WEBPACK_IMPORTED_MODULE_0__funcs__["a" /* funcs */].getSize(handleEl)[sizeName];
  styleValue = maxHandlePos * ((value - ctrl._minValue) / (ctrl._maxValue - ctrl._minValue)) + 'px';
  handleEl.style[stylePosName] = styleValue;
  handleEl.style.height = ctrl.layoutRect().h + 'px';

  setAriaProp(handleEl, 'valuenow', value);
  setAriaProp(handleEl, 'valuetext', '' + ctrl.settings.previewFilter(value));
  setAriaProp(handleEl, 'valuemin', ctrl._minValue);
  setAriaProp(handleEl, 'valuemax', ctrl._maxValue);
}

var Slider = __WEBPACK_IMPORTED_MODULE_1__Widget__["a" /* Widget */].extend({
  init: function init(settings) {
    var self = this;

    if (!settings.previewFilter) {
      settings.previewFilter = function (value) {
        return Math.round(value * 100) / 100;
      };
    }

    self._super(settings);
    self.classes.add('slider');

    if (settings.orientation === 'v') {
      self.classes.add('vertical');
    }

    self._minValue = __WEBPACK_IMPORTED_MODULE_2__VarTypes__["a" /* VarTypes */].isNumber(settings.minValue) ? settings.minValue : 0;
    self._maxValue = __WEBPACK_IMPORTED_MODULE_2__VarTypes__["a" /* VarTypes */].isNumber(settings.maxValue) ? settings.maxValue : 100;
    self._initValue = self.state.get('value');
  },
  renderHtml: function renderHtml() {
    var self = this,
        id = self._id,
        prefix = self.classPrefix;

    return '<div id="' + id + '" class="' + self.classes + '"><div id="' + id + '-handle" \nclass="' + prefix + 'slider-handle" role="slider" tabindex="-1"></div></div>';
  },
  reset: function reset() {
    this.value(this._initValue).repaint();
  },
  postRender: function postRender() {
    var minValue = void 0,
        maxValue = void 0,
        screenCordName = void 0,
        stylePosName = void 0,
        sizeName = void 0,
        shortSizeName = void 0;
    var self = this;

    function toFraction(min, max, val) {
      return (val + min) / (max - min);
    }

    function fromFraction(min, max, val) {
      return val * (max - min) - min;
    }

    function handleKeyboard(minValue, maxValue) {
      function alter(delta) {
        var value = void 0;

        value = self.value();
        value = fromFraction(minValue, maxValue, toFraction(minValue, maxValue, value) + delta * 0.05);
        value = constrain(value, minValue, maxValue);

        self.value(value);
        self.fire('dragstart', { value: value });
        self.fire('drag', { value: value });
        self.fire('dragend', { value: value });
      }

      self.on('keydown', function (e) {
        switch (e.keyCode) {
          case 37:
          case 38:
            alter(-1);
            break;
          case 39:
          case 40:
            alter(1);
            break;
        }
      });
    }

    function handleDrag(minValue, maxValue, handleEl) {
      var startPos = void 0,
          startHandlePos = void 0,
          maxHandlePos = void 0,
          handlePos = void 0,
          value = void 0;
      self._dragHelper = new __WEBPACK_IMPORTED_MODULE_3__DragHelper__["a" /* DragHelper */](self._id, {
        handle: self._id + '-handle',
        start: function start(e) {
          startPos = e[screenCordName];
          startHandlePos = parseInt(self.getEl('handle').style[stylePosName], 10);
          maxHandlePos = (self.layoutRect()[shortSizeName] || 100) - __WEBPACK_IMPORTED_MODULE_0__funcs__["a" /* funcs */].getSize(handleEl)[sizeName];

          self.fire('dragstart', { value: value });
        },
        drag: function drag(e) {
          var delta = e[screenCordName] - startPos;

          handlePos = constrain(startHandlePos + delta, 0, maxHandlePos);
          handleEl.style[stylePosName] = handlePos + 'px';
          value = minValue + handlePos / maxHandlePos * (maxValue - minValue);
          self.value(value);
          self.tooltip().text('' + self.settings.previewFilter(value)).show().moveRel(handleEl, 'bc tc');
          self.fire('drag', { value: value });
        },
        stop: function stop() {
          self.tooltip().hide();
          self.fire('dragend', { value: value });
        }
      });
    }

    minValue = self._minValue;
    maxValue = self._maxValue;

    if (self.settings.orientation === 'v') {
      screenCordName = 'screenY';
      stylePosName = 'top';
      sizeName = 'height';
      shortSizeName = 'h';
    } else {
      screenCordName = 'screenX';
      stylePosName = 'left';
      sizeName = 'width';
      shortSizeName = 'w';
    }

    self._super();

    handleKeyboard(minValue, maxValue);
    handleDrag(minValue, maxValue, self.getEl('handle'));
  },
  repaint: function repaint() {
    this._super();

    updateSliderHandle(this, this.value());
  },
  bindStates: function bindStates() {
    var self = this;

    self.state.on('change:value', function (e) {
      updateSliderHandle(self, e.value);
    });

    return self._super();
  }
});



/***/ }),
/* 614 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListBox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Menu__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MenuButton__ = __webpack_require__(178);





var ListBox = __WEBPACK_IMPORTED_MODULE_1__MenuButton__["a" /* MenuButton */].extend({
  init: function init(settings) {
    var values = void 0,
        selected = void 0,
        selectedText = void 0,
        lastItemCtrl = void 0;
    var self = this;

    function setSelected(menuValues) {
      for (var i = 0; i < menuValues.length; i++) {
        selected = menuValues[i].selected || settings.value === menuValues[i].value;

        if (selected) {
          selectedText = selectedText || menuValues[i].text;
          self.state.set('value', menuValues[i].value);

          return true;
        }

        if (menuValues[i].menu) {
          if (setSelected(menuValues[i].menu)) {
            return true;
          }
        }
      }
    }

    self._super(settings);
    settings = self.settings;
    self._values = values = settings.values;

    if (values) {
      if (typeof settings.value !== 'undefined') {
        setSelected(values);
      }

      if (!selected && values.length > 0) {
        selectedText = values[0].text;
        self.state.set('value', values[0].value);
      }

      self.state.set('menu', values);
    }

    self.state.set('text', settings.text || selectedText);
    self.classes.add('listbox');
    self.on('select', function (e) {
      var ctrl = e.control;

      if (lastItemCtrl) {
        e.lastControl = lastItemCtrl;
      }

      if (settings.multiple) {
        ctrl.active(!ctrl.active());
      } else {
        self.value(e.control.value());
      }

      lastItemCtrl = ctrl;
    });
  },
  bindStates: function bindStates() {
    var self = this;

    function activateMenuItemsByValue(menu, value) {
      if (menu instanceof __WEBPACK_IMPORTED_MODULE_0__Menu__["a" /* Menu */]) {
        menu.items().each(function (ctrl) {
          if (!ctrl.hasMenus()) {
            ctrl.active(ctrl.value() === value);
          }
        });
      }
    }

    function getSelectedItem(menuValues, value) {
      var selectedItem = void 0;

      if (!menuValues) {
        return;
      }

      for (var i = 0; i < menuValues.length; i++) {
        if (menuValues[i].value === value) {
          return menuValues[i];
        }

        if (menuValues[i].menu) {
          selectedItem = getSelectedItem(menuValues[i].menu, value);

          if (selectedItem) {
            return selectedItem;
          }
        }
      }
    }

    self.on('show', function (e) {
      activateMenuItemsByValue(e.control, self.value());
    });

    self.state.on('change:value', function (e) {
      var selectedItem = getSelectedItem(self.state.get('menu'), e.value);

      if (selectedItem) {
        self.text(selectedItem.text);
      } else {
        self.text(self.settings.text);
      }
    });

    return self._super();
  }
});



/***/ }),
/* 615 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfoBox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Widget__ = __webpack_require__(13);




var InfoBox = __WEBPACK_IMPORTED_MODULE_0__Widget__["a" /* Widget */].extend({
  init: function init(settings) {
    var self = this;

    self._super(settings);
    self.classes.add('widget').add('infobox');
    self.canFocus = false;
  },
  severity: function severity(level) {
    this.classes.remove('error');
    this.classes.remove('warning');
    this.classes.remove('success');
    this.classes.add(level);
  },
  help: function help(state) {
    this.state.set('help', state);
  },
  renderHtml: function renderHtml() {
    var self = this;
    var prefix = self.classPrefix;

    return '<div id="' + self._id + '" class="' + self.classes + '">\n<div id="' + self._id + '-body">' + self.encode(self.state.get('text')) + '\n<button role="button" tabindex="-1"><i class="' + prefix + 'ico ' + prefix + 'i-help"></i></button>\n</div></div>';
  },
  bindStates: function bindStates() {
    var self = this;

    self.state.on('change:text', function (e) {
      self.getEl('body').firstChild.data = self.encode(e.value);

      if (self.state.get('rendered')) {
        self.updateLayoutRect();
      }
    });

    self.state.on('change:help', function (e) {
      self.classes.toggle('has-help', e.value);

      if (self.state.get('rendered')) {
        self.updateLayoutRect();
      }
    });

    return self._super();
  }
});



/***/ }),
/* 616 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextBox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__funcs__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Widget__ = __webpack_require__(13);






var TextBox = __WEBPACK_IMPORTED_MODULE_2__Widget__["a" /* Widget */].extend({
  init: function init(settings) {
    var self = this;

    self._super(settings);
    self.classes.add('textbox');

    if (settings.multiline) {
      self.classes.add('multiline');
    } else {
      self.on('keydown', function (e) {
        var rootControl = void 0;

        if (e.keyCode === 13) {
          e.preventDefault();

          self.parents().reverse().each(function (ctrl) {
            if (ctrl.toJSON) {
              rootControl = ctrl;
              return false;
            }
          });

          self.fire('submit', { data: rootControl.toJSON() });
        }
      });

      self.on('keyup', function (e) {
        self.state.set('value', e.target.value);
      });
    }
  },
  repaint: function repaint() {
    var style = void 0,
        rect = void 0,
        borderBox = void 0,
        borderW = void 0,
        lastRepaintRect = void 0;
    var self = this;
    var borderH = 0;

    style = self.getEl().style;
    rect = self._layoutRect;
    lastRepaintRect = self._lastRepaintRect || {};

    var doc = document;

    if (!self.settings.multiline && doc.all && (!doc.documentMode || doc.documentMode <= 8)) {
      style.lineHeight = rect.h - borderH + 'px';
    }

    borderBox = self.borderBox;
    borderW = borderBox.left + borderBox.right + 8;
    borderH = borderBox.top + borderBox.bottom + (self.settings.multiline ? 8 : 0);

    if (rect.x !== lastRepaintRect.x) {
      style.left = rect.x + 'px';
      lastRepaintRect.x = rect.x;
    }

    if (rect.y !== lastRepaintRect.y) {
      style.top = rect.y + 'px';
      lastRepaintRect.y = rect.y;
    }

    if (rect.w !== lastRepaintRect.w) {
      style.width = rect.w - borderW + 'px';
      lastRepaintRect.w = rect.w;
    }

    if (rect.h !== lastRepaintRect.h) {
      style.height = rect.h - borderH + 'px';
      lastRepaintRect.h = rect.h;
    }

    self._lastRepaintRect = lastRepaintRect;
    self.fire('repaint', {}, false);
    return self;
  },
  renderHtml: function renderHtml() {
    var elm = void 0;
    var self = this;
    var settings = self.settings;

    var attrs = {
      id: self._id,
      hidefocus: '1'
    };

    __WEBPACK_IMPORTED_MODULE_1__Tools__["a" /* Tools */].each(['rows', 'spellcheck', 'maxLength', 'size', 'readonly', 'min', 'max', 'step', 'list', 'pattern', 'placeholder', 'required', 'multiple'], function (name) {
      attrs[name] = settings[name];
    });

    if (self.disabled()) {
      attrs.disabled = 'disabled';
    }

    if (settings.subtype) {
      attrs.type = settings.subtype;
    }

    elm = __WEBPACK_IMPORTED_MODULE_0__funcs__["a" /* funcs */].create(settings.multiline ? 'textarea' : 'input', attrs);
    elm.value = self.state.get('value');
    elm.className = self.classes;

    return elm.outerHTML;
  },
  value: function value(_value) {
    if (arguments.length) {
      this.state.set('value', _value);

      return this;
    }

    if (this.state.get('rendered')) {
      this.state.set('value', this.getEl().value);
    }

    return this.state.get('value');
  },
  postRender: function postRender() {
    var self = this;

    self.getEl().value = self.state.get('value');
    self._super();

    self.$el.on('change', function (e) {
      self.state.set('value', e.target.value);
      self.fire('change', e);
    });
  },
  bindStates: function bindStates() {
    var self = this;

    self.state.on('change:value', function (e) {
      if (self.getEl().value !== e.value) {
        self.getEl().value = e.value;
      }
    });

    self.state.on('change:disabled', function (e) {
      self.getEl().disabled = e.value;
    });

    return self._super();
  },
  remove: function remove() {
    this.$el.off();
    this._super();
  }
});



/***/ }),
/* 617 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DropZone; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__funcs__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Widget__ = __webpack_require__(13);






var DropZone = __WEBPACK_IMPORTED_MODULE_2__Widget__["a" /* Widget */].extend({
  init: function init(settings) {
    var self = this;

    settings = __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].extend({
      height: 100,
      text: 'Drop an image here',
      multiple: false,
      accept: null
    }, settings);

    self._super(settings);
    self.classes.add('dropzone');

    if (settings.multiple) {
      self.classes.add('multiple');
    }
  },
  renderHtml: function renderHtml() {
    var attrs = void 0,
        elm = void 0;
    var self = this;
    var cfg = self.settings;

    attrs = {
      id: self._id,
      hidefocus: '1'
    };

    elm = __WEBPACK_IMPORTED_MODULE_1__funcs__["a" /* funcs */].create('div', attrs, '<span>' + this.translate(cfg.text) + '</span>');

    if (cfg.height) {
      __WEBPACK_IMPORTED_MODULE_1__funcs__["a" /* funcs */].css(elm, 'height', cfg.height + 'px');
    }
    if (cfg.width) {
      __WEBPACK_IMPORTED_MODULE_1__funcs__["a" /* funcs */].css(elm, 'width', cfg.width + 'px');
    }

    elm.className = self.classes;

    return elm.outerHTML;
  },
  postRender: function postRender() {
    var self = this;

    var toggleDragClass = function toggleDragClass(e) {
      e.preventDefault();

      self.classes.toggle('dragenter');
      self.getEl().className = self.classes;
    };

    var filter = function filter(files) {
      var accept = self.settings.accept;

      if (typeof accept !== 'string') {
        return files;
      }

      var re = new RegExp('(' + accept.split(/\s*,\s*/).join('|') + ')$', 'i');

      return __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].grep(files, function (file) {
        return re.test(file.name);
      });
    };

    self._super();

    self.$el.on('dragover', function (e) {
      e.preventDefault();
    });

    self.$el.on('dragenter', toggleDragClass);
    self.$el.on('dragleave', toggleDragClass);

    self.$el.on('drop', function (e) {
      e.preventDefault();

      if (self.state.get('disabled')) {
        return;
      }

      var files = filter(e.dataTransfer.files);

      self.value = function () {
        if (!files.length) {
          return null;
        } else if (self.settings.multiple) {
          return files;
        } else {
          return files[0];
        }
      };

      if (files.length) {
        self.fire('change', e);
      }
    });
  },
  remove: function remove() {
    this.$el.off();
    this._super();
  }
});



/***/ }),
/* 618 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabPanel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__funcs__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Panel__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2____ = __webpack_require__(32);






var TabPanel = __WEBPACK_IMPORTED_MODULE_1__Panel__["a" /* Panel */].extend({
  Defaults: {
    layout: 'absolute',
    defaults: { type: 'panel' }
  },
  activateTab: function activateTab(idx) {
    var activeTabElm = void 0;

    if (this.activeTabId) {
      activeTabElm = this.getEl(this.activeTabId);
      Object(__WEBPACK_IMPORTED_MODULE_2____["a" /* $ */])(activeTabElm).removeClass(this.classPrefix + 'active');
      activeTabElm.setAttribute('aria-selected', 'false');
    }

    this.activeTabId = 't' + idx;

    activeTabElm = this.getEl('t' + idx);
    activeTabElm.setAttribute('aria-selected', 'true');
    Object(__WEBPACK_IMPORTED_MODULE_2____["a" /* $ */])(activeTabElm).addClass(this.classPrefix + 'active');

    this.items()[idx].show().fire('showtab');
    this.reflow();

    this.items().each(function (item, i) {
      if (idx !== i) {
        item.hide();
      }
    });
  },
  renderHtml: function renderHtml() {
    var self = this;
    var layout = self._layout;
    var tabsHtml = '';
    var prefix = self.classPrefix;

    self.preRender();
    layout.preRender(self);

    self.items().each(function (ctrl, i) {
      var id = self._id + '-t' + i;

      ctrl.aria('role', 'tabpanel');
      ctrl.aria('labelledby', id);
      tabsHtml += '<div id="' + id + '" class="' + prefix + 'tab" unselectable="on" role="tab" \naria-controls="' + ctrl._id + '" aria-selected="false" tabIndex="-1">\n' + self.encode(ctrl.settings.title) + '</div>';
    });

    return '<div id="' + self._id + '" class="' + self.classes + '" hidefocus="1" tabindex="-1">' + '<div id="' + self._id + '-head" class="' + prefix + 'tabs" role="tablist">' + tabsHtml + '</div>' + '<div id="' + self._id + '-body" class="' + self.bodyClasses + '">' + layout.renderHtml(self) + '</div>' + '</div>';
  },
  postRender: function postRender() {
    var self = this;

    self._super();
    self.settings.activeTab = self.settings.activeTab || 0;
    self.activateTab(self.settings.activeTab);

    this.on('click', function (e) {
      var targetParent = e.target.parentNode;

      if (targetParent && targetParent.id === self._id + '-head') {
        var i = targetParent.childNodes.length;

        while (i--) {
          if (targetParent.childNodes[i] === e.target) {
            self.activateTab(i);
          }
        }
      }
    });
  },
  initLayoutRect: function initLayoutRect() {
    var rect = void 0,
        minW = void 0,
        minH = void 0;
    var self = this;

    minW = __WEBPACK_IMPORTED_MODULE_0__funcs__["a" /* funcs */].getSize(self.getEl('head')).width;
    minW = minW < 0 ? 0 : minW;
    minH = 0;

    self.items().each(function (item) {
      minW = Math.max(minW, item.layoutRect().minW);
      minH = Math.max(minH, item.layoutRect().minH);
    });

    self.items().each(function (ctrl) {
      ctrl.settings.x = 0;
      ctrl.settings.y = 0;
      ctrl.settings.w = minW;
      ctrl.settings.h = minH;
      ctrl.layoutRect({
        x: 0,
        y: 0,
        w: minW,
        h: minH
      });
    });

    var headH = __WEBPACK_IMPORTED_MODULE_0__funcs__["a" /* funcs */].getSize(self.getEl('head')).height;

    self.settings.minWidth = minW;
    self.settings.minHeight = minH + headH;
    rect = self._super();
    rect.deltaH += headH;
    rect.innerH = rect.h - rect.deltaH;

    return rect;
  }
});



/***/ }),
/* 619 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VK; });


var VK = tinymce.util.Tools.resolve('tinymce.util.VK');



/***/ }),
/* 620 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FieldSet; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Form__ = __webpack_require__(241);




var FieldSet = __WEBPACK_IMPORTED_MODULE_0__Form__["a" /* Form */].extend({
  Defaults: {
    containerCls: 'fieldset',
    layout: 'flex',
    direction: 'column',
    align: 'stretch',
    flex: 1,
    padding: '25 15 5 15',
    labelGap: 30,
    spacing: 10,
    border: 1
  },
  renderHtml: function renderHtml() {
    var self = this;
    var layout = self._layout;
    var prefix = self.classPrefix;

    self.preRender();
    layout.preRender(self);

    return '<fieldset id="' + self._id + '" class="' + self.classes + '" hidefocus="1" tabindex="-1">' + (self.settings.title ? '<legend id="' + self._id + '-title" class="' + prefix + 'fieldset-title">' + self.settings.title + '</legend>' : '') + '<div id="' + self._id + '-body" class="' + self.bodyClasses + '">' + (self.settings.html || '') + layout.renderHtml(self) + '</div>' + '</fieldset>';
  }
});



/***/ }),
/* 621 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuItem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Env__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Delay__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Widget__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Factory__ = __webpack_require__(40);







var toggleTextStyle = function toggleTextStyle(ctrl, state) {
  var textStyle = ctrl._textStyle;

  if (textStyle) {
    var textElm = ctrl.getEl('text');

    textElm.setAttribute('style', textStyle);

    if (state) {
      textElm.style.color = '';
      textElm.style.backgroundColor = '';
    }
  }
};

var MenuItem = __WEBPACK_IMPORTED_MODULE_2__Widget__["a" /* Widget */].extend({
  Defaults: {
    border: 0,
    role: 'menuitem'
  },
  init: function init(settings) {
    var text = void 0;
    var self = this;

    self._super(settings);
    settings = self.settings;
    self.classes.add('menu-item');

    if (settings.menu) {
      self.classes.add('menu-item-expand');
    }

    if (settings.preview) {
      self.classes.add('menu-item-preview');
    }

    text = self.state.get('text');

    if (text === '-' || text === '|') {
      self.classes.add('menu-item-sep');
      self.aria('role', 'separator');
      self.state.set('text', '-');
    }

    if (settings.selectable) {
      self.aria('role', 'menuitemcheckbox');
      self.classes.add('menu-item-checkbox');
      settings.icon = 'selected';
    }

    if (!settings.preview && !settings.selectable) {
      self.classes.add('menu-item-normal');
    }

    self.on('mousedown', function (e) {
      e.preventDefault();
    });

    if (settings.menu && !settings.ariaHideMenu) {
      self.aria('haspopup', true);
    }
  },
  hasMenus: function hasMenus() {
    return !!this.settings.menu;
  },
  showMenu: function showMenu() {
    var menu = void 0;
    var self = this;
    var parent = self.parent();
    var settings = self.settings;

    parent.items().each(function (ctrl) {
      if (ctrl !== self) {
        ctrl.hideMenu();
      }
    });

    if (settings.menu) {
      menu = self.menu;

      if (!menu) {
        menu = settings.menu;

        if (menu.length) {
          menu = {
            type: 'menu',
            animate: true,
            items: menu
          };
        } else {
          menu.type = menu.type || 'menu';
          menu.animate = true;
        }

        if (parent.settings.itemDefaults) {
          menu.itemDefaults = parent.settings.itemDefaults;
        }

        menu = self.menu = __WEBPACK_IMPORTED_MODULE_3__Factory__["a" /* Factory */].create(menu).parent(self).renderTo();
        menu.reflow();

        menu.on('cancel', function (e) {
          e.stopPropagation();
          self.focus();
          menu.hide();
        });

        menu.on('show hide', function (e) {
          if (e.control.items) {
            e.control.items().each(function (ctrl) {
              ctrl.active(ctrl.settings.selected);
            });
          }
        }).fire('show');

        menu.on('hide', function (e) {
          if (e.control === menu) {
            self.classes.remove('selected');
          }
        });

        menu.submenu = true;
      } else {
        menu.show();
      }

      menu._parentMenu = parent;
      menu.classes.add('menu-sub');

      var rel = menu.testMoveRel(self.getEl(), self.isRtl() ? ['tl-tr', 'bl-br', 'tr-tl', 'br-bl'] : ['tr-tl', 'br-bl', 'tl-tr', 'bl-br']);
      menu.moveRel(self.getEl(), rel);
      menu.rel = rel;
      rel = 'menu-sub-' + rel;
      menu.classes.remove(menu._lastRel).add(rel);
      menu._lastRel = rel;
      self.classes.add('selected');
      self.aria('expanded', true);
    }
  },
  hideMenu: function hideMenu() {
    var self = this;

    if (self.menu) {
      self.menu.items().each(function (item) {
        if (item.hideMenu) {
          item.hideMenu();
        }
      });

      self.menu.hide();
      self.aria('expanded', false);
    }

    return self;
  },
  renderHtml: function renderHtml() {
    var self = this;
    var id = self._id;
    var settings = self.settings;
    var prefix = self.classPrefix;
    var text = self.state.get('text');
    var icon = self.settings.icon;
    var image = '';
    var shortcut = settings.shortcut;
    var url = self.encode(settings.url);
    var iconHtml = '';

    function convertShortcut(shortcut) {
      var i = void 0,
          value = void 0;
      var replace = {};

      if (__WEBPACK_IMPORTED_MODULE_0__Env__["a" /* Env */].mac) {
        replace = {
          alt: '&#x2325;',
          ctrl: '&#x2318;',
          shift: '&#x21E7;',
          meta: '&#x2318;'
        };
      } else {
        replace = { meta: 'Ctrl' };
      }

      shortcut = shortcut.split('+');

      for (i = 0; i < shortcut.length; i++) {
        value = replace[shortcut[i].toLowerCase()];

        if (value) {
          shortcut[i] = value;
        }
      }

      return shortcut.join('+');
    }

    function escapeRegExp(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function markMatches(text) {
      var match = settings.match || '';

      return match ? text.replace(new RegExp(escapeRegExp(match), 'gi'), function (match) {
        return '!mce~match[' + match + ']mce~match!';
      }) : text;
    }

    function boldMatches(text) {
      return text.replace(new RegExp(escapeRegExp('!mce~match['), 'g'), '<b>').replace(new RegExp(escapeRegExp(']mce~match!'), 'g'), '</b>');
    }

    if (icon) {
      self.parent().classes.add('menu-has-icons');
    }

    if (settings.image) {
      image = ' style="background-image: url(\'' + settings.image + '\')"';
    }

    if (shortcut) {
      shortcut = convertShortcut(shortcut);
    }

    icon = prefix + 'ico ' + prefix + 'i-' + (self.settings.icon || 'none');
    iconHtml = '' + (text !== '-' ? '<i class="' + icon + '"' + image + '></i>\xA0' : '');

    text = boldMatches(self.encode(markMatches(text)));
    url = boldMatches(self.encode(markMatches(url)));

    return '<div id="' + id + '" class="' + self.classes + '" tabindex="-1">' + iconHtml + (text !== '-' ? '<span id="' + id + '-text" class="' + prefix + 'text">' + text + '</span>' : '') + (shortcut ? '<div id="' + id + '-shortcut" class="' + prefix + 'menu-shortcut">' + shortcut + '</div>' : '') + (settings.menu ? '<div class="' + prefix + 'caret"></div>' : '') + (url ? '<div class="' + prefix + 'menu-item-link">' + url + '</div>' : '') + '</div>';
  },
  postRender: function postRender() {
    var self = this;
    var settings = self.settings;
    var textStyle = settings.textStyle;

    if (typeof textStyle === 'function') {
      textStyle = textStyle.call(this);
    }

    if (textStyle) {
      var textElm = self.getEl('text');

      if (textElm) {
        textElm.setAttribute('style', textStyle);
        self._textStyle = textStyle;
      }
    }

    self.on('mouseenter click', function (e) {
      if (e.control === self) {
        if (!settings.menu && e.type === 'click') {
          self.fire('select');

          __WEBPACK_IMPORTED_MODULE_1__Delay__["a" /* Delay */].requestAnimationFrame(function () {
            self.parent().hideAll();
          });
        } else {
          self.showMenu();

          if (e.aria) {
            self.menu.focus(true);
          }
        }
      }
    });

    self._super();

    return self;
  },
  hover: function hover() {
    var self = this;

    self.parent().items().each(function (ctrl) {
      ctrl.classes.remove('selected');
    });

    self.classes.toggle('selected', true);

    return self;
  },
  active: function active(state) {
    toggleTextStyle(this, state);

    if (typeof state !== 'undefined') {
      this.aria('checked', state);
    }

    return this._super(state);
  },
  remove: function remove() {
    this._super();

    if (this.menu) {
      this.menu.remove();
    }
  }
});



/***/ }),
/* 622 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorBox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ComboBox__ = __webpack_require__(179);




var ColorBox = __WEBPACK_IMPORTED_MODULE_0__ComboBox__["a" /* ComboBox */].extend({
  init: function init(settings) {
    var self = this;

    settings.spellcheck = false;

    if (settings.onaction) {
      settings.icon = 'none';
    }

    self._super(settings);
    self.classes.add('colorbox');

    self.on('change keyup postrender', function () {
      self.repaintColor(self.value());
    });
  },
  repaintColor: function repaintColor(value) {
    var openElm = this.getEl('open');
    var elm = openElm ? openElm.getElementsByTagName('i')[0] : null;

    if (elm) {
      try {
        elm.style.background = value;
      } catch (ex) {}
    }
  },
  bindStates: function bindStates() {
    var self = this;

    self.state.on('change:value', function (e) {
      if (self.state.get('rendered')) {
        self.repaintColor(e.value);
      }
    });

    return self._super();
  }
});



/***/ }),
/* 623 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FitLayout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AbsoluteLayout__ = __webpack_require__(116);




var FitLayout = __WEBPACK_IMPORTED_MODULE_0__AbsoluteLayout__["a" /* AbsoluteLayout */].extend({
  recalc: function recalc(container) {
    var contLayoutRect = container.layoutRect();
    var paddingBox = container.paddingBox;

    container.items().filter(':visible').each(function (ctrl) {
      ctrl.layoutRect({
        x: paddingBox.left,
        y: paddingBox.top,
        w: contLayoutRect.innerW - paddingBox.right - paddingBox.left,
        h: contLayoutRect.innerH - paddingBox.top - paddingBox.bottom
      });

      if (ctrl.recalc) {
        ctrl.recalc();
      }
    });
  }
});



/***/ }),
/* 624 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectBox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Widget__ = __webpack_require__(13);




function createOptions(options) {
  var strOptions = '';

  if (options) {
    for (var i = 0; i < options.length; i++) {
      strOptions += '<option value="' + options[i] + '">' + options[i] + '</option>';
    }
  }

  return strOptions;
}

var SelectBox = __WEBPACK_IMPORTED_MODULE_0__Widget__["a" /* Widget */].extend({
  Defaults: {
    classes: 'selectbox',
    role: 'selectbox',
    options: []
  },
  init: function init(settings) {
    var self = this;

    self._super(settings);

    if (self.settings.size) {
      self.size = self.settings.size;
    }

    if (self.settings.options) {
      self._options = self.settings.options;
    }

    self.on('keydown', function (e) {
      var rootControl = void 0;

      if (e.keyCode === 13) {
        e.preventDefault();

        self.parents().reverse().each(function (ctrl) {
          if (ctrl.toJSON) {
            rootControl = ctrl;

            return false;
          }
        });

        self.fire('submit', { data: rootControl.toJSON() });
      }
    });
  },
  options: function options(state) {
    if (!arguments.length) {
      return this.state.get('options');
    }

    this.state.set('options', state);

    return this;
  },
  renderHtml: function renderHtml() {
    var self = this;
    var options = void 0;
    var size = '';

    options = createOptions(self._options);

    if (self.size) {
      size = ' size = "' + self.size + '"';
    }

    return '<select id="' + self._id + '" class="' + self.classes + '"' + size + '>' + options + '</select>';
  },
  bindStates: function bindStates() {
    var self = this;

    self.state.on('change:options', function (e) {
      self.getEl().innerHTML = createOptions(e.value);
    });

    return self._super();
  }
});



/***/ }),
/* 625 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilePicker; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Anchors__ = __webpack_require__(626);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ComboBox__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ObjectTools__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__EditorManager__ = __webpack_require__(182);









var getActiveEditor = function getActiveEditor() {
  return window.tinymce ? window.tinymce.activeEditor : __WEBPACK_IMPORTED_MODULE_5__EditorManager__["a" /* EditorManager */].activeEditor;
};

var history = {};
var HISTORY_LENGTH = 5;

var clearHistory = function clearHistory() {
  history = {};
};

var toMenuItem = function toMenuItem(target) {
  return {
    title: target.title,
    value: {
      title: { raw: target.title },
      url: target.url,
      attach: target.attach
    }
  };
};

var toMenuItems = function toMenuItems(targets) {
  return __WEBPACK_IMPORTED_MODULE_1__Tools__["a" /* Tools */].map(targets, toMenuItem);
};

var staticMenuItem = function staticMenuItem(title, url) {
  return {
    title: title,
    value: {
      title: title,
      url: url,
      attach: __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utils */].noop
    }
  };
};

var isUniqueUrl = function isUniqueUrl(url, targets) {
  var foundTarget = __WEBPACK_IMPORTED_MODULE_4__ObjectTools__["a" /* ObjectTools */].exists(targets, function (target) {
    return target.url === url;
  });

  return !foundTarget;
};

var getSetting = function getSetting(editorSettings, name, defaultValue) {
  var value = name in editorSettings ? editorSettings[name] : defaultValue;

  return value === false ? null : value;
};

var createMenuItems = function createMenuItems(term, targets, fileType, editorSettings) {
  var separator = { title: '-' };

  var fromHistoryMenuItems = function fromHistoryMenuItems(history) {
    var historyItems = history.hasOwnProperty(fileType) ? history[fileType] : [];

    var uniqueHistory = __WEBPACK_IMPORTED_MODULE_4__ObjectTools__["a" /* ObjectTools */].filter(historyItems, function (url) {
      return isUniqueUrl(url, targets);
    });

    return __WEBPACK_IMPORTED_MODULE_1__Tools__["a" /* Tools */].map(uniqueHistory, function (url) {
      return {
        title: url,
        value: {
          title: url,
          url: url,
          attach: __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utils */].noop
        }
      };
    });
  };

  var fromMenuItems = function fromMenuItems(type) {
    var filteredTargets = __WEBPACK_IMPORTED_MODULE_4__ObjectTools__["a" /* ObjectTools */].filter(targets, function (target) {
      return target.type === type;
    });

    return toMenuItems(filteredTargets);
  };

  var anchorMenuItems = function anchorMenuItems() {
    var anchorMenuItems = fromMenuItems('anchor');
    var topAnchor = getSetting(editorSettings, 'anchor_top', '#top');
    var bottomAchor = getSetting(editorSettings, 'anchor_bottom', '#bottom');

    if (topAnchor !== null) {
      anchorMenuItems.unshift(staticMenuItem('<top>', topAnchor));
    }

    if (bottomAchor !== null) {
      anchorMenuItems.push(staticMenuItem('<bottom>', bottomAchor));
    }

    return anchorMenuItems;
  };

  var join = function join(items) {
    return __WEBPACK_IMPORTED_MODULE_4__ObjectTools__["a" /* ObjectTools */].foldl(items, function (a, b) {
      var bothEmpty = a.length === 0 || b.length === 0;

      return bothEmpty ? a.concat(b) : a.concat(separator, b);
    }, []);
  };

  if (editorSettings.typeahead_urls === false) {
    return [];
  }

  return fileType === 'file' ? join([filterByQuery(term, fromHistoryMenuItems(history)), filterByQuery(term, fromMenuItems('header')), filterByQuery(term, anchorMenuItems())]) : filterByQuery(term, fromHistoryMenuItems(history));
};

var addToHistory = function addToHistory(url, fileType) {
  var items = history[fileType];

  if (!/^https?/.test(url)) {
    return;
  }

  if (items) {
    if (__WEBPACK_IMPORTED_MODULE_4__ObjectTools__["a" /* ObjectTools */].indexOf(items, url) === -1) {
      history[fileType] = items.slice(0, HISTORY_LENGTH).concat(url);
    }
  } else {
    history[fileType] = [url];
  }
};

var filterByQuery = function filterByQuery(term, menuItems) {
  var lowerCaseTerm = term.toLowerCase();
  var result = __WEBPACK_IMPORTED_MODULE_1__Tools__["a" /* Tools */].grep(menuItems, function (item) {
    return item.title.toLowerCase().indexOf(lowerCaseTerm) !== -1;
  });

  return result.length === 1 && result[0].title === term ? [] : result;
};

var getTitle = function getTitle(linkDetails) {
  var title = linkDetails.title;

  return title.raw ? title.raw : title;
};

var setupAutoCompleteHandler = function setupAutoCompleteHandler(ctrl, editorSettings, bodyElm, fileType) {
  var autocomplete = function autocomplete(term) {
    var linkTargets = __WEBPACK_IMPORTED_MODULE_2__Anchors__["a" /* Anchors */].find(bodyElm);
    var menuItems = createMenuItems(term, linkTargets, fileType, editorSettings);

    ctrl.showAutoComplete(menuItems, term);
  };

  ctrl.on('autocomplete', function () {
    autocomplete(ctrl.value());
  });

  ctrl.on('selectitem', function (e) {
    var linkDetails = e.value;

    ctrl.value(linkDetails.url);

    var title = getTitle(linkDetails);

    if (fileType === 'image') {
      ctrl.fire('change', {
        meta: {
          alt: title,
          attach: linkDetails.attach
        }
      });
    } else {
      ctrl.fire('change', {
        meta: {
          text: title,
          attach: linkDetails.attach
        }
      });
    }

    ctrl.focus();
  });

  ctrl.on('click', function (e) {
    if (ctrl.value().length === 0 && e.target.nodeName === 'INPUT') {
      autocomplete('');
    }
  });

  ctrl.on('PostRender', function () {
    ctrl.getRoot().on('submit', function (e) {
      if (!e.isDefaultPrevented()) {
        addToHistory(ctrl.value(), fileType);
      }
    });
  });
};

var statusToUiState = function statusToUiState(result) {
  var status = result.status;
  var message = result.message;

  if (status === 'valid') {
    return {
      status: 'ok',
      message: message
    };
  } else if (status === 'unknown') {
    return {
      status: 'warn',
      message: message
    };
  } else if (status === 'invalid') {
    return {
      status: 'warn',
      message: message
    };
  } else {
    return {
      status: 'none',
      message: ''
    };
  }
};

var setupLinkValidatorHandler = function setupLinkValidatorHandler(ctrl, editorSettings, fileType) {
  var validatorHandler = editorSettings.filepicker_validator_handler;

  if (validatorHandler) {
    var validateUrl = function validateUrl(url) {
      if (url.length === 0) {
        ctrl.statusLevel('none');

        return;
      }

      validatorHandler({
        url: url,
        type: fileType
      }, function (result) {
        var uiState = statusToUiState(result);

        ctrl.statusMessage(uiState.message);
        ctrl.statusLevel(uiState.status);
      });
    };

    ctrl.state.on('change:value', function (e) {
      validateUrl(e.value);
    });
  }
};

var FilePicker = __WEBPACK_IMPORTED_MODULE_3__ComboBox__["a" /* ComboBox */].extend({
  Statics: { clearHistory: clearHistory },
  init: function init(settings) {
    var actionCallback = void 0,
        fileBrowserCallback = void 0,
        fileBrowserCallbackTypes = void 0;
    var self = this;
    var editor = getActiveEditor();
    var editorSettings = editor.settings;
    var fileType = settings.filetype;

    settings.spellcheck = false;
    fileBrowserCallbackTypes = editorSettings.file_picker_types || editorSettings.file_browser_callback_types;

    if (fileBrowserCallbackTypes) {
      fileBrowserCallbackTypes = __WEBPACK_IMPORTED_MODULE_1__Tools__["a" /* Tools */].makeMap(fileBrowserCallbackTypes, /[, ]/);
    }

    if (!fileBrowserCallbackTypes || fileBrowserCallbackTypes[fileType]) {
      fileBrowserCallback = editorSettings.file_picker_callback;

      if (fileBrowserCallback && (!fileBrowserCallbackTypes || fileBrowserCallbackTypes[fileType])) {
        actionCallback = function actionCallback() {
          var meta = self.fire('beforecall').meta;

          meta = __WEBPACK_IMPORTED_MODULE_1__Tools__["a" /* Tools */].extend({ filetype: fileType }, meta);

          fileBrowserCallback.call(editor, function (value, meta) {
            self.value(value).fire('change', { meta: meta });
          }, self.value(), meta);
        };
      } else {
        fileBrowserCallback = editorSettings.file_browser_callback;

        if (fileBrowserCallback && (!fileBrowserCallbackTypes || fileBrowserCallbackTypes[fileType])) {
          actionCallback = function actionCallback() {
            fileBrowserCallback(self.getEl('inp').id, self.value(), fileType, window);
          };
        }
      }
    }

    if (actionCallback) {
      settings.icon = 'browse';
      settings.onaction = actionCallback;
    }

    self._super(settings);
    self.classes.add('filepicker');

    setupAutoCompleteHandler(self, editorSettings, editor.getBody(), fileType);
    setupLinkValidatorHandler(self, editorSettings, fileType);
  }
});



/***/ }),
/* 626 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Anchors; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ID__ = __webpack_require__(627);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Node__ = __webpack_require__(628);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Body__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Utils__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ObjectTools__ = __webpack_require__(19);
/* eslint-disable no-cond-assign */









var trim = __WEBPACK_IMPORTED_MODULE_4__Tools__["a" /* Tools */].trim;

var hasContentEditableState = function hasContentEditableState(value) {
  return function (node) {
    if (node && node.nodeType === 1) {
      if (node.contentEditable === value) {
        return true;
      }

      if (node.getAttribute('data-mce-contenteditable') === value) {
        return true;
      }
    }

    return false;
  };
};

var hasTitle = function hasTitle(target) {
  return trim(target.title).length > 0;
};
var isContentEditableTrue = hasContentEditableState('true');
var isContentEditableFalse = hasContentEditableState('false');
var isValidAnchor = function isValidAnchor(elm) {
  return isAnchor(elm) && isEditable(elm);
};
var isValidHeader = function isValidHeader(elm) {
  return isHeader(elm) && isEditable(elm);
};
var isHeader = function isHeader(elm) {
  return elm && /^(H[1-6])$/.test(elm.nodeName);
};
var getElementText = function getElementText(elm) {
  return elm.innerText || elm.textContent;
};
var getOrGenerateId = function getOrGenerateId(elm) {
  return elm.id ? elm.id : __WEBPACK_IMPORTED_MODULE_0__ID__["a" /* ID */].generate('h');
};
var isAnchor = function isAnchor(elm) {
  return elm && elm.nodeName === 'A' && (elm.id || elm.name);
};
var getLevel = function getLevel(elm) {
  return isHeader(elm) ? parseInt(elm.nodeName.substr(1), 10) : 0;
};
var isEditable = function isEditable(elm) {
  return isChildOfContentEditableTrue(elm) && !isContentEditableFalse(elm);
};
var getAnchorTargets = function getAnchorTargets(elms) {
  return __WEBPACK_IMPORTED_MODULE_5__ObjectTools__["a" /* ObjectTools */].map(__WEBPACK_IMPORTED_MODULE_5__ObjectTools__["a" /* ObjectTools */].filter(elms, isValidAnchor), anchorTarget);
};
var getHeaderTargets = function getHeaderTargets(elms) {
  return __WEBPACK_IMPORTED_MODULE_5__ObjectTools__["a" /* ObjectTools */].map(__WEBPACK_IMPORTED_MODULE_5__ObjectTools__["a" /* ObjectTools */].filter(elms, isValidHeader), headerTarget);
};
var select = function select(selector, root) {
  return __WEBPACK_IMPORTED_MODULE_5__ObjectTools__["a" /* ObjectTools */].map(__WEBPACK_IMPORTED_MODULE_1__Node__["a" /* Node */].descendants(__WEBPACK_IMPORTED_MODULE_2__Body__["a" /* Body */].fromDom(root), selector), function (element) {
    return element.dom();
  });
};

var create = function create(type, title, url, level, attach) {
  return {
    type: type,
    title: title,
    url: url,
    level: level,
    attach: attach
  };
};

var isChildOfContentEditableTrue = function isChildOfContentEditableTrue(node) {
  while (node = node.parentNode) {
    var value = node.contentEditable;

    if (value && value !== 'inherit') {
      return isContentEditableTrue(node);
    }
  }

  return false;
};

var headerTarget = function headerTarget(elm) {
  var headerId = getOrGenerateId(elm);

  var attach = function attach() {
    elm.id = headerId;
  };

  return create('header', getElementText(elm), '#' + headerId, getLevel(elm), attach);
};

var anchorTarget = function anchorTarget(elm) {
  var anchorId = elm.id || elm.name;
  var anchorText = getElementText(elm);

  return create('anchor', anchorText || '#' + anchorId, '#' + anchorId, 0, __WEBPACK_IMPORTED_MODULE_3__Utils__["a" /* Utils */].noop);
};

var getTargetElements = function getTargetElements(elm) {
  return select('h1,h2,h3,h4,h5,h6,a:not([href])', elm);
};

var find = function find(elm) {
  var elms = getTargetElements(elm);

  return __WEBPACK_IMPORTED_MODULE_5__ObjectTools__["a" /* ObjectTools */].filter(getHeaderTargets(elms).concat(getAnchorTargets(elms)), hasTitle);
};

var Anchors = { find: find };



/***/ }),
/* 627 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ID; });


var unique = 0;

var generate = function generate(prefix) {
  var date = new Date();
  var time = date.getTime();
  var random = Math.floor(Math.random() * 1000000000);

  unique++;

  return prefix + '_' + random + unique + String(time);
};

var ID = { generate: generate };



/***/ }),
/* 628 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Node; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Nodes__ = __webpack_require__(629);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SelectorUtils__ = __webpack_require__(181);





var all = function all(selector) {
  return __WEBPACK_IMPORTED_MODULE_1__SelectorUtils__["a" /* SelectorUtils */].all(selector);
};
var descendants = function descendants(scope, selector) {
  return __WEBPACK_IMPORTED_MODULE_1__SelectorUtils__["a" /* SelectorUtils */].all(selector, scope);
};
var siblings = function siblings(scope, selector) {
  return __WEBPACK_IMPORTED_MODULE_0__Nodes__["a" /* Nodes */].siblings(scope, function (e) {
    return __WEBPACK_IMPORTED_MODULE_1__SelectorUtils__["a" /* SelectorUtils */].is(e, selector);
  });
};
var children = function children(scope, selector) {
  return __WEBPACK_IMPORTED_MODULE_0__Nodes__["a" /* Nodes */].children(scope, function (e) {
    return __WEBPACK_IMPORTED_MODULE_1__SelectorUtils__["a" /* SelectorUtils */].is(e, selector);
  });
};
var ancestors = function ancestors(scope, selector, isRoot) {
  return __WEBPACK_IMPORTED_MODULE_0__Nodes__["a" /* Nodes */].ancestors(scope, function (e) {
    return __WEBPACK_IMPORTED_MODULE_1__SelectorUtils__["a" /* SelectorUtils */].is(e, selector);
  }, isRoot);
};

var Node = {
  all: all,
  ancestors: ancestors,
  siblings: siblings,
  children: children,
  descendants: descendants
};



/***/ }),
/* 629 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Nodes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Body__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Selected__ = __webpack_require__(630);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ObjectTools__ = __webpack_require__(19);






var all = function all(predicate) {
  return descendants(__WEBPACK_IMPORTED_MODULE_0__Body__["a" /* Body */].body(), predicate);
};
var siblings = function siblings(scope, predicate) {
  return __WEBPACK_IMPORTED_MODULE_2__ObjectTools__["a" /* ObjectTools */].filter(__WEBPACK_IMPORTED_MODULE_1__Selected__["a" /* Selected */].siblings(scope), predicate);
};
var children = function children(scope, predicate) {
  return __WEBPACK_IMPORTED_MODULE_2__ObjectTools__["a" /* ObjectTools */].filter(__WEBPACK_IMPORTED_MODULE_1__Selected__["a" /* Selected */].children(scope), predicate);
};
var ancestors = function ancestors(scope, predicate, isRoot) {
  return __WEBPACK_IMPORTED_MODULE_2__ObjectTools__["a" /* ObjectTools */].filter(__WEBPACK_IMPORTED_MODULE_1__Selected__["a" /* Selected */].parents(scope, isRoot), predicate);
};

var descendants = function descendants(scope, predicate) {
  var result = [];

  __WEBPACK_IMPORTED_MODULE_2__ObjectTools__["a" /* ObjectTools */].each(__WEBPACK_IMPORTED_MODULE_1__Selected__["a" /* Selected */].children(scope), function (x) {
    if (predicate(x)) {
      result = result.concat([x]);
    }

    result = result.concat(descendants(x, predicate));
  });

  return result;
};

var Nodes = {
  all: all,
  ancestors: ancestors,
  siblings: siblings,
  children: children,
  descendants: descendants
};



/***/ }),
/* 630 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Selected; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Body__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Retrieve__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Siblings__ = __webpack_require__(631);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__VarTypes__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Selection__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Immutables__ = __webpack_require__(644);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ObjectTools__ = __webpack_require__(19);











var firstChild = function firstChild(element) {
  return child(element, 0);
};
var hasChildNodes = function hasChildNodes(element) {
  return element.dom().hasChildNodes();
};
var owner = function owner(element) {
  return __WEBPACK_IMPORTED_MODULE_0__Body__["a" /* Body */].fromDom(element.dom().ownerDocument);
};
var childNodesCount = function childNodesCount(element) {
  return element.dom().childNodes.length;
};
var nextSiblings = function nextSiblings(element) {
  return __WEBPACK_IMPORTED_MODULE_3__Siblings__["a" /* Siblings */].toArray(element, nextSibling);
};
var prevSiblings = function prevSiblings(element) {
  return __WEBPACK_IMPORTED_MODULE_7__ObjectTools__["a" /* ObjectTools */].reverse(__WEBPACK_IMPORTED_MODULE_3__Siblings__["a" /* Siblings */].toArray(element, prevSibling));
};
var lastChild = function lastChild(element) {
  return child(element, element.dom().childNodes.length - 1);
};

var documentElement = function documentElement(element) {
  var doc = owner(element);

  return __WEBPACK_IMPORTED_MODULE_0__Body__["a" /* Body */].fromDom(doc.dom().documentElement);
};

var defaultView = function defaultView(element) {
  var el = element.dom();
  var defaultView = el.ownerDocument.defaultView;

  return __WEBPACK_IMPORTED_MODULE_0__Body__["a" /* Body */].fromDom(defaultView);
};

var parent = function parent(element) {
  var dom = element.dom();

  return __WEBPACK_IMPORTED_MODULE_2__Retrieve__["a" /* Retrieve */].from(dom.parentNode).map(__WEBPACK_IMPORTED_MODULE_0__Body__["a" /* Body */].fromDom);
};

var findIndex = function findIndex(element) {
  return parent(element).bind(function (p) {
    var kin = children(p);

    return __WEBPACK_IMPORTED_MODULE_7__ObjectTools__["a" /* ObjectTools */].findIndex(kin, function (elem) {
      return __WEBPACK_IMPORTED_MODULE_5__Selection__["a" /* Selection */].eq(element, elem);
    });
  });
};

var parents = function parents(element, isRoot) {
  var stop = __WEBPACK_IMPORTED_MODULE_4__VarTypes__["a" /* VarTypes */].isFunction(isRoot) ? isRoot : __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utils */].constant(false);
  var dom = element.dom();
  var ret = [];

  while (dom.parentNode !== null && dom.parentNode !== undefined) {
    var rawParent = dom.parentNode;
    var _parent = __WEBPACK_IMPORTED_MODULE_0__Body__["a" /* Body */].fromDom(rawParent);

    ret.push(_parent);

    if (stop(_parent) === true) {
      break;
    } else {
      dom = rawParent;
    }
  }

  return ret;
};

var siblings = function siblings(element) {
  var filterSelf = function filterSelf(elements) {
    return __WEBPACK_IMPORTED_MODULE_7__ObjectTools__["a" /* ObjectTools */].filter(elements, function (x) {
      return !__WEBPACK_IMPORTED_MODULE_5__Selection__["a" /* Selection */].eq(element, x);
    });
  };

  return parent(element).map(children).map(filterSelf).getOr([]);
};

var offsetParent = function offsetParent(element) {
  var dom = element.dom();

  return __WEBPACK_IMPORTED_MODULE_2__Retrieve__["a" /* Retrieve */].from(dom.offsetParent).map(__WEBPACK_IMPORTED_MODULE_0__Body__["a" /* Body */].fromDom);
};

var prevSibling = function prevSibling(element) {
  var dom = element.dom();

  return __WEBPACK_IMPORTED_MODULE_2__Retrieve__["a" /* Retrieve */].from(dom.previousSibling).map(__WEBPACK_IMPORTED_MODULE_0__Body__["a" /* Body */].fromDom);
};

var nextSibling = function nextSibling(element) {
  var dom = element.dom();

  return __WEBPACK_IMPORTED_MODULE_2__Retrieve__["a" /* Retrieve */].from(dom.nextSibling).map(__WEBPACK_IMPORTED_MODULE_0__Body__["a" /* Body */].fromDom);
};

var children = function children(element) {
  var dom = element.dom();

  return __WEBPACK_IMPORTED_MODULE_7__ObjectTools__["a" /* ObjectTools */].map(dom.childNodes, __WEBPACK_IMPORTED_MODULE_0__Body__["a" /* Body */].fromDom);
};

var child = function child(element, index) {
  var children = element.dom().childNodes;

  return __WEBPACK_IMPORTED_MODULE_2__Retrieve__["a" /* Retrieve */].from(children[index]).map(__WEBPACK_IMPORTED_MODULE_0__Body__["a" /* Body */].fromDom);
};

var spot = __WEBPACK_IMPORTED_MODULE_6__Immutables__["a" /* Immutables */].immutable('element', 'offset');

var leaf = function leaf(element, offset) {
  var cs = children(element);

  return cs.length > 0 && offset < cs.length ? spot(cs[offset], 0) : spot(element, offset);
};

var Selected = {
  owner: owner,
  defaultView: defaultView,
  documentElement: documentElement,
  parent: parent,
  findIndex: findIndex,
  parents: parents,
  siblings: siblings,
  prevSibling: prevSibling,
  offsetParent: offsetParent,
  prevSiblings: prevSiblings,
  nextSibling: nextSibling,
  nextSiblings: nextSiblings,
  children: children,
  child: child,
  firstChild: firstChild,
  lastChild: lastChild,
  childNodesCount: childNodesCount,
  hasChildNodes: hasChildNodes,
  leaf: leaf
};



/***/ }),
/* 631 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Siblings; });


var toArray = function toArray(target, f) {
  var r = [];

  var recurse = function recurse(e) {
    r.push(e);

    return f(e);
  };

  var cur = f(target);

  do {
    cur = cur.bind(recurse);
  } while (cur.isSome());

  return r;
};

var Siblings = { toArray: toArray };



/***/ }),
/* 632 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UA; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Cache__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Platform__ = __webpack_require__(633);





var detect = __WEBPACK_IMPORTED_MODULE_0__Cache__["a" /* Cache */].cached(function () {
  var userAgent = navigator.userAgent;

  return __WEBPACK_IMPORTED_MODULE_1__Platform__["a" /* Platform */].detect(userAgent);
});

var UA = { detect: detect };



/***/ }),
/* 633 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Platform; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__OSs__ = __webpack_require__(634);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Client__ = __webpack_require__(635);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BrOses__ = __webpack_require__(636);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Browsers__ = __webpack_require__(639);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__DeviceType__ = __webpack_require__(640);








var detect = function detect(userAgent) {
  var browsers = __WEBPACK_IMPORTED_MODULE_2__BrOses__["a" /* BrOses */].browsers();
  var oses = __WEBPACK_IMPORTED_MODULE_2__BrOses__["a" /* BrOses */].oses();
  var browser = __WEBPACK_IMPORTED_MODULE_1__Client__["a" /* Client */].detectBrowser(browsers, userAgent).fold(__WEBPACK_IMPORTED_MODULE_3__Browsers__["a" /* Browsers */].unknown, __WEBPACK_IMPORTED_MODULE_3__Browsers__["a" /* Browsers */].nu);
  var os = __WEBPACK_IMPORTED_MODULE_1__Client__["a" /* Client */].detectOs(oses, userAgent).fold(__WEBPACK_IMPORTED_MODULE_0__OSs__["a" /* OSs */].unknown, __WEBPACK_IMPORTED_MODULE_0__OSs__["a" /* OSs */].nu);
  var deviceType = Object(__WEBPACK_IMPORTED_MODULE_4__DeviceType__["a" /* DeviceType */])(os, browser, userAgent);

  return {
    browser: browser,
    os: os,
    deviceType: deviceType
  };
};

var Platform = { detect: detect };



/***/ }),
/* 634 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OSs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Nus__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils__ = __webpack_require__(17);





var ios = 'iOS';
var osx = 'OSX';
var linux = 'Linux';
var solaris = 'Solaris';
var windows = 'Windows';
var freebsd = 'FreeBSD';
var android = 'Android';

var isOS = function isOS(name, current) {
  return function () {
    return current === name;
  };
};

var unknown = function unknown() {
  return nu({
    current: undefined,
    version: __WEBPACK_IMPORTED_MODULE_0__Nus__["a" /* Nus */].unknown()
  });
};

var nu = function nu(info) {
  var current = info.current;
  var version = info.version;

  return {
    current: current,
    version: version,
    isWindows: isOS(windows, current),
    isiOS: isOS(ios, current),
    isAndroid: isOS(android, current),
    isOSX: isOS(osx, current),
    isLinux: isOS(linux, current),
    isSolaris: isOS(solaris, current),
    isFreeBSD: isOS(freebsd, current)
  };
};

var OSs = {
  unknown: unknown,
  nu: nu,
  windows: __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utils */].constant(windows),
  ios: __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utils */].constant(ios),
  android: __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utils */].constant(android),
  linux: __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utils */].constant(linux),
  osx: __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utils */].constant(osx),
  solaris: __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utils */].constant(solaris),
  freebsd: __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utils */].constant(freebsd)
};



/***/ }),
/* 635 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Client; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Nus__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ObjectTools__ = __webpack_require__(19);





var detect = function detect(candidates, userAgent) {
  var agent = String(userAgent).toLowerCase();

  return __WEBPACK_IMPORTED_MODULE_1__ObjectTools__["a" /* ObjectTools */].find(candidates, function (candidate) {
    return candidate.search(agent);
  });
};

var detectBrowser = function detectBrowser(browsers, userAgent) {
  return detect(browsers, userAgent).map(function (browser) {
    var version = __WEBPACK_IMPORTED_MODULE_0__Nus__["a" /* Nus */].detect(browser.versionRegexes, userAgent);

    return {
      current: browser.name,
      version: version
    };
  });
};

var detectOs = function detectOs(oses, userAgent) {
  return detect(oses, userAgent).map(function (os) {
    var version = __WEBPACK_IMPORTED_MODULE_0__Nus__["a" /* Nus */].detect(os.versionRegexes, userAgent);

    return {
      current: os.name,
      version: version
    };
  });
};

var Client = { detectBrowser: detectBrowser, detectOs: detectOs };



/***/ }),
/* 636 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BrOses; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__StrUtil__ = __webpack_require__(637);





var normalVersionRegex = /.*?version\/ ?([0-9]+).([0-9]+).*/;

var checkContains = function checkContains(target) {
  return function (uastring) {
    return __WEBPACK_IMPORTED_MODULE_1__StrUtil__["a" /* StrUtil */].contains(uastring, target);
  };
};

var browsers = [{
  name: 'Edge',
  versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
  search: function search(uastring) {
    return __WEBPACK_IMPORTED_MODULE_1__StrUtil__["a" /* StrUtil */].contains(uastring, 'edge/') && __WEBPACK_IMPORTED_MODULE_1__StrUtil__["a" /* StrUtil */].contains(uastring, 'chrome') && __WEBPACK_IMPORTED_MODULE_1__StrUtil__["a" /* StrUtil */].contains(uastring, 'safari') && __WEBPACK_IMPORTED_MODULE_1__StrUtil__["a" /* StrUtil */].contains(uastring, 'applewebkit');
  }
}, {
  name: 'Chrome',
  versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/, normalVersionRegex],
  search: function search(uastring) {
    return __WEBPACK_IMPORTED_MODULE_1__StrUtil__["a" /* StrUtil */].contains(uastring, 'chrome') && !__WEBPACK_IMPORTED_MODULE_1__StrUtil__["a" /* StrUtil */].contains(uastring, 'chromeframe');
  }
}, {
  name: 'IE',
  versionRegexes: [/.*?msie ?([0-9]+)\.([0-9]+).*/, /.*?rv:([0-9]+)\.([0-9]+).*/],
  search: function search(uastring) {
    return __WEBPACK_IMPORTED_MODULE_1__StrUtil__["a" /* StrUtil */].contains(uastring, 'msie') || __WEBPACK_IMPORTED_MODULE_1__StrUtil__["a" /* StrUtil */].contains(uastring, 'trident');
  }
}, {
  name: 'Opera',
  versionRegexes: [normalVersionRegex, /.*?opera\/([0-9]+)\.([0-9]+).*/],
  search: checkContains('opera')
}, {
  name: 'Firefox',
  versionRegexes: [/.*?firefox\/ ?([0-9]+)\.([0-9]+).*/],
  search: checkContains('firefox')
}, {
  name: 'Safari',
  versionRegexes: [normalVersionRegex, /.*?cpu os ([0-9]+)_([0-9]+).*/],
  search: function search(uastring) {
    return (__WEBPACK_IMPORTED_MODULE_1__StrUtil__["a" /* StrUtil */].contains(uastring, 'safari') || __WEBPACK_IMPORTED_MODULE_1__StrUtil__["a" /* StrUtil */].contains(uastring, 'mobile/')) && __WEBPACK_IMPORTED_MODULE_1__StrUtil__["a" /* StrUtil */].contains(uastring, 'applewebkit');
  }
}];

var oses = [{
  name: 'Windows',
  search: checkContains('win'),
  versionRegexes: [/.*?windows nt ?([0-9]+)\.([0-9]+).*/]
}, {
  name: 'iOS',
  search: function search(uastring) {
    return __WEBPACK_IMPORTED_MODULE_1__StrUtil__["a" /* StrUtil */].contains(uastring, 'iphone') || __WEBPACK_IMPORTED_MODULE_1__StrUtil__["a" /* StrUtil */].contains(uastring, 'ipad');
  },
  versionRegexes: [/.*?version\/ ?([0-9]+)\.([0-9]+).*/, /.*cpu os ([0-9]+)_([0-9]+).*/, /.*cpu iphone os ([0-9]+)_([0-9]+).*/]
}, {
  name: 'Android',
  search: checkContains('android'),
  versionRegexes: [/.*?android ?([0-9]+)\.([0-9]+).*/]
}, {
  name: 'OSX',
  search: checkContains('os x'),
  versionRegexes: [/.*?os x\?([0-9]+)_([0-9]+).*/]
}, {
  name: 'Linux',
  search: checkContains('linux'),
  versionRegexes: []
}, {
  name: 'Solaris',
  search: checkContains('sunos'),
  versionRegexes: []
}, {
  name: 'FreeBSD',
  search: checkContains('freebsd'),
  versionRegexes: []
}];

var BrOses = {
  browsers: __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utils */].constant(browsers),
  oses: __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utils */].constant(oses)
};



/***/ }),
/* 637 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StrUtil; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Str__ = __webpack_require__(638);


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



var lTrim = function lTrim(str) {
  return str.replace(/^\s+/g, '');
};
var rTrim = function rTrim(str) {
  return str.replace(/\s+$/g, '');
};
var addToEnd = function addToEnd(str, suffix) {
  return str + suffix;
};
var addToStart = function addToStart(str, prefix) {
  return prefix + str;
};
var trim = function trim(str) {
  return str.replace(/^\s+|\s+$/g, '');
};
var contains = function contains(str, substr) {
  return str.indexOf(substr) !== -1;
};
var startsWith = function startsWith(str, prefix) {
  return checkRange(str, prefix, 0);
};
var removeFromStart = function removeFromStart(str, numChars) {
  return str.substring(numChars);
};
var removeFromEnd = function removeFromEnd(str, numChars) {
  return str.substring(0, str.length - numChars);
};
var endsWith = function endsWith(str, suffix) {
  return checkRange(str, suffix, str.length - suffix.length);
};

var checkRange = function checkRange(str, substr, start) {
  if (substr === '') {
    return true;
  }

  if (str.length < substr.length) {
    return false;
  }

  var x = str.substr(start, start + substr.length);

  return x === substr;
};

var supplant = function supplant(str, obj) {
  var isStringOrNumber = function isStringOrNumber(a) {
    var t = typeof a === 'undefined' ? 'undefined' : _typeof(a);

    return t === 'string' || t === 'number';
  };

  return str.replace(/\${([^{}]*)}/g, function (a, b) {
    var value = obj[b];

    return isStringOrNumber(value) ? value : a;
  });
};

var removeLeading = function removeLeading(str, prefix) {
  return startsWith(str, prefix) ? StrUtil.removeFromStart(str, prefix.length) : str;
};

var removeTrailing = function removeTrailing(str, prefix) {
  return endsWith(str, prefix) ? StrUtil.removeFromEnd(str, prefix.length) : str;
};

var ensureLeading = function ensureLeading(str, prefix) {
  return startsWith(str, prefix) ? str : StrUtil.addToStart(str, prefix);
};

var ensureTrailing = function ensureTrailing(str, prefix) {
  return endsWith(str, prefix) ? str : StrUtil.addToEnd(str, prefix);
};

var capitalize = function capitalize(str) {
  return __WEBPACK_IMPORTED_MODULE_0__Str__["a" /* Str */].head(str).bind(function (head) {
    return __WEBPACK_IMPORTED_MODULE_0__Str__["a" /* Str */].tail(str).map(function (tail) {
      return head.toUpperCase() + tail;
    });
  }).getOr(str);
};

var StrUtil = {
  addToStart: addToStart,
  addToEnd: addToEnd,
  removeFromStart: removeFromStart,
  removeFromEnd: removeFromEnd,
  supplant: supplant,
  startsWith: startsWith,
  removeLeading: removeLeading,
  removeTrailing: removeTrailing,
  ensureLeading: ensureLeading,
  ensureTrailing: ensureTrailing,
  endsWith: endsWith,
  contains: contains,
  trim: trim,
  lTrim: lTrim,
  rTrim: rTrim,
  capitalize: capitalize
};



/***/ }),
/* 638 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Str; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Retrieve__ = __webpack_require__(33);




var first = function first(str, count) {
  return str.substr(0, count);
};
var last = function last(str, count) {
  return str.substr(str.length - count, str.length);
};
var head = function head(str) {
  return str === '' ? __WEBPACK_IMPORTED_MODULE_0__Retrieve__["a" /* Retrieve */].none() : __WEBPACK_IMPORTED_MODULE_0__Retrieve__["a" /* Retrieve */].some(str.substr(0, 1));
};
var tail = function tail(str) {
  return str === '' ? __WEBPACK_IMPORTED_MODULE_0__Retrieve__["a" /* Retrieve */].none() : __WEBPACK_IMPORTED_MODULE_0__Retrieve__["a" /* Retrieve */].some(str.substring(1));
};

var Str = { first: first, last: last, head: head, tail: tail };



/***/ }),
/* 639 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Browsers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Nus__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils__ = __webpack_require__(17);





var ie = 'IE';
var edge = 'Edge';
var opera = 'Opera';
var chrome = 'Chrome';
var safari = 'Safari';
var firefox = 'Firefox';

var isBrowser = function isBrowser(name, current) {
  return function () {
    return current === name;
  };
};

var unknown = function unknown() {
  return nu({
    current: undefined,
    version: __WEBPACK_IMPORTED_MODULE_0__Nus__["a" /* Nus */].unknown()
  });
};

var nu = function nu(info) {
  var current = info.current;
  var version = info.version;

  return {
    current: current,
    version: version,
    isEdge: isBrowser(edge, current),
    isChrome: isBrowser(chrome, current),
    isIE: isBrowser(ie, current),
    isOpera: isBrowser(opera, current),
    isFirefox: isBrowser(firefox, current),
    isSafari: isBrowser(safari, current)
  };
};

var Browsers = {
  unknown: unknown,
  nu: nu,
  edge: __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utils */].constant(edge),
  chrome: __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utils */].constant(chrome),
  ie: __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utils */].constant(ie),
  opera: __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utils */].constant(opera),
  firefox: __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utils */].constant(firefox),
  safari: __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utils */].constant(safari)
};



/***/ }),
/* 640 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeviceType; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(17);




function DeviceType(os, browser, userAgent) {
  var isiPad = os.isiOS() && /ipad/i.test(userAgent) === true;
  var isiPhone = os.isiOS() && !isiPad;
  var isAndroid3 = os.isAndroid() && os.version.major === 3;
  var isAndroid4 = os.isAndroid() && os.version.major === 4;
  var isTablet = isiPad || isAndroid3 || isAndroid4 && /mobile/i.test(userAgent) === true;
  var isTouch = os.isiOS() || os.isAndroid();
  var isPhone = isTouch && !isTablet;
  var iOSwebview = browser.isSafari() && os.isiOS() && /safari/i.test(userAgent) === false;

  return {
    isiPad: __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utils */].constant(isiPad),
    isiPhone: __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utils */].constant(isiPhone),
    isTablet: __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utils */].constant(isTablet),
    isPhone: __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utils */].constant(isPhone),
    isTouch: __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utils */].constant(isTouch),
    isAndroid: os.isAndroid,
    isiOS: os.isiOS,
    isWebView: __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utils */].constant(iOSwebview)
  };
}



/***/ }),
/* 641 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocPosition; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Features__ = __webpack_require__(642);




var compareDocumentPosition = function compareDocumentPosition(a, b, match) {
  return (a.compareDocumentPosition(b) & match) !== 0;
};
var documentPositionPreceding = function documentPositionPreceding(a, b) {
  return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_PRECEDING);
};
var documentPositionContainedBy = function documentPositionContainedBy(a, b) {
  return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_CONTAINED_BY);
};

var node = function node() {
  return __WEBPACK_IMPORTED_MODULE_0__Features__["a" /* Features */].getOrDie('Node');
};

var DocPosition = { documentPositionPreceding: documentPositionPreceding, documentPositionContainedBy: documentPositionContainedBy };



/***/ }),
/* 642 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Features; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PathResolver__ = __webpack_require__(643);




var unsafe = function unsafe(name, scope) {
  return __WEBPACK_IMPORTED_MODULE_0__PathResolver__["a" /* PathResolver */].resolve(name, scope);
};

var getOrDie = function getOrDie(name, scope) {
  var actual = unsafe(name, scope);

  if (actual === undefined || actual === null) {
    throw new Error(name + ' not available on this browser');
  }

  return actual;
};

var Features = { getOrDie: getOrDie };



/***/ }),
/* 643 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PathResolver; });
/* eslint-disable no-new-func */


var global = typeof window !== 'undefined' ? window : Function('return this;')();

var path = function path(parts, scope) {
  var o = scope !== undefined && scope !== null ? scope : global;

  for (var i = 0; i < parts.length && o !== undefined && o !== null; ++i) {
    o = o[parts[i]];
  }

  return o;
};

var resolve = function resolve(p, scope) {
  var parts = p.split('.');

  return path(parts, scope);
};

var step = function step(o, part) {
  if (o[part] === undefined || o[part] === null) {
    o[part] = {};
  }

  return o[part];
};

var forge = function forge(parts, target) {
  var o = target !== undefined ? target : global;

  for (var i = 0; i < parts.length; ++i) {
    o = step(o, parts[i]);
  }

  return o;
};

var namespace = function namespace(name, target) {
  var parts = name.split('.');

  return forge(parts, target);
};

var PathResolver = {
  path: path,
  resolve: resolve,
  forge: forge,
  namespace: namespace
};



/***/ }),
/* 644 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Immutables; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Immutable__ = __webpack_require__(645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MixedBag__ = __webpack_require__(646);





var Immutables = {
  immutable: __WEBPACK_IMPORTED_MODULE_0__Immutable__["a" /* Immutable */],
  immutableBag: __WEBPACK_IMPORTED_MODULE_1__MixedBag__["a" /* MixedBag */]
};



/***/ }),
/* 645 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Immutable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ObjectTools__ = __webpack_require__(19);





function Immutable() {
  var fields = arguments;

  return function () {
    var values = new Array(arguments.length);

    for (var i = 0; i < values.length; i++) {
      values[i] = arguments[i];
    }

    if (fields.length !== values.length) {
      throw new Error('Wrong number of arguments to struct. Expected "[' + fields.length + ']", got ' + values.length + ' arguments');
    }

    var struct = {};

    __WEBPACK_IMPORTED_MODULE_1__ObjectTools__["a" /* ObjectTools */].each(fields, function (name, i) {
      struct[name] = __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utils */].constant(values[i]);
    });

    return struct;
  };
}



/***/ }),
/* 646 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MixedBag; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Alerts__ = __webpack_require__(647);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Retrieve__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ObjectUtils__ = __webpack_require__(648);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ObjectTools__ = __webpack_require__(19);








function MixedBag(required, optional) {
  var everything = required.concat(optional);

  if (everything.length === 0) {
    throw new Error('You must specify at least one required or optional field.');
  }

  __WEBPACK_IMPORTED_MODULE_1__Alerts__["a" /* Alerts */].validateStrArr('required', required);
  __WEBPACK_IMPORTED_MODULE_1__Alerts__["a" /* Alerts */].validateStrArr('optional', optional);
  __WEBPACK_IMPORTED_MODULE_1__Alerts__["a" /* Alerts */].checkDupes(everything);

  return function (obj) {
    var keys = __WEBPACK_IMPORTED_MODULE_3__ObjectUtils__["a" /* ObjectUtils */].keys(obj);
    var allReqd = __WEBPACK_IMPORTED_MODULE_4__ObjectTools__["a" /* ObjectTools */].forall(required, function (req) {
      return __WEBPACK_IMPORTED_MODULE_4__ObjectTools__["a" /* ObjectTools */].contains(keys, req);
    });

    if (!allReqd) {
      __WEBPACK_IMPORTED_MODULE_1__Alerts__["a" /* Alerts */].reqMessage(required, keys);
    }

    var unsupported = __WEBPACK_IMPORTED_MODULE_4__ObjectTools__["a" /* ObjectTools */].filter(keys, function (key) {
      return !__WEBPACK_IMPORTED_MODULE_4__ObjectTools__["a" /* ObjectTools */].contains(everything, key);
    });

    if (unsupported.length > 0) {
      __WEBPACK_IMPORTED_MODULE_1__Alerts__["a" /* Alerts */].unsuppMessage(unsupported);
    }

    var r = {};

    __WEBPACK_IMPORTED_MODULE_4__ObjectTools__["a" /* ObjectTools */].each(required, function (req) {
      r[req] = __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utils */].constant(obj[req]);
    });

    __WEBPACK_IMPORTED_MODULE_4__ObjectTools__["a" /* ObjectTools */].each(optional, function (opt) {
      r[opt] = __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utils */].constant(Object.prototype.hasOwnProperty.call(obj, opt) ? __WEBPACK_IMPORTED_MODULE_2__Retrieve__["a" /* Retrieve */].some(obj[opt]) : __WEBPACK_IMPORTED_MODULE_2__Retrieve__["a" /* Retrieve */].none());
    });

    return r;
  };
}



/***/ }),
/* 647 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Alerts; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VarTypes__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ObjectTools__ = __webpack_require__(19);





var sort = function sort(arr) {
  return arr.slice(0).sort();
};

var reqMessage = function reqMessage(required, keys) {
  throw new Error('All required keys (' + sort(required).join(', ') + ') were not specified. Specified keys were: ' + sort(keys).join(', ') + '.');
};

var unsuppMessage = function unsuppMessage(unsupported) {
  throw new Error('Unsupported keys for object: ' + sort(unsupported).join(', '));
};

var validateStrArr = function validateStrArr(label, array) {
  if (!__WEBPACK_IMPORTED_MODULE_0__VarTypes__["a" /* VarTypes */].isArray(array)) {
    throw new Error('The ' + label + ' fields must be an array. Was: ' + array + '.');
  }

  __WEBPACK_IMPORTED_MODULE_1__ObjectTools__["a" /* ObjectTools */].each(array, function (a) {
    if (!__WEBPACK_IMPORTED_MODULE_0__VarTypes__["a" /* VarTypes */].isString(a)) {
      throw new Error('The value ' + a + ' in the ' + label + ' fields was not a string.');
    }
  });
};

var invalidTypeMessage = function invalidTypeMessage(incorrect, type) {
  throw new Error('All values need to be of type: ' + type + '. Keys (' + sort(incorrect).join(', ') + ') were not.');
};

var checkDupes = function checkDupes(everything) {
  var sorted = sort(everything);

  var dupe = __WEBPACK_IMPORTED_MODULE_1__ObjectTools__["a" /* ObjectTools */].find(sorted, function (s, i) {
    return i < sorted.length - 1 && s === sorted[i + 1];
  });

  dupe.each(function (d) {
    throw new Error('The field: ' + d + ' occurs more than once in the combined fields: [' + sorted.join(', ') + '].');
  });
};

var Alerts = {
  sort: sort,
  reqMessage: reqMessage,
  unsuppMessage: unsuppMessage,
  validateStrArr: validateStrArr,
  invalidTypeMessage: invalidTypeMessage,
  checkDupes: checkDupes
};



/***/ }),
/* 648 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObjectUtils; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Retrieve__ = __webpack_require__(33);




var keys = function () {
  var fastKeys = Object.keys;

  var slowKeys = function slowKeys(o) {
    var r = [];

    for (var i in o) {
      if (o.hasOwnProperty(i)) {
        r.push(i);
      }
    }

    return r;
  };

  return fastKeys === undefined ? slowKeys : fastKeys;
}();

var values = function values(obj) {
  return mapToArray(obj, function (v) {
    return v;
  });
};
var size = function size(obj) {
  return values(obj).length;
};

var each = function each(obj, f) {
  var props = keys(obj);

  for (var k = 0, len = props.length; k < len; k++) {
    var i = props[k];
    var x = obj[i];

    f(x, i, obj);
  }
};

var map = function map(obj, f) {
  return tupleMap(obj, function (x, i, obj) {
    return {
      k: i,
      v: f(x, i, obj)
    };
  });
};

var tupleMap = function tupleMap(obj, f) {
  var r = {};

  each(obj, function (x, i) {
    var tuple = f(x, i, obj);

    r[tuple.k] = tuple.v;
  });

  return r;
};

var bifilter = function bifilter(obj, pred) {
  var t = {};
  var f = {};

  each(obj, function (x, i) {
    var branch = pred(x, i) ? t : f;
    branch[i] = x;
  });

  return { t: t, f: f };
};

var mapToArray = function mapToArray(obj, f) {
  var r = [];

  each(obj, function (value, name) {
    r.push(f(value, name));
  });

  return r;
};

var find = function find(obj, pred) {
  var props = keys(obj);

  for (var k = 0, len = props.length; k < len; k++) {
    var i = props[k];
    var x = obj[i];

    if (pred(x, i, obj)) {
      return __WEBPACK_IMPORTED_MODULE_0__Retrieve__["a" /* Retrieve */].some(x);
    }
  }

  return __WEBPACK_IMPORTED_MODULE_0__Retrieve__["a" /* Retrieve */].none();
};

var ObjectUtils = {
  bifilter: bifilter,
  each: each,
  map: map,
  mapToArray: mapToArray,
  tupleMap: tupleMap,
  find: find,
  keys: keys,
  values: values,
  size: size
};



/***/ }),
/* 649 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GridLayout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AbsoluteLayout__ = __webpack_require__(116);




var GridLayout = __WEBPACK_IMPORTED_MODULE_0__AbsoluteLayout__["a" /* AbsoluteLayout */].extend({
  recalc: function recalc(container) {
    var settings = void 0,
        rows = void 0,
        cols = void 0,
        items = void 0,
        contLayoutRect = void 0,
        width = void 0,
        height = void 0,
        rect = void 0;
    var x = void 0,
        y = void 0,
        posX = void 0,
        posY = void 0,
        ctrlSettings = void 0,
        contPaddingBox = void 0,
        align = void 0,
        spacingH = void 0;
    var maxX = void 0,
        maxY = void 0,
        alignH = void 0,
        alignV = void 0,
        ctrlLayoutRect = void 0,
        ctrl = void 0,
        spacingV = void 0,
        idx = void 0;
    var ctrlMinWidth = void 0,
        ctrlMinHeight = void 0,
        availableWidth = void 0,
        availableHeight = void 0,
        reverseRows = void 0;
    var colWidths = [];
    var rowHeights = [];

    settings = container.settings;
    items = container.items().filter(':visible');
    contLayoutRect = container.layoutRect();
    cols = settings.columns || Math.ceil(Math.sqrt(items.length));
    rows = Math.ceil(items.length / cols);
    spacingH = settings.spacingH || settings.spacing || 0;
    spacingV = settings.spacingV || settings.spacing || 0;
    alignH = settings.alignH || settings.align;
    alignV = settings.alignV || settings.align;
    contPaddingBox = container.paddingBox;
    reverseRows = 'reverseRows' in settings ? settings.reverseRows : container.isRtl();

    if (alignH && typeof alignH === 'string') {
      alignH = [alignH];
    }

    if (alignV && typeof alignV === 'string') {
      alignV = [alignV];
    }

    for (x = 0; x < cols; x++) {
      colWidths.push(0);
    }

    for (y = 0; y < rows; y++) {
      rowHeights.push(0);
    }

    for (y = 0; y < rows; y++) {
      for (x = 0; x < cols; x++) {
        ctrl = items[y * cols + x];

        if (!ctrl) {
          break;
        }

        ctrlLayoutRect = ctrl.layoutRect();
        ctrlMinWidth = ctrlLayoutRect.minW;
        ctrlMinHeight = ctrlLayoutRect.minH;
        colWidths[x] = ctrlMinWidth > colWidths[x] ? ctrlMinWidth : colWidths[x];
        rowHeights[y] = ctrlMinHeight > rowHeights[y] ? ctrlMinHeight : rowHeights[y];
      }
    }

    availableWidth = contLayoutRect.innerW - contPaddingBox.left - contPaddingBox.right;

    for (maxX = 0, x = 0; x < cols; x++) {
      maxX += colWidths[x] + (x > 0 ? spacingH : 0);
      availableWidth -= (x > 0 ? spacingH : 0) + colWidths[x];
    }

    availableHeight = contLayoutRect.innerH - contPaddingBox.top - contPaddingBox.bottom;

    for (maxY = 0, y = 0; y < rows; y++) {
      maxY += rowHeights[y] + (y > 0 ? spacingV : 0);
      availableHeight -= (y > 0 ? spacingV : 0) + rowHeights[y];
    }

    maxX += contPaddingBox.left + contPaddingBox.right;
    maxY += contPaddingBox.top + contPaddingBox.bottom;
    rect = {};
    rect.minW = maxX + (contLayoutRect.w - contLayoutRect.innerW);
    rect.minH = maxY + (contLayoutRect.h - contLayoutRect.innerH);
    rect.contentW = rect.minW - contLayoutRect.deltaW;
    rect.contentH = rect.minH - contLayoutRect.deltaH;
    rect.minW = Math.min(rect.minW, contLayoutRect.maxW);
    rect.minH = Math.min(rect.minH, contLayoutRect.maxH);
    rect.minW = Math.max(rect.minW, contLayoutRect.startMinWidth);
    rect.minH = Math.max(rect.minH, contLayoutRect.startMinHeight);

    if (contLayoutRect.autoResize && (rect.minW !== contLayoutRect.minW || rect.minH !== contLayoutRect.minH)) {
      rect.w = rect.minW;
      rect.h = rect.minH;
      container.layoutRect(rect);
      this.recalc(container);

      if (container._lastRect === null) {
        var parentCtrl = container.parent();

        if (parentCtrl) {
          parentCtrl._lastRect = null;
          parentCtrl.recalc();
        }
      }

      return;
    }

    if (contLayoutRect.autoResize) {
      rect = container.layoutRect(rect);
      rect.contentW = rect.minW - contLayoutRect.deltaW;
      rect.contentH = rect.minH - contLayoutRect.deltaH;
    }

    var flexV = void 0;

    if (settings.packV === 'start') {
      flexV = 0;
    } else {
      flexV = availableHeight > 0 ? Math.floor(availableHeight / rows) : 0;
    }

    var totalFlex = 0;
    var flexWidths = settings.flexWidths;

    if (flexWidths) {
      for (x = 0; x < flexWidths.length; x++) {
        totalFlex += flexWidths[x];
      }
    } else {
      totalFlex = cols;
    }

    var ratio = availableWidth / totalFlex;

    for (x = 0; x < cols; x++) {
      colWidths[x] += flexWidths ? flexWidths[x] * ratio : ratio;
    }

    posY = contPaddingBox.top;

    for (y = 0; y < rows; y++) {
      posX = contPaddingBox.left;
      height = rowHeights[y] + flexV;

      for (x = 0; x < cols; x++) {
        if (reverseRows) {
          idx = y * cols + cols - 1 - x;
        } else {
          idx = y * cols + x;
        }

        ctrl = items[idx];

        if (!ctrl) {
          break;
        }

        ctrlSettings = ctrl.settings;
        ctrlLayoutRect = ctrl.layoutRect();
        width = Math.max(colWidths[x], ctrlLayoutRect.startMinWidth);
        ctrlLayoutRect.x = posX;
        ctrlLayoutRect.y = posY;
        align = ctrlSettings.alignH || (alignH ? alignH[x] || alignH[0] : null);

        if (align === 'center') {
          ctrlLayoutRect.x = posX + width / 2 - ctrlLayoutRect.w / 2;
        } else if (align === 'right') {
          ctrlLayoutRect.x = posX + width - ctrlLayoutRect.w;
        } else if (align === 'stretch') {
          ctrlLayoutRect.w = width;
        }

        align = ctrlSettings.alignV || (alignV ? alignV[x] || alignV[0] : null);

        if (align === 'center') {
          ctrlLayoutRect.y = posY + height / 2 - ctrlLayoutRect.h / 2;
        } else if (align === 'bottom') {
          ctrlLayoutRect.y = posY + height - ctrlLayoutRect.h;
        } else if (align === 'stretch') {
          ctrlLayoutRect.h = height;
        }

        ctrl.layoutRect(ctrlLayoutRect);
        posX += width + spacingH;

        if (ctrl.recalc) {
          ctrl.recalc();
        }
      }

      posY += height + spacingV;
    }
  }
});



/***/ }),
/* 650 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlexLayout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AbsoluteLayout__ = __webpack_require__(116);




var FlexLayout = __WEBPACK_IMPORTED_MODULE_0__AbsoluteLayout__["a" /* AbsoluteLayout */].extend({
  recalc: function recalc(container) {
    var i = void 0,
        l = void 0,
        items = void 0,
        contLayoutRect = void 0,
        contPaddingBox = void 0,
        contSettings = void 0,
        align = void 0,
        pack = void 0,
        spacing = void 0;
    var ctrl = void 0,
        ctrlLayoutRect = void 0,
        ctrlSettings = void 0,
        flex = void 0,
        direction = void 0,
        availableSpace = void 0,
        totalFlex = void 0;
    var size = void 0,
        maxSize = void 0,
        ratio = void 0,
        rect = void 0,
        pos = void 0,
        maxAlignEndPos = void 0,
        contentSizeName = void 0,
        alignAfterName = void 0;
    var sizeName = void 0,
        minSizeName = void 0,
        posName = void 0,
        maxSizeName = void 0,
        beforeName = void 0,
        innerSizeName = void 0,
        deltaSizeName = void 0;
    var alignAxisName = void 0,
        alignInnerSizeName = void 0,
        alignSizeName = void 0,
        alignMinSizeName = void 0,
        alignBeforeName = void 0;
    var alignDeltaSizeName = void 0,
        alignContentSizeName = void 0;
    var maxSizeItems = [];
    var max = Math.max;
    var min = Math.min;

    items = container.items().filter(':visible');
    contLayoutRect = container.layoutRect();
    contPaddingBox = container.paddingBox;
    contSettings = container.settings;
    direction = container.isRtl() ? contSettings.direction || 'row-reversed' : contSettings.direction;
    align = contSettings.align;
    pack = container.isRtl() ? contSettings.pack || 'end' : contSettings.pack;
    spacing = contSettings.spacing || 0;

    if (direction === 'row-reversed' || direction === 'column-reverse') {
      items = items.set(items.toArray().reverse());
      direction = direction.split('-')[0];
    }

    if (direction === 'column') {
      posName = 'y';
      sizeName = 'h';
      minSizeName = 'minH';
      maxSizeName = 'maxH';
      innerSizeName = 'innerH';
      beforeName = 'top';
      deltaSizeName = 'deltaH';
      contentSizeName = 'contentH';
      alignBeforeName = 'left';
      alignSizeName = 'w';
      alignAxisName = 'x';
      alignInnerSizeName = 'innerW';
      alignMinSizeName = 'minW';
      alignAfterName = 'right';
      alignDeltaSizeName = 'deltaW';
      alignContentSizeName = 'contentW';
    } else {
      posName = 'x';
      sizeName = 'w';
      minSizeName = 'minW';
      maxSizeName = 'maxW';
      innerSizeName = 'innerW';
      beforeName = 'left';
      deltaSizeName = 'deltaW';
      contentSizeName = 'contentW';
      alignBeforeName = 'top';
      alignSizeName = 'h';
      alignAxisName = 'y';
      alignInnerSizeName = 'innerH';
      alignMinSizeName = 'minH';
      alignAfterName = 'bottom';
      alignDeltaSizeName = 'deltaH';
      alignContentSizeName = 'contentH';
    }

    availableSpace = contLayoutRect[innerSizeName] - contPaddingBox[beforeName] - contPaddingBox[beforeName];
    maxAlignEndPos = totalFlex = 0;

    for (i = 0, l = items.length; i < l; i++) {
      ctrl = items[i];
      ctrlLayoutRect = ctrl.layoutRect();
      ctrlSettings = ctrl.settings;
      flex = ctrlSettings.flex;
      availableSpace -= i < l - 1 ? spacing : 0;

      if (flex > 0) {
        totalFlex += flex;

        if (ctrlLayoutRect[maxSizeName]) {
          maxSizeItems.push(ctrl);
        }

        ctrlLayoutRect.flex = flex;
      }

      availableSpace -= ctrlLayoutRect[minSizeName];
      size = contPaddingBox[alignBeforeName] + ctrlLayoutRect[alignMinSizeName] + contPaddingBox[alignAfterName];

      if (size > maxAlignEndPos) {
        maxAlignEndPos = size;
      }
    }

    rect = {};

    if (availableSpace < 0) {
      rect[minSizeName] = contLayoutRect[minSizeName] - availableSpace + contLayoutRect[deltaSizeName];
    } else {
      rect[minSizeName] = contLayoutRect[innerSizeName] - availableSpace + contLayoutRect[deltaSizeName];
    }

    rect[alignMinSizeName] = maxAlignEndPos + contLayoutRect[alignDeltaSizeName];
    rect[contentSizeName] = contLayoutRect[innerSizeName] - availableSpace;
    rect[alignContentSizeName] = maxAlignEndPos;

    rect.minW = min(rect.minW, contLayoutRect.maxW);
    rect.minH = min(rect.minH, contLayoutRect.maxH);
    rect.minW = max(rect.minW, contLayoutRect.startMinWidth);
    rect.minH = max(rect.minH, contLayoutRect.startMinHeight);

    if (contLayoutRect.autoResize && (rect.minW !== contLayoutRect.minW || rect.minH !== contLayoutRect.minH)) {
      rect.w = rect.minW;
      rect.h = rect.minH;
      container.layoutRect(rect);

      this.recalc(container);

      if (container._lastRect === null) {
        var parentCtrl = container.parent();

        if (parentCtrl) {
          parentCtrl._lastRect = null;
          parentCtrl.recalc();
        }
      }

      return;
    }

    ratio = availableSpace / totalFlex;

    for (i = 0, l = maxSizeItems.length; i < l; i++) {
      ctrl = maxSizeItems[i];
      ctrlLayoutRect = ctrl.layoutRect();
      maxSize = ctrlLayoutRect[maxSizeName];
      size = ctrlLayoutRect[minSizeName] + ctrlLayoutRect.flex * ratio;

      if (size > maxSize) {
        availableSpace -= ctrlLayoutRect[maxSizeName] - ctrlLayoutRect[minSizeName];
        totalFlex -= ctrlLayoutRect.flex;
        ctrlLayoutRect.flex = 0;
        ctrlLayoutRect.maxFlexSize = maxSize;
      } else {
        ctrlLayoutRect.maxFlexSize = 0;
      }
    }

    ratio = availableSpace / totalFlex;
    pos = contPaddingBox[beforeName];
    rect = {};

    if (totalFlex === 0) {
      if (pack === 'end') {
        pos = availableSpace + contPaddingBox[beforeName];
      } else if (pack === 'center') {
        pos = Math.round(contLayoutRect[innerSizeName] / 2 - (contLayoutRect[innerSizeName] - availableSpace) / 2) + contPaddingBox[beforeName];

        if (pos < 0) {
          pos = contPaddingBox[beforeName];
        }
      } else if (pack === 'justify') {
        pos = contPaddingBox[beforeName];
        spacing = Math.floor(availableSpace / (items.length - 1));
      }
    }

    rect[alignAxisName] = contPaddingBox[alignBeforeName];

    for (i = 0, l = items.length; i < l; i++) {
      ctrl = items[i];
      ctrlLayoutRect = ctrl.layoutRect();
      size = ctrlLayoutRect.maxFlexSize || ctrlLayoutRect[minSizeName];

      if (align === 'center') {
        rect[alignAxisName] = Math.round(contLayoutRect[alignInnerSizeName] / 2 - ctrlLayoutRect[alignSizeName] / 2);
      } else if (align === 'stretch') {
        rect[alignSizeName] = max(ctrlLayoutRect[alignMinSizeName] || 0, contLayoutRect[alignInnerSizeName] - contPaddingBox[alignBeforeName] - contPaddingBox[alignAfterName]);
        rect[alignAxisName] = contPaddingBox[alignBeforeName];
      } else if (align === 'end') {
        rect[alignAxisName] = contLayoutRect[alignInnerSizeName] - ctrlLayoutRect[alignSizeName] - contPaddingBox.top;
      }

      if (ctrlLayoutRect.flex > 0) {
        size += ctrlLayoutRect.flex * ratio;
      }

      rect[sizeName] = size;
      rect[posName] = pos;
      ctrl.layoutRect(rect);

      if (ctrl.recalc) {
        ctrl.recalc();
      }

      pos += size + spacing;
    }
  }
});



/***/ }),
/* 651 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplitButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__funcs__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MenuButton__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2____ = __webpack_require__(32);






var SplitButton = __WEBPACK_IMPORTED_MODULE_1__MenuButton__["a" /* MenuButton */].extend({
  Defaults: {
    classes: 'widget btn splitbtn',
    role: 'button'
  },
  repaint: function repaint() {
    var mainButtonElm = void 0,
        menuButtonElm = void 0;
    var self = this;
    var elm = self.getEl();
    var rect = self.layoutRect();

    self._super();
    mainButtonElm = elm.firstChild;
    menuButtonElm = elm.lastChild;

    Object(__WEBPACK_IMPORTED_MODULE_2____["a" /* $ */])(mainButtonElm).css({
      width: rect.w - __WEBPACK_IMPORTED_MODULE_0__funcs__["a" /* funcs */].getSize(menuButtonElm).width,
      height: rect.h - 2
    });

    Object(__WEBPACK_IMPORTED_MODULE_2____["a" /* $ */])(menuButtonElm).css({ height: rect.h - 2 });

    return self;
  },
  activeMenu: function activeMenu(state) {
    var self = this;

    Object(__WEBPACK_IMPORTED_MODULE_2____["a" /* $ */])(self.getEl().lastChild).toggleClass(self.classPrefix + 'active', state);
  },
  renderHtml: function renderHtml() {
    var ariaPressed = void 0;
    var self = this;
    var id = self._id;
    var prefix = self.classPrefix;
    var icon = self.state.get('icon');
    var text = self.state.get('text');
    var settings = self.settings;
    var textHtml = '';
    var image = settings.image;

    if (image) {
      icon = 'none';

      if (typeof image !== 'string') {
        image = window.getSelection ? image[0] : image[1];
      }

      image = ' style="background-image: url(\'' + image + '\')"';
    } else {
      image = '';
    }

    icon = '' + (settings.icon ? prefix + 'ico ' + prefix + 'i-' + icon : '');

    if (text) {
      self.classes.add('btn-has-text');
      textHtml = '<span class="' + prefix + 'txt">' + self.encode(text) + '</span>';
    }

    ariaPressed = '' + (typeof settings.active === 'boolean' ? ' aria-pressed="' + settings.active + '"' : '');

    return '<div id="' + id + '" class="' + self.classes + '" role="button"' + ariaPressed + ' tabindex="-1">\n<button type="button" hidefocus="1" tabindex="-1">' + (icon ? '<i class="' + icon + '"' + image + '></i>' : '') + textHtml + '\n</button><button type="button" class="' + prefix + 'open" hidefocus="1" tabindex="-1">\n' + (self._menuBtnText ? (icon ? '\xA0' : '') + self._menuBtnText : '') + ' <i class="\n' + prefix + 'caret"></i></button></div>';
  },
  postRender: function postRender() {
    var self = this;
    var onClickHandler = self.settings.onclick;

    self.on('click', function (e) {
      var node = e.target;

      if (e.control === this) {
        while (node) {
          if (e.aria && e.aria.key !== 'down' || node.nodeName === 'BUTTON' && node.className.indexOf('open') === -1) {
            e.stopImmediatePropagation();

            if (onClickHandler) {
              onClickHandler.call(this, e);
            }

            return;
          }

          node = node.parentNode;
        }
      }
    });

    delete self.settings.onclick;

    return self._super();
  }
});



/***/ }),
/* 652 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DOMUtils__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PanelButton__ = __webpack_require__(253);





var DOM = __WEBPACK_IMPORTED_MODULE_0__DOMUtils__["a" /* DOMUtils */].DOM;

var ColorButton = __WEBPACK_IMPORTED_MODULE_1__PanelButton__["a" /* PanelButton */].extend({
  init: function init(settings) {
    this._super(settings);
    this.classes.add('splitbtn');
    this.classes.add('colorbutton');
  },
  color: function color(_color) {
    if (_color) {
      this._color = _color;
      this.getEl('preview').style.backgroundColor = _color;

      return this;
    }

    return this._color;
  },
  resetColor: function resetColor() {
    this._color = null;
    this.getEl('preview').style.backgroundColor = null;

    return this;
  },
  renderHtml: function renderHtml() {
    var self = this;
    var id = self._id;
    var prefix = self.classPrefix;
    var text = self.state.get('text');
    var icon = '' + (self.settings.icon ? prefix + 'ico ' + prefix + 'i-' + self.settings.icon : '');
    var image = '' + (self.settings.image ? ' style="background-image: url(\'' + self.settings.image + '\')"' : '');
    var textHtml = '';

    if (text) {
      self.classes.add('btn-has-text');
      textHtml = '<span class="' + prefix + 'txt">' + self.encode(text) + '</span>';
    }

    return '<div id="' + id + '" class="' + self.classes + '" role="button" tabindex="-1" aria-haspopup="true"><button role="presentation" hidefocus="1" type="button" tabindex="-1">' + (icon ? '<i class="' + icon + '"' + image + '></i>' : '') + '<span id="' + id + '-preview" class="' + prefix + 'preview"></span>' + textHtml + '</button><button type="button" class="' + prefix + 'open" hidefocus="1" tabindex="-1"> <i class="' + prefix + 'caret"></i></button></div>';
  },
  postRender: function postRender() {
    var self = this;
    var onClickHandler = self.settings.onclick;

    self.on('click', function (e) {
      if (e.aria && e.aria.key === 'down') {
        return;
      }

      if (e.control === self && !DOM.getParent(e.target, '.' + self.classPrefix + 'open')) {
        e.stopImmediatePropagation();

        onClickHandler.call(self, e);
      }
    });

    delete self.settings.onclick;

    return self._super();
  }
});



/***/ }),
/* 653 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StackLayout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FlowLayout__ = __webpack_require__(252);




var StackLayout = __WEBPACK_IMPORTED_MODULE_0__FlowLayout__["a" /* FlowLayout */].extend({
  Defaults: {
    containerClass: 'stack-layout',
    controlClass: 'stack-layout-item',
    endClass: 'break'
  },
  isNative: function isNative() {
    return true;
  }
});



/***/ }),
/* 654 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ButtonGroup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Container__ = __webpack_require__(73);




var ButtonGroup = __WEBPACK_IMPORTED_MODULE_0__Container__["a" /* Container */].extend({
  Defaults: {
    defaultType: 'button',
    role: 'group'
  },
  renderHtml: function renderHtml() {
    var self = this;
    var layout = self._layout;

    self.classes.add('btn-group');
    self.preRender();
    layout.preRender(self);

    return '<div id="' + self._id + '" class="' + self.classes + '"><div id="' + self._id + '-body">' + (self.settings.html || '') + layout.renderHtml(self) + '</div>' + '</div>';
  }
});



/***/ }),
/* 655 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElementPath; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Path__ = __webpack_require__(238);




var ElementPath = __WEBPACK_IMPORTED_MODULE_0__Path__["a" /* Path */].extend({
  postRender: function postRender() {
    var self = this;
    var editor = self.settings.editor;

    function isHidden(elm) {
      if (elm.nodeType === 1) {
        if (elm.nodeName === 'BR' || !!elm.getAttribute('data-mce-bogus')) {
          return true;
        }

        if (elm.getAttribute('data-mce-type') === 'bookmark') {
          return true;
        }
      }

      return false;
    }

    if (editor.settings.elementpath !== false) {
      self.on('select', function (e) {
        editor.focus();
        editor.selection.select(this.row()[e.index].element);
        editor.nodeChanged();
      });

      editor.on('nodeChange', function (e) {
        var outParents = [];
        var parents = e.parents;
        var i = parents.length;

        while (i--) {
          if (parents[i].nodeType === 1 && !isHidden(parents[i])) {
            var args = editor.fire('ResolveName', {
              name: parents[i].nodeName.toLowerCase(),
              target: parents[i]
            });

            if (!args.isDefaultPrevented()) {
              outParents.push({
                name: args.name,
                element: parents[i]
              });
            }

            if (args.isPropagationStopped()) {
              break;
            }
          }
        }

        self.row(outParents);
      });
    }

    return self._super();
  }
});



/***/ }),
/* 656 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorPicker; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__funcs__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Color__ = __webpack_require__(657);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Widget__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__DragHelper__ = __webpack_require__(74);







var ColorPicker = __WEBPACK_IMPORTED_MODULE_2__Widget__["a" /* Widget */].extend({
  Defaults: { classes: 'widget colorpicker' },
  init: function init(settings) {
    this._super(settings);
  },
  postRender: function postRender() {
    var hsv = void 0,
        hueRootElm = void 0,
        huePointElm = void 0,
        svRootElm = void 0,
        svPointElm = void 0;
    var self = this;
    var color = self.color();

    hueRootElm = self.getEl('h');
    huePointElm = self.getEl('hp');
    svRootElm = self.getEl('sv');
    svPointElm = self.getEl('svp');

    function getPos(elm, event) {
      var x = void 0,
          y = void 0;
      var pos = __WEBPACK_IMPORTED_MODULE_0__funcs__["a" /* funcs */].getPos(elm);

      x = event.pageX - pos.x;
      y = event.pageY - pos.y;
      x = Math.max(0, Math.min(x / elm.clientWidth, 1));
      y = Math.max(0, Math.min(y / elm.clientHeight, 1));

      return { x: x, y: y };
    }
    function updateColor(hsv, hueUpdate) {
      var hue = (360 - hsv.h) / 360;

      __WEBPACK_IMPORTED_MODULE_0__funcs__["a" /* funcs */].css(huePointElm, { top: hue * 100 + '%' });

      if (!hueUpdate) {
        __WEBPACK_IMPORTED_MODULE_0__funcs__["a" /* funcs */].css(svPointElm, {
          left: hsv.s + '%',
          top: 100 - hsv.v + '%'
        });
      }

      svRootElm.style.background = Object(__WEBPACK_IMPORTED_MODULE_1__Color__["a" /* Color */])({
        s: 100,
        v: 100,
        h: hsv.h
      }).toHex();
      self.color().pars;
      e({
        s: hsv.s,
        v: hsv.v,
        h: hsv.h
      });
    }

    function updateSaturationAndValue(e) {
      var pos = void 0;

      pos = getPos(svRootElm, e);
      hsv.s = pos.x * 100;
      hsv.v = (1 - pos.y) * 100;

      updateColor(hsv);

      self.fire('change');
    }

    function updateHue(e) {
      var pos = void 0;

      pos = getPos(hueRootElm, e);
      hsv = color.toHsv();
      hsv.h = (1 - pos.y) * 360;

      updateColor(hsv, true);

      self.fire('change');
    }

    self._repaint = function () {
      hsv = color.toHsv();

      updateColor(hsv);
    };

    self._super();

    self._svdraghelper = new __WEBPACK_IMPORTED_MODULE_3__DragHelper__["a" /* DragHelper */](self._id + '-sv', {
      start: updateSaturationAndValue,
      drag: updateSaturationAndValue
    });

    self._hdraghelper = new __WEBPACK_IMPORTED_MODULE_3__DragHelper__["a" /* DragHelper */](self._id + '-h', {
      start: updateHue,
      drag: updateHue
    });

    self._repaint();
  },
  rgb: function rgb() {
    return this.color().toRgb();
  },
  value: function value(_value) {
    var self = this;

    if (arguments.length) {
      self.color().parse(_value);

      if (self._rendered) {
        self._repaint();
      }
    } else {
      return self.color().toHex();
    }
  },
  color: function color() {
    if (!this._color) {
      this._color = Object(__WEBPACK_IMPORTED_MODULE_1__Color__["a" /* Color */])();
    }

    return this._color;
  },
  renderHtml: function renderHtml() {
    var self = this;
    var id = self._id;
    var prefix = self.classPrefix;
    var hueHtml = void 0;

    var stops = '#ff0000,#ff0080,#ff00ff,#8000ff,#0000ff,#0080ff,#00ffff,#00ff80,#00ff00,#80ff00,#ffff00,#ff8000,#ff0000';

    function getOldIeFallbackHtml() {
      var i = void 0,
          l = void 0,
          gradientPrefix = void 0,
          stopsList = void 0;
      var html = '';

      gradientPrefix = 'filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=';
      stopsList = stops.split(',');

      for (i = 0, l = stopsList.length - 1; i < l; i++) {
        html += '<div class="' + prefix + 'colorpicker-h-chunk" \nstyle="height:' + 100 / l + '%;' + gradientPrefix + stopsList[i] + ',endColorstr=' + stopsList[i + 1] + ');\n-ms-' + gradientPrefix + stopsList[i] + ',endColorstr=' + stopsList[i + 1] + ')"></div>';
      }

      return html;
    }

    var gradientCssText = 'background: -ms-linear-gradient(top,' + stops + ');background: \nlinear-gradient(to bottom,' + stops + ');';

    hueHtml = '<div id="' + id + '-h" class="' + prefix + 'colorpicker-h" \nstyle="' + gradientCssText + '">' + getOldIeFallbackHtml() + '<div id="' + id + '-hp" \nclass="' + prefix + 'colorpicker-h-marker"></div></div>';

    return '<div id="' + id + '" class="' + self.classes + '"><div id="' + id + '-sv" \nclass="' + prefix + 'colorpicker-sv"><div class="' + prefix + 'colorpicker-overlay1"><div \nclass="' + prefix + 'colorpicker-overlay2"><div id="' + id + '-svp" \nclass="' + prefix + 'colorpicker-selector1"><div \nclass="' + prefix + 'colorpicker-selector2"></div></div></div></div></div>' + hueHtml + '</div>';
  }
});



/***/ }),
/* 657 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Color; });


var Color = tinymce.util.Tools.resolve('tinymce.util.Color');



/***/ }),
/* 658 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResizeHandle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Widget__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DragHelper__ = __webpack_require__(74);





var ResizeHandle = __WEBPACK_IMPORTED_MODULE_0__Widget__["a" /* Widget */].extend({
  renderHtml: function renderHtml() {
    var self = this;
    var prefix = self.classPrefix;

    self.classes.add('resizehandle');

    if (self.settings.direction === 'both') {
      self.classes.add('resizehandle-both');
    }

    self.canFocus = false;

    return '<div id="' + self._id + '" class="' + self.classes + '"><i \nclass="' + prefix + 'ico ' + prefix + 'i-resize"></i></div>';
  },
  postRender: function postRender() {
    var self = this;

    self._super();

    self.resizeDragHelper = new __WEBPACK_IMPORTED_MODULE_1__DragHelper__["a" /* DragHelper */](this._id, {
      start: function start() {
        self.fire('ResizeStart');
      },
      drag: function drag(e) {
        if (self.settings.direction !== 'both') {
          e.deltaX = 0;
        }

        self.fire('Resize', e);
      },
      stop: function stop() {
        self.fire('ResizeEnd');
      }
    });
  },
  remove: function remove() {
    if (this.resizeDragHelper) {
      this.resizeDragHelper.destroy();
    }

    return this._super();
  }
});



/***/ }),
/* 659 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BrowseButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__funcs__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Button__ = __webpack_require__(115);







var BrowseButton = __WEBPACK_IMPORTED_MODULE_3__Button__["a" /* Button */].extend({
  init: function init(settings) {
    var self = this;

    settings = __WEBPACK_IMPORTED_MODULE_1__Tools__["a" /* Tools */].extend({
      text: 'Browse...',
      multiple: false,
      accept: null
    }, settings);

    self._super(settings);
    self.classes.add('browsebutton');

    if (settings.multiple) {
      self.classes.add('multiple');
    }
  },
  postRender: function postRender() {
    var self = this;

    var input = __WEBPACK_IMPORTED_MODULE_2__funcs__["a" /* funcs */].create('input', {
      type: 'file',
      id: self._id + '-browse',
      accept: self.settings.accept
    });

    self._super();

    Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(input).on('change', function (e) {
      var files = e.target.files;

      self.value = function () {
        if (!files.length) {
          return null;
        } else if (self.settings.multiple) {
          return files;
        } else {
          return files[0];
        }
      };

      e.preventDefault();

      if (files.length) {
        self.fire('change', e);
      }
    });

    Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(input).on('click', function (e) {
      e.stopPropagation();
    });

    Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(self.getEl('button')).on('click', function (e) {
      e.stopPropagation();
      input.click();
    });

    self.getEl().appendChild(input);
  },
  remove: function remove() {
    Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(this.getEl('button')).off();
    Object(__WEBPACK_IMPORTED_MODULE_0____["a" /* $ */])(this.getEl('input')).off();

    this._super();
  }
});



/***/ }),
/* 660 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Parent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Parents__ = __webpack_require__(661);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SelectorUtils__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ClosestOrAncestor__ = __webpack_require__(256);






var first = function first(selector) {
  return __WEBPACK_IMPORTED_MODULE_1__SelectorUtils__["a" /* SelectorUtils */].one(selector);
};
var descendant = function descendant(scope, selector) {
  return __WEBPACK_IMPORTED_MODULE_1__SelectorUtils__["a" /* SelectorUtils */].one(selector, scope);
};
var child = function child(scope, selector) {
  return __WEBPACK_IMPORTED_MODULE_0__Parents__["a" /* Parents */].child(scope, function (e) {
    return __WEBPACK_IMPORTED_MODULE_1__SelectorUtils__["a" /* SelectorUtils */].is(e, selector);
  });
};
var sibling = function sibling(scope, selector) {
  return __WEBPACK_IMPORTED_MODULE_0__Parents__["a" /* Parents */].sibling(scope, function (e) {
    return __WEBPACK_IMPORTED_MODULE_1__SelectorUtils__["a" /* SelectorUtils */].is(e, selector);
  });
};
var ancestor = function ancestor(scope, selector, isRoot) {
  return __WEBPACK_IMPORTED_MODULE_0__Parents__["a" /* Parents */].ancestor(scope, function (e) {
    return __WEBPACK_IMPORTED_MODULE_1__SelectorUtils__["a" /* SelectorUtils */].is(e, selector);
  }, isRoot);
};
var closest = function closest(scope, selector, isRoot) {
  return Object(__WEBPACK_IMPORTED_MODULE_2__ClosestOrAncestor__["a" /* ClosestOrAncestor */])(__WEBPACK_IMPORTED_MODULE_1__SelectorUtils__["a" /* SelectorUtils */].is, ancestor, scope, selector, isRoot);
};

var Parent = {
  first: first,
  ancestor: ancestor,
  sibling: sibling,
  child: child,
  descendant: descendant,
  closest: closest
};



/***/ }),
/* 661 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Parents; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Body__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Retrieve__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VarTypes__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Selection__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ObjectTools__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ClosestOrAncestor__ = __webpack_require__(256);










var first = function first(predicate) {
  return descendant(__WEBPACK_IMPORTED_MODULE_0__Body__["a" /* Body */].body(), predicate);
};

var ancestor = function ancestor(scope, predicate, isRoot) {
  var element = scope.dom();
  var stop = __WEBPACK_IMPORTED_MODULE_3__VarTypes__["a" /* VarTypes */].isFunction(isRoot) ? isRoot : __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utils */].constant(false);

  while (element.parentNode) {
    element = element.parentNode;

    var el = __WEBPACK_IMPORTED_MODULE_0__Body__["a" /* Body */].fromDom(element);

    if (predicate(el)) {
      return __WEBPACK_IMPORTED_MODULE_2__Retrieve__["a" /* Retrieve */].some(el);
    } else if (stop(el)) {
      break;
    }
  }

  return __WEBPACK_IMPORTED_MODULE_2__Retrieve__["a" /* Retrieve */].none();
};

var closest = function closest(scope, predicate, isRoot) {
  var is = function is(scope) {
    return predicate(scope);
  };

  return Object(__WEBPACK_IMPORTED_MODULE_6__ClosestOrAncestor__["a" /* ClosestOrAncestor */])(is, ancestor, scope, predicate, isRoot);
};

var sibling = function sibling(scope, predicate) {
  var element = scope.dom();

  if (!element.parentNode) {
    return __WEBPACK_IMPORTED_MODULE_2__Retrieve__["a" /* Retrieve */].none();
  }

  return child(__WEBPACK_IMPORTED_MODULE_0__Body__["a" /* Body */].fromDom(element.parentNode), function (x) {
    return !__WEBPACK_IMPORTED_MODULE_4__Selection__["a" /* Selection */].eq(scope, x) && predicate(x);
  });
};

var child = function child(scope, predicate) {
  var result = __WEBPACK_IMPORTED_MODULE_5__ObjectTools__["a" /* ObjectTools */].find(scope.dom().childNodes, __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utils */].compose(predicate, __WEBPACK_IMPORTED_MODULE_0__Body__["a" /* Body */].fromDom));

  return result.map(__WEBPACK_IMPORTED_MODULE_0__Body__["a" /* Body */].fromDom);
};

var descendant = function descendant(scope, predicate) {
  var descend = function descend(element) {
    for (var i = 0; i < element.childNodes.length; i++) {
      if (predicate(__WEBPACK_IMPORTED_MODULE_0__Body__["a" /* Body */].fromDom(element.childNodes[i]))) {
        return __WEBPACK_IMPORTED_MODULE_2__Retrieve__["a" /* Retrieve */].some(__WEBPACK_IMPORTED_MODULE_0__Body__["a" /* Body */].fromDom(element.childNodes[i]));
      }

      var res = descend(element.childNodes[i]);

      if (res.isSome()) {
        return res;
      }
    }

    return __WEBPACK_IMPORTED_MODULE_2__Retrieve__["a" /* Retrieve */].none();
  };

  return descend(scope.dom());
};

var Parents = {
  first: first,
  ancestor: ancestor,
  closest: closest,
  sibling: sibling,
  child: child,
  descendant: descendant
};



/***/ }),
/* 662 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UndoRedo; });


var toggleUndoRedoState = function toggleUndoRedoState(editor, type) {
  return function () {
    var self = this;

    var checkState = function checkState() {
      var typeFn = type === 'redo' ? 'hasRedo' : 'hasUndo';

      return editor.undoManager ? editor.undoManager[typeFn]() : false;
    };

    self.disabled(!checkState());

    editor.on('Undo Redo AddUndo TypingUndo ClearUndos SwitchMode', function () {
      self.disabled(editor.readonly || !checkState());
    });
  };
};

var registerMenuItems = function registerMenuItems(editor) {
  editor.addMenuItem('undo', {
    text: 'Undo',
    icon: 'undo',
    shortcut: 'Meta+Z',
    onPostRender: toggleUndoRedoState(editor, 'undo'),
    cmd: 'undo'
  });

  editor.addMenuItem('redo', {
    text: 'Redo',
    icon: 'redo',
    shortcut: 'Meta+Y',
    onPostRender: toggleUndoRedoState(editor, 'redo'),
    cmd: 'redo'
  });
};

var registerButtons = function registerButtons(editor) {
  editor.addButton('undo', {
    tooltip: 'Undo',
    onPostRender: toggleUndoRedoState(editor, 'undo'),
    cmd: 'undo'
  });

  editor.addButton('redo', {
    tooltip: 'Redo',
    onPostRender: toggleUndoRedoState(editor, 'redo'),
    cmd: 'redo'
  });
};

var register = function register(editor) {
  registerMenuItems(editor);
  registerButtons(editor);
};

var UndoRedo = { register: register };



/***/ }),
/* 663 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Registrar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Format__ = __webpack_require__(117);





var register = function register(editor) {
  editor.addMenuItem('align', {
    text: 'Align',
    menu: [{
      text: 'Left',
      icon: 'alignleft',
      onclick: __WEBPACK_IMPORTED_MODULE_1__Format__["a" /* Format */].toggleFormat(editor, 'alignleft')
    }, {
      text: 'Center',
      icon: 'aligncenter',
      onclick: __WEBPACK_IMPORTED_MODULE_1__Format__["a" /* Format */].toggleFormat(editor, 'aligncenter')
    }, {
      text: 'Right',
      icon: 'alignright',
      onclick: __WEBPACK_IMPORTED_MODULE_1__Format__["a" /* Format */].toggleFormat(editor, 'alignright')
    }, {
      text: 'Justify',
      icon: 'alignjustify',
      onclick: __WEBPACK_IMPORTED_MODULE_1__Format__["a" /* Format */].toggleFormat(editor, 'alignjustify')
    }]
  });

  __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].each({
    alignleft: ['Align left', 'JustifyLeft'],
    aligncenter: ['Align center', 'JustifyCenter'],
    alignright: ['Align right', 'JustifyRight'],
    alignjustify: ['Justify', 'JustifyFull'],
    alignnone: ['No alignment', 'JustifyNone']
  }, function (item, name) {
    editor.addButton(name, {
      active: false,
      tooltip: item[0],
      cmd: item[1],
      onPostRender: __WEBPACK_IMPORTED_MODULE_1__Format__["a" /* Format */].postRenderFormat(editor, name)
    });
  });
};

var Registrar = { register: register };



/***/ }),
/* 664 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomMenu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ObjectTools__ = __webpack_require__(19);





var createCustomMenuItems = function createCustomMenuItems(editor, names) {
  var items = void 0,
      nameList = void 0;

  if (typeof names === 'string') {
    nameList = names.split(' ');
  } else if (__WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].isArray(names)) {
    return __WEBPACK_IMPORTED_MODULE_1__ObjectTools__["a" /* ObjectTools */].flatten(__WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].map(names, function (names) {
      return createCustomMenuItems(editor, names);
    }));
  }

  items = __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].grep(nameList, function (name) {
    return name === '|' || name in editor.menuItems;
  });

  return __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].map(items, function (name) {
    return name === '|' ? { text: '-' } : editor.menuItems[name];
  });
};

var isSeparator = function isSeparator(menuItem) {
  return menuItem && menuItem.text === '-';
};

var trimMenuItems = function trimMenuItems(menuItems) {
  var menuItems2 = __WEBPACK_IMPORTED_MODULE_1__ObjectTools__["a" /* ObjectTools */].filter(menuItems, function (menuItem, i, menuItems) {
    return !isSeparator(menuItem) || !isSeparator(menuItems[i - 1]);
  });

  return __WEBPACK_IMPORTED_MODULE_1__ObjectTools__["a" /* ObjectTools */].filter(menuItems2, function (menuItem, i, menuItems) {
    return !isSeparator(menuItem) || i > 0 && i < menuItems.length - 1;
  });
};

var createContextMenuItems = function createContextMenuItems(editor, context) {
  var outputMenuItems = [{ text: '-' }];
  var menuItems = __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].grep(editor.menuItems, function (menuItem) {
    return menuItem.context === context;
  });

  __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].each(menuItems, function (menuItem) {
    if (menuItem.separator === 'before') {
      outputMenuItems.push({ text: '|' });
    }

    if (menuItem.prependToContext) {
      outputMenuItems.unshift(menuItem);
    } else {
      outputMenuItems.push(menuItem);
    }

    if (menuItem.separator === 'after') {
      outputMenuItems.push({ text: '|' });
    }
  });

  return outputMenuItems;
};

var createInsertMenu = function createInsertMenu(editor) {
  var insertButtonItems = editor.settings.insert_button_items;

  if (insertButtonItems) {
    return trimMenuItems(createCustomMenuItems(editor, insertButtonItems));
  } else {
    return trimMenuItems(createContextMenuItems(editor, 'insert'));
  }
};

var registerButtons = function registerButtons(editor) {
  editor.addButton('insert', {
    type: 'menubutton',
    icon: 'insert',
    menu: [],
    oncreatemenu: function oncreatemenu() {
      this.menu.add(createInsertMenu(editor));
      this.menu.renderNew();
    }
  });
};
var register = function register(editor) {
  registerButtons(editor);
};

var CustomMenu = { register: register };



/***/ }),
/* 665 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisualAids; });


var toggleVisualAidState = function toggleVisualAidState(editor) {
  return function () {
    var self = this;

    editor.on('VisualAid', function (e) {
      self.active(e.hasVisual);
    });

    self.active(editor.hasVisual);
  };
};

var registerMenuItems = function registerMenuItems(editor) {
  editor.addMenuItem('visualaid', {
    text: 'Visual aids',
    selectable: true,
    onPostRender: toggleVisualAidState(editor),
    cmd: 'mceToggleVisualAid'
  });
};

var register = function register(editor) {
  registerMenuItems(editor);
};

var VisualAids = { register: register };



/***/ }),
/* 666 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Formatting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Format__ = __webpack_require__(117);





var defaultBlocks = 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;\nHeading 6=h6;Preformatted=pre';

var createFormats$1 = function createFormats$1(formats) {
  formats = formats.replace(/;$/, '').split(';');
  var i = formats.length;

  while (i--) {
    formats[i] = formats[i].split('=');
  }

  return formats;
};

var createListBoxChangeHandler = function createListBoxChangeHandler(editor, items, formatName) {
  return function () {
    var self = this;

    editor.on('nodeChange', function (e) {
      var formatter = editor.formatter;
      var value = null;

      __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].each(e.parents, function (node) {
        __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].each(items, function (item) {
          if (formatName) {
            if (formatter.matchNode(node, formatName, { value: item.value })) {
              value = item.value;
            }
          } else {
            if (formatter.matchNode(node, item.value)) {
              value = item.value;
            }
          }

          if (value) {
            return false;
          }
        });

        if (value) {
          return false;
        }
      });

      self.value(value);
    });
  };
};

var lazyFormatSelectBoxItems = function lazyFormatSelectBoxItems(editor, blocks) {
  return function () {
    var items = [];
    __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].each(blocks, function (block) {
      items.push({
        text: block[0],
        value: block[1],
        textStyle: function textStyle() {
          return editor.formatter.getCssText(block[1]);
        }
      });
    });

    return {
      type: 'listbox',
      text: blocks[0][0],
      values: items,
      fixedWidth: true,

      onselect: function onselect(e) {
        if (e.control) {
          var fmt = e.control.value();

          __WEBPACK_IMPORTED_MODULE_1__Format__["a" /* Format */].toggleFormat(editor, fmt)();
        }
      },
      onPostRender: createListBoxChangeHandler(editor, items)
    };
  };
};

var buildMenuItems = function buildMenuItems(editor, blocks) {
  return __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].map(blocks, function (block) {
    return {
      text: block[0],
      onclick: __WEBPACK_IMPORTED_MODULE_1__Format__["a" /* Format */].toggleFormat(editor, block[1]),

      textStyle: function textStyle() {
        return editor.formatter.getCssText(block[1]);
      }
    };
  });
};

var register = function register(editor) {
  var blocks = createFormats$1(editor.settings.block_formats || defaultBlocks);

  editor.addMenuItem('blockformats', {
    text: 'Blocks',
    menu: buildMenuItems(editor, blocks)
  });

  editor.addButton('formatselect', lazyFormatSelectBoxItems(editor, blocks));
};

var Formatting = { register: register };



/***/ }),
/* 667 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FontPicker; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Fonts__ = __webpack_require__(257);





var getFirstFont = function getFirstFont(fontFamily) {
  return fontFamily ? fontFamily.split(',')[0] : '';
};

var findMatchingValue = function findMatchingValue(items, fontFamily) {
  var value = void 0;

  __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].each(items, function (item) {
    if (item.value.toLowerCase() === fontFamily.toLowerCase()) {
      value = item.value;
    }
  });

  __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].each(items, function (item) {
    if (!value && getFirstFont(item.value).toLowerCase() === getFirstFont(fontFamily).toLowerCase()) {
      value = item.value;
    }
  });

  return value;
};

var createFontNameListBoxChangeHandler = function createFontNameListBoxChangeHandler(editor, items) {
  return function () {
    var self = this;

    editor.on('init nodeChange', function (e) {
      var fontFamily = __WEBPACK_IMPORTED_MODULE_1__Fonts__["a" /* Fonts */].getFontFamily(editor.getBody(), e.element);
      var match = findMatchingValue(items, fontFamily);

      self.value(match || null);

      if (!match && fontFamily) {
        self.text(getFirstFont(fontFamily));
      }
    });
  };
};

var createFormats = function createFormats(formats) {
  formats = formats.replace(/;$/, '').split(';');

  var i = formats.length;

  while (i--) {
    formats[i] = formats[i].split('=');
  }

  return formats;
};

var getFontItems = function getFontItems(editor) {
  var defaultFontsFormats = 'Andale Mono=andale mono,monospace;Arial=arial,helvetica,sans-serif;\nArial Black=arial black,sans-serif;Book Antiqua=book antiqua,palatino,serif;\nComic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier,monospace;\nGeorgia=georgia,palatino,serif;Helvetica=helvetica,arial,sans-serif;Impact=impact,sans-serif;\nSymbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco,monospace;\nTimes New Roman=times new roman,times,serif;Trebuchet MS=trebuchet ms,geneva,sans-serif;\nVerdana=verdana,geneva,sans-serif;Webdings=webdings;Wingdings=wingdings,zapf dingbats';
  var fonts = createFormats(editor.settings.font_formats || defaultFontsFormats);

  return __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].map(fonts, function (font) {
    return {
      text: { raw: font[0] },
      value: font[1],
      textStyle: font[1].indexOf('dings') === -1 ? 'font-family:' + font[1] : ''
    };
  });
};

var registerButtons = function registerButtons(editor) {
  editor.addButton('fontselect', function () {
    var items = getFontItems(editor);

    return {
      type: 'listbox',
      text: 'Font Family',
      tooltip: 'Font Family',
      values: items,
      fixedWidth: true,
      onPostRender: createFontNameListBoxChangeHandler(editor, items),
      onselect: function onselect(e) {
        if (e.control.settings.value) {
          editor.execCommand('FontName', false, e.control.settings.value);
        }
      }
    };
  });
};

var register = function register(editor) {
  registerButtons(editor);
};

var FontPicker = { register: register };



/***/ }),
/* 668 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormatMenu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Format__ = __webpack_require__(117);





var hideMenuObjects = function hideMenuObjects(editor, menu) {
  var count = menu.length;

  __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].each(menu, function (item) {
    if (item.menu) {
      item.hidden = hideMenuObjects(editor, item.menu) === 0;
    }

    var formatName = item.format;

    if (formatName) {
      item.hidden = !editor.formatter.canApply(formatName);
    }

    if (item.hidden) {
      count--;
    }
  });

  return count;
};

var hideFormatMenuItems = function hideFormatMenuItems(editor, menu) {
  var count = menu.items().length;

  menu.items().each(function (item) {
    if (item.menu) {
      item.visible(hideFormatMenuItems(editor, item.menu) > 0);
    }

    if (!item.menu && item.settings.menu) {
      item.visible(hideMenuObjects(editor, item.settings.menu) > 0);
    }

    var formatName = item.settings.format;

    if (formatName) {
      item.visible(editor.formatter.canApply(formatName));
    }

    if (!item.visible()) {
      count--;
    }
  });

  return count;
};

var createFormatMenu = function createFormatMenu(editor) {
  var count = 0;
  var newFormats = [];
  var defaultStyleFormats = [{
    title: 'Headings',
    items: [{
      title: 'Heading 1',
      format: 'h1'
    }, {
      title: 'Heading 2',
      format: 'h2'
    }, {
      title: 'Heading 3',
      format: 'h3'
    }, {
      title: 'Heading 4',
      format: 'h4'
    }, {
      title: 'Heading 5',
      format: 'h5'
    }, {
      title: 'Heading 6',
      format: 'h6'
    }]
  }, {
    title: 'Inline',
    items: [{
      title: 'Bold',
      icon: 'bold',
      format: 'bold'
    }, {
      title: 'Italic',
      icon: 'italic',
      format: 'italic'
    }, {
      title: 'Underline',
      icon: 'underline',
      format: 'underline'
    }, {
      title: 'Strikethrough',
      icon: 'strikethrough',
      format: 'strikethrough'
    }, {
      title: 'Superscript',
      icon: 'superscript',
      format: 'superscript'
    }, {
      title: 'Subscript',
      icon: 'subscript',
      format: 'subscript'
    }, {
      title: 'Code',
      icon: 'code',
      format: 'code'
    }]
  }, {
    title: 'Blocks',
    items: [{
      title: 'Paragraph',
      format: 'p'
    }, {
      title: 'Blockquote',
      format: 'blockquote'
    }, {
      title: 'Div',
      format: 'div'
    }, {
      title: 'Pre',
      format: 'pre'
    }]
  }, {
    title: 'Alignment',
    items: [{
      title: 'Left',
      icon: 'alignleft',
      format: 'alignleft'
    }, {
      title: 'Center',
      icon: 'aligncenter',
      format: 'aligncenter'
    }, {
      title: 'Right',
      icon: 'alignright',
      format: 'alignright'
    }, {
      title: 'Justify',
      icon: 'alignjustify',
      format: 'alignjustify'
    }]
  }];

  var createMenu = function createMenu(formats) {
    var menu = [];

    if (!formats) {
      return;
    }

    __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].each(formats, function (format) {
      var menuItem = {
        text: format.title,
        icon: format.icon
      };

      if (format.items) {
        menuItem.menu = createMenu(format.items);
      } else {
        var formatName = format.format || 'custom' + count++;

        if (!format.format) {
          format.name = formatName;
          newFormats.push(format);
        }

        menuItem.format = formatName;
        menuItem.cmd = format.cmd;
      }

      menu.push(menuItem);
    });

    return menu;
  };

  var createStylesMenu = function createStylesMenu() {
    var menu = void 0;

    if (editor.settings.style_formats_merge) {
      if (editor.settings.style_formats) {
        menu = createMenu(defaultStyleFormats.concat(editor.settings.style_formats));
      } else {
        menu = createMenu(defaultStyleFormats);
      }
    } else {
      menu = createMenu(editor.settings.style_formats || defaultStyleFormats);
    }

    return menu;
  };

  editor.on('init', function () {
    __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].each(newFormats, function (format) {
      editor.formatter.register(format.name, format);
    });
  });

  return {
    type: 'menu',
    items: createStylesMenu(),
    onPostRender: function onPostRender(e) {
      editor.fire('renderFormatsMenu', { control: e.control });
    },
    itemDefaults: {
      preview: true,
      textStyle: function textStyle() {
        if (this.settings.format) {
          return editor.formatter.getCssText(this.settings.format);
        }
      },
      onPostRender: function onPostRender() {
        var self = this;
        self.parent().on('show', function () {
          var formatName = void 0,
              command = void 0;

          formatName = self.settings.format;

          if (formatName) {
            self.disabled(!editor.formatter.canApply(formatName));
            self.active(editor.formatter.match(formatName));
          }

          command = self.settings.cmd;

          if (command) {
            self.active(editor.queryCommandState(command));
          }
        });
      },
      onclick: function onclick() {
        if (this.settings.format) {
          __WEBPACK_IMPORTED_MODULE_1__Format__["a" /* Format */].toggleFormat(editor, this.settings.format)();
        }

        if (this.settings.cmd) {
          editor.execCommand(this.settings.cmd);
        }
      }
    }
  };
};

var registerMenuItems = function registerMenuItems(editor, formatMenu) {
  editor.addMenuItem('formats', {
    text: 'Formats',
    menu: formatMenu
  });
};

var registerButtons = function registerButtons(editor, formatMenu) {
  editor.addButton('styleselect', {
    type: 'menubutton',
    text: 'Formats',
    menu: formatMenu,
    onShowMenu: function onShowMenu() {
      if (editor.settings.style_formats_autohide) {
        hideFormatMenuItems(editor, this.menu);
      }
    }
  });
};

var register = function register(editor) {
  var formatMenu = createFormatMenu(editor);

  registerMenuItems(editor, formatMenu);
  registerButtons(editor, formatMenu);
};

var FormatMenu = { register: register };



/***/ }),
/* 669 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormatButtons; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Format__ = __webpack_require__(117);





var registerFormatButtons = function registerFormatButtons(editor) {
  __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].each({
    bold: 'Bold',
    italic: 'Italic',
    underline: 'Underline',
    strikethrough: 'Strikethrough',
    subscript: 'Subscript',
    superscript: 'Superscript'
  }, function (text, name) {
    editor.addButton(name, {
      active: false,
      tooltip: text,
      onPostRender: __WEBPACK_IMPORTED_MODULE_1__Format__["a" /* Format */].postRenderFormat(editor, name),
      onclick: __WEBPACK_IMPORTED_MODULE_1__Format__["a" /* Format */].toggleFormat(editor, name)
    });
  });
};

var registerCommandButtons = function registerCommandButtons(editor) {
  __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].each({
    outdent: ['Decrease indent', 'Outdent'],
    indent: ['Increase indent', 'Indent'],
    cut: ['Cut', 'Cut'],
    copy: ['Copy', 'Copy'],
    paste: ['Paste', 'Paste'],
    help: ['Help', 'mceHelp'],
    selectall: ['Select all', 'SelectAll'],
    visualaid: ['Visual aids', 'mceToggleVisualAid'],
    newdocument: ['New document', 'mceNewDocument'],
    removeformat: ['Clear formatting', 'RemoveFormat'],
    remove: ['Remove', 'Delete']
  }, function (item, name) {
    editor.addButton(name, {
      tooltip: item[0],
      cmd: item[1]
    });
  });
};

var registerCommandToggleButtons = function registerCommandToggleButtons(editor) {
  __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].each({
    blockquote: ['Blockquote', 'mceBlockQuote'],
    subscript: ['Subscript', 'Subscript'],
    superscript: ['Superscript', 'Superscript']
  }, function (item, name) {
    editor.addButton(name, {
      active: false,
      tooltip: item[0],
      cmd: item[1],
      onPostRender: __WEBPACK_IMPORTED_MODULE_1__Format__["a" /* Format */].postRenderFormat(editor, name)
    });
  });
};

var registerButtons = function registerButtons(editor) {
  registerFormatButtons(editor);
  registerCommandButtons(editor);
  registerCommandToggleButtons(editor);
};

var registerMenuItems = function registerMenuItems(editor) {
  __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].each({
    bold: ['Bold', 'Bold', 'Meta+B'],
    italic: ['Italic', 'Italic', 'Meta+I'],
    underline: ['Underline', 'Underline', 'Meta+U'],
    strikethrough: ['Strikethrough', 'Strikethrough'],
    subscript: ['Subscript', 'Subscript'],
    superscript: ['Superscript', 'Superscript'],
    removeformat: ['Clear formatting', 'RemoveFormat'],
    newdocument: ['New document', 'mceNewDocument'],
    cut: ['Cut', 'Cut', 'Meta+X'],
    copy: ['Copy', 'Copy', 'Meta+C'],
    paste: ['Paste', 'Paste', 'Meta+V'],
    selectall: ['Select all', 'SelectAll', 'Meta+A']
  }, function (item, name) {
    editor.addMenuItem(name, {
      text: item[0],
      icon: name,
      shortcut: item[2],
      cmd: item[1]
    });
  });

  editor.addMenuItem('codeformat', {
    text: 'Code',
    icon: 'code',
    onclick: __WEBPACK_IMPORTED_MODULE_1__Format__["a" /* Format */].toggleFormat(editor, 'code')
  });
};

var register = function register(editor) {
  registerButtons(editor);
  registerMenuItems(editor);
};

var FormatButtons = { register: register };



/***/ }),
/* 670 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FontSizePicker; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Fonts__ = __webpack_require__(257);





var findMatchingValue = function findMatchingValue(items, pt, px) {
  var value = void 0;

  __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].each(items, function (item) {
    if (item.value === px) {
      value = px;
    } else if (item.value === pt) {
      value = pt;
    }
  });

  return value;
};

var createFontSizeListBoxChangeHandler = function createFontSizeListBoxChangeHandler(editor, items) {
  return function () {
    var self = this;

    editor.on('init nodeChange', function (e) {
      var px = void 0,
          pt = void 0,
          precision = void 0,
          match = void 0;

      px = __WEBPACK_IMPORTED_MODULE_1__Fonts__["a" /* Fonts */].getFontSize(editor.getBody(), e.element);

      if (px) {
        for (precision = 3; !match && precision >= 0; precision--) {
          pt = __WEBPACK_IMPORTED_MODULE_1__Fonts__["a" /* Fonts */].toPt(px, precision);
          match = findMatchingValue(items, pt, px);
        }
      }

      self.value(match || null);

      if (!match) {
        self.text(pt);
      }
    });
  };
};

var getFontSizeItems = function getFontSizeItems(editor) {
  var defaultFontsizeFormats = '8pt 10pt 12pt 14pt 18pt 24pt 36pt';
  var fontsizeFormats = editor.settings.fontsize_formats || defaultFontsizeFormats;

  return __WEBPACK_IMPORTED_MODULE_0__Tools__["a" /* Tools */].map(fontsizeFormats.split(' '), function (item) {
    var text = item;
    var value = item;
    var values = item.split('=');

    if (values.length > 1) {
      text = values[0];
      value = values[1];
    }

    return { text: text, value: value };
  });
};

var registerButtons = function registerButtons(editor) {
  editor.addButton('fontsizeselect', function () {
    var items = getFontSizeItems(editor);
    return {
      type: 'listbox',
      text: 'Font Sizes',
      tooltip: 'Font Sizes',
      values: items,
      fixedWidth: true,
      onPostRender: createFontSizeListBoxChangeHandler(editor, items),
      onclick: function onclick(e) {
        if (e.control.settings.value) {
          editor.execCommand('FontSize', false, e.control.settings.value);
        }
      }
    };
  });
};

var register = function register(editor) {
  registerButtons(editor);
};

var FontSizePicker = { register: register };



/***/ }),
/* 671 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThemeManager; });


var ThemeManager = tinymce.util.Tools.resolve('tinymce.ThemeManager');



/***/ }),
/* 672 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Notifications; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Resizer__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__UIrenderer__ = __webpack_require__(673);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__WindowManagerImpl__ = __webpack_require__(680);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__NotificationManagerImpl__ = __webpack_require__(681);







var get = function get(editor) {
  var renderUI = function renderUI(args) {
    return __WEBPACK_IMPORTED_MODULE_1__UIrenderer__["a" /* UIrenderer */].renderUI(editor, this, args);
  };

  var resizeTo = function resizeTo(w, h) {
    return __WEBPACK_IMPORTED_MODULE_0__Resizer__["a" /* Resizer */].resizeTo(editor, w, h);
  };
  var resizeBy = function resizeBy(dw, dh) {
    return __WEBPACK_IMPORTED_MODULE_0__Resizer__["a" /* Resizer */].resizeBy(editor, dw, dh);
  };
  var getNotificationManagerImpl = function getNotificationManagerImpl() {
    return Object(__WEBPACK_IMPORTED_MODULE_3__NotificationManagerImpl__["a" /* NotificationManagerImpl */])(editor);
  };
  var getWindowManagerImpl = function getWindowManagerImpl() {
    return Object(__WEBPACK_IMPORTED_MODULE_2__WindowManagerImpl__["a" /* WindowManagerImpl */])(editor);
  };

  return {
    renderUI: renderUI,
    resizeTo: resizeTo,
    resizeBy: resizeBy,
    getNotificationManagerImpl: getNotificationManagerImpl,
    getWindowManagerImpl: getWindowManagerImpl
  };
};

var Notifications = { get: get };



/***/ }),
/* 673 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UIrenderer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__UI__ = __webpack_require__(674);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Renderer__ = __webpack_require__(677);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SkinStyles__ = __webpack_require__(679);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__EditorManager__ = __webpack_require__(182);







var isInline = function isInline(editor) {
  return editor.getParam('inline', false, 'boolean');
};

var getSkinUrl = function getSkinUrl(editor) {
  var settings = editor.settings;
  var skin = settings.skin;
  var skinUrl = settings.skin_url;

  if (skin !== false) {
    var skinName = skin || 'lightgray';

    if (skinUrl) {
      skinUrl = editor.documentBaseURI.toAbsolute(skinUrl);
    } else {
      skinUrl = __WEBPACK_IMPORTED_MODULE_3__EditorManager__["a" /* EditorManager */].baseURL + '/skins/' + skinName;
    }
  }

  return skinUrl;
};

var renderUI = function renderUI(editor, theme, args) {
  var skinUrl = getSkinUrl(editor);

  if (skinUrl) {
    args.skinUiCss = skinUrl + '/skin.min.css';
    editor.contentCSS.push(skinUrl + '/content' + (editor.inline ? '.inline' : '') + '.min.css');
  }

  __WEBPACK_IMPORTED_MODULE_2__SkinStyles__["a" /* SkinStyles */].setup(editor, theme);

  return isInline(editor) ? __WEBPACK_IMPORTED_MODULE_0__UI__["a" /* UI */].render(editor, theme, args) : __WEBPACK_IMPORTED_MODULE_1__Renderer__["a" /* Renderer */].render(editor, theme, args);
};

var UIrenderer = { renderUI: renderUI };



/***/ }),
/* 674 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UI; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Env__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__KeyMan__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Factory__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__DOMUtils__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__FloatPanel__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SkinLoaded__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__hasMenubar__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__getToolbarSize__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__FireThemeItems__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__isSkinDisabled__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ToolbarCreator__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__MenuBarButtons__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ContextualToolbars__ = __webpack_require__(266);
















var getFixedToolbarContainer = function getFixedToolbarContainer(editor) {
  return editor.getParam('fixed_toolbar_container');
};
var isFixed = function isFixed(inlineToolbarContainer) {
  return !!(inlineToolbarContainer && !__WEBPACK_IMPORTED_MODULE_0__Env__["a" /* Env */].container);
};

var render = function render(editor, theme, args) {
  var panel = void 0,
      inlineToolbarContainer = void 0;
  var DOM = __WEBPACK_IMPORTED_MODULE_3__DOMUtils__["a" /* DOMUtils */].DOM;
  var fixedToolbarContainer = getFixedToolbarContainer(editor);

  if (fixedToolbarContainer) {
    inlineToolbarContainer = DOM.select(fixedToolbarContainer)[0];
  }

  var reposition = function reposition() {
    if (panel && panel.moveRel && panel.visible() && !panel._fixed) {
      var scrollContainer = editor.selection.getScrollContainer();
      var body = editor.getBody();
      var deltaX = 0;
      var deltaY = 0;

      if (scrollContainer) {
        var bodyPos = DOM.getPos(body);
        var scrollContainerPos = DOM.getPos(scrollContainer);

        deltaX = Math.max(0, scrollContainerPos.x - bodyPos.x);
        deltaY = Math.max(0, scrollContainerPos.y - bodyPos.y);
      }

      panel.fixed(false).moveRel(body, editor.rtl ? ['tr-br', 'br-tr'] : ['tl-bl', 'bl-tl', 'tr-br']).moveBy(deltaX, deltaY);
    }
  };

  var show = function show() {
    if (panel) {
      panel.show();
      reposition();
      DOM.addClass(editor.getBody(), 'mce-edit-focus');
    }
  };

  var hide = function hide() {
    if (panel) {
      panel.hide();
      __WEBPACK_IMPORTED_MODULE_4__FloatPanel__["a" /* FloatPanel */].hideAll();
      DOM.removeClass(editor.getBody(), 'mce-edit-focus');
    }
  };

  var render = function render() {
    if (panel) {
      if (!panel.visible()) {
        show();
      }

      return;
    }

    panel = theme.panel = __WEBPACK_IMPORTED_MODULE_2__Factory__["a" /* Factory */].create({
      type: inlineToolbarContainer ? 'panel' : 'floatpanel',
      role: 'application',
      classes: 'tinymce tinymce-inline',
      layout: 'flex',
      direction: 'column',
      align: 'stretch',
      autohide: false,
      autofix: isFixed(inlineToolbarContainer),
      fixed: isFixed(inlineToolbarContainer),
      border: 1,
      items: [Object(__WEBPACK_IMPORTED_MODULE_6__hasMenubar__["a" /* hasMenubar */])(editor) === false ? null : {
        type: 'menubar',
        border: '0 0 1 0',
        items: __WEBPACK_IMPORTED_MODULE_11__MenuBarButtons__["a" /* MenuBarButtons */].createMenuButtons(editor)
      }, __WEBPACK_IMPORTED_MODULE_10__ToolbarCreator__["a" /* ToolbarCreator */].createToolbars(editor, Object(__WEBPACK_IMPORTED_MODULE_7__getToolbarSize__["a" /* getToolbarSize */])(editor))]
    });

    __WEBPACK_IMPORTED_MODULE_8__FireThemeItems__["a" /* FireThemeItems */].fireBeforeRenderUI(editor);

    if (inlineToolbarContainer) {
      panel.renderTo(inlineToolbarContainer).reflow();
    } else {
      panel.renderTo().reflow();
    }

    __WEBPACK_IMPORTED_MODULE_1__KeyMan__["a" /* KeyMan */].addKeys(editor, panel);

    show();

    __WEBPACK_IMPORTED_MODULE_12__ContextualToolbars__["a" /* ContextualToolbars */].addContextualToolbars(editor);
    editor.on('nodeChange', reposition);
    editor.on('ResizeWindow', reposition);
    editor.on('activate', show);
    editor.on('deactivate', hide);
    editor.nodeChanged();
  };

  editor.settings.content_editable = true;
  editor.on('focus', function () {
    if (Object(__WEBPACK_IMPORTED_MODULE_9__isSkinDisabled__["a" /* isSkinDisabled */])(editor) === false && args.skinUiCss) {
      DOM.styleSheetLoader.load(args.skinUiCss, render, render);
    } else {
      render();
    }
  });

  editor.on('blur hide', hide);
  editor.on('remove', function () {
    if (panel) {
      panel.remove();
      panel = null;
    }
  });

  if (Object(__WEBPACK_IMPORTED_MODULE_9__isSkinDisabled__["a" /* isSkinDisabled */])(editor) === false && args.skinUiCss) {
    DOM.styleSheetLoader.load(args.skinUiCss, __WEBPACK_IMPORTED_MODULE_5__SkinLoaded__["a" /* SkinLoaded */].fireSkinLoaded(editor));
  } else {
    __WEBPACK_IMPORTED_MODULE_5__SkinLoaded__["a" /* SkinLoaded */].fireSkinLoaded(editor)();
  }

  return {};
};

var UI = { render: render };



/***/ }),
/* 675 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Rect; });


var Rect = tinymce.util.Tools.resolve('tinymce.geom.Rect');



/***/ }),
/* 676 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UiContainerDelta; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Env__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Retrieve__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DOMUtils__ = __webpack_require__(49);






var getUiContainerDelta = function getUiContainerDelta() {
  var uiContainer = __WEBPACK_IMPORTED_MODULE_0__Env__["a" /* Env */].container;

  if (uiContainer && __WEBPACK_IMPORTED_MODULE_2__DOMUtils__["a" /* DOMUtils */].DOM.getStyle(uiContainer, 'position', true) !== 'static') {
    var containerPos = __WEBPACK_IMPORTED_MODULE_2__DOMUtils__["a" /* DOMUtils */].DOM.getPos(uiContainer);
    var dx = uiContainer.scrollLeft - containerPos.x;
    var dy = uiContainer.scrollTop - containerPos.y;

    return __WEBPACK_IMPORTED_MODULE_1__Retrieve__["a" /* Retrieve */].some({
      x: dx,
      y: dy
    });
  } else {
    return __WEBPACK_IMPORTED_MODULE_1__Retrieve__["a" /* Retrieve */].none();
  }
};

var UiContainerDelta = { getUiContainerDelta: getUiContainerDelta };



/***/ }),
/* 677 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Renderer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__KeyMan__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Resizer__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Factory__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Sidebar__ = __webpack_require__(678);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__DOMUtils__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__hasMenubar__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__SkinLoaded__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__FireThemeItems__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ToolbarCreator__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__getToolbarSize__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__isSkinDisabled__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__MenuBarButtons__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ContextualToolbars__ = __webpack_require__(266);
















var DOM = __WEBPACK_IMPORTED_MODULE_4__DOMUtils__["a" /* DOMUtils */].DOM;

var isReadOnly = function isReadOnly(editor) {
  return editor.getParam('readonly', false, 'boolean');
};
var hasStatusbar = function hasStatusbar(editor) {
  return editor.getParam('statusbar', true, 'boolean');
};
var switchMode = function switchMode(panel) {
  return function (e) {
    panel.find('*').disabled(e.mode === 'readonly');
  };
};

var editArea = function editArea(border) {
  return {
    type: 'panel',
    name: 'iframe',
    layout: 'stack',
    classes: 'edit-area',
    border: border,
    html: ''
  };
};

var editAreaContainer = function editAreaContainer(editor) {
  return {
    type: 'panel',
    layout: 'stack',
    classes: 'edit-aria-container',
    border: '1 0 0 0',
    items: [editArea('0'), __WEBPACK_IMPORTED_MODULE_3__Sidebar__["a" /* Sidebar */].createSidebar(editor)]
  };
};

var getResize = function getResize(editor) {
  var resize = editor.getParam('resize', 'vertical');

  if (resize === false) {
    return 'none';
  } else if (resize === 'both') {
    return 'both';
  } else {
    return 'vertical';
  }
};

var render = function render(editor, theme, args) {
  var panel = void 0,
      resizeHandleCtrl = void 0,
      startSize = void 0;

  if (Object(__WEBPACK_IMPORTED_MODULE_10__isSkinDisabled__["a" /* isSkinDisabled */])(editor) === false && args.skinUiCss) {
    DOM.styleSheetLoader.load(args.skinUiCss, __WEBPACK_IMPORTED_MODULE_6__SkinLoaded__["a" /* SkinLoaded */].fireSkinLoaded(editor));
  } else {
    __WEBPACK_IMPORTED_MODULE_6__SkinLoaded__["a" /* SkinLoaded */].fireSkinLoaded(editor)();
  }

  panel = theme.panel = __WEBPACK_IMPORTED_MODULE_2__Factory__["a" /* Factory */].create({
    type: 'panel',
    role: 'application',
    classes: 'tinymce',
    style: 'visibility: hidden',
    layout: 'stack',
    border: 1,
    items: [{
      type: 'container',
      classes: 'top-part',
      items: [Object(__WEBPACK_IMPORTED_MODULE_5__hasMenubar__["a" /* hasMenubar */])(editor) === false ? null : {
        type: 'menubar',
        border: '0 0 1 0',
        items: __WEBPACK_IMPORTED_MODULE_11__MenuBarButtons__["a" /* MenuBarButtons */].createMenuButtons(editor)
      }, __WEBPACK_IMPORTED_MODULE_8__ToolbarCreator__["a" /* ToolbarCreator */].createToolbars(editor, Object(__WEBPACK_IMPORTED_MODULE_9__getToolbarSize__["a" /* getToolbarSize */])(editor))]
    }, __WEBPACK_IMPORTED_MODULE_3__Sidebar__["a" /* Sidebar */].hasSidebar(editor) ? editAreaContainer(editor) : editArea('1 0 0 0')]
  });
  if (getResize(editor) !== 'none') {
    resizeHandleCtrl = {
      type: 'resizehandle',
      direction: getResize(editor),
      onResizeStart: function onResizeStart() {
        var elm = editor.getContentAreaContainer().firstChild;

        startSize = {
          width: elm.clientWidth,
          height: elm.clientHeight
        };
      },
      onResize: function onResize(e) {
        if (getResize(editor) === 'both') {
          __WEBPACK_IMPORTED_MODULE_1__Resizer__["a" /* Resizer */].resizeTo(editor, startSize.width + e.deltaX, startSize.height + e.deltaY);
        } else {
          __WEBPACK_IMPORTED_MODULE_1__Resizer__["a" /* Resizer */].resizeTo(editor, null, startSize.height + e.deltaY);
        }
      }
    };
  }

  if (hasStatusbar(editor)) {
    var html = 'K-CMS';
    var brandingLabel = {
      type: 'label',
      classes: 'branding',
      html: ' ' + html
    };

    panel.add({
      type: 'panel',
      name: 'statusbar',
      classes: 'statusbar',
      layout: 'flow',
      border: '1 0 0 0',
      ariaRoot: true,
      items: [{
        type: 'elementpath',
        editor: editor
      }, resizeHandleCtrl, brandingLabel]
    });
  }

  __WEBPACK_IMPORTED_MODULE_7__FireThemeItems__["a" /* FireThemeItems */].fireBeforeRenderUI(editor);
  editor.on('SwitchMode', switchMode(panel));
  panel.renderBefore(args.targetNode).reflow();

  if (isReadOnly(editor)) {
    editor.setMode('readonly');
  }

  if (args.width) {
    DOM.setStyle(panel.getEl(), 'width', args.width);
  }

  editor.on('remove', function () {
    panel.remove();
    panel = null;
  });

  __WEBPACK_IMPORTED_MODULE_0__KeyMan__["a" /* KeyMan */].addKeys(editor, panel);
  __WEBPACK_IMPORTED_MODULE_12__ContextualToolbars__["a" /* ContextualToolbars */].addContextualToolbars(editor);

  return {
    iframeContainer: panel.find('#iframe')[0].getEl(),
    editorContainer: panel.getEl()
  };
};

var Renderer = { render: render };



/***/ }),
/* 678 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sidebar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Env__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Factory__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FireThemeItems__ = __webpack_require__(87);







var api = function api(elm) {
  return {
    element: function element() {
      return elm;
    }
  };
};

var trigger = function trigger(sidebar, panel, callbackName) {
  var callback = sidebar.settings[callbackName];

  if (callback) {
    callback(api(panel.getEl('body')));
  }
};

var hidePanels = function hidePanels(name, container, sidebars) {
  __WEBPACK_IMPORTED_MODULE_1__Tools__["a" /* Tools */].each(sidebars, function (sidebar) {
    var panel = container.items().filter('#' + sidebar.name)[0];

    if (panel && panel.visible() && sidebar.name !== name) {
      trigger(sidebar, panel, 'onhide');

      panel.visible(false);
    }
  });
};

var deactivateButtons = function deactivateButtons(toolbar) {
  toolbar.items().each(function (ctrl) {
    ctrl.active(false);
  });
};

var findSidebar = function findSidebar(sidebars, name) {
  return __WEBPACK_IMPORTED_MODULE_1__Tools__["a" /* Tools */].grep(sidebars, function (sidebar) {
    return sidebar.name === name;
  })[0];
};

var showPanel = function showPanel(editor, name, sidebars) {
  return function (e) {
    var btnCtrl = e.control;
    var container = btnCtrl.parents().filter('panel')[0];
    var panel = container.find('#' + name)[0];
    var sidebar = findSidebar(sidebars, name);

    hidePanels(name, container, sidebars);
    deactivateButtons(btnCtrl.parent());

    if (panel && panel.visible()) {
      trigger(sidebar, panel, 'onhide');

      panel.hide();
      btnCtrl.active(false);
    } else {
      if (panel) {
        panel.show();

        trigger(sidebar, panel, 'onshow');
      } else {
        panel = __WEBPACK_IMPORTED_MODULE_2__Factory__["a" /* Factory */].create({
          type: 'container',
          name: name,
          layout: 'stack',
          classes: 'sidebar-panel',
          html: ''
        });

        container.prepend(panel);

        trigger(sidebar, panel, 'onrender');
        trigger(sidebar, panel, 'onshow');
      }

      btnCtrl.active(true);
    }

    __WEBPACK_IMPORTED_MODULE_3__FireThemeItems__["a" /* FireThemeItems */].fireResizeEditor(editor);
  };
};

var isModernBrowser = function isModernBrowser() {
  return !__WEBPACK_IMPORTED_MODULE_0__Env__["a" /* Env */].ie || __WEBPACK_IMPORTED_MODULE_0__Env__["a" /* Env */].ie >= 11;
};

var hasSidebar = function hasSidebar(editor) {
  return isModernBrowser() && editor.sidebars ? editor.sidebars.length > 0 : false;
};

var createSidebar = function createSidebar(editor) {
  var buttons = __WEBPACK_IMPORTED_MODULE_1__Tools__["a" /* Tools */].map(editor.sidebars, function (sidebar) {
    var settings = sidebar.settings;

    return {
      type: 'button',
      icon: settings.icon,
      image: settings.image,
      tooltip: settings.tooltip,
      onclick: showPanel(editor, sidebar.name, editor.sidebars)
    };
  });

  return {
    type: 'panel',
    name: 'sidebar',
    layout: 'stack',
    classes: 'sidebar',
    items: [{
      type: 'toolbar',
      layout: 'stack',
      classes: 'sidebar-toolbar',
      items: buttons
    }]
  };
};

var Sidebar = { hasSidebar: hasSidebar, createSidebar: createSidebar };



/***/ }),
/* 679 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SkinStyles; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Throbber__ = __webpack_require__(176);




var setup = function setup(editor, theme) {
  var throbber = void 0;

  editor.on('ProgressState', function (e) {
    throbber = throbber || new __WEBPACK_IMPORTED_MODULE_0__Throbber__["a" /* Throbber */](theme.panel.getEl('body'));

    if (e.state) {
      throbber.show(e.time);
    } else {
      throbber.hide();
    }
  });
};

var SkinStyles = { setup: setup };



/***/ }),
/* 680 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WindowManagerImpl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Window__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MessageBox__ = __webpack_require__(251);





function WindowManagerImpl(editor) {
  var open = function open(args, params, closeCallback) {
    var win = void 0;

    args.title = args.title || ' ';
    args.url = args.url || args.file;

    if (args.url) {
      args.width = parseInt(args.width || 320, 10);
      args.height = parseInt(args.height || 240, 10);
    }

    if (args.body) {
      args.items = {
        defaults: args.defaults,
        type: args.bodyType || 'form',
        items: args.body,
        data: args.data,
        callbacks: args.commands
      };
    }

    if (!args.url && !args.buttons) {
      args.buttons = [{
        text: 'Ok',
        subtype: 'primary',
        onclick: function onclick() {
          win.find('form')[0].submit();
        }
      }, {
        text: 'Cancel',
        onclick: function onclick() {
          win.close();
        }
      }];
    }

    win = new __WEBPACK_IMPORTED_MODULE_0__Window__["a" /* Window */](args);

    win.on('close', function () {
      closeCallback(win);
    });

    if (args.data) {
      win.on('postRender', function () {
        this.find('*').each(function (ctrl) {
          var name = ctrl.name();

          if (name in args.data) {
            ctrl.value(args.data[name]);
          }
        });
      });
    }

    win.features = args || {};
    win.params = params || {};

    win = win.renderTo().reflow();

    return win;
  };

  var alert = function alert(message, choiceCallback, closeCallback) {
    var win = void 0;

    win = __WEBPACK_IMPORTED_MODULE_1__MessageBox__["a" /* MessageBox */].alert(message, function () {
      choiceCallback();
    });

    win.on('close', function () {
      closeCallback(win);
    });

    return win;
  };

  var confirm = function confirm(message, choiceCallback, closeCallback) {
    var win = void 0;

    win = __WEBPACK_IMPORTED_MODULE_1__MessageBox__["a" /* MessageBox */].confirm(message, function (state) {
      choiceCallback(state);
    });

    win.on('close', function () {
      closeCallback(win);
    });

    return win;
  };

  var close = function close(window) {
    window.close();
  };

  var getParams = function getParams(window) {
    return window.params;
  };

  var setParams = function setParams(window, params) {
    window.params = params;
  };

  return {
    open: open,
    alert: alert,
    confirm: confirm,
    close: close,
    getParams: getParams,
    setParams: setParams
  };
}



/***/ }),
/* 681 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationManagerImpl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__funcs__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Tools__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ObjectTools__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Notification__ = __webpack_require__(254);







function NotificationManagerImpl(editor) {
  var getEditorContainer = function getEditorContainer(editor) {
    return editor.inline ? editor.getElement() : editor.getContentAreaContainer();
  };

  var getContainerWidth = function getContainerWidth() {
    var container = getEditorContainer(editor);

    return __WEBPACK_IMPORTED_MODULE_0__funcs__["a" /* funcs */].getSize(container).width;
  };

  var prePositionNotifications = function prePositionNotifications(notifications) {
    __WEBPACK_IMPORTED_MODULE_2__ObjectTools__["a" /* ObjectTools */].each(notifications, function (notification) {
      notification.moveTo(0, 0);
    });
  };

  var positionNotifications = function positionNotifications(notifications) {
    if (notifications.length > 0) {
      var firstItem = notifications.slice(0, 1)[0];
      var container = getEditorContainer(editor);

      firstItem.moveRel(container, 'tc-tc');

      __WEBPACK_IMPORTED_MODULE_2__ObjectTools__["a" /* ObjectTools */].each(notifications, function (notification, index) {
        if (index > 0) {
          notification.moveRel(notifications[index - 1].getEl(), 'bc-tc');
        }
      });
    }
  };

  var reposition = function reposition(notifications) {
    prePositionNotifications(notifications);
    positionNotifications(notifications);
  };

  var open = function open(args, closeCallback) {
    var extendedArgs = __WEBPACK_IMPORTED_MODULE_1__Tools__["a" /* Tools */].extend(args, { maxWidth: getContainerWidth() });
    var notif = new __WEBPACK_IMPORTED_MODULE_3__Notification__["a" /* Notification */](extendedArgs);

    notif.args = extendedArgs;

    if (extendedArgs.timeout > 0) {
      notif.timer = setTimeout(function () {
        notif.close();
        closeCallback();
      }, extendedArgs.timeout);
    }

    notif.on('close', function () {
      closeCallback();
    });

    notif.renderTo();

    return notif;
  };

  var close = function close(notification) {
    notification.close();
  };
  var getArgs = function getArgs(notification) {
    return notification.args;
  };

  return {
    open: open,
    close: close,
    reposition: reposition,
    getArgs: getArgs
  };
}



/***/ })
/******/ ]);
//# sourceMappingURL=theme.js.map