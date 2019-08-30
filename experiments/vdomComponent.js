import {def, extend, isObj, isFunc, eventListener} from '@iosio/util'
// import {h, render, Component, createRef, toChildArray, Fragment} from 'preact';
import {formatType, setAttr, propToAttr, attrToProp, webComponentVisibility} from "../src/utils";
// import "child-replace-with-polyfill";
import {obi} from "@iosio/obi";
import {h, patch, removeHandlers} from "./vdom";

let PROPS = Symbol(),
    IGNORE_ATTR = Symbol();

export const context = {};

console.log('app')
let id = 0;

export class VC extends HTMLElement {
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
        this._unsubs = [];

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


    update = () => {
        if (!this._process) {
            this._process = this._mounted.then(() => {
                let next = extend({}, this[PROPS]);
                if (!this._hasMounted) {
                    this._root.appendChild(document.createElement('template'));
                    patch(this._root, this.render(next));
                    requestAnimationFrame(() => {
                        this.classList.add('___');
                        this.didRender();
                        this.didMount();
                    });
                    this._hasMounted = true;
                } else if (this.shouldRerender(next)) {
                    patch(this._root, this.render(next));
                    if (window.ShadyCSS) window.ShadyCSS.styleSubtree(this);
                    this.didRender();
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

    willUnmount(){

    }

    _destroy = (dom) => {
        this.willUnmount();
        dom && removeHandlers(dom);
        this._unsubs.forEach(fn => fn && fn());
        this._destroyed = true;
    };

    disconnectedCallback() {
        !this._destroyed && this._destroy()
    }

    render() {
    }
}

export const vc = (tag, webComponent) => {
    webComponentVisibility(webComponent.tag);
    customElements.define(webComponent.tag, webComponent);
};