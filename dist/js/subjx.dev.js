/*@license
* Drag/Rotate/Resize Library
* Released under the MIT license, 2018-2020
* Karen Sarksyan
* nichollascarter@gmail.com
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.subjx = factory());
}(this, (function () { 'use strict';

    function _typeof(obj) {
      "@babel/helpers - typeof";

      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function (obj) {
          return typeof obj;
        };
      } else {
        _typeof = function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
      }

      return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);

      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
      }

      return keys;
    }

    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};

        if (i % 2) {
          ownKeys(Object(source), true).forEach(function (key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }

      return target;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      });
      if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
      return _getPrototypeOf(o);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

      return _setPrototypeOf(o, p);
    }

    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;

      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;

      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }

      return target;
    }

    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};

      var target = _objectWithoutPropertiesLoose(source, excluded);

      var key, i;

      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }

      return target;
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return self;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (typeof call === "object" || typeof call === "function")) {
        return call;
      }

      return _assertThisInitialized(self);
    }

    function _createSuper(Derived) {
      return function () {
        var Super = _getPrototypeOf(Derived),
            result;

        if (_isNativeReflectConstruct()) {
          var NewTarget = _getPrototypeOf(this).constructor;

          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }

        return _possibleConstructorReturn(this, result);
      };
    }

    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }

    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }

    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }

    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }

    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
    }

    function _iterableToArrayLimit(arr, i) {
      if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(n);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }

    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

      return arr2;
    }

    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (f) {
      return setTimeout(f, 1000 / 60);
    };
    var cancelAnimFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || function (requestID) {
      clearTimeout(requestID);
    };
    var _Array$prototype = Array.prototype,
        arrSlice = _Array$prototype.slice,
        arrReduce = _Array$prototype.reduce;
    var _console = console,
        warn = _console.warn;
    var isDef = function isDef(val) {
      return val !== undefined && val !== null;
    };
    var isUndef = function isUndef(val) {
      return val === undefined || val === null;
    };
    var isFunc = function isFunc(val) {
      return typeof val === 'function';
    };
    var createMethod = function createMethod(fn) {
      return isFunc(fn) ? function () {
        fn.call.apply(fn, [this].concat(Array.prototype.slice.call(arguments)));
      } : function () {};
    };

    var Helper = /*#__PURE__*/function () {
      function Helper(params) {
        _classCallCheck(this, Helper);

        if (typeof params === 'string') {
          var selector = document.querySelectorAll(params);
          this.length = selector.length;

          for (var count = 0; count < this.length; count++) {
            this[count] = selector[count];
          }
        } else if (_typeof(params) === 'object' && (params.nodeType === 1 || params === document)) {
          this[0] = params;
          this.length = 1;
        } else if (params instanceof Helper) {
          this.length = params.length;

          for (var _count = 0; _count < this.length; _count++) {
            this[_count] = params[_count];
          }
        } else if (isIterable(params)) {
          this.length = 0;

          for (var _count2 = 0; _count2 < this.length; _count2++) {
            if (params.nodeType === 1) {
              this[_count2] = params[_count2];
              this.length++;
            }
          }
        } else {
          throw new Error("Passed parameter must be selector/element/elementArray");
        }
      }

      _createClass(Helper, [{
        key: "css",
        value: function css(prop) {
          var _getStyle = function _getStyle(obj) {
            var len = obj.length;

            while (len--) {
              if (obj[len].currentStyle) {
                return obj[len].currentStyle[prop];
              } else if (document.defaultView && document.defaultView.getComputedStyle) {
                return document.defaultView.getComputedStyle(obj[len], '')[prop];
              } else {
                return obj[len].style[prop];
              }
            }
          };

          var _setStyle = function _setStyle(obj, options) {
            var len = obj.length;

            while (len--) {
              for (var property in options) {
                obj[len].style[property] = options[property];
              }
            }

            return obj.style;
          };

          var methods = {
            setStyle: function setStyle(options) {
              return _setStyle(this, options);
            },
            getStyle: function getStyle() {
              return _getStyle(this);
            }
          };

          if (typeof prop === 'string') {
            return methods.getStyle.apply(this, arrSlice.call(arguments, 1));
          } else if (_typeof(prop) === 'object' || !prop) {
            return methods.setStyle.apply(this, arguments);
          } else {
            warn("Method ".concat(prop, " does not exist"));
          }

          return false;
        }
      }, {
        key: "on",
        value: function on() {
          var len = this.length;

          while (len--) {
            if (!this[len].events) {
              this[len].events = {};
              this[len].events[arguments[0]] = [];
            }

            if (typeof arguments[1] !== 'string') {
              if (document.addEventListener) {
                this[len].addEventListener(arguments[0], arguments[1], arguments[2] || {
                  passive: false
                });
              } else if (document.attachEvent) {
                this[len].attachEvent("on".concat(arguments[0]), arguments[1]);
              } else {
                this[len]["on".concat(arguments[0])] = arguments[1];
              }
            } else {
              listenerDelegate(this[len], arguments[0], arguments[1], arguments[2], arguments[3], true);
            }
          }

          return this;
        }
      }, {
        key: "off",
        value: function off() {
          var len = this.length;

          while (len--) {
            if (!this[len].events) {
              this[len].events = {};
              this[len].events[arguments[0]] = [];
            }

            if (typeof arguments[1] !== 'string') {
              if (document.removeEventListener) {
                this[len].removeEventListener(arguments[0], arguments[1], arguments[2]);
              } else if (document.detachEvent) {
                this[len].detachEvent("on".concat(arguments[0]), arguments[1]);
              } else {
                this[len]["on".concat(arguments[0])] = null;
              }
            } else {
              listenerDelegate(this[len], arguments[0], arguments[1], arguments[2], arguments[3], false);
            }
          }

          return this;
        }
      }, {
        key: "is",
        value: function is(selector) {
          if (isUndef(selector)) return false;

          var _sel = helper(selector);

          var len = this.length;

          while (len--) {
            if (this[len] === _sel[len]) return true;
          }

          return false;
        }
      }]);

      return Helper;
    }();

    function listenerDelegate(el, evt, sel, handler, options, act) {
      var doit = function doit(event) {
        var t = event.target;

        while (t && t !== this) {
          if (t.matches(sel)) {
            handler.call(t, event);
          }

          t = t.parentNode;
        }
      };

      if (act === true) {
        if (document.addEventListener) {
          el.addEventListener(evt, doit, options || {
            passive: false
          });
        } else if (document.attachEvent) {
          el.attachEvent("on".concat(evt), doit);
        } else {
          el["on".concat(evt)] = doit;
        }
      } else {
        if (document.removeEventListener) {
          el.removeEventListener(evt, doit, options || {
            passive: false
          });
        } else if (document.detachEvent) {
          el.detachEvent("on".concat(evt), doit);
        } else {
          el["on".concat(evt)] = null;
        }
      }
    }

    function isIterable(obj) {
      return isDef(obj) && _typeof(obj) === 'object' && (Array.isArray(obj) || isDef(window.Symbol) && typeof obj[window.Symbol.iterator] === 'function' || isDef(obj.forEach) || typeof obj.length === "number" && (obj.length === 0 || obj.length > 0 && obj.length - 1 in obj));
    }

    function helper(params) {
      return new Helper(params);
    }

    var Observable = /*#__PURE__*/function () {
      function Observable() {
        _classCallCheck(this, Observable);

        this.observers = {};
      }

      _createClass(Observable, [{
        key: "subscribe",
        value: function subscribe(eventName, sub) {
          var obs = this.observers;

          if (isUndef(obs[eventName])) {
            Object.defineProperty(obs, eventName, {
              value: []
            });
          }

          obs[eventName].push(sub);
          return this;
        }
      }, {
        key: "unsubscribe",
        value: function unsubscribe(eventName, f) {
          var obs = this.observers;

          if (isDef(obs[eventName])) {
            var index = obs[eventName].indexOf(f);
            obs[eventName].splice(index, 1);
          }

          return this;
        }
      }, {
        key: "notify",
        value: function notify(eventName, source, data) {
          if (isUndef(this.observers[eventName])) return;
          this.observers[eventName].forEach(function (observer) {
            if (source === observer) return;

            switch (eventName) {
              case 'onmove':
                observer.notifyMove(data);
                break;

              case 'onrotate':
                observer.notifyRotate(data);
                break;

              case 'onresize':
                observer.notifyResize(data);
                break;

              case 'onapply':
                observer.notifyApply(data);
                break;

              case 'ongetstate':
                observer.notifyGetState(data);
                break;
            }
          });
        }
      }]);

      return Observable;
    }();

    var Event = /*#__PURE__*/function () {
      function Event(name) {
        _classCallCheck(this, Event);

        this.name = name;
        this.callbacks = [];
      }

      _createClass(Event, [{
        key: "registerCallback",
        value: function registerCallback(cb) {
          this.callbacks.push(cb);
        }
      }, {
        key: "removeCallback",
        value: function removeCallback(cb) {
          var ix = this.callbacks(cb);
          this.callbacks.splice(ix, 1);
        }
      }]);

      return Event;
    }();

    var EventDispatcher = /*#__PURE__*/function () {
      function EventDispatcher() {
        _classCallCheck(this, EventDispatcher);

        this.events = {};
      }

      _createClass(EventDispatcher, [{
        key: "registerEvent",
        value: function registerEvent(eventName) {
          this.events[eventName] = new Event(eventName);
        }
      }, {
        key: "emit",
        value: function emit(ctx, eventName, eventArgs) {
          this.events[eventName].callbacks.forEach(function (cb) {
            cb.call(ctx, eventArgs);
          });
        }
      }, {
        key: "addEventListener",
        value: function addEventListener(eventName, cb) {
          this.events[eventName].registerCallback(cb);
        }
      }, {
        key: "removeEventListener",
        value: function removeEventListener(eventName, cb) {
          this.events[eventName].removeCallback(cb);
        }
      }]);

      return EventDispatcher;
    }();

    var SubjectModel = /*#__PURE__*/function () {
      function SubjectModel(el) {
        _classCallCheck(this, SubjectModel);

        this.el = el;
        this.storage = null;
        this.proxyMethods = null;
        this.eventDispatcher = new EventDispatcher();
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onTouchStart = this._onTouchStart.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
        this._onTouchMove = this._onTouchMove.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);
        this._animate = this._animate.bind(this);
      }

      _createClass(SubjectModel, [{
        key: "enable",
        value: function enable(options) {
          this._processOptions(options);

          this._init(this.el);

          this.proxyMethods.onInit.call(this, this.el);
        }
      }, {
        key: "disable",
        value: function disable() {
          throwNotImplementedError();
        }
      }, {
        key: "_init",
        value: function _init() {
          throwNotImplementedError();
        }
      }, {
        key: "_destroy",
        value: function _destroy() {
          throwNotImplementedError();
        }
      }, {
        key: "_processOptions",
        value: function _processOptions() {
          throwNotImplementedError();
        }
      }, {
        key: "_start",
        value: function _start() {
          throwNotImplementedError();
        }
      }, {
        key: "_moving",
        value: function _moving() {
          throwNotImplementedError();
        }
      }, {
        key: "_end",
        value: function _end() {
          throwNotImplementedError();
        }
      }, {
        key: "_animate",
        value: function _animate() {
          throwNotImplementedError();
        }
      }, {
        key: "_drag",
        value: function _drag(_ref) {
          var dx = _ref.dx,
              dy = _ref.dy,
              rest = _objectWithoutProperties(_ref, ["dx", "dy"]);

          var transform = this._processMove(dx, dy);

          var finalArgs = _objectSpread2({
            dx: dx,
            dy: dy,
            transform: transform
          }, rest);

          this.proxyMethods.onMove.call(this, finalArgs);

          this._emitEvent('drag', finalArgs);
        }
      }, {
        key: "_draw",
        value: function _draw() {
          this._animate();
        }
      }, {
        key: "_onMouseDown",
        value: function _onMouseDown(e) {
          this._start(e);

          helper(document).on('mousemove', this._onMouseMove).on('mouseup', this._onMouseUp);
        }
      }, {
        key: "_onTouchStart",
        value: function _onTouchStart(e) {
          this._start(e.touches[0]);

          helper(document).on('touchmove', this._onTouchMove).on('touchend', this._onTouchEnd);
        }
      }, {
        key: "_onMouseMove",
        value: function _onMouseMove(e) {
          if (e.preventDefault) {
            e.preventDefault();
          }

          this._moving(e, this.el);
        }
      }, {
        key: "_onTouchMove",
        value: function _onTouchMove(e) {
          if (e.preventDefault) {
            e.preventDefault();
          }

          this._moving(e.touches[0], this.el);
        }
      }, {
        key: "_onMouseUp",
        value: function _onMouseUp(e) {
          helper(document).off('mousemove', this._onMouseMove).off('mouseup', this._onMouseUp);

          this._end(e, this.el);
        }
      }, {
        key: "_onTouchEnd",
        value: function _onTouchEnd(e) {
          helper(document).off('touchmove', this._onTouchMove).off('touchend', this._onTouchEnd);

          if (e.touches.length === 0) {
            this._end(e.changedTouches[0], this.el);
          }
        }
      }, {
        key: "_emitEvent",
        value: function _emitEvent() {
          var _this$eventDispatcher;

          (_this$eventDispatcher = this.eventDispatcher).emit.apply(_this$eventDispatcher, [this].concat(Array.prototype.slice.call(arguments)));
        }
      }, {
        key: "on",
        value: function on(name, cb) {
          this.eventDispatcher.addEventListener(name, cb);
          return this;
        }
      }, {
        key: "off",
        value: function off(name, cb) {
          this.eventDispatcher.removeEventListener(name, cb);
          return this;
        }
      }]);

      return SubjectModel;
    }();

    var throwNotImplementedError = function throwNotImplementedError() {
      throw Error("Method not implemented");
    };

    var EVENTS = ['dragStart', 'drag', 'dragEnd', 'resizeStart', 'resize', 'resizeEnd', 'rotateStart', 'rotate', 'rotateEnd', 'setPointStart', 'setPointEnd'];

    //export const RAD = Math.PI / 180;
    //export const DEG = 180 / Math.PI;
    var snapToGrid = function snapToGrid(value, snap) {
      if (snap === 0) {
        return value;
      } else {
        var result = snapCandidate(value, snap);

        if (result - value < snap) {
          return result;
        }
      }
    };
    var snapCandidate = function snapCandidate(value, gridSize) {
      if (gridSize === 0) return value;
      return Math.round(value / gridSize) * gridSize;
    };
    var floatToFixed = function floatToFixed(val) {
      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
      return Number(val.toFixed(size));
    };

    var getOffset = function getOffset(node) {
      return node.getBoundingClientRect();
    };
    var getTransform = function getTransform(el) {
      var transform = el.css('-webkit-transform') || el.css('-moz-transform') || el.css('-ms-transform') || el.css('-o-transform') || el.css('transform') || 'none';
      return transform;
    };
    var parseMatrix = function parseMatrix(value) {
      var transform = value.match(/[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g);

      if (transform) {
        return transform.map(function (item) {
          return parseFloat(item);
        });
      } else {
        return [1, 0, 0, 1, 0, 0];
      }
    };
    var addClass = function addClass(node, cls) {
      if (!cls) return;

      if (node.classList) {
        if (cls.indexOf(' ') > -1) {
          cls.split(/\s+/).forEach(function (cl) {
            return node.classList.add(cl);
          });
        } else {
          return node.classList.add(cls);
        }
      }

      return node;
    };
    var removeClass = function removeClass(node, cls) {
      if (!cls) return;

      if (node.classList) {
        if (cls.indexOf(' ') > -1) {
          cls.split(/\s+/).forEach(function (cl) {
            return node.classList.remove(cl);
          });
        } else {
          return node.classList.remove(cls);
        }
      }

      return node;
    };
    var matrixToCSS = function matrixToCSS(arr) {
      var style = "matrix(".concat(arr.join(), ")");
      return {
        transform: style,
        webkitTranform: style,
        mozTransform: style,
        msTransform: style,
        otransform: style
      };
    };

    var Transformable = /*#__PURE__*/function (_SubjectModel) {
      _inherits(Transformable, _SubjectModel);

      var _super = _createSuper(Transformable);

      function Transformable(el, options, observable) {
        var _this;

        _classCallCheck(this, Transformable);

        _this = _super.call(this, el);

        if (_this.constructor === Transformable) {
          throw new TypeError('Cannot construct Transformable instances directly');
        }

        _this.observable = observable;
        EVENTS.forEach(function (eventName) {
          _this.eventDispatcher.registerEvent(eventName);
        });

        _this.enable(options);

        return _this;
      }

      _createClass(Transformable, [{
        key: "_cursorPoint",
        value: function _cursorPoint() {
          throw Error("'_cursorPoint()' method not implemented");
        }
        /*
        _rotate({ radians, ...rest }) {
            const resultMtrx = this._processRotate(radians);
            const finalArgs = {
                transform: resultMtrx,
                delta: radians,
                ...rest
            };
            this.proxyMethods.onRotate.call(this, finalArgs);
            this._emitEvent('rotate', finalArgs);
        }*/

      }, {
        key: "_resize",
        value: function _resize(_ref) {
          var dx = _ref.dx,
              dy = _ref.dy,
              rest = _objectWithoutProperties(_ref, ["dx", "dy"]);

          var finalValues = this._processResize(dx, dy);

          var finalArgs = _objectSpread2({}, finalValues, {
            dx: dx,
            dy: dy
          }, rest);

          this.proxyMethods.onResize.call(this, finalArgs);

          this._emitEvent('resize', finalArgs);
        }
      }, {
        key: "_processOptions",
        value: function _processOptions(options) {
          var el = this.el;
          addClass(el, 'sjx-drag');
          var _snap = {
            x: 10,
            y: 10 //,
            //angle: 10 * RAD

          };
          var _each = {
            move: false,
            resize: false //,
            //rotate: false

          };

          var _restrict = null,
              _proportions = false,
              _axis = 'xy',
              _cursorMove = 'auto',
              _cursorResize = 'auto',
              //_cursorRotate = 'auto',
          //_rotationPoint = false,
          _draggable = true,
              _resizable = true,
              //_rotatable = true,
          //_rotatorAnchor = null,
          //_rotatorOffset = 50,
          //_showNormal = true,
          _custom = null,
              _resizeHandles = null,
              _className = null,
              _onInit = function _onInit() {},
              _onMove = function _onMove() {},
              //_onRotate = () => { },
          _onResize = function _onResize() {},
              _onDrop = function _onDrop() {},
              _onDestroy = function _onDestroy() {};

          var _container = el.parentNode;

          if (isDef(options)) {
            var snap = options.snap,
                each = options.each,
                axis = options.axis,
                cursorMove = options.cursorMove,
                cursorResize = options.cursorResize,
                restrict = options.restrict,
                draggable = options.draggable,
                resizable = options.resizable,
                onInit = options.onInit,
                onDrop = options.onDrop,
                onMove = options.onMove,
                onResize = options.onResize,
                onDestroy = options.onDestroy,
                container = options.container,
                proportions = options.proportions,
                custom = options.custom,
                resizeHandles = options.resizeHandles,
                className = options.className;

            if (isDef(snap)) {
              var x = snap.x,
                  y = snap.y;
              _snap.x = isUndef(x) ? 10 : x;
              _snap.y = isUndef(y) ? 10 : y; //_snap.angle = isUndef(angle)
              //    ? _snap.angle
              //    : angle * RAD;
            }

            if (isDef(each)) {
              var move = each.move,
                  resize = each.resize;
              _each.move = move || false;
              _each.resize = resize || false; //_each.rotate = rotate || false;
            }

            if (isDef(restrict)) {
              _restrict = restrict === 'parent' ? el.parentNode : helper(restrict)[0] || document;
            }

            _cursorMove = cursorMove || 'auto';
            _cursorResize = cursorResize || 'auto'; //_cursorRotate = cursorRotate || 'auto';

            _axis = axis || 'xy';
            _container = isDef(container) && helper(container)[0] ? helper(container)[0] : _container; //_rotationPoint = rotationPoint || false;

            _proportions = proportions || false;
            _draggable = isDef(draggable) ? draggable : true;
            _resizable = isDef(resizable) ? resizable : true; //_rotatable = isDef(rotatable) ? rotatable : true;

            _custom = _typeof(custom) === 'object' && custom || null; //_rotatorAnchor = rotatorAnchor || null;
            // _rotatorOffset = rotatorOffset || 50; 
            // _showNormal = isDef(showNormal) ? showNormal : true;

            _resizeHandles = isDef(resizeHandles) ? resizeHandles : null;
            _className = isDef(className) ? className : null;
            _onInit = createMethod(onInit);
            _onDrop = createMethod(onDrop);
            _onMove = createMethod(onMove);
            _onResize = createMethod(onResize); //_onRotate = createMethod(onRotate);

            _onDestroy = createMethod(onDestroy);
          }

          this.options = {
            axis: _axis,
            cursorMove: _cursorMove,
            //cursorRotate: _cursorRotate,
            cursorResize: _cursorResize,
            //rotationPoint: _rotationPoint,
            restrict: _restrict,
            container: _container,
            snap: _snap,
            each: _each,
            proportions: _proportions,
            draggable: _draggable,
            resizable: _resizable,
            //rotatable: _rotatable,
            custom: _custom,
            //rotatorAnchor: _rotatorAnchor,
            //rotatorOffset: _rotatorOffset,
            //showNormal: _showNormal,
            resizeHandles: _resizeHandles,
            className: _className
          };
          this.proxyMethods = {
            onInit: _onInit,
            onDrop: _onDrop,
            onMove: _onMove,
            onResize: _onResize,
            //onRotate: _onRotate,
            onDestroy: _onDestroy
          };
          this.subscribe(_each);
        }
      }, {
        key: "_animate",
        value: function _animate() {
          var self = this;
          var observable = self.observable,
              storage = self.storage,
              options = self.options;
          if (isUndef(storage)) return;
          storage.frame = requestAnimFrame(self._animate);
          if (!storage.doDraw) return;
          storage.doDraw = false;
          var dox = storage.dox,
              doy = storage.doy,
              clientX = storage.clientX,
              clientY = storage.clientY,
              doDrag = storage.doDrag,
              doResize = storage.doResize,
              revX = storage.revX,
              revY = storage.revY;
          var snap = options.snap,
              _options$each = options.each,
              moveEach = _options$each.move,
              resizeEach = _options$each.resize,
              restrict = options.restrict,
              draggable = options.draggable,
              resizable = options.resizable;

          if (doResize && resizable) {
            var transform = storage.transform,
                cx = storage.cx,
                cy = storage.cy;

            var _this$_pointToElement = this._pointToElement({
              x: clientX,
              y: clientY
            }),
                x = _this$_pointToElement.x,
                y = _this$_pointToElement.y;

            var dx = dox ? snapToGrid(x - cx, snap.x / transform.scX) : 0;
            var dy = doy ? snapToGrid(y - cy, snap.y / transform.scY) : 0;
            dx = dox ? revX ? -dx : dx : 0;
            dy = doy ? revY ? -dy : dy : 0;
            var args = {
              dx: dx,
              dy: dy,
              clientX: clientX,
              clientY: clientY
            };

            self._resize(args);

            if (resizeEach) {
              observable.notify('onresize', self, args);
            }
          }

          if (doDrag && draggable) {
            var restrictOffset = storage.restrictOffset,
                elementOffset = storage.elementOffset,
                nx = storage.nx,
                ny = storage.ny;

            if (isDef(restrict)) {
              var restLeft = restrictOffset.left,
                  restTop = restrictOffset.top;
              var elLeft = elementOffset.left,
                  elTop = elementOffset.top,
                  elW = elementOffset.width,
                  elH = elementOffset.height;
              var distX = nx - clientX,
                  distY = ny - clientY;
              var maxX = restrict.clientWidth - elW,
                  maxY = restrict.clientHeight - elH;
              var offsetY = elTop - restTop,
                  offsetX = elLeft - restLeft;

              if (offsetY - distY < 0) {
                clientY = ny - elTop + restTop;
              }

              if (offsetX - distX < 0) {
                clientX = nx - elLeft + restLeft;
              }

              if (offsetY - distY > maxY) {
                clientY = maxY + (ny - elTop + restTop);
              }

              if (offsetX - distX > maxX) {
                clientX = maxX + (nx - elLeft + restLeft);
              }
            }

            var _dx = dox ? snapToGrid(clientX - nx, snap.x) : 0;

            var _dy = doy ? snapToGrid(clientY - ny, snap.y) : 0;

            var _args = {
              dx: _dx,
              dy: _dy,
              clientX: clientX,
              clientY: clientY
            };

            self._drag(_args);

            if (moveEach) {
              observable.notify('onmove', self, _args);
            }
          }
          /*
          if (doRotate && rotatable) {
              const {
                  pressang,
                  center
              } = storage;
                const radians = Math.atan2(
                  clientY - center.y,
                  clientX - center.x
              ) - pressang;
                const args = {
                  clientX,
                  clientY
              };
                self._rotate(
                  {
                      radians: snapToGrid(radians, snap.angle),
                      ...args
                  }
              );
                if (rotateEach) {
                  observable.notify('onrotate',
                      self,
                      {
                          radians,
                          ...args
                      }
                  );
              }
          }
            if (doSetCenter && rotatable) {
              const {
                  bx,
                  by
              } = storage;
                const { x, y } = this._pointToControls(
                  {
                      x: clientX,
                      y: clientY
                  }
              );
                self._moveCenterHandle(
                  x - bx,
                  y - by
              );
          }
          */

        }
      }, {
        key: "_start",
        value: function _start(e) {
          var observable = this.observable,
              storage = this.storage,
              _this$options = this.options,
              axis = _this$options.axis,
              restrict = _this$options.restrict,
              each = _this$options.each,
              el = this.el;

          var computed = this._compute(e);

          Object.keys(computed).forEach(function (prop) {
            storage[prop] = computed[prop];
          });
          var onRightEdge = computed.onRightEdge,
              onBottomEdge = computed.onBottomEdge,
              onTopEdge = computed.onTopEdge,
              onLeftEdge = computed.onLeftEdge,
              handle = computed.handle,
              factor = computed.factor,
              revX = computed.revX,
              revY = computed.revY,
              doW = computed.doW,
              doH = computed.doH;
          var doResize = onRightEdge || onBottomEdge || onTopEdge || onLeftEdge;
          var handles = storage.handles;
          var radius = handles.radius;

          if (isDef(radius)) {
            removeClass(radius, 'sjx-hidden');
          } //const doRotate = handle.is(rotator),
          //    doSetCenter = isDef(center)
          //        ? handle.is(center)
          //        : false;


          var doDrag = !
          /*doRotate ||*/
          doResize
          /*|| doSetCenter*/
          ;
          var clientX = e.clientX,
              clientY = e.clientY;

          var _this$_cursorPoint = this._cursorPoint({
            clientX: clientX,
            clientY: clientY
          }),
              x = _this$_cursorPoint.x,
              y = _this$_cursorPoint.y;

          var _this$_pointToElement2 = this._pointToElement({
            x: x,
            y: y
          }),
              nx = _this$_pointToElement2.x,
              ny = _this$_pointToElement2.y;

          var _this$_pointToControl = this._pointToControls({
            x: x,
            y: y
          }),
              bx = _this$_pointToControl.x,
              by = _this$_pointToControl.y;

          var newStorageValues = {
            clientX: clientX,
            clientY: clientY,
            nx: x,
            ny: y,
            cx: nx,
            cy: ny,
            bx: bx,
            by: by,
            doResize: doResize,
            doDrag: doDrag,
            //doRotate,
            //doSetCenter,
            onExecution: true,
            cursor: null,
            elementOffset: getOffset(el),
            restrictOffset: isDef(restrict) ? getOffset(restrict) : null,
            dox: /\x/.test(axis) && (doResize ? handle.is(handles.ml) || handle.is(handles.mr) || handle.is(handles.tl) || handle.is(handles.tr) || handle.is(handles.bl) || handle.is(handles.br) : true),
            doy: /\y/.test(axis) && (doResize ? handle.is(handles.br) || handle.is(handles.bl) || handle.is(handles.bc) || handle.is(handles.tr) || handle.is(handles.tl) || handle.is(handles.tc) : true)
          };
          this.storage = _objectSpread2({}, storage, {}, newStorageValues);
          var eventArgs = {
            clientX: clientX,
            clientY: clientY
          };

          if (doResize) {
            this._emitEvent('resizeStart', eventArgs); //} else if (doRotate) {
            //   this._emitEvent('rotateStart', eventArgs);

          } else if (doDrag) {
            this._emitEvent('dragStart', eventArgs);
          }

          var move = each.move,
              resize = each.resize;
          var actionName = doResize ? 'resize' :
          /*(doRotate ? 'rotate' :*/
          'drag'; //);

          var triggerEvent = doResize && resize || //(doRotate && rotate) ||
          doDrag && move;
          observable.notify('ongetstate', this, {
            clientX: clientX,
            clientY: clientY,
            actionName: actionName,
            triggerEvent: triggerEvent,
            factor: factor,
            revX: revX,
            revY: revY,
            doW: doW,
            doH: doH
          });

          this._draw();
        }
      }, {
        key: "_moving",
        value: function _moving(e) {
          var storage = this.storage,
              options = this.options;

          var _this$_cursorPoint2 = this._cursorPoint(e),
              x = _this$_cursorPoint2.x,
              y = _this$_cursorPoint2.y;

          storage.e = e;
          storage.clientX = x;
          storage.clientY = y;
          storage.doDraw = true;
          var doDrag = storage.doDrag,
              doResize = storage.doResize,
              cursor = storage.cursor;
          var cursorMove = options.cursorMove,
              cursorResize = options.cursorResize;

          if (isUndef(cursor)) {
            if (doDrag) {
              cursor = cursorMove; //} else if (doRotate) {
              //    cursor = cursorRotate;
            } else if (doResize) {
              cursor = cursorResize;
            }

            helper(document.body).css({
              cursor: cursor
            });
          }
        }
      }, {
        key: "_end",
        value: function _end(_ref2) {
          var clientX = _ref2.clientX,
              clientY = _ref2.clientY;
          var each = this.options.each,
              observable = this.observable,
              storage = this.storage,
              proxyMethods = this.proxyMethods;
          var doResize = storage.doResize,
              doDrag = storage.doDrag,
              frame = storage.frame,
              radius = storage.handles.radius;
          var actionName = doResize ? 'resize' : 'drag'; ///*(doDrag ? */'drag' /*: 'rotate')*/;

          storage.doResize = false;
          storage.doDrag = false; //storage.doRotate = false;

          storage.doSetCenter = false;
          storage.doDraw = false;
          storage.onExecution = false;
          storage.cursor = null;

          this._apply(actionName);

          var eventArgs = {
            clientX: clientX,
            clientY: clientY
          };
          proxyMethods.onDrop.call(this, eventArgs);

          if (doResize) {
            this._emitEvent('resizeEnd', eventArgs); //} else if (doRotate) {
            //    this._emitEvent('rotateEnd', eventArgs);

          } else if (doDrag) {
            this._emitEvent('dragEnd', eventArgs);
          }

          var move = each.move,
              resize = each.resize;
          var triggerEvent = doResize && resize || //(doRotate && rotate) ||
          doDrag && move;
          observable.notify('onapply', this, {
            clientX: clientX,
            clientY: clientY,
            actionName: actionName,
            triggerEvent: triggerEvent
          });
          cancelAnimFrame(frame);
          helper(document.body).css({
            cursor: 'auto'
          });

          if (isDef(radius)) {
            addClass(radius, 'sjx-hidden');
          }
        }
      }, {
        key: "_compute",
        value: function _compute(e) {
          var handles = this.storage.handles;
          var handle = helper(e.target);

          var _this$_checkHandles = this._checkHandles(handle, handles),
              revX = _this$_checkHandles.revX,
              revY = _this$_checkHandles.revY,
              doW = _this$_checkHandles.doW,
              doH = _this$_checkHandles.doH,
              rest = _objectWithoutProperties(_this$_checkHandles, ["revX", "revY", "doW", "doH"]);

          var _computed = this._getState({
            revX: revX,
            revY: revY,
            doW: doW,
            doH: doH
          });

          var _this$_cursorPoint3 = this._cursorPoint(e),
              clientX = _this$_cursorPoint3.x,
              clientY = _this$_cursorPoint3.y;

          var pressang = Math.atan2(clientY - _computed.center.y, clientX - _computed.center.x);
          return _objectSpread2({}, _computed, {}, rest, {
            handle: handle,
            pressang: pressang
          });
        }
      }, {
        key: "_checkHandles",
        value: function _checkHandles(handle, handles) {
          var tl = handles.tl,
              tc = handles.tc,
              tr = handles.tr,
              bl = handles.bl,
              br = handles.br,
              bc = handles.bc,
              ml = handles.ml,
              mr = handles.mr;
          var isTL = isDef(tl) ? handle.is(tl) : false,
              isTC = isDef(tc) ? handle.is(tc) : false,
              isTR = isDef(tr) ? handle.is(tr) : false,
              isBL = isDef(bl) ? handle.is(bl) : false,
              isBC = isDef(bc) ? handle.is(bc) : false,
              isBR = isDef(br) ? handle.is(br) : false,
              isML = isDef(ml) ? handle.is(ml) : false,
              isMR = isDef(mr) ? handle.is(mr) : false; //reverse axis

          var revX = isTL || isML || isBL || isTC,
              revY = isTL || isTR || isTC || isML;
          var onTopEdge = isTC || isTR || isTL,
              onLeftEdge = isTL || isML || isBL,
              onRightEdge = isTR || isMR || isBR,
              onBottomEdge = isBR || isBC || isBL;
          var doW = isML || isMR,
              doH = isTC || isBC;
          return {
            revX: revX,
            revY: revY,
            onTopEdge: onTopEdge,
            onLeftEdge: onLeftEdge,
            onRightEdge: onRightEdge,
            onBottomEdge: onBottomEdge,
            doW: doW,
            doH: doH
          };
        }
      }, {
        key: "notifyMove",
        value: function notifyMove() {
          this._drag.apply(this, arguments);
        }
        /*notifyRotate({ radians, ...rest }) {
            const {
                snap: { angle }
            } = this.options;
              this._rotate(
                {
                    radians: snapToGrid(radians, angle),
                    ...rest
                }
            );
        }*/

      }, {
        key: "notifyResize",
        value: function notifyResize() {
          this._resize.apply(this, arguments);
        }
      }, {
        key: "notifyApply",
        value: function notifyApply(_ref3) {
          var clientX = _ref3.clientX,
              clientY = _ref3.clientY,
              actionName = _ref3.actionName,
              triggerEvent = _ref3.triggerEvent;
          this.proxyMethods.onDrop.call(this, {
            clientX: clientX,
            clientY: clientY
          });

          if (triggerEvent) {
            this._apply(actionName);

            this._emitEvent("".concat(actionName, "End"), {
              clientX: clientX,
              clientY: clientY
            });
          }
        }
      }, {
        key: "notifyGetState",
        value: function notifyGetState(_ref4) {
          var clientX = _ref4.clientX,
              clientY = _ref4.clientY,
              actionName = _ref4.actionName,
              triggerEvent = _ref4.triggerEvent,
              rest = _objectWithoutProperties(_ref4, ["clientX", "clientY", "actionName", "triggerEvent"]);

          if (triggerEvent) {
            var recalc = this._getState(rest);

            this.storage = _objectSpread2({}, this.storage, {}, recalc);

            this._emitEvent("".concat(actionName, "Start"), {
              clientX: clientX,
              clientY: clientY
            });
          }
        }
      }, {
        key: "subscribe",
        value: function subscribe(_ref5) {
          var resize = _ref5.resize,
              move = _ref5.move;
          var ob = this.observable;

          if (move || resize
          /*|| rotate*/
          ) {
              ob.subscribe('ongetstate', this).subscribe('onapply', this);
            }

          if (move) {
            ob.subscribe('onmove', this);
          }

          if (resize) {
            ob.subscribe('onresize', this);
          } //if (rotate) {
          //    ob.subscribe('onrotate', this);
          //}

        }
      }, {
        key: "unsubscribe",
        value: function unsubscribe() {
          var ob = this.observable;
          ob.unsubscribe('ongetstate', this).unsubscribe('onapply', this).unsubscribe('onmove', this).unsubscribe('onresize', this); //.unsubscribe('onrotate', this);
        }
      }, {
        key: "disable",
        value: function disable() {
          var storage = this.storage,
              proxyMethods = this.proxyMethods,
              el = this.el;
          if (isUndef(storage)) return; // unexpected case

          if (storage.onExecution) {
            this._end();

            helper(document).off('mousemove', this._onMouseMove).off('mouseup', this._onMouseUp).off('touchmove', this._onTouchMove).off('touchend', this._onTouchEnd);
          }

          removeClass(el, 'sjx-drag');

          this._destroy();

          this.unsubscribe();
          proxyMethods.onDestroy.call(this, el);
          delete this.storage;
        }
      }, {
        key: "exeDrag",
        value: function exeDrag(_ref6) {
          var dx = _ref6.dx,
              dy = _ref6.dy;
          var draggable = this.options.draggable;
          if (!draggable) return;
          this.storage = _objectSpread2({}, this.storage, {}, this._getState({
            revX: false,
            revY: false,
            doW: false,
            doH: false
          }));

          this._drag({
            dx: dx,
            dy: dy
          });

          this._apply('drag');
        }
      }, {
        key: "exeResize",
        value: function exeResize(_ref7) {
          var dx = _ref7.dx,
              dy = _ref7.dy,
              revX = _ref7.revX,
              revY = _ref7.revY,
              doW = _ref7.doW,
              doH = _ref7.doH;
          var resizable = this.options.resizable;
          if (!resizable) return;
          this.storage = _objectSpread2({}, this.storage, {}, this._getState({
            revX: revX || false,
            revY: revY || false,
            doW: doW || false,
            doH: doH || false
          }));

          this._resize({
            dx: dx,
            dy: dy
          });

          this._apply('resize');
        }
        /*exeRotate({ delta }) {
            const { rotatable } = this.options;
            if (!rotatable) return;
              this.storage = {
                ...this.storage,
                ...this._getState({
                    revX: false,
                    revY: false,
                    doW: false,
                    doH: false
                })
            };
              this._rotate({ radians: delta });
            this._apply('rotate');
        }*/

      }]);

      return Transformable;
    }(SubjectModel);

    var matrixTransform = function matrixTransform(_ref, matrix) {
      var x = _ref.x,
          y = _ref.y;

      var _matrix = _slicedToArray(matrix, 6),
          a = _matrix[0],
          b = _matrix[1],
          c = _matrix[2],
          d = _matrix[3],
          e = _matrix[4],
          f = _matrix[5];

      return {
        x: a * x + c * y + e,
        y: b * x + d * y + f
      };
    }; //http://blog.acipo.com/matrix-inversion-in-javascript/

    var matrixInvert = function matrixInvert(ctm) {
      // I use Guassian Elimination to calculate the inverse:
      // (1) 'augment' the matrix (left) by the identity (on the right)
      // (2) Turn the matrix on the left into the identity by elemetry row ops
      // (3) The matrix on the right is the inverse (was the identity matrix)
      // There are 3 elemtary row ops: (I combine b and c in my code)
      // (a) Swap 2 rows
      // (b) Multiply a row by a scalar
      // (c) Add 2 rows
      var M = [[ctm[0], ctm[2], ctm[4]], [ctm[1], ctm[3], ctm[5]], [0, 0, 1]]; //if the matrix isn't square: exit (error)

      if (M.length !== M[0].length) {
        return;
      } //create the identity matrix (I), and a copy (C) of the original


      var dim = M.length;
      var I = [],
          C = [];

      for (var i = 0; i < dim; i += 1) {
        // Create the row
        I[I.length] = [];
        C[C.length] = [];

        for (var j = 0; j < dim; j += 1) {
          //if we're on the diagonal, put a 1 (for identity)
          if (i == j) {
            I[i][j] = 1;
          } else {
            I[i][j] = 0;
          } // Also, make the copy of the original


          C[i][j] = M[i][j];
        }
      } // Perform elementary row operations


      for (var _i = 0; _i < dim; _i += 1) {
        // get the element e on the diagonal
        var e = C[_i][_i]; // if we have a 0 on the diagonal (we'll need to swap with a lower row)

        if (e === 0) {
          //look through every row below the i'th row
          for (var ii = _i + 1; ii < dim; ii += 1) {
            //if the ii'th row has a non-0 in the i'th col
            if (C[ii][_i] !== 0) {
              //it would make the diagonal have a non-0 so swap it
              for (var _j = 0; _j < dim; _j++) {
                e = C[_i][_j]; //temp store i'th row

                C[_i][_j] = C[ii][_j]; //replace i'th row by ii'th

                C[ii][_j] = e; //repace ii'th by temp

                e = I[_i][_j]; //temp store i'th row

                I[_i][_j] = I[ii][_j]; //replace i'th row by ii'th

                I[ii][_j] = e; //repace ii'th by temp
              } //don't bother checking other rows since we've swapped


              break;
            }
          } //get the new diagonal


          e = C[_i][_i]; //if it's still 0, not invertable (error)

          if (e === 0) {
            return;
          }
        } // Scale this row down by e (so we have a 1 on the diagonal)


        for (var _j2 = 0; _j2 < dim; _j2++) {
          C[_i][_j2] = C[_i][_j2] / e; //apply to original matrix

          I[_i][_j2] = I[_i][_j2] / e; //apply to identity
        } // Subtract this row (scaled appropriately for each row) from ALL of
        // the other rows so that there will be 0's in this column in the
        // rows above and below this one


        for (var _ii = 0; _ii < dim; _ii++) {
          // Only apply to other rows (we want a 1 on the diagonal)
          if (_ii == _i) {
            continue;
          } // We want to change this element to 0


          e = C[_ii][_i]; // Subtract (the row above(or below) scaled by e) from (the
          // current row) but start at the i'th column and assume all the
          // stuff left of diagonal is 0 (which it should be if we made this
          // algorithm correctly)

          for (var _j3 = 0; _j3 < dim; _j3++) {
            C[_ii][_j3] -= e * C[_i][_j3]; //apply to original matrix

            I[_ii][_j3] -= e * I[_i][_j3]; //apply to identity
          }
        }
      } //we've done all operations, C should be the identity
      //matrix I should be the inverse:


      return [I[0][0], I[1][0], I[0][1], I[1][1], I[0][2], I[1][2]];
    };
    var multiplyMatrix = function multiplyMatrix(_ref2, _ref3) {
      var _ref4 = _slicedToArray(_ref2, 6),
          a1 = _ref4[0],
          b1 = _ref4[1],
          c1 = _ref4[2],
          d1 = _ref4[3],
          e1 = _ref4[4],
          f1 = _ref4[5];

      var _ref5 = _slicedToArray(_ref3, 6),
          a2 = _ref5[0],
          b2 = _ref5[1],
          c2 = _ref5[2],
          d2 = _ref5[3],
          e2 = _ref5[4],
          f2 = _ref5[5];

      var m1 = [[a1, c1, e1], [b1, d1, f1], [0, 0, 1]];
      var m2 = [[a2, c2, e2], [b2, d2, f2], [0, 0, 1]];
      var result = [];

      for (var j = 0; j < m2.length; j++) {
        result[j] = [];

        for (var k = 0; k < m1[0].length; k++) {
          var sum = 0;

          for (var i = 0; i < m1.length; i++) {
            sum += m1[i][k] * m2[j][i];
          }

          result[j].push(sum);
        }
      }

      return [result[0][0], result[1][0], result[0][1], result[1][1], result[0][2], result[1][2]];
    };
    var rotatedTopLeft = function rotatedTopLeft(x, y, width, height, rotationAngle, revX, revY, doW, doH) {
      var hw = parseFloat(width) / 2,
          hh = parseFloat(height) / 2;
      var cx = x + hw,
          cy = y + hh;
      var dx = x - cx,
          dy = y - cy;
      var originalTopLeftAngle = Math.atan2(doW ? 0 : dy, doH ? 0 : dx);
      var rotatedTopLeftAngle = originalTopLeftAngle + rotationAngle;
      var radius = Math.sqrt(Math.pow(doH ? 0 : hw, 2) + Math.pow(doW ? 0 : hh, 2));
      var cos = Math.cos(rotatedTopLeftAngle),
          sin = Math.sin(rotatedTopLeftAngle);
      cos = revX === true ? -cos : cos;
      sin = revY === true ? -sin : sin;
      var rx = cx + radius * cos,
          ry = cy + radius * sin;
      return {
        left: floatToFixed(rx),
        top: floatToFixed(ry)
      };
    };

    var MIN_SIZE = 2;
    var CENTER_DELTA = 7;

    var Draggable = /*#__PURE__*/function (_Transformable) {
      _inherits(Draggable, _Transformable);

      var _super = _createSuper(Draggable);

      function Draggable() {
        _classCallCheck(this, Draggable);

        return _super.apply(this, arguments);
      }

      _createClass(Draggable, [{
        key: "_init",
        value: function _init(el) {
          var _this$options = this.options,
              container = _this$options.container,
              resizable = _this$options.resizable,
              resizeHandles = _this$options.resizeHandles,
              className = _this$options.className;
          var _el$style = el.style,
              left = _el$style.left,
              top = _el$style.top,
              width = _el$style.width,
              height = _el$style.height;
          var wrapper = document.createElement('div');
          addClass(wrapper, 'sjx-wrapper');
          if (isDef(className)) addClass(wrapper, className);
          container.appendChild(wrapper);
          var $el = helper(el);
          var w = width || $el.css('width'),
              h = height || $el.css('height'),
              t = top || $el.css('top'),
              l = left || $el.css('left');
          var css = {
            top: t,
            left: l,
            width: w,
            height: h,
            transform: getTransform($el)
          };
          var controls = document.createElement('div');
          addClass(controls, 'sjx-controls');
          var resizingHandles = {
            tl: ['sjx-hdl', 'sjx-hdl-t', 'sjx-hdl-l', 'sjx-hdl-tl'],
            tr: ['sjx-hdl', 'sjx-hdl-t', 'sjx-hdl-r', 'sjx-hdl-tr'],
            br: ['sjx-hdl', 'sjx-hdl-b', 'sjx-hdl-r', 'sjx-hdl-br'],
            bl: ['sjx-hdl', 'sjx-hdl-b', 'sjx-hdl-l', 'sjx-hdl-bl'],
            tc: ['sjx-hdl', 'sjx-hdl-t', 'sjx-hdl-c', 'sjx-hdl-tc'],
            bc: ['sjx-hdl', 'sjx-hdl-b', 'sjx-hdl-c', 'sjx-hdl-bc'],
            ml: ['sjx-hdl', 'sjx-hdl-m', 'sjx-hdl-l', 'sjx-hdl-ml'],
            mr: ['sjx-hdl', 'sjx-hdl-m', 'sjx-hdl-r', 'sjx-hdl-mr']
          }; //const rotationHandles = {
          //    normal: showNormal ? ['sjx-normal'] : null,
          //    rotator: ['sjx-hdl', 'sjx-hdl-m', 'sjx-rotator']
          //};

          var handles = _objectSpread2({}, resizable && resizingHandles); //const handles = {
          //    //...(rotatable && rotationHandles),
          //    ...(resizable && resizingHandles),
          //    //center: rotationPoint && rotatable
          //    //    ? ['sjx-hdl', 'sjx-hdl-m', 'sjx-hdl-c', 'sjx-hdl-mc'] 
          //    //    : undefined
          //};


          Object.keys(handles).forEach(function (key) {
            var dt = resizeHandles[key];
            if (isDef(dt) && dt == false) return;
            var data = handles[key];
            if (isUndef(data)) return;
            var handler = createHandler(data);
            handles[key] = handler;
            controls.appendChild(handler);
          }); //if (isDef(handles.center)) {
          //    const cHandle = helper(handles.center);
          //    cHandle.css({
          //        left: `${el.getAttribute('data-cx')}px`,
          //        top: `${el.getAttribute('data-cy')}px`
          //    });
          //}

          wrapper.appendChild(controls);
          var $controls = helper(controls);
          $controls.css(css);
          this.storage = {
            controls: controls,
            handles: handles,
            radius: undefined,
            parent: el.parentNode
          };
          $controls.on('mousedown', this._onMouseDown).on('touchstart', this._onTouchStart);
        }
      }, {
        key: "_destroy",
        value: function _destroy() {
          var controls = this.storage.controls;
          helper(controls).off('mousedown', this._onMouseDown).off('touchstart', this._onTouchStart);
          var wrapper = controls.parentNode;
          wrapper.parentNode.removeChild(wrapper);
        }
      }, {
        key: "_pointToElement",
        value: function _pointToElement(_ref) {
          var x = _ref.x,
              y = _ref.y;
          var transform = this.storage.transform;

          var ctm = _toConsumableArray(transform.matrix);

          ctm[4] = ctm[5] = 0;
          return this._applyMatrixToPoint(matrixInvert(ctm), x, y);
        }
      }, {
        key: "_pointToControls",
        value: function _pointToControls(data) {
          return this._pointToElement(data);
        }
      }, {
        key: "_applyMatrixToPoint",
        value: function _applyMatrixToPoint(matrix, x, y) {
          return matrixTransform({
            x: x,
            y: y
          }, matrix);
        }
      }, {
        key: "_cursorPoint",
        value: function _cursorPoint(_ref2) {
          var clientX = _ref2.clientX,
              clientY = _ref2.clientY;
          var container = this.options.container;
          var globalMatrix = parseMatrix(getTransform(helper(container)));
          return matrixTransform({
            x: clientX,
            y: clientY
          }, matrixInvert(globalMatrix));
        }
      }, {
        key: "_apply",
        value: function _apply() {
          var el = this.el,
              storage = this.storage;
          var controls = storage.controls,
              handles = storage.handles;
          var $controls = helper(controls);
          var cw = parseFloat($controls.css('width')),
              ch = parseFloat($controls.css('height'));
          var hW = cw / 2,
              hH = ch / 2;
          var cHandle = handles.center;
          var isDefCenter = isDef(cHandle);
          var centerX = isDefCenter ? parseFloat(helper(cHandle).css('left')) : hW;
          var centerY = isDefCenter ? parseFloat(helper(cHandle).css('top')) : hH;
          el.setAttribute('data-cx', centerX);
          el.setAttribute('data-cy', centerY); // if (isUndef(cached)) return;
          // const $el = helper(el);
          // const { dx, dy } = cached;
          // const css = matrixToCSS(transform.matrix);
          // const left = parseFloat(
          //     el.style.left || $el.css('left')
          // );
          // const top = parseFloat(
          //     el.style.top || $el.css('top')
          // );
          // css.left = `${left + dx}px`;
          // css.top = `${top + dy}px`;
          // $el.css(css);
          // $controls.css(css);

          this.storage.cached = null;
        }
      }, {
        key: "_processResize",
        value: function _processResize(dx, dy) {
          var el = this.el,
              storage = this.storage,
              proportions = this.options.proportions;
          var controls = storage.controls,
              coords = storage.coords,
              cw = storage.cw,
              ch = storage.ch,
              transform = storage.transform,
              refang = storage.refang,
              revX = storage.revX,
              revY = storage.revY,
              doW = storage.doW,
              doH = storage.doH,
              restrictOffset = storage.restrictOffset,
              handle = storage.handle;
          var ratio = doW || !doW && !doH ? (cw + dx) / cw : (ch + dy) / ch;
          var newWidth = proportions ? cw * ratio : cw + dx,
              newHeight = proportions ? ch * ratio : ch + dy;
          if (newWidth <= MIN_SIZE || newHeight <= MIN_SIZE) return;

          var matrix = _toConsumableArray(transform.matrix);

          if (isDef(restrictOffset)) {
            if (dx > 0) {
              if (handle[0].className.indexOf("sjx-hdl-l") > -1) {
                if (matrix[4] - dx < 0) newWidth = cw + matrix[4];
              } else if (newWidth + matrix[4] > restrictOffset.width) newWidth = restrictOffset.width - matrix[4];
            }

            if (dy > 0) {
              if (handle[0].className.indexOf("sjx-hdl-l") > -1) {
                if (matrix[5] - dx < 0) newWidth = ch + matrix[5];
              } else if (newHeight + matrix[5] > restrictOffset.height) newHeight = restrictOffset.height - matrix[5];
            }
          }

          var newCoords = rotatedTopLeft(matrix[4], matrix[5], newWidth, newHeight, refang, revX, revY, doW, doH);
          var nx = coords.left - newCoords.left,
              ny = coords.top - newCoords.top;
          matrix[4] += nx;
          matrix[5] += ny;
          var css = matrixToCSS(matrix);
          css.width = "".concat(newWidth, "px");
          css.height = "".concat(newHeight, "px");
          helper(controls).css(css);
          helper(el).css(css);
          storage.cached = {
            dx: nx,
            dy: ny
          };
          return {
            width: newWidth,
            height: newHeight,
            ox: nx,
            oy: ny
          };
        }
      }, {
        key: "_processMove",
        value: function _processMove(dx, dy) {
          var el = this.el,
              storage = this.storage;
          var controls = storage.controls,
              _storage$transform = storage.transform,
              matrix = _storage$transform.matrix,
              parentMatrix = _storage$transform.parentMatrix;

          var pctm = _toConsumableArray(parentMatrix);

          pctm[4] = pctm[5] = 0;

          var nMatrix = _toConsumableArray(matrix);

          nMatrix[4] = matrix[4] + dx;
          nMatrix[5] = matrix[5] + dy;
          var css = matrixToCSS(nMatrix);
          helper(controls).css(css);
          helper(el).css(css);
          storage.cached = {
            dx: dx,
            dy: dy
          };
          return nMatrix;
        }
        /*
        _processRotate(radians) {
            const {
                el,
                storage: {
                    controls,
                    transform,
                    center
                }
            } = this;
              const {
                matrix,
                parentMatrix
            } = transform;
              const cos = floatToFixed(Math.cos(radians), 4),
                sin = floatToFixed(Math.sin(radians), 4);
              const translateMatrix = [
                1,
                0,
                0,
                1,
                center.cx,
                center.cy
            ];
              const rotMatrix = [
                cos,
                sin,
                -sin,
                cos,
                0,
                0
            ];
              const pctm = [...parentMatrix];
            pctm[4] = pctm[5] = 0;
              const resRotMatrix = multiplyMatrix(
                matrixInvert(pctm),
                multiplyMatrix(rotMatrix, pctm)
            );
              const nMatrix = multiplyMatrix(
                multiplyMatrix(translateMatrix, resRotMatrix),
                matrixInvert(translateMatrix)
            );
              const resMatrix = multiplyMatrix(nMatrix, matrix);
              const css = matrixToCSS(resMatrix);
              helper(controls).css(css);
            helper(el).css(css);
              return resMatrix;
        }
        */

      }, {
        key: "_getState",
        value: function _getState(params) {
          var revX = params.revX,
              revY = params.revY,
              doW = params.doW,
              doH = params.doH;
          var factor = revX !== revY ? -1 : 1;
          var el = this.el,
              _this$storage = this.storage,
              handles = _this$storage.handles,
              controls = _this$storage.controls,
              parent = _this$storage.parent,
              container = this.options.container;
          var cHandle = handles.center;
          var $controls = helper(controls);
          var containerMatrix = parseMatrix(getTransform(helper(container)));
          var matrix = parseMatrix(getTransform(helper(controls)));
          var pMatrix = parseMatrix(getTransform(helper(parent)));
          var refang = Math.atan2(matrix[1], matrix[0]) * factor;
          var parentMatrix = parent !== container ? multiplyMatrix(pMatrix, containerMatrix) : containerMatrix;
          var transform = {
            matrix: matrix,
            parentMatrix: parentMatrix,
            scX: Math.sqrt(matrix[0] * matrix[0] + matrix[1] * matrix[1]),
            scY: Math.sqrt(matrix[2] * matrix[2] + matrix[3] * matrix[3])
          };
          var cw = parseFloat($controls.css('width')),
              ch = parseFloat($controls.css('height')); // getting current coordinates considering rotation angle                                                                                                  

          var coords = rotatedTopLeft(matrix[4], matrix[5], cw, ch, refang, revX, revY, doW, doH);
          var hW = cw / 2,
              hH = ch / 2;
          var offset_ = getOffset(el),
              isDefCenter = isDef(cHandle);
          var centerX = isDefCenter ? parseFloat(helper(cHandle).css('left')) : hW;
          var centerY = isDefCenter ? parseFloat(helper(cHandle).css('top')) : hH;
          var cDelta = isDefCenter ? CENTER_DELTA : 0;

          var _matrixTransform = matrixTransform({
            x: offset_.left,
            y: offset_.top
          }, matrixInvert(parentMatrix)),
              el_x = _matrixTransform.x,
              el_y = _matrixTransform.y;

          return {
            transform: transform,
            cw: cw,
            ch: ch,
            coords: coords,
            center: {
              x: el_x + centerX - cDelta,
              y: el_y + centerY - cDelta,
              cx: -centerX + hW - cDelta,
              cy: -centerY + hH - cDelta,
              hx: centerX,
              hy: centerY
            },
            factor: factor,
            refang: refang,
            revX: revX,
            revY: revY,
            doW: doW,
            doH: doH
          };
        }
      }, {
        key: "_moveCenterHandle",
        value: function _moveCenterHandle(x, y) {
          var _this$storage2 = this.storage,
              center = _this$storage2.handles.center,
              _this$storage2$center = _this$storage2.center,
              hx = _this$storage2$center.hx,
              hy = _this$storage2$center.hy;
          var left = "".concat(hx + x, "px"),
              top = "".concat(hy + y, "px");
          helper(center).css({
            left: left,
            top: top
          });
        }
        /*
        resetCenterPoint() {
            const {
                handles: { center }
            } = this.storage;
              helper(center).css(
                {
                    left: null,
                    top: null
                }
            );
        }*/

      }, {
        key: "fitControlsToSize",
        value: function fitControlsToSize() {}
      }, {
        key: "controls",
        get: function get() {
          return this.storage.controls;
        }
      }]);

      return Draggable;
    }(Transformable);

    var createHandler = function createHandler(classList) {
      var element = document.createElement('div');
      classList.forEach(function (cls) {
        addClass(element, cls);
      });
      return element;
    };

    function drag(options, obInstance) {
      if (this.length) {
        var Ob = isDef(obInstance) && obInstance instanceof Observable ? obInstance : new Observable();
        return arrReduce.call(this, function (result, item) {
          //if (!(item instanceof SVGElement)) {
          result.push(new Draggable(item, options, Ob)); //} else {
          //    if (checkElement(item)) {
          //        result.push(
          //            new DraggableSVG(item, options, Ob)
          //        );
          //    }
          //}

          return result;
        }, []);
      }
    }

    var Subjx = /*#__PURE__*/function (_Helper) {
      _inherits(Subjx, _Helper);

      var _super = _createSuper(Subjx);

      function Subjx() {
        _classCallCheck(this, Subjx);

        return _super.apply(this, arguments);
      }

      _createClass(Subjx, [{
        key: "drag",
        value: function drag$1() {
          return drag.call.apply(drag, [this].concat(Array.prototype.slice.call(arguments)));
        }
      }]);

      return Subjx;
    }(Helper);

    function subjx(params) {
      return new Subjx(params);
    }
    Object.defineProperty(subjx, 'createObservable', {
      value: function value() {
        return new Observable();
      }
    });
    Object.defineProperty(subjx, 'Subjx', {
      value: Subjx
    });
    Object.defineProperty(subjx, 'Observable', {
      value: Observable
    });

    return subjx;

})));
