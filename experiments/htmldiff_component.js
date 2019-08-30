import {def, extend, isObj, isFunc, eventListener} from '@iosio/util'
// import {h, render, Component, createRef, toChildArray, Fragment} from 'preact';
import {formatType, setAttr, propToAttr, attrToProp, webComponentVisibility} from "../src/utils";
// import "child-replace-with-polyfill";
import {obi} from "@iosio/obi";
import {vDiff} from "./htmlDiff";

// import {shadowFocusHandler} from "./shadowRootFocusListener";

let PROPS = Symbol(),
    IGNORE_ATTR = Symbol();

export const context = {};




let id = 0;

// let lastActiveElement = document.activeElement;
//
// document.addEventListener('focus', shadowFocusHandler, true);
//
// document.addEventListener('-shadow-focus', function(ev) {
//     lastActiveElement = ev.detail;
//     console.info('got focused element', ev.detail, 'outer-most element with shadow root', ev.target);
//     // nb. ev.detail will stop at closed roots - don't use them!
// });

// console.log()

export class VH extends HTMLElement {
    constructor() {
        super();
        this[PROPS] = {};
        this.context = context;

        this.render = this.render.bind(this);
        this.shouldRerender = this.shouldRerender.bind(this);
        this._mounted = new Promise(mount => (this._mount = mount));
        this.update();
        let {initAttrs} = this.constructor;
        // let { childrenConfig} = this.constructor;
        let length = initAttrs.length;
        while (length--) initAttrs[length](this);
        this._setters = [];
        this._unsets = [];
        this._unsubs = [];
        this.refs = {};
        console.log('app')
    }


    connectedCallback() {
        console.log('connected')
        if (this._hasMounted) return;
        window.ShadyCSS && window.ShadyCSS.styleElement(this);
        this.attachShadow({mode: 'open'});
        this._root = (this.shadowRoot || this);
        this.state && this._unsubs.push(obi(this.state).$onChange(this.update))
        this._mount();

    }

    renderer = (target, source, tag, init) => {
        vDiff(target, source, tag, init)
        // this.shadowRoot.innerHTML = source;
    };

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

                let next = extend({on: this.on, ref: this.ref}, this[PROPS]);

                if (!this._hasMounted) {
                    let renderResults = this.render(next);
                    this.renderer(this._root, renderResults, this.constructor.tag, true);
                    requestAnimationFrame(() => {
                        this._setSetters();
                        this.classList.add('___');
                        this.didMount()
                        this.didRender();
                    });
                    this._hasMounted = true;
                } else if (this.shouldRerender(next)) {
                    // console.log(lastActiveElement)
                    // let lastFocus = lastActiveElement.getAttribute('data-input');
                    // console.log('last focus', lastFocus)
                    this._unsetSetters();
                    let renderResults = this.render(next);
                    this.renderer(this._root, renderResults, this.constructor.tag);

                    this._setSetters();
                    // if(lastFocus){
                    //     let el = this.select(`[data-input="${lastFocus}"]`);
                    //     el && el.focus().setSelectionRange(-1, -1);
                    // }
                    if (window.ShadyCSS) window.ShadyCSS.styleSubtree(this);
                    this.didRender();


                    // console.log('last focus', lastFocus)
                    // render(this.render(next), this._root);
                }

                this._process = false;
            });
        }

        return this._process;
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
                    }
                });
            }
            schema.value && this.initAttrs.push(self => (self[prop] = schema.value));
            return attr;
        });
    };

    didMount() {

    }

    shouldRerender() {
        return true;
    }

    didRender() {

    }

    _setSetters = () => {
        this._setters.map(f => (this._unsets.push(f && f()), f = null));
        this._setters = [];
    };
    _unsetSetters = () => {
        this._unsets.forEach(f => (isFunc(f) && f(), f = null));
        this._unsets = [];
    };

    disconnectedCallback() {
        // this._childrenConfig.observer && this._observer.disconnect();
        // render(() => null, this._root);
        this._unsetSetters();
    }

    render() {
    }
}

export const vh = (tag, webComponent) => {
    webComponentVisibility(webComponent.tag);
    customElements.define(webComponent.tag, webComponent);
};