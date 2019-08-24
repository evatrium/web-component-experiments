"use strict";
Object.defineProperty(exports, "t", {value: !0});
var util = require("@iosio/util"), preact = require("preact");

function _typeof(t) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    })(t)
}

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function _defineProperties(t, e) {
    for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
    }
}

function _createClass(t, e, n) {
    return e && _defineProperties(t.prototype, e), n && _defineProperties(t, n), t
}

function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            writable: !0,
            configurable: !0
        }
    }), e && _setPrototypeOf(t, e)
}

function _getPrototypeOf(t) {
    return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t)
    })(t)
}

function _setPrototypeOf(t, e) {
    return (_setPrototypeOf = Object.setPrototypeOf || function (t, e) {
        return t.__proto__ = e, t
    })(t, e)
}

function isNativeReflectConstruct() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {
        })), !0
    } catch (t) {
        return !1
    }
}

function _construct(t, e, n) {
    return (_construct = isNativeReflectConstruct() ? Reflect.construct : function (t, e, n) {
        var r = [null];
        r.push.apply(r, e);
        var i = new (Function.bind.apply(t, r));
        return n && _setPrototypeOf(i, n.prototype), i
    }).apply(null, arguments)
}

function _isNativeFunction(t) {
    return -1 !== Function.toString.call(t).indexOf("[native code]")
}

function _wrapNativeSuper(t) {
    var e = "function" == typeof Map ? new Map : void 0;
    return (_wrapNativeSuper = function (t) {
        if (null === t || !_isNativeFunction(t)) return t;
        if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
        if (void 0 !== e) {
            if (e.has(t)) return e.get(t);
            e.set(t, n)
        }

        function n() {
            return _construct(t, arguments, _getPrototypeOf(this).constructor)
        }

        return n.prototype = Object.create(t.prototype, {
            constructor: {
                value: n,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), _setPrototypeOf(n, t)
    })(t)
}

function _assertThisInitialized(t) {
    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t
}

function _possibleConstructorReturn(t, e) {
    return !e || "object" != typeof e && "function" != typeof e ? _assertThisInitialized(t) : e
}

var d = document, GlobalStyleSheet = function () {
        var t = d.createElement("style");
        return t.appendChild(d.createTextNode("")), t.setAttribute("data-iosio", "iosio-x"), d.head.appendChild(t), function (e, n) {
            return n ? t.sheet.insertRule(e, t.sheet.cssRules.length) : t.appendChild(d.createTextNode(e)), t
        }
    }, globalStyles = GlobalStyleSheet(), webComponentVisibilityStyleSheet = GlobalStyleSheet(),
    webComponentVisibility = function (t) {
        webComponentVisibilityStyleSheet("".concat(t, " {visibility:hidden}"), !0)
    };
webComponentVisibilityStyleSheet(" .___ {visibility: inherit;}", !0);
var formatType = function (t, e) {
    e = e || String;
    try {
        if (e == Boolean ? t = [!0, 1, "", "1", "true"].includes(t) : "string" == typeof t && (t = e == Number ? Number(t) : e == Object || e == Array ? JSON.parse(t) : e == Function ? window[t] : e == Date ? new Date(t) : t), {}.toString.call(t) == "[object ".concat(e.name, "]")) return {
            value: t,
            error: e == Number && Number.isNaN(t)
        }
    } catch (t) {
    }
    return {value: t, error: !0}
}, setAttr = function (t, e, n) {
    null == n ? t.removeAttribute(e) : t.setAttribute(e, "object" == _typeof(n) ? JSON.stringify(n) : n)
}, propToAttr = function (t) {
    return t.replace(/([A-Z])/g, "-$1").toLowerCase()
}, attrToProp = function (t) {
    return t.replace(/-(\w)/g, function (t, e) {
        return e.toUpperCase()
    })
};

function extend(t, e) {
    for (var n in e) t[n] = e[n];
    return t
}

var PROPS = Symbol(), IGNORE_ATTR = Symbol(), context = {}, getContext = function () {
    return context
}, PWC = function (t) {
    function e() {
        var t;
        _classCallCheck(this, e), (t = _possibleConstructorReturn(this, _getPrototypeOf(e).call(this))).update = function () {
            return t.i || (t.i = t.o.then(function () {
                var e = extend({context: getContext(), host: _assertThisInitialized(t)}, t[PROPS]);
                t.u ? t.shouldRerender(e) && preact.render(t.render(e), t.shadowRoot) : (preact.render(t.render(e), t.shadowRoot), setTimeout(function () {
                    return t.classList.add("___")
                }), t.u = !0), t.i = !1
            })), t.i
        }, t[PROPS] = {}, t.context = getContext(), t.attachShadow({mode: "open"}), t.render = t.render.bind(_assertThisInitialized(t)), t.shouldRerender = t.shouldRerender.bind(_assertThisInitialized(t)), t.o = new Promise(function (e) {
            return t.s = e
        }), t.update();
        for (var n = t.constructor.initAttrs, r = n.length; r--;) n[r](_assertThisInitialized(t));
        return t
    }

    return _inherits(e, _wrapNativeSuper(HTMLElement)), _createClass(e, [{
        key: "attributeChangedCallback",
        value: function (t, e, n) {
            t !== this[IGNORE_ATTR] && e !== n && (this[attrToProp(t)] = n)
        }
    }, {
        key: "shouldRerender", value: function () {
            return !0
        }
    }, {
        key: "connectedCallback", value: function () {
            this.u || this.s()
        }
    }, {
        key: "disconnectedCallback", value: function () {
            preact.render(function () {
                return null
            }, this.shadowRoot)
        }
    }, {
        key: "render", value: function () {
        }
    }], [{
        key: "observedAttributes", get: function () {
            var t = this, e = this.propTypes, n = this.prototype;
            return this.initAttrs = [], e ? Object.keys(e).map(function (r) {
                var i = propToAttr(r), o = e[r].name ? {type: e[r]} : e[r];
                return r in n || util.def(n, r, {
                    get: function () {
                        return this[PROPS][r]
                    }, set: function (t) {
                        var e = this, n = formatType(t, o.type), u = n.value;
                        if (n.error && null != u) throw"[".concat(r, "] must be type [").concat(o.type.name, "]");
                        u !== this[PROPS][r] && (o.reflect && this.o.then(function () {
                            e[IGNORE_ATTR] = i, setAttr(e, i, o.type !== Boolean || u ? u : null), e[IGNORE_ATTR] = !1
                        }), this[PROPS][r] = u, this.update())
                    }
                }), o.value && t.initAttrs.push(function (t) {
                    return t[r] = o.value
                }), i
            }) : []
        }
    }]), e
}(), pwc = function (t, e, n) {
    var r, i, o = e.propTypes;
    return webComponentVisibility(t), customElements.define(t, (i = r = function (t) {
        function n() {
            return _classCallCheck(this, n), _possibleConstructorReturn(this, _getPrototypeOf(n).apply(this, arguments))
        }

        return _inherits(n, PWC), _createClass(n, [{
            key: "render", value: function (t) {
                return preact.h(e, t)
            }
        }]), n
    }(), r.propTypes = n || o, i)), function (e) {
        return preact.h(t, e, e.children)
    }
}, x = function (t, e, n) {
    return pwc("x-" + t, e, n)
};
exports.PWC = PWC, exports.extend = extend, exports.pwc = pwc, exports.x = x;