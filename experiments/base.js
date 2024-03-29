/**
 * Copyright 2019
 * @license MIT, see License.md for full text.
 */

/**
 * `x-flex`
 * `flexbox`
 *
 * @microcopy - language worth noting:
 *  -
 *
 * @customElement
 * @demo demo/index.html
 */
class XFlex extends HTMLElement {
    /* REQUIRED FOR TOOLING DO NOT TOUCH */

    /**
     * Store the tag name to make it easier to obtain directly.
     * @notice function name must be here for tooling to operate correctly
     */
    static get tag() {
        return "x-flex";
    }
    /**
     * life cycle
     */
    constructor(delayRender = false) {
        super();

        // set tag for later use
        this.tag = XFlex.tag;
        // map our imported properties json to real props on the element
        // @notice static getter of properties is built via tooling
        // to edit modify src/x-flex-properties.json
        let obj = XFlex.properties;
        for (let p in obj) {
            if (obj.hasOwnProperty(p)) {
                if (this.hasAttribute(p)) {
                    this[p] = this.getAttribute(p);
                }
                else {
                    this.setAttribute(p, obj[p].value);
                    this[p] = obj[p].value;
                }
            }
        }
        // optional queue for future use
        this._queue = [];
        this.template = document.createElement("template");

        this.attachShadow({ mode: "open" });

        if (!delayRender) {
            this.render();
        }
    }
    /**
     * life cycle, element is afixed to the DOM
     */
    connectedCallback() {
        if (window.ShadyCSS) {
            window.ShadyCSS.styleElement(this);
        }

        if (this._queue.length) {
            this._processQueue();
        }

    }

    _copyAttribute(name, to) {
        const recipients = this.shadowRoot.querySelectorAll(to);
        const value = this.getAttribute(name);
        const fname = value == null ? "removeAttribute" : "setAttribute";
        for (const node of recipients) {
            node[fname](name, value);
        }
    }

    _queueAction(action) {
        this._queue.push(action);
    }

    _processQueue() {
        this._queue.forEach(action => {
            this[`_${action.type}`](action.data);
        });

        this._queue = [];
    }

    _setProperty({ name, value }) {
        this[name] = value;
    }

    render() {
        this.shadowRoot.innerHTML = null;
        this.template.innerHTML = this.html;

        if (window.ShadyCSS) {
            window.ShadyCSS.prepareTemplate(this.template, this.tag);
        }
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    }

    //static get observedAttributes() {
    //  return [];
    //}
    // disconnectedCallback() {}
    // attributeChangedCallback(attr, oldValue, newValue) {}
    // Observer fdc for changes
    _fdcChanged (newValue, oldValue) {
        if (typeof newValue !== typeof undefined) {
            console.log(newValue);
        }
    }

    // Observer exampleObject for changes
    _exampleObjectChanged (newValue, oldValue) {
        if (typeof newValue !== typeof undefined) {
            console.log(newValue);
        }
    }

    // Observer arrayExample for changes
    _arrayExampleChanged (newValue, oldValue) {
        if (typeof newValue !== typeof undefined) {
            console.log(newValue);
        }
    }


}
window.customElements.define(XFlex.tag, XFlex);
export { XFlex };
