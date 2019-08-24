import {def, extend} from '@iosio/util'
import {h, render} from 'preact';
import {webComponentVisibility} from "./utils";
import {formatType, setAttr, propToAttr, attrToProp} from "./utils";



let PROPS = Symbol(),
    IGNORE_ATTR = Symbol(),
    context = {},
    getContext = () => context;

export class PWC extends HTMLElement {
    constructor() {
        super();
        this[PROPS] = {};
        this.context = getContext();
        this.attachShadow({mode: 'open'});
        this.render = this.render.bind(this);
        this.shouldRerender = this.shouldRerender.bind(this);
        this._mounted = new Promise(mount => (this._mount = mount));
        this.update();
        let {initAttrs} = this.constructor;
        let length = initAttrs.length;
        while (length--) initAttrs[length](this);
    }

    update = () => {
        if (!this._process) {
            this._process = this._mounted.then(() => {
                let next = extend({context: getContext(), host: this}, this[PROPS]);
                if (!this._hasMounted) {
                    render(this.render(next), this.shadowRoot);
                    setTimeout(() => this.classList.add('___'));
                    this._hasMounted = true;
                } else if (this.shouldRerender(next)) {
                    render(this.render(next), this.shadowRoot);
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
                    },
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
        if (this._hasMounted) return;
        this._mount();
    }

    disconnectedCallback() {
        render(() => null, this.shadowRoot);
    }

    render() {
    }
}

export const pwc = (tag, RenderComponent, _propTypes) => {
    const {propTypes} = RenderComponent;
    webComponentVisibility(tag);
    customElements.define(tag, class extends PWC {
        static propTypes = _propTypes || propTypes;

        render(props) {
            return <RenderComponent {...props}/>
        }
    });
    return props => h(tag, props, props.children)
};

export const x = (tag, RenderComponent, _propTypes) => pwc('x-' + tag, RenderComponent, _propTypes);
