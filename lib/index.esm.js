import {def as t} from "@iosio/util";
import {render as e, h as i} from "preact";

let s = document, r = () => {
    let t = s.createElement("style");
    return t.appendChild(s.createTextNode("")), t.setAttribute("data-iosio", "iosio-x"), s.head.appendChild(t), (e, i) => (i ? t.sheet.insertRule(e, t.sheet.cssRules.length) : t.appendChild(s.createTextNode(e)), t)
}, h = (r(), r());
h(" .___ {visibility: inherit;}", !0);
const o = (t, e) => {
    e = e || String;
    try {
        if (e == Boolean ? t = [!0, 1, "", "1", "true"].includes(t) : "string" == typeof t && (t = e == Number ? Number(t) : e == Object || e == Array ? JSON.parse(t) : e == Function ? window[t] : e == Date ? new Date(t) : t), {}.toString.call(t) == `[object ${e.name}]`) return {
            value: t,
            error: e == Number && Number.isNaN(t)
        }
    } catch (t) {
    }
    return {value: t, error: !0}
}, n = (t, e, i) => {
    null == i ? t.removeAttribute(e) : t.setAttribute(e, "object" == typeof i ? JSON.stringify(i) : i)
}, l = t => t.replace(/([A-Z])/g, "-$1").toLowerCase(), u = t => t.replace(/-(\w)/g, (t, e) => e.toUpperCase());

function c(t, e) {
    for (let i in e) t[i] = e[i];
    return t
}

let a = Symbol(), b = Symbol(), m = {}, p = () => m;

class d extends HTMLElement {
    constructor() {
        super(), this.update = () => (this.t || (this.t = this.i.then(() => {
            let t = c({context: p(), host: this}, this[a]);
            this.s ? this.shouldRerender(t) && e(this.render(t), this.shadowRoot) : (e(this.render(t), this.shadowRoot), setTimeout(() => this.classList.add("___")), this.s = !0), this.t = !1
        })), this.t), this[a] = {}, this.context = p(), this.attachShadow({mode: "open"}), this.render = this.render.bind(this), this.shouldRerender = this.shouldRerender.bind(this), this.i = new Promise(t => this.h = t), this.update();
        let {initAttrs: t} = this.constructor, i = t.length;
        for (; i--;) t[i](this)
    }

    attributeChangedCallback(t, e, i) {
        t !== this[b] && e !== i && (this[u(t)] = i)
    }

    static get observedAttributes() {
        let {propTypes: e, prototype: i} = this;
        return this.initAttrs = [], e ? Object.keys(e).map(s => {
            let r = l(s), h = e[s].name ? {type: e[s]} : e[s];
            return s in i || t(i, s, {
                get() {
                    return this[a][s]
                }, set(t) {
                    let {value: e, error: i} = o(t, h.type);
                    if (i && null != e) throw`[${s}] must be type [${h.type.name}]`;
                    e !== this[a][s] && (h.reflect && this.i.then(() => {
                        this[b] = r, n(this, r, h.type !== Boolean || e ? e : null), this[b] = !1
                    }), this[a][s] = e, this.update())
                }
            }), h.value && this.initAttrs.push(t => t[s] = h.value), r
        }) : []
    }

    shouldRerender() {
        return !0
    }

    connectedCallback() {
        this.s || this.h()
    }

    disconnectedCallback() {
        e(() => null, this.shadowRoot)
    }

    render() {
    }
}

const y = (t, e, s) => {
    var r, o;
    const {propTypes: n} = e;
    return (t => {
        h(`${t} {visibility:hidden}`, !0)
    })(t), customElements.define(t, (o = r = class extends d {
        render(t) {
            return i(e, t)
        }
    }, r.propTypes = s || n, o)), e => i(t, e, e.children)
}, f = (t, e, i) => y("x-" + t, e, i);
export {d as PWC, c as extend, y as pwc, f as x};
