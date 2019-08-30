import {def, extend, isObj, isFunc} from '@iosio/util'
import {h, render, Component, createRef, toChildArray, Fragment} from 'preact';
import {webComponentVisibility} from "./utils";
import {formatType, setAttr, propToAttr, attrToProp} from "./utils";
import "child-replace-with-polyfill";

let PROPS = Symbol(),
    IGNORE_ATTR = Symbol();

export const context = {};


// export class DomChild extends Component {
//     constructor() {
//         super();
//         this.ref = createRef();
//     }
//     componentDidMount() {
//         const childNodes = this.props.children;
//         this.base.replaceWith(...childNodes);
//         // this.base.innerHTML = childNodes
//     }
//     render() {
//         return <div ref={this.ref}/>;
//     }
// }

// const camelize = str =>
//     str.replace(/-(\w)/, (_, c) => (c ? c.toUpperCase() : ''));
// function toVdom(element, nodeName) {
//     if (element.nodeType === 3) return element.nodeValue;
//     if (element.nodeType !== 1) return null;
//     const props = [...element.attributes].reduce((acc, attr) => {
//         const propName = camelize(attr.name);
//         acc[propName] = attr.value;
//         return acc;
//     }, {});
//     props.children = [...element.childNodes].map(node => toVdom(node));
//     return h(nodeName || element.nodeName.toLowerCase(), props);
// }


export class PWC extends HTMLElement {
    constructor() {
        super();
        this[PROPS] = {};
        this.context = context;
        this.attachShadow({mode: 'open'});
        this._root = (this.shadowRoot || this);
        this.render = this.render.bind(this);
        this.shouldRerender = this.shouldRerender.bind(this);
        this._mounted = new Promise(mount => (this._mount = mount));
        this.update();
        let {initAttrs} = this.constructor;
        // let { childrenConfig} = this.constructor;
        let length = initAttrs.length;
        while (length--) initAttrs[length](this);
        // this._childrenConfig  = childrenConfig;
        // this._observer = childrenConfig.type === 'replicate'
        //     && childrenConfig.observer
        //     && new MutationObserver(this._onMutation);
        this.template = document.createElement("template");
    }

    update = () => {
        if (!this._process) {
            this._process = this._mounted.then(() => {

                let next = extend({
                    host: this,
                    // children: this._childrenConfig.type === 'replicate' ? toVdom(this).props.children : <slot/>
                    children: <slot/>
                    // children:<DomChild>{this.childNodes}</DomChild>
                }, this[PROPS]);

                if (!this._hasMounted) {



                    render(this.render(next),   this.template );

                    console.log(this.template.innerHTML)

                    this.shadowRoot.appendChild(this.template.content.cloneNode(true));

                    if (window.ShadyCSS) {
                        console.log('shady css exists')
                        window.ShadyCSS.styleElement(this);
                    }

                    requestAnimationFrame(() => {
                        this.classList.add('___');
                        // this._startObserver();
                    });
                    this._hasMounted = true;
                } else if (this.shouldRerender(next)) {
                    render(this.render(next), this._root);
                }

                this._process = false;
            });
        }
        return this._process;
    };

    // _onMutation = mutationsList => {
    //     // const newProps = mutationsList.reduce((props, mutation) => {
    //     //     if (mutation.type === "attributes") {
    //     //         const propKey = mutation.attributeName;
    //     //         props[propKey] = this.getAttribute(propKey);
    //     //     }
    //     //     return props;
    //     // }, {});
    //     console.log('childlist mutated', mutationsList)
    //     this.update();
    //     // this.setProps(newProps);
    // };

    // _startObserver = () => {
    //     let all = {characterData: true, childList: true, subtree: true, attributes: true};
    //     let mutob = this._childrenConfig.observer;
    //     mutob && this._observer.observe(this, mutob === 'all' ? all : mutob);
    // };


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

    shouldRerender() {
        return true;
    }

    connectedCallback() {
        !this._hasMounted && this._mount();
    }

    disconnectedCallback() {
        // this._childrenConfig.observer && this._observer.disconnect();
        render(() => null, this._root);

    }

    render() {
    }
}

export const pwc = (tag, RenderComponent, _propTypes, childrenConfig) => {
    const {propTypes} = RenderComponent;

    webComponentVisibility(tag);
    customElements.define(tag, class extends PWC {
        // static childrenConfig = extend({childrenType:'slot', observer: false}, childrenConfig || {});
        static propTypes = _propTypes || propTypes;

        render(props) {
            return <RenderComponent {...props}/>
        }
    });

    return props => h(tag, props, props.children)
};

export const x = (tag, RenderComponent, _propTypes, childrenConfig) =>
    pwc('x-' + tag, RenderComponent, _propTypes, childrenConfig);