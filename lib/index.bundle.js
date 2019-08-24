!function (n, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports, require("@iosio/util"), require("preact")) : "function" == typeof define && define.amd ? define(["exports", "@iosio/util", "preact"], t) : t((n = n || self).pwc = {}, n.util, n.preact)
}(this, function (n, t, e) {
    "use strict";

    function r(n) {
        return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (n) {
            return typeof n
        } : function (n) {
            return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
        })(n)
    }

    function u(n, t) {
        if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(n, t) {
        for (var e = 0; e < t.length; e++) {
            var r = t[e];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(n, r.key, r)
        }
    }

    function o(n, t, e) {
        return t && i(n.prototype, t), e && i(n, e), n
    }

    function c(n, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
        n.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: n,
                writable: !0,
                configurable: !0
            }
        }), t && l(n, t)
    }

    function f(n) {
        return (f = Object.setPrototypeOf ? Object.getPrototypeOf : function (n) {
            return n.__proto__ || Object.getPrototypeOf(n)
        })(n)
    }

    function l(n, t) {
        return (l = Object.setPrototypeOf || function (n, t) {
            return n.__proto__ = t, n
        })(n, t)
    }

    function a(n, t, e) {
        return (a = function () {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], function () {
                })), !0
            } catch (n) {
                return !1
            }
        }() ? Reflect.construct : function (n, t, e) {
            var r = [null];
            r.push.apply(r, t);
            var u = new (Function.bind.apply(n, r));
            return e && l(u, e.prototype), u
        }).apply(null, arguments)
    }

    function s(n) {
        var t = "function" == typeof Map ? new Map : void 0;
        return (s = function (n) {
            if (null === n || (e = n, -1 === Function.toString.call(e).indexOf("[native code]"))) return n;
            var e;
            if ("function" != typeof n) throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== t) {
                if (t.has(n)) return t.get(n);
                t.set(n, r)
            }

            function r() {
                return a(n, arguments, f(this).constructor)
            }

            return r.prototype = Object.create(n.prototype, {
                constructor: {
                    value: r,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), l(r, n)
        })(n)
    }

    function b(n) {
        if (void 0 === n) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return n
    }

    function y(n, t) {
        return !t || "object" != typeof t && "function" != typeof t ? b(n) : t
    }

    var h = document, v = function () {
        var n = h.createElement("style");
        return n.appendChild(h.createTextNode("")), n.setAttribute("data-iosio", "iosio-x"), h.head.appendChild(n), function (t, e) {
            return e ? n.sheet.insertRule(t, n.sheet.cssRules.length) : n.appendChild(h.createTextNode(t)), n
        }
    }, p = (v(), v());

    function d(n, t) {
        for (var e in t) n[e] = t[e];
        return n
    }

    p(" .___ {visibility: inherit;}", !0);
    var m = Symbol(), w = Symbol(), j = {}, O = function () {
        return j
    }, S = function (n) {
        function i() {
            var n;
            u(this, i), (n = y(this, f(i).call(this))).update = function () {
                return n.t || (n.t = n.u.then(function () {
                    var t = d({context: O(), host: b(n)}, n[m]);
                    n.i ? n.shouldRerender(t) && e.render(n.render(t), n.shadowRoot) : (e.render(n.render(t), n.shadowRoot), setTimeout(function () {
                        return n.classList.add("___")
                    }), n.i = !0), n.t = !1
                })), n.t
            }, n[m] = {}, n.context = O(), n.attachShadow({mode: "open"}), n.render = n.render.bind(b(n)), n.shouldRerender = n.shouldRerender.bind(b(n)), n.u = new Promise(function (t) {
                return n.o = t
            }), n.update();
            for (var t = n.constructor.initAttrs, r = t.length; r--;) t[r](b(n));
            return n
        }

        return c(i, s(HTMLElement)), o(i, [{
            key: "attributeChangedCallback", value: function (n, t, e) {
                n !== this[w] && t !== e && (this[function (n) {
                    return n.replace(/-(\w)/g, function (n, t) {
                        return t.toUpperCase()
                    })
                }(n)] = e)
            }
        }, {
            key: "shouldRerender", value: function () {
                return !0
            }
        }, {
            key: "connectedCallback", value: function () {
                this.i || this.o()
            }
        }, {
            key: "disconnectedCallback", value: function () {
                e.render(function () {
                    return null
                }, this.shadowRoot)
            }
        }, {
            key: "render", value: function () {
            }
        }], [{
            key: "observedAttributes", get: function () {
                var n = this, e = this.propTypes, u = this.prototype;
                return this.initAttrs = [], e ? Object.keys(e).map(function (i) {
                    var o = function (n) {
                        return n.replace(/([A-Z])/g, "-$1").toLowerCase()
                    }(i), c = e[i].name ? {type: e[i]} : e[i];
                    return i in u || t.def(u, i, {
                        get: function () {
                            return this[m][i]
                        }, set: function (n) {
                            var t = this, e = function (n, t) {
                                t = t || String;
                                try {
                                    if (t == Boolean ? n = [!0, 1, "", "1", "true"].includes(n) : "string" == typeof n && (n = t == Number ? Number(n) : t == Object || t == Array ? JSON.parse(n) : t == Function ? window[n] : t == Date ? new Date(n) : n), {}.toString.call(n) == "[object ".concat(t.name, "]")) return {
                                        value: n,
                                        error: t == Number && Number.isNaN(n)
                                    }
                                } catch (n) {
                                }
                                return {value: n, error: !0}
                            }(n, c.type), u = e.value;
                            if (e.error && null != u) throw"[".concat(i, "] must be type [").concat(c.type.name, "]");
                            u !== this[m][i] && (c.reflect && this.u.then(function () {
                                t[w] = o, function (n, t, e) {
                                    null == e ? n.removeAttribute(t) : n.setAttribute(t, "object" == r(e) ? JSON.stringify(e) : e)
                                }(t, o, c.type !== Boolean || u ? u : null), t[w] = !1
                            }), this[m][i] = u, this.update())
                        }
                    }), c.value && n.initAttrs.push(function (n) {
                        return n[i] = c.value
                    }), o
                }) : []
            }
        }]), i
    }(), k = function (n, t, r) {
        var i, l, a = t.propTypes;
        return function (n) {
            p("".concat(n, " {visibility:hidden}"), !0)
        }(n), customElements.define(n, (l = i = function (n) {
            function r() {
                return u(this, r), y(this, f(r).apply(this, arguments))
            }

            return c(r, S), o(r, [{
                key: "render", value: function (n) {
                    return e.h(t, n)
                }
            }]), r
        }(), i.propTypes = r || a, l)), function (t) {
            return e.h(n, t, t.children)
        }
    };
    n.PWC = S, n.extend = d, n.pwc = k, n.x = function (n, t, e) {
        return k("x-" + n, t, e)
    }, Object.defineProperty(n, "l", {value: !0})
});
