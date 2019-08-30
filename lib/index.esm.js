import {isObj as t, extend as e, def as s} from "@iosio/util";
import {h as i, render as r} from "preact";

let n = document, h = t => {
    let e = n.createElement("style");
    return e.appendChild(n.createTextNode("")), (t || n.head).appendChild(e), (t, s) => (s ? e.sheet.insertRule(t, e.sheet.cssRules.length) : e.appendChild(n.createTextNode(t)), e)
}, o = (h(), h());
o(" .___ {visibility: inherit;}", !0);
const l = (t, e) => {
    e = e || String;
    try {
        if (e == Boolean ? t = [!0, 1, "", "1", "true"].includes(t) : "string" == typeof t && (t = e == Number ? Number(t) : e == Object || e == Array ? JSON.parse(t) : e == Function ? window[t] : e == Date ? new Date(t) : t), {}.toString.call(t) == `[object ${e.name}]`) return {
            value: t,
            error: e == Number && Number.isNaN(t)
        }
    } catch (t) {
    }
    return {value: t, error: !0}
}, u = (t, e, s) => {
    null == s ? t.removeAttribute(e) : t.setAttribute(e, "object" == typeof s ? JSON.stringify(s) : s)
}, c = t => t.replace(/([A-Z])/g, "-$1").toLowerCase(), a = t => t.replace(/-(\w)/g, (t, e) => e.toUpperCase());
let p = Symbol(), d = Symbol(), m = {}, b = () => m;

class y extends Component {
    shouldComponentUpdate(e) {
        let s = this.props.updatable, i = e.updatable;
        return !!t(i) && propsChanged(i, s)
    }

    render(t) {
        let {children: e} = t;
        return i("style", null, e)
    }
}

class g extends HTMLElement {
    constructor() {
        super(), this.update = () => (this.t || (this.t = this.s.then(() => {
            let t = e({context: b(), host: this, Style: y}, this[p]);
            this.i ? this.shouldRerender(t) && r(this.render(t), this.shadowRoot) : (r(this.render(t), this.shadowRoot), requestAnimationFrame(() => this.classList.add("___")), this.i = !0), this.t = !1
        })), this.t), this[p] = {}, this.context = b(), this.attachShadow({mode: "open"}), this.render = this.render.bind(this), this.shouldRerender = this.shouldRerender.bind(this), this.s = new Promise(t => this.h = t), this.update();
        let {initAttrs: t} = this.constructor, s = t.length;
        for (; s--;) t[s](this)
    }

    attributeChangedCallback(t, e, s) {
        t !== this[d] && e !== s && (this[a(t)] = s)
    }

    static get observedAttributes() {
        let {propTypes: t, prototype: e} = this;
        return this.initAttrs = [], t ? Object.keys(t).map(i => {
            let r = c(i), n = t[i].name ? {type: t[i]} : t[i];
            return i in e || s(e, i, {
                get() {
                    return this[p][i]
                }, set(t) {
                    let {value: e, error: s} = l(t, n.type);
                    if (s && null != e) throw`[${i}] must be type [${n.type.name}]`;
                    e !== this[p][i] && (n.reflect && this.s.then(() => {
                        this[d] = r, u(this, r, n.type !== Boolean || e ? e : null), this[d] = !1
                    }), this[p][i] = e, this.update())
                }
            }), n.value && this.initAttrs.push(t => t[i] = n.value), r
        }) : []
    }

    shouldRerender() {
        return !0
    }

    connectedCallback() {
        this.i || this.h()
    }

    disconnectedCallback() {
        r(() => null, this.shadowRoot)
    }

    render() {
    }
}

const f = (t, e, s) => {
    var r, n;
    const {propTypes: h} = e;
    return (t => {
        o(`${t} {visibility:hidden}`, !0)
    })(t), customElements.define(t, (n = r = class extends g {
        render(t) {
            return i(e, t)
        }
    }, r.propTypes = s || h, n)), e => i(t, e, e.children)
}, v = (t, e, s) => f("x-" + t, e, s);
export {g as PWC, y as Style, m as context, f as pwc, v as x};
