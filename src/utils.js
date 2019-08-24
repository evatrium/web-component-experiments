import {propsChanged} from '@iosio/util';
import {h, Component} from "preact";

let d = document,
    GlobalStyleSheet = () => {
        let style = d.createElement('style');
        style.appendChild(d.createTextNode(""));
        style.setAttribute('data-iosio', 'iosio-x');
        d.head.appendChild(style);
        return (css, insertRule) => {
            insertRule ? style.sheet.insertRule(css, style.sheet.cssRules.length) :
                style.appendChild(d.createTextNode(css));
            return style;
        }
    },
    globalStyles = GlobalStyleSheet(),
    addToGlobalStyles = (css, insertRule) => globalStyles(css, insertRule),
    webComponentVisibilityStyleSheet = GlobalStyleSheet(),
    webComponentVisibility = (tag) => {
        webComponentVisibilityStyleSheet(`${tag} {visibility:hidden}`, true)
    };

webComponentVisibilityStyleSheet(` .___ {visibility: inherit;}`, true);

class Style extends Component {

    shouldComponentUpdate(nextProps) {
        let now = this.props.updatable, next = nextProps.updatable;
        return isObj(next) ? propsChanged(next, now) : false;
    }

    render({children}) {
        return (
            <style>
                {children}
            </style>
        )
    }
}
export {GlobalStyleSheet, globalStyles, addToGlobalStyles, webComponentVisibility, Style};

export const formatType = (value, type) => {
    type = type || String;
    try {
        if (type == Boolean) value = [true, 1, "", "1", "true"].includes(value);
        else if (typeof value == "string") {
            value = type == Number ? Number(value)
                : type == Object || type == Array ? JSON.parse(value)
                    : type == Function ? window[value]
                        : type == Date ? new Date(value) : value;
        }
        if ({}.toString.call(value) == `[object ${type.name}]`)
            return {value, error: type == Number && Number.isNaN(value)};
    } catch (e) {
    }
    return {value, error: true};
};

export const setAttr = (node, attr, value) => {
    value == null ? node.removeAttribute(attr)
        : node.setAttribute(attr, typeof value == "object" ? JSON.stringify(value) : value);
};
export const propToAttr = (prop) => prop.replace(/([A-Z])/g, "-$1").toLowerCase()
export const attrToProp = (attr) => attr.replace(/-(\w)/g, (all, letter) => letter.toUpperCase());






