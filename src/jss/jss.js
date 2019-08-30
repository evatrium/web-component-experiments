import {isUnitlessNumber} from "./isUnitlessNumber";
import {supportedProperty, supportedValue} from "css-vendor";


export const hyph = s => s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase();
export const addPx = (prop, val) => typeof val === 'number'
&& val !== 0 && !(isUnitlessNumber.hasOwnProperty(prop) && isUnitlessNumber[prop])
    ? val + 'px' : val;

export const prefixPV = (p, v) => {
    let _prop = hyph(p),
        _sp = supportedProperty(_prop) || _prop,
        val_ = addPx(p, v);
    return {
        property: _sp,
        value: supportedValue(_sp, val_) || val_
    }
};

let cache = {};

export const JSS = () => {


    const cssRules = []
    let insert = rule => cssRules.push(rule);

    const mx = (rule, media) => media ? `${media}{${rule}}` : rule;

    const noAnd = s => s.replace(/&/g, '');

    const createDeclaration = (k, v) => {
        let {property, value} = prefixPV(k, v);
        return property + ':' + value;
    };

    const createRule = ({className, child, media, declarations}) =>
        mx(`${className + child}{${declarations.join(';')}}`, media);

    const parseRules = (obj, child = '', media) => {
        const rules = []
        const declarations = []

        for (let key in obj) {
            const value = obj[key]

            if (value === null) continue

            if (typeof value === 'object') {
                const _media = /^@/.test(key) ? key : null
                const _child = _media ? child : child + noAnd(key)
                parseRules(value, _child, _media)
                    .forEach(r => rules.push(r))
                continue
            }

            const dec = createDeclaration(key, value)
            declarations.push(dec)
        }

        rules.unshift({media, child, declarations})

        return rules
    };

    const parse = (obj, cn) => {

        const rules = parseRules(obj)
        rules.forEach(rule => {
            const cacheKey = JSON.stringify(rule)
            if (cache[cacheKey]) {
                return
            }
            const ruleset = createRule(Object.assign(rule, {className: cn}))
            cache[cacheKey] = ruleset;
            insert(ruleset)
        })
    };

    function cxs(styles, cn) {

    }

    cxs.css = () => cssRules.join('');

    cxs.reset = () => {
        // cache = {}
        while (cssRules.length) cssRules.pop()
    };

    return (jssClasses = {}) => {
        Object.keys(jssClasses).forEach((key) => parse(jssClasses[key], key));
        let results = cxs.css();
        cxs.reset();
        console.log(cache);
        // console.log('results', results);
        return  results;
    }

};
