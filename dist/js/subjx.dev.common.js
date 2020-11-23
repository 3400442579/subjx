/*@license
* Drag/Rotate/Resize Library
* Released under the MIT license, 2018-2020
* Karen Sarksyan
* nichollascarter@gmail.com
*/
'use strict';

const requestAnimFrame = 
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (f) {
        return setTimeout(f, 1000 / 60);
    };

const cancelAnimFrame =
    window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    function (requestID) {
        clearTimeout(requestID);
    };

const {
    forEach,
    slice: arrSlice,
    map: arrMap,
    reduce: arrReduce
} = Array.prototype;
/* eslint-disable no-console */
const { warn } = console;
/* eslint-disable no-console */

const isDef = (val) => {
    return val !== undefined && val !== null;
};

const isUndef = (val) => {
    return val === undefined || val === null;
};

const isFunc = (val) => {
    return typeof val === 'function';
};

const createMethod = (fn) => {
    return isFunc(fn)
        ? function () {
            fn.call(this, ...arguments);
        }
        : () => { };
};

class Helper {

    constructor(params) {
        if (typeof params === 'string') {
            const selector = document.querySelectorAll(params);
            this.length = selector.length;
            for (let count = 0; count < this.length; count++) {
                this[count] = selector[count];
            }
        } else if (typeof params === 'object' &&
            (params.nodeType === 1 || params === document)) {
            this[0] = params;
            this.length = 1;
        } else if (params instanceof Helper) {
            this.length = params.length;
            for (let count = 0; count < this.length; count++) {
                this[count] = params[count];
            }
        } else if (isIterable(params)) {
            this.length = 0;
            for (let count = 0; count < this.length; count++) {
                if (params.nodeType === 1) {
                    this[count] = params[count];
                    this.length++;
                }
            }
        } else {
            throw new Error(`Passed parameter must be selector/element/elementArray`);
        }
    }

    css(prop) {
        const _getStyle = obj => {
            let len = obj.length;

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

        const _setStyle = (obj, options) => {
            let len = obj.length;

            while (len--) {
                for (const property in options) {
                    obj[len].style[property] = options[property];
                }
            }
            return obj.style;
        };

        const methods = {
            setStyle(options) {
                return _setStyle(this, options);
            },
            getStyle() {
                return _getStyle(this);
            }
        };

        if (typeof prop === 'string') {
            return methods.getStyle.apply(this, arrSlice.call(arguments, 1));
        } else if (typeof prop === 'object' || !prop) {
            return methods.setStyle.apply(this, arguments);
        } else {
            warn(`Method ${prop} does not exist`);
        }
        return false;
    }

    on() {
        let len = this.length;

        while (len--) {
            if (!this[len].events) {
                this[len].events = {};
                this[len].events[arguments[0]] = [];
            }

            if (typeof (arguments[1]) !== 'string') {
                if (document.addEventListener) {
                    this[len].addEventListener(
                        arguments[0], 
                        arguments[1], 
                        arguments[2] || { passive: false }
                    );
                } else if (document.attachEvent) {
                    this[len].attachEvent(`on${arguments[0]}`, arguments[1]);
                } else {
                    this[len][`on${arguments[0]}`] = arguments[1];
                }
            } else {
                listenerDelegate(
                    this[len], 
                    arguments[0], 
                    arguments[1], 
                    arguments[2], 
                    arguments[3], 
                    true
                );
            }
        }
        return this;
    }

    off() {
        let len = this.length;

        while (len--) {
            if (!this[len].events) {
                this[len].events = {};
                this[len].events[arguments[0]] = [];
            }

            if (typeof (arguments[1]) !== 'string') {
                if (document.removeEventListener) {
                    this[len].removeEventListener(arguments[0], arguments[1], arguments[2]);
                } else if (document.detachEvent) {
                    this[len].detachEvent(`on${arguments[0]}`, arguments[1]);
                } else {
                    this[len][`on${arguments[0]}`] = null;
                }
            } else {
                listenerDelegate(this[len], arguments[0], arguments[1], arguments[2], arguments[3], false);
            }
        }

        return this;
    }

    is(selector) {
        if (isUndef(selector)) return false;
        
        const _sel = helper(selector);
        let len = this.length;

        while (len--) {
            if (this[len] === _sel[len]) return true;
        }
        return false;
    }

}

function listenerDelegate(el, evt, sel, handler, options, act) {
    const doit = function (event) {
        let t = event.target;
        while (t && t !== this) {
            if (t.matches(sel)) {
                handler.call(t, event);
            }
            t = t.parentNode;
        }
    };

    if (act === true) {
        if (document.addEventListener) {
            el.addEventListener(evt, doit, options || { passive: false });
        } else if (document.attachEvent) {
            el.attachEvent(`on${evt}`, doit);
        } else {
            el[`on${evt}`] = doit;
        }
    } else {
        if (document.removeEventListener) {
            el.removeEventListener(evt, doit, options || { passive: false });
        } else if (document.detachEvent) {
            el.detachEvent(`on${evt}`, doit);
        } else {
            el[`on${evt}`] = null;
        }
    }
}

function isIterable(obj) {
    return isDef(obj) &&
        typeof obj === 'object' &&
        (
            Array.isArray(obj) ||
            (
                isDef(window.Symbol) &&
                typeof obj[window.Symbol.iterator] === 'function'
            ) ||
            isDef(obj.forEach) ||
            (
                typeof (obj.length) === "number" &&
                (obj.length === 0 ||
                    (obj.length > 0 &&
                        (obj.length - 1) in obj)
                )
            )
        );
}

function helper(params) {
    return new Helper(params);
}

class Observable {

