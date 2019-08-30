import {def, eventListener, extend, isFunc, isObj, isArray} from '@iosio/util'
import {obi} from "@iosio/obi";
import {webComponentVisibility} from "./utils";
import {formatType, setAttr, propToAttr, attrToProp} from "../src/utils";


let PROPS = Symbol(),
    IGNORE_ATTR = Symbol(),
    context = {},
    getContext = () => context;

let id = 0;

export class X extends HTMLElement {
    constructor() {
        super();
        this[PROPS] = {};
        this._unsubs = [];
        this.context = getContext();
        this._root = this.attachShadow({mode: 'open'});
        this.render = this.render.bind(this);
        // this.renderer = this.renderer.bind(this);
        this._mounted = new Promise(mount => (this._mount = mount));
        this.update();
        this._setters = [];
        this._unsets = [];
        this.refs = {};
        this._state = {};
        let {initAttrs} = this.constructor;
        let length = initAttrs.length;
        while (length--) initAttrs[length](this);
    }

    isX(element) {
        return Object.getPrototypeOf(customElements.get(element.tagName.toLowerCase())).name === 'X';
    }

    _updateBindings(prop, value = '') {
        const bindings = [...this.selectAll(`[data-bind$="${prop}"]`)];
        bindings.forEach(node => {

            let dataProp = node.dataset.bind,

                bindProp = dataProp.includes(':')
                    ? dataProp.split(':').shift()
                    : dataProp,

                bindValue = dataProp.includes('.')
                    ? dataProp.split('.').slice(1).reduce((obj, p) => obj[p], value)
                    : value,

                target = [...this.selectAll(node.tagName)].find(el => el === node),

                isStateUpdate = dataProp.includes(':') && !dataProp.startsWith('$') && this.isX(target);


            isStateUpdate
                ? target.setState({[`${bindProp}`]: bindValue})
                : isArray(bindValue) || dataProp.includes(':') && dataProp.startsWith('$')
                ? target[bindProp.replace('$', '')] = bindValue
                : node.textContent = bindValue.toString();
        });
    }

    setState(newState) {
        Object.entries(newState)
            .forEach(([key, value]) => {

                this._state[key] = isObj(this._state[key]) && isObj(value)
                    ? extend(this._state[key], value)
                    : value;

                let bindKey = isObj(value)
                    ? this.getBindKey(key, value)
                    : key;

                (isArray(bindKey) ? bindKey : [bindKey]).forEach(key => this._updateBindings(key, value));
            });
    }

    getBindKey(key, obj) {
        return Object.keys(obj).map(k => isObj(obj[k]) ? `${key}.${this.getBindKey(k, obj[k])}` : `${key}.${k}`);
    }

    selectAll(selector) {
        return this._root.querySelectorAll(selector);
    }

    select(selector) {
        return this._root.querySelector(selector);
    }

    on = (event, fn) => {
        let attr = `data-on="${event}-${id++}"`, selector = `[${attr}]`;
        this._setters.push(() => eventListener(this.select(selector), event, fn));
        return attr;
    };

    ref = (name) => {
        let attr = `data-ref="${name}"`, selector = `[${attr}]`;
        this._setters.push(() => this.refs[name] = this.select(selector));
        return attr;
    };

    update = () => {
        if (!this._process) {
            this._process = this._mounted.then(() => {
                let next = extend({context: getContext(), host: this, on: this.on, ref: this.ref}, this[PROPS]);
                if (!this._hasMounted) {
                    this.willRender(next, true);
                    this.renderer(next);
                    this._hasMounted = true;
                    setTimeout(() => {
                        this._unsubs.push(this.lifeCycle(next));
                        this._setters.map(f => (this._unsets.push(f && f()), f = null));
                        this._setters = [];
                        this.state && this.setState(this.state);
                        this.classList.add('___');
                        this.didRender(next);
                    });
                } else if (this.shouldRerender(next)) {
                    this.willRender(next);
                    if (this.shouldRerender(next)) {
                        this._unsetSetters();
                        this.renderer(next);
                        this._setters.map(f => this._unsets.push(f()));
                        this.didRender(next);
                    }
                    this.state && this.setState(this.state);
                }
                this.didUpdate();
                this._process = false;
            });
        }
        return this._process;
    };

    _unsetSetters = () => {
        this._unsets.forEach(f => (isFunc(f) && f(), f = null));
        this._unsets = [];
    };

    attributeChangedCallback(attr, oldValue, newValue) {
        if (attr === this[IGNORE_ATTR] || oldValue === newValue) return;
        this[attrToProp(attr)] = newValue;
    }

    static get observedAttributes() {
        let {propTypes, prototype} = this;
        this.initAttrs = [];
        if (!propTypes) return [];
        return Object.keys(propTypes).map(prop => {
            let attr = propToAttr(prop),
                schema = propTypes[prop].name ? {type: propTypes[prop]} : propTypes[prop];
            if (!(prop in prototype)) {
                def(prototype, prop, {
                    get() {
                        return this[PROPS][prop]
                    },
                    set(nextValue) {
                        let {value, error} = formatType(nextValue, schema.type);
                        if (error && value != null) throw `[${prop}] must be type [${schema.type.name}]`;
                        if (value === this[PROPS][prop]) return;
                        if (schema.reflect) {
                            this._mounted.then(() => {
                                this[IGNORE_ATTR] = attr;
                                setAttr(this, attr, schema.type === Boolean && !value ? null : value);
                                this[IGNORE_ATTR] = false;
                            });
                        }
                        this[PROPS][prop] = value;
                        this.update();
                    },
                });
            }
            schema.value && this.initAttrs.push(self => (self[prop] = schema.value));
            return attr;
        });
    };

    detectDetectables() {
        (arguments || []).forEach(me => this._unsubs.push(me.$onChange(this.update)));
    }

    connectedCallback() {
        if (this._hasMounted) return;
        this.state && this._unsubs.push(obi(this.state).$onChange(() => this.setState(this.state)));
        // this.detect && this.detectDetectables(this.detect);
        this._mount();
    }

    lifeCycle() {
    };

    didRender() {
    }

    didUpdate() {

    }

    willRender(next, initial) {
    }

    rerender = true;

    shouldRerender() {
        return this.rerender;
    }

    renderer = (next) => {
        this._root.innerHTML = this.render(next);
    };

    render() {
    }

    disconnectedCallback() {
        this._unsubs.forEach(fn => fn && fn());
        this._unsetSetters();
    }

}

export const element = (tag, component, _propTypes) => {
    webComponentVisibility(tag);
    let _Component = component.prototype instanceof X ? component : class extends X {
        static propTypes = _propTypes;
        render = component
    };
    customElements.define(tag, _Component);
    return _Component;
};


export const x = (tag, component, _propTypes) => element('x-' + tag, component, _propTypes);
export const defaultBoolean = {type: Boolean, reflect: true, value: null};
export {context}
























