    constructor() {
        this.observers = {};
    }

    subscribe(eventName, sub) {
        const obs = this.observers;

        if (isUndef(obs[eventName])) {
            Object.defineProperty(obs, eventName, {
                value: []
            });
        }

        obs[eventName].push(sub);

        return this;
    }

    unsubscribe(eventName, f) {
        const obs = this.observers;

        if (isDef(obs[eventName])) {
            const index = obs[eventName].indexOf(f);
            obs[eventName].splice(index, 1);
        }

        return this;
    }

    notify(eventName, source, data) {
        if (isUndef(this.observers[eventName])) return;

        this.observers[eventName].forEach(observer => {
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

}

class Event {

    constructor(name) {
        this.name = name;
        this.callbacks = [];
    }

    registerCallback(cb) {
        this.callbacks.push(cb);
    }

    removeCallback(cb) {
        const ix = this.callbacks(cb);
        this.callbacks.splice(ix, 1);
    }

}

class EventDispatcher {

    constructor() {
        this.events = {};
    }

    registerEvent(eventName) {
        this.events[eventName] = new Event(eventName);
    }

    emit(ctx, eventName, eventArgs) {
        this.events[eventName].callbacks.forEach((cb) => {
            cb.call(ctx, eventArgs);
        });
    };
    
    addEventListener(eventName, cb) {
        this.events[eventName].registerCallback(cb);
    }

    removeEventListener(eventName, cb) {
        this.events[eventName].removeCallback(cb);
    }

}

class SubjectModel {

    constructor(el) {
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

    enable(options) {
        this._processOptions(options);
        this._init(this.el);
        this.proxyMethods.onInit.call(this, this.el);
    }

    disable() {
        throwNotImplementedError();
    }

    _init() {
        throwNotImplementedError();
    }

    _destroy() {
        throwNotImplementedError();
    }
    
    _processOptions() {
        throwNotImplementedError();
    }

    _start() {
        throwNotImplementedError();
    }

    _moving() {
        throwNotImplementedError();
    }

    _end() {
        throwNotImplementedError();
    }

    _animate() {
        throwNotImplementedError();
    }

    _drag({ dx, dy, ...rest }) {
        const transform = this._processMove(dx, dy);

        const finalArgs = {
            dx,
            dy,
            transform,
            ...rest
        };

        this.proxyMethods.onMove.call(this, finalArgs);
        this._emitEvent('drag', finalArgs);
    }

    _draw() {
        this._animate();
    }

    _onMouseDown(e) {
        this._start(e);
        helper(document)
            .on('mousemove', this._onMouseMove)
            .on('mouseup', this._onMouseUp);
    }

    _onTouchStart(e) {
        this._start(e.touches[0]);
        helper(document)
            .on('touchmove', this._onTouchMove)
            .on('touchend', this._onTouchEnd);
    }

    _onMouseMove(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        this._moving(
            e,
            this.el
        );
    }

    _onTouchMove(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        this._moving(
            e.touches[0],
            this.el
        );
    }

    _onMouseUp(e) {
        helper(document)
            .off('mousemove', this._onMouseMove)
            .off('mouseup', this._onMouseUp);

        this._end(
            e,
            this.el
        );
    }

    _onTouchEnd(e) {
        helper(document)
            .off('touchmove', this._onTouchMove)
            .off('touchend', this._onTouchEnd);

        if (e.touches.length === 0) {
            this._end(
                e.changedTouches[0],
                this.el
            );
        }
    }

    _emitEvent() {
        this.eventDispatcher.emit(this, ...arguments);
    }

    on(name, cb) {
        this.eventDispatcher.addEventListener(name, cb);
        return this;
    }

    off(name, cb) {
        this.eventDispatcher.removeEventListener(name, cb);
        return this;
    }

}

const throwNotImplementedError = () => {
    throw Error(`Method not implemented`);
};

const EVENTS = [
    'dragStart',
    'drag',
    'dragEnd',
    'resizeStart',
    'resize',
    'resizeEnd',
    'rotateStart',
    'rotate',
    'rotateEnd',
    'setPointStart',
    'setPointEnd'
];

//export const RAD = Math.PI / 180;
//export const DEG = 180 / Math.PI;

const snapToGrid = (value, snap) => {
    if (snap === 0) {
        return value;
    } else {
        const result = snapCandidate(value, snap);

        if (result - value < snap) {
            return result;
        }
    }
};

const snapCandidate = (value, gridSize) => {
    if (gridSize === 0) return value;
    return Math.round(value / gridSize) * gridSize;
};

const floatToFixed = (val, size = 6) => {
    return Number(val.toFixed(size));
};

const getOffset = (node) => {
    return node.getBoundingClientRect();
};

const getTransform = (el) => {
    const transform = el.css('-webkit-transform') ||
        el.css('-moz-transform') ||
        el.css('-ms-transform') ||
        el.css('-o-transform') ||
        el.css('transform') ||
        'none';
    return transform;
};

const parseMatrix = (value) => {
    const transform = value.match(/[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g);

    if (transform) {
        return transform.map(item => {
            return parseFloat(item);
        });
    } else {
        return [1, 0, 0, 1, 0, 0];
    }
};

const addClass = (node, cls) => {
    if (!cls) return;

    if (node.classList) {
        if (cls.indexOf(' ') > -1) {
            cls.split(/\s+/).forEach(cl => {
                return node.classList.add(cl);
            });
        } else {
            return node.classList.add(cls);
        }
    }
    return node;
};

const removeClass = (node, cls) => {
    if (!cls) return;

    if (node.classList) {
        if (cls.indexOf(' ') > -1) {
            cls.split(/\s+/).forEach(cl => {
                return node.classList.remove(cl);
            });
        } else {
            return node.classList.remove(cls);
        }
    }
    return node;
};

const matrixToCSS = (arr) => {
    const style = `matrix(${arr.join()})`;

    return {
        transform: style,
        webkitTranform: style,
        mozTransform: style,
        msTransform: style,
        otransform: style
    };
};

class Transformable extends SubjectModel {

    constructor(el, options, observable) {
        super(el);
        if (this.constructor === Transformable) {
            throw new TypeError('Cannot construct Transformable instances directly');
        }
        this.observable = observable;

        EVENTS.forEach((eventName) => {
            this.eventDispatcher.registerEvent(eventName);
        });

        this.enable(options);
    }

    _cursorPoint() {
        throw Error(`'_cursorPoint()' method not implemented`);
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

    _resize({ dx, dy, ...rest }) {
        const finalValues = this._processResize(dx, dy);
        const finalArgs = {
            ...finalValues,
            dx,
            dy,
            ...rest
        };
        this.proxyMethods.onResize.call(this, finalArgs);
        this._emitEvent('resize', finalArgs);
    }

    _processOptions(options) {
        const { el } = this;

        addClass(el, 'sjx-drag');

        const _snap = {
            x: 10,
            y: 10//,
            //angle: 10 * RAD
        };

        const _each = {
            move: false,
            resize: false//,
            //rotate: false
        };

        let _restrict = null,
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
            _onInit = () => { },
            _onMove = () => { },
            //_onRotate = () => { },
            _onResize = () => { },
            _onDrop = () => { },
            _onDestroy = () => { };

        let _container = el.parentNode;

        if (isDef(options)) {
            const {
                snap,
                each,
                axis,
                cursorMove,
                cursorResize,
                //cursorRotate,
                //rotationPoint,
                restrict,
                draggable,
                resizable,
                //rotatable,
                onInit,
                onDrop,
                onMove,
                onResize,
                //onRotate,
                onDestroy,
                container,
                proportions,
                custom,
                //rotatorAnchor,
                //rotatorOffset,
                //showNormal,
                resizeHandles,
                className
            } = options;

            if (isDef(snap)) {
                const { x, y/*, angle*/ } = snap;

                _snap.x = isUndef(x) ? 10 : x;
                _snap.y = isUndef(y) ? 10 : y;
                //_snap.angle = isUndef(angle)
                //    ? _snap.angle
                //    : angle * RAD;
            }

            if (isDef(each)) {
                const { move, resize/*, rotate*/ } = each;

                _each.move = move || false;
                _each.resize = resize || false;
                //_each.rotate = rotate || false;
            }

            if (isDef(restrict)) {
                _restrict = restrict === 'parent'
                    ? el.parentNode
                    : helper(restrict)[0] || document;
            }

            _cursorMove = cursorMove || 'auto';
            _cursorResize = cursorResize || 'auto';
            //_cursorRotate = cursorRotate || 'auto';
            _axis = axis || 'xy';

            _container = isDef(container) && helper(container)[0]
                ? helper(container)[0]
                : _container;

            //_rotationPoint = rotationPoint || false;
            _proportions = proportions || false;

            _draggable = isDef(draggable) ? draggable : true;
            _resizable = isDef(resizable) ? resizable : true;
            //_rotatable = isDef(rotatable) ? rotatable : true;

            _custom = (typeof custom === 'object' && custom) || null;
            //_rotatorAnchor = rotatorAnchor || null;
            // _rotatorOffset = rotatorOffset || 50; 
            // _showNormal = isDef(showNormal) ? showNormal : true;
            _resizeHandles = isDef(resizeHandles) ? resizeHandles : null;
            _className = isDef(className) ? className : null;

            _onInit = createMethod(onInit);
            _onDrop = createMethod(onDrop);
            _onMove = createMethod(onMove);
            _onResize = createMethod(onResize);
            //_onRotate = createMethod(onRotate);
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
            resizeHandles:_resizeHandles,
            className:_className
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

    _animate() {
        const self = this;
        const {
            observable,
            storage,
            options
        } = self;

        if (isUndef(storage)) return;

        storage.frame = requestAnimFrame(self._animate);

        if (!storage.doDraw) return;
        storage.doDraw = false;

        let {
            dox,
            doy,
            clientX,
            clientY,
            doDrag,
            doResize,
            //doRotate,
            //doSetCenter,
            revX,
            revY
        } = storage;

        const {
            snap,
            each: {
                move: moveEach,
                resize: resizeEach//,
                //rotate: rotateEach
            },
            restrict,
            draggable,
            resizable//,
            //rotatable
        } = options;

        if (doResize && resizable) {
            const {
                transform,
                cx,
                cy
            } = storage;

            const { x, y } = this._pointToElement(
                {
                    x: clientX,
                    y: clientY
                }
            );

            let dx = dox
                ? snapToGrid(x - cx, snap.x / transform.scX)
                : 0;

            let dy = doy
                ? snapToGrid(y - cy, snap.y / transform.scY)
                : 0;

            dx = dox ? (revX ? - dx : dx) : 0;
            dy = doy ? (revY ? - dy : dy) : 0;

            const args = {
                dx,
                dy,
                clientX,
                clientY
            };

            self._resize(args);

            if (resizeEach) {
                observable.notify(
                    'onresize',
                    self,
                    args
                );
            }
        }

        if (doDrag && draggable) {
            const {
                restrictOffset,
                elementOffset,
                nx,
                ny
            } = storage;

            if (isDef(restrict)) {
                const {
                    left: restLeft,
                    top: restTop
                } = restrictOffset;
    
                const {
                    left: elLeft,
                    top: elTop,
                    width: elW,
                    height: elH
                } = elementOffset;
    
                const distX = nx - clientX,
                    distY = ny - clientY;
    
                const maxX = restrict.clientWidth - elW,
                    maxY = restrict.clientHeight - elH;
    
                const offsetY = elTop - restTop,
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

            const dx = dox
                ? snapToGrid(clientX - nx, snap.x)
                : 0;

            const dy = doy
                ? snapToGrid(clientY - ny, snap.y)
                : 0;

            const args = {
                dx,
                dy,
                clientX,
                clientY
            };

            self._drag(
                args
            );

            if (moveEach) {
                observable.notify('onmove',
                    self,
                    args
                );
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

    _start(e) {
        const {
            observable,
            storage,
            options: { axis, restrict, each },
            el
        } = this;

        const computed = this._compute(e);

        Object.keys(computed).forEach(prop => {
            storage[prop] = computed[prop];
        });

        const {
            onRightEdge,
            onBottomEdge,
            onTopEdge,
            onLeftEdge,
            handle,
            factor,
            revX,
            revY,
            doW,
            doH
        } = computed;

        const doResize =
            onRightEdge ||
            onBottomEdge ||
            onTopEdge ||
            onLeftEdge;

        const {
            handles
        } = storage;

        const {
            //rotator,
            //center,
            radius
        } = handles;

        if (isDef(radius)) {
            removeClass(radius, 'sjx-hidden');
        }

        //const doRotate = handle.is(rotator),
        //    doSetCenter = isDef(center)
        //        ? handle.is(center)
        //        : false;

        const doDrag = !(/*doRotate ||*/ doResize /*|| doSetCenter*/);

        const {
            clientX,
            clientY
        } = e;

        const {
            x,
            y
        } = this._cursorPoint(
            {
                clientX,
                clientY
            }
        );

        const {
            x: nx,
            y: ny
        } = this._pointToElement({ x, y });

        const {
            x: bx,
            y: by
        } = this._pointToControls({ x, y });

        const newStorageValues = {
            clientX,
            clientY,
            nx: x,
            ny: y,
            cx: nx,
            cy: ny,
            bx,
            by,
            doResize,
            doDrag,
            //doRotate,
            //doSetCenter,
            onExecution: true,
            cursor: null,
            elementOffset: getOffset(el),
            restrictOffset: isDef(restrict)
                ? getOffset(restrict)
                : null,
            dox: /\x/.test(axis) && (doResize
                ?
                handle.is(handles.ml) ||
                handle.is(handles.mr) ||
                handle.is(handles.tl) ||
                handle.is(handles.tr) ||
                handle.is(handles.bl) ||
                handle.is(handles.br)
                : true),
            doy: /\y/.test(axis) && (doResize
                ?
                handle.is(handles.br) ||
                handle.is(handles.bl) ||
                handle.is(handles.bc) ||
                handle.is(handles.tr) ||
                handle.is(handles.tl) ||
                handle.is(handles.tc)
                : true)
        };

        this.storage = {
            ...storage,
            ...newStorageValues
        };

        const eventArgs = {
            clientX,
            clientY
        };

        if (doResize) {
            this._emitEvent('resizeStart', eventArgs);
        //} else if (doRotate) {
        //   this._emitEvent('rotateStart', eventArgs);
        } else if (doDrag) {
            this._emitEvent('dragStart', eventArgs);
        }

        const {
            move,
            resize//,
            //rotate
        } = each;

        const actionName = doResize
            ? 'resize'
            : /*(doRotate ? 'rotate' :*/ 'drag';//);

        const triggerEvent =
            (doResize && resize) ||
            //(doRotate && rotate) ||
            (doDrag && move);

        observable.notify(
            'ongetstate',
            this,
            {
                clientX,
                clientY,
                actionName,
                triggerEvent,
                factor,
                revX,
                revY,
                doW,
                doH
            }
        );

        this._draw();
    }

    _moving(e) {
        const {
            storage,
            options
        } = this;

        const {
            x,
            y
        } = this._cursorPoint(e);

        storage.e = e;
        storage.clientX = x;
        storage.clientY = y;
        storage.doDraw = true;

        let {
            //doRotate,
            doDrag,
            doResize,
            cursor
        } = storage;

        const {
            cursorMove,
            cursorResize//,
            //cursorRotate
        } = options;

        if (isUndef(cursor)) {
            if (doDrag) {
                cursor = cursorMove;
            //} else if (doRotate) {
            //    cursor = cursorRotate;
            } else if (doResize) {
                cursor = cursorResize;
            }
            helper(document.body).css({ cursor });
        }
    }

    _end({ clientX, clientY }) {
        const {
            options: { each },
            observable,
            storage,
            proxyMethods
        } = this;

        const {
            doResize,
            doDrag,
            //doRotate,
            //doSetCenter,
            frame,
            handles: { radius }
        } = storage;

        const actionName = doResize
            ? 'resize'
            : 'drag';///*(doDrag ? */'drag' /*: 'rotate')*/;

        storage.doResize = false;
        storage.doDrag = false;
        //storage.doRotate = false;
        storage.doSetCenter = false;
        storage.doDraw = false;
        storage.onExecution = false;
        storage.cursor = null;

        this._apply(actionName);

        const eventArgs = {
            clientX,
            clientY
        };

        proxyMethods.onDrop.call(this, eventArgs);

        if (doResize) {
            this._emitEvent('resizeEnd', eventArgs);
        //} else if (doRotate) {
        //    this._emitEvent('rotateEnd', eventArgs);
        } else if (doDrag) {
            this._emitEvent('dragEnd', eventArgs);
        }

        const {
            move,
            resize//,
            //rotate
        } = each;

        const triggerEvent =
            (doResize && resize) ||
            //(doRotate && rotate) ||
            (doDrag && move);

        observable.notify(
            'onapply',
            this,
            {
                clientX,
                clientY,
                actionName,
                triggerEvent
            }
        );

        cancelAnimFrame(frame);

        helper(document.body).css({ cursor: 'auto' });
        if (isDef(radius)) {
            addClass(radius, 'sjx-hidden');
        }
    }

    _compute(e) {
        const {
            handles
        } = this.storage;

        const handle = helper(e.target);

        const {
            revX,
            revY,
            doW,
            doH,
            ...rest
        } = this._checkHandles(handle, handles);

        const _computed = this._getState({
            revX,
            revY,
            doW,
            doH
        });

        const {
            x: clientX,
            y: clientY
        } = this._cursorPoint(e);

        const pressang = Math.atan2(
            clientY - _computed.center.y,
            clientX - _computed.center.x
        );

        return {
            ..._computed,
            ...rest,
            handle,
            pressang
        };
    }

    _checkHandles(handle, handles) {
        const { tl, tc, tr, bl, br, bc, ml, mr } = handles;
        const isTL = isDef(tl) ? handle.is(tl) : false,
            isTC = isDef(tc) ? handle.is(tc) : false,
            isTR = isDef(tr) ? handle.is(tr) : false,
            isBL = isDef(bl) ? handle.is(bl) : false,
            isBC = isDef(bc) ? handle.is(bc) : false,
            isBR = isDef(br) ? handle.is(br) : false,
            isML = isDef(ml) ? handle.is(ml) : false,
            isMR = isDef(mr) ? handle.is(mr) : false;

        //reverse axis
        const revX = isTL || isML || isBL || isTC,
            revY = isTL || isTR || isTC || isML;

        const onTopEdge = isTC || isTR || isTL,
            onLeftEdge = isTL || isML || isBL,
            onRightEdge = isTR || isMR || isBR,
            onBottomEdge = isBR || isBC || isBL;

        const doW = isML || isMR,
            doH = isTC || isBC;

        return {
            revX,
            revY,
            onTopEdge,
            onLeftEdge,
            onRightEdge,
            onBottomEdge,
            doW,
            doH
        };
    }

    notifyMove() {
        this._drag(...arguments);
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

    notifyResize() {
        this._resize(...arguments);
    }

    notifyApply({ clientX, clientY, actionName, triggerEvent }) {
        this.proxyMethods.onDrop.call(this, { clientX, clientY });
        if (triggerEvent) {
            this._apply(actionName);
            this._emitEvent(`${actionName}End`, { clientX, clientY });
        }
    }

    notifyGetState({ clientX, clientY, actionName, triggerEvent, ...rest }) {
        if (triggerEvent) {
            const recalc = this._getState(
                rest
            );

            this.storage = {
                ...this.storage,
                ...recalc
            };
            this._emitEvent(`${actionName}Start`, { clientX, clientY });
        }
    }

    subscribe({ resize, move/*, rotate*/ }) {
        const { observable: ob } = this;

        if (move || resize /*|| rotate*/) {
            ob.subscribe('ongetstate', this)
                .subscribe('onapply', this);
        }

        if (move) {
            ob.subscribe('onmove', this);
        }
        if (resize) {
            ob.subscribe('onresize', this);
        }
        //if (rotate) {
        //    ob.subscribe('onrotate', this);
        //}
    }

    unsubscribe() {
        const { observable: ob } = this;

        ob.unsubscribe('ongetstate', this)
            .unsubscribe('onapply', this)
            .unsubscribe('onmove', this)
            .unsubscribe('onresize', this);//.unsubscribe('onrotate', this);
    }

    disable() {
        const {
            storage,
            proxyMethods,
            el
        } = this;

        if (isUndef(storage)) return;

        // unexpected case
        if (storage.onExecution) {
            this._end();
            helper(document)
                .off('mousemove', this._onMouseMove)
                .off('mouseup', this._onMouseUp)
                .off('touchmove', this._onTouchMove)
                .off('touchend', this._onTouchEnd);
        }

        removeClass(el, 'sjx-drag');

        this._destroy();
        this.unsubscribe();

        proxyMethods.onDestroy.call(this, el);
        delete this.storage;
    }

    exeDrag({ dx, dy }) {
        const { draggable } = this.options;
        if (!draggable) return;

        this.storage = {
            ...this.storage,
            ...this._getState({
                revX: false,
                revY: false,
                doW: false,
                doH: false
            })
        };

        this._drag({ dx, dy });
        this._apply('drag');
    }

    exeResize({ dx, dy, revX, revY, doW, doH }) {
        const { resizable } = this.options;
        if (!resizable) return;

        this.storage = {
            ...this.storage,
            ...this._getState({
                revX: revX || false,
                revY: revY || false,
                doW: doW || false,
                doH: doH || false
            })
        };

        this._resize({ dx, dy });
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

}

const matrixTransform = ({ x, y }, matrix) => {
    const [a, b, c, d, e, f] = matrix;

    return {
        x: a * x + c * y + e,
        y: b * x + d * y + f
    };
};

//http://blog.acipo.com/matrix-inversion-in-javascript/
const matrixInvert = (ctm) => {
    // I use Guassian Elimination to calculate the inverse:
    // (1) 'augment' the matrix (left) by the identity (on the right)
    // (2) Turn the matrix on the left into the identity by elemetry row ops
    // (3) The matrix on the right is the inverse (was the identity matrix)
    // There are 3 elemtary row ops: (I combine b and c in my code)
    // (a) Swap 2 rows
    // (b) Multiply a row by a scalar
    // (c) Add 2 rows

    const M = [
        [ctm[0], ctm[2], ctm[4]],
        [ctm[1], ctm[3], ctm[5]],
        [0, 0, 1]
    ];

    //if the matrix isn't square: exit (error)
    if (M.length !== M[0].length) {
        return;
    }

    //create the identity matrix (I), and a copy (C) of the original
    const dim = M.length;

    const I = [],
        C = [];

    for (let i = 0; i < dim; i += 1) {
        // Create the row
        I[I.length] = [];
        C[C.length] = [];
        for (let j = 0; j < dim; j += 1) {
            //if we're on the diagonal, put a 1 (for identity)
            if (i == j) {
                I[i][j] = 1;
            } else {
                I[i][j] = 0;
            }

            // Also, make the copy of the original
            C[i][j] = M[i][j];
        }
    }

    // Perform elementary row operations
    for (let i = 0; i < dim; i += 1) {
        // get the element e on the diagonal
        let e = C[i][i];

        // if we have a 0 on the diagonal (we'll need to swap with a lower row)
        if (e === 0) {
            //look through every row below the i'th row
            for (let ii = i + 1; ii < dim; ii += 1) {
                //if the ii'th row has a non-0 in the i'th col
                if (C[ii][i] !== 0) {
                    //it would make the diagonal have a non-0 so swap it
                    for (let j = 0; j < dim; j++) {
                        e = C[i][j]; //temp store i'th row
                        C[i][j] = C[ii][j]; //replace i'th row by ii'th
                        C[ii][j] = e; //repace ii'th by temp
                        e = I[i][j]; //temp store i'th row
                        I[i][j] = I[ii][j]; //replace i'th row by ii'th
                        I[ii][j] = e; //repace ii'th by temp
                    }
                    //don't bother checking other rows since we've swapped
                    break;
                }
            }
            //get the new diagonal
            e = C[i][i];
            //if it's still 0, not invertable (error)
            if (e === 0) {
                return;
            }
        }

        // Scale this row down by e (so we have a 1 on the diagonal)
        for (let j = 0; j < dim; j++) {
            C[i][j] = C[i][j] / e; //apply to original matrix
            I[i][j] = I[i][j] / e; //apply to identity
        }

        // Subtract this row (scaled appropriately for each row) from ALL of
        // the other rows so that there will be 0's in this column in the
        // rows above and below this one
        for (let ii = 0; ii < dim; ii++) {
            // Only apply to other rows (we want a 1 on the diagonal)
            if (ii == i) {
                continue;
            }

            // We want to change this element to 0
            e = C[ii][i];

            // Subtract (the row above(or below) scaled by e) from (the
            // current row) but start at the i'th column and assume all the
            // stuff left of diagonal is 0 (which it should be if we made this
            // algorithm correctly)
            for (let j = 0; j < dim; j++) {
                C[ii][j] -= e * C[i][j]; //apply to original matrix
                I[ii][j] -= e * I[i][j]; //apply to identity
            }
        }
    }

    //we've done all operations, C should be the identity
    //matrix I should be the inverse:
    return [
        I[0][0], I[1][0],
        I[0][1], I[1][1],
        I[0][2], I[1][2]
    ];
};

const multiplyMatrix = (
    [a1, b1, c1, d1, e1, f1], 
    [a2, b2, c2, d2, e2, f2]
) => {
    const m1 = [
        [a1, c1, e1],
        [b1, d1, f1],
        [0, 0, 1]
    ];

    const m2 = [
        [a2, c2, e2],
        [b2, d2, f2],
        [0, 0, 1]
    ];

    const result = [];

    for (let j = 0; j < m2.length; j++) {
        result[j] = [];
        for (let k = 0; k < m1[0].length; k++) {
            let sum = 0;
            for (let i = 0; i < m1.length; i++) {
                sum += m1[i][k] * m2[j][i];
            }
            result[j].push(sum);
        }
    }

    return [
        result[0][0], result[1][0],
        result[0][1], result[1][1],
        result[0][2], result[1][2]
    ];
};

const rotatedTopLeft = (
    x,
    y,
    width,
    height,
    rotationAngle,
    revX,
    revY,
    doW,
    doH
) => {
    const hw = parseFloat(width) / 2,
        hh = parseFloat(height) / 2;

    const cx = x + hw,
        cy = y + hh;

    const dx = x - cx,
        dy = y - cy;

    const originalTopLeftAngle = Math.atan2(doW ? 0 : dy, doH ? 0 : dx);
    const rotatedTopLeftAngle = originalTopLeftAngle + rotationAngle;

    const radius = Math.sqrt(Math.pow(doH ? 0 : hw, 2) + Math.pow(doW ? 0 : hh, 2));

    let cos = Math.cos(rotatedTopLeftAngle),
        sin = Math.sin(rotatedTopLeftAngle);

    cos = revX === true ? -cos : cos;
    sin = revY === true ? -sin : sin;

    const rx = cx + radius * cos,
        ry = cy + radius * sin;

    return {
        left: floatToFixed(rx),
        top: floatToFixed(ry)
    };
};

const MIN_SIZE = 2;
const CENTER_DELTA = 7;

class Draggable extends Transformable {

    _init(el) {
        const {
            //rotationPoint,
            container,
            resizable,
            //rotatable,
            //showNormal,
            resizeHandles,
            className
        } = this.options;

        const {
            left,
            top,
            width,
            height
        } = el.style;

        const wrapper = document.createElement('div');
        addClass(wrapper, 'sjx-wrapper');
        if (isDef(className)) addClass(wrapper, className);

        container.appendChild(wrapper);

        const $el = helper(el);

        const w = width || $el.css('width'),
            h = height || $el.css('height'),
            t = top || $el.css('top'),
            l = left || $el.css('left');

        const css = {
            top: t,
            left: l,
            width: w,
            height: h,
            transform: getTransform($el)
        };

        const controls = document.createElement('div');
        addClass(controls, 'sjx-controls');

        const resizingHandles = {
            tl: ['sjx-hdl', 'sjx-hdl-t', 'sjx-hdl-l', 'sjx-hdl-tl'],
            tr: ['sjx-hdl', 'sjx-hdl-t', 'sjx-hdl-r', 'sjx-hdl-tr'],
            br: ['sjx-hdl', 'sjx-hdl-b', 'sjx-hdl-r', 'sjx-hdl-br'],
            bl: ['sjx-hdl', 'sjx-hdl-b', 'sjx-hdl-l', 'sjx-hdl-bl'],
            tc: ['sjx-hdl', 'sjx-hdl-t', 'sjx-hdl-c', 'sjx-hdl-tc'],
            bc: ['sjx-hdl', 'sjx-hdl-b', 'sjx-hdl-c', 'sjx-hdl-bc'],
            ml: ['sjx-hdl', 'sjx-hdl-m', 'sjx-hdl-l', 'sjx-hdl-ml'],
            mr: ['sjx-hdl', 'sjx-hdl-m', 'sjx-hdl-r', 'sjx-hdl-mr']
        };

        //const rotationHandles = {
        //    normal: showNormal ? ['sjx-normal'] : null,
        //    rotator: ['sjx-hdl', 'sjx-hdl-m', 'sjx-rotator']
        //};

        const handles = { ...(resizable && resizingHandles) };
        //const handles = {
        //    //...(rotatable && rotationHandles),
        //    ...(resizable && resizingHandles),
        //    //center: rotationPoint && rotatable
        //    //    ? ['sjx-hdl', 'sjx-hdl-m', 'sjx-hdl-c', 'sjx-hdl-mc'] 
        //    //    : undefined
        //};

        Object.keys(handles).forEach(key => {
            const dt=resizeHandles[key];
            if (isDef(dt) && dt == false) return;
            const data = handles[key];
            if (isUndef(data)) return;
            const handler = createHandler(data);
            handles[key] = handler;
            controls.appendChild(handler);
        });

        //if (isDef(handles.center)) {
        //    const cHandle = helper(handles.center);
        //    cHandle.css({
        //        left: `${el.getAttribute('data-cx')}px`,
        //        top: `${el.getAttribute('data-cy')}px`
        //    });
        //}

        wrapper.appendChild(controls);

        const $controls = helper(controls);
        $controls.css(css);

        this.storage = {
            controls,
            handles,
            radius: undefined,
            parent: el.parentNode
        };

        $controls
            .on('mousedown', this._onMouseDown)
            .on('touchstart', this._onTouchStart);
    }

    _destroy() {
        const {
            controls
        } = this.storage;

        helper(controls)
            .off('mousedown', this._onMouseDown)
            .off('touchstart', this._onTouchStart);

        const wrapper = controls.parentNode;
        wrapper.parentNode.removeChild(wrapper);
    }

    _pointToElement({ x, y }) {
        const {
            transform
        } = this.storage;

        const ctm = [...transform.matrix];
        ctm[4] = ctm[5] = 0;

        return this._applyMatrixToPoint(
            matrixInvert(ctm),
            x,
            y
        );
    }

    _pointToControls(data) {
        return this._pointToElement(data);
    }

    _applyMatrixToPoint(matrix, x, y) {
        return matrixTransform(
            {
                x,
                y
            },
            matrix
        );
    }

    _cursorPoint({ clientX, clientY }) {
        const {
            container
        } = this.options;

        const globalMatrix = parseMatrix(
            getTransform(helper(container))
        );

        return matrixTransform(
            {
                x: clientX,
                y: clientY
            },
            matrixInvert(
                globalMatrix
            )
        );
    }

    _apply() {
        const {
            el,
            storage
        } = this;

        const {
            // cached,
            controls,
            // transform,
            handles
        } = storage;

        const $controls = helper(controls);

        const cw = parseFloat($controls.css('width')),
            ch = parseFloat($controls.css('height'));

        const hW = cw / 2,
            hH = ch / 2;

        const {
            center: cHandle
        } = handles;

        const isDefCenter = isDef(cHandle);

        const centerX = isDefCenter
            ? parseFloat(helper(cHandle).css('left'))
            : hW;
        const centerY = isDefCenter
            ? parseFloat(helper(cHandle).css('top'))
            : hH;

        el.setAttribute('data-cx', centerX);
        el.setAttribute('data-cy', centerY);

        // if (isUndef(cached)) return;

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

    _processResize(dx, dy) {
        const {
            el,
            storage,
            options: { proportions }
        } = this;

        const {
            controls,
            coords,
            cw,
            ch,
            transform,
            refang,
            revX,
            revY,
            doW,
            doH,
            restrictOffset,
            handle
        } = storage;

        const ratio = doW || (!doW && !doH)
            ? (cw + dx) / cw
            : (ch + dy) / ch;

        let newWidth = proportions ? cw * ratio : cw + dx,
            newHeight = proportions ? ch * ratio : ch + dy;

        if (newWidth <= MIN_SIZE || newHeight <= MIN_SIZE) return;

        const matrix = [...transform.matrix];

        if (isDef(restrictOffset)){
            if (dx > 0 ){
                if (handle[0].className.indexOf("sjx-hdl-l") > -1 ){
                    if (matrix[4] - dx < 0)  newWidth = cw + matrix[4];
                }
                else if (newWidth +  matrix[4] > restrictOffset.width)  newWidth = restrictOffset.width - matrix[4];
            }

            if( dy > 0 ){
                if (handle[0].className.indexOf("sjx-hdl-l") > -1){
                    if (matrix[5] - dx < 0)  newWidth = ch + matrix[5];
                }
                else if (newHeight +  matrix[5] > restrictOffset.height) newHeight = restrictOffset.height - matrix[5];
            }
        }

        const newCoords = rotatedTopLeft(
            matrix[4],
            matrix[5],
            newWidth,
            newHeight,
            refang,
            revX,
            revY,
            doW,
            doH
        );

        const nx = coords.left - newCoords.left,
            ny = coords.top - newCoords.top;

        matrix[4] += nx;
        matrix[5] += ny;

        const css = matrixToCSS(matrix);

        css.width = `${newWidth}px`;
        css.height = `${newHeight}px`;

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

    _processMove(dx, dy) {
        const {
            el,
            storage
        } = this;

        const {
            controls,
            transform: {
                matrix,
                parentMatrix
            }
        } = storage;

        const pctm = [...parentMatrix];
        pctm[4] = pctm[5] = 0;

        const nMatrix = [...matrix];

        nMatrix[4] = matrix[4] + dx;
        nMatrix[5] = matrix[5] + dy;

        const css = matrixToCSS(nMatrix);

        helper(controls).css(css);
        helper(el).css(css);

        storage.cached = {
            dx,
            dy
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
    _getState(params) {
        const {
            revX,
            revY,
            doW,
            doH
        } = params;

        const factor = revX !== revY
            ? -1
            : 1;

        const {
            el,
            storage: {
                handles,
                controls,
                parent
            },
            options: { container }
        } = this;

        const {
            center: cHandle
        } = handles;

        const $controls = helper(controls);

        const containerMatrix = parseMatrix(
            getTransform(helper(container))
        );

        const matrix = parseMatrix(
            getTransform(helper(controls))
        );

        const pMatrix = parseMatrix(
            getTransform(helper(parent))
        );

        const refang = Math.atan2(
            matrix[1], matrix[0]
        ) * factor;

        const parentMatrix = parent !== container
            ? multiplyMatrix(
                pMatrix,
                containerMatrix
            )
            : containerMatrix;

        const transform = {
            matrix,
            parentMatrix,
            scX: Math.sqrt(matrix[0] * matrix[0] + matrix[1] * matrix[1]),
            scY: Math.sqrt(matrix[2] * matrix[2] + matrix[3] * matrix[3])
        };

        const cw = parseFloat($controls.css('width')),
            ch = parseFloat($controls.css('height'));

        // getting current coordinates considering rotation angle                                                                                                  
        const coords = rotatedTopLeft(
            matrix[4],
            matrix[5],
            cw,
            ch,
            refang,
            revX,
            revY,
            doW,
            doH
        );

        const hW = cw / 2,
            hH = ch / 2;

        const offset_ = getOffset(el),
            isDefCenter = isDef(cHandle);

        const centerX = isDefCenter
            ? parseFloat(helper(cHandle).css('left'))
            : hW;
        const centerY = isDefCenter
            ? parseFloat(helper(cHandle).css('top'))
            : hH;

        const cDelta = isDefCenter ? CENTER_DELTA : 0;

        const { x: el_x, y: el_y } = matrixTransform(
            {
                x: offset_.left,
                y: offset_.top
            },
            matrixInvert(parentMatrix)
        );

        return {
            transform,
            cw,
            ch,
            coords,
            center: {
                x: el_x + centerX - cDelta,
                y: el_y + centerY - cDelta,
                cx: -centerX + hW - cDelta,
                cy: -centerY + hH - cDelta,
                hx: centerX,
                hy: centerY
            },
            factor,
            refang,
            revX,
            revY,
            doW,
            doH
        };
    }

    _moveCenterHandle(x, y) {
        const { 
            handles: { center }, 
            center: { hx, hy }
        } = this.storage;

        const left = `${hx + x}px`,
            top = `${hy + y}px`;

        helper(center).css(
            {
                left,
                top
            }
        );
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

    fitControlsToSize() {}

    get controls() {
        return this.storage.controls;
    }

}

const createHandler = (classList) => {
    const element = document.createElement('div');
    classList.forEach(cls => {
        addClass(element, cls);
    });
    return element;
};

// factory method for creating draggable elements
function drag(options, obInstance) {
    if (this.length) {
        const Ob = (isDef(obInstance) && obInstance instanceof Observable)
            ? obInstance
            : new Observable();

        return arrReduce.call(this, (result, item) => {
            //if (!(item instanceof SVGElement)) {
            result.push(
                new Draggable(item, options, Ob)
            );
            //} else {
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

class Subjx extends Helper {

    drag() {
        return drag.call(this, ...arguments);
    }

}

function subjx(params) {
    return new Subjx(params);
}

Object.defineProperty(subjx, 'createObservable', {
    value: () => {
        return new Observable();
    }
});

Object.defineProperty(subjx, 'Subjx', {
    value: Subjx
});

Object.defineProperty(subjx, 'Observable', {
    value: Observable
});

module.exports = subjx;
