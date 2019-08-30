let invalidTypes = [3, 8, 11],
    isValidType = (node) => !invalidTypes.includes(node.nodeType);
export const vDiff = (target, source, tag, init) => {
    const worker = {
        settings: {original: target},
        replace(target, source = target, tag, init) {
            const template = document.createElement('template');
            if (init) {
                template.innerHTML = source;
                if (window.ShadyCSS) {
                    window.ShadyCSS.prepareTemplate(template, tag);
                    template.content.querySelectorAll('style').forEach(s => s.remove())
                }
                return target.appendChild(template.content.cloneNode(true));
            }
            template.innerHTML = source;
            window.ShadyCSS && template.content.querySelectorAll('style').forEach(s => s.remove());
            this.iterate(target, template.content);
        },
        iterate(targetNode, sourceNode, tOriginal) {
            if (targetNode || sourceNode) {
                this.checkAdditions(targetNode, sourceNode, tOriginal);
                if (targetNode && sourceNode && targetNode.nodeName !== sourceNode.nodeName) {
                    this.checkNodeName(targetNode, sourceNode);
                } else if (targetNode && sourceNode && targetNode.nodeName === sourceNode.nodeName) {
                    this.checkTextContent(targetNode, sourceNode);
                    isValidType(targetNode) && this.checkAttributes(targetNode, sourceNode);
                }
            }
            if (targetNode && sourceNode) {
                let childCount = null;
                if (targetNode.childNodes && sourceNode.childNodes)
                    childCount = [...target.childNodes, ...sourceNode.childNodes];
                for (let i = 0; i < childCount.length; i++)
                    this.iterate(targetNode.childNodes[i], sourceNode.childNodes[i], targetNode, sourceNode)
            }
        },
        checkNodeName(targetNode, sourceNode) {
            targetNode.replaceWith(sourceNode.cloneNode(true));
        },
        checkAttributes(targetNode, sourceNode) {
            let attributes = targetNode.attributes || [],
                attributesNew = sourceNode.attributes || [];
            Object.keys(attributes).map((n) => attributes[n])
                .forEach(o => sourceNode.getAttribute(o.name) !== null
                    ? targetNode.setAttribute(o.name, sourceNode.getAttribute(o.name))
                    : targetNode.removeAttribute(o.name)
                );
            Object.keys(attributesNew).map((n) => attributesNew[n])
                .forEach(a => targetNode.getAttribute(a.name) !== sourceNode.getAttribute(a.name)
                    && targetNode.setAttribute(a.name, sourceNode.getAttribute(a.name)));
        },
        checkTextContent(targetNode, sourceNode) {
            if (targetNode.nodeValue !== sourceNode.nodeValue) targetNode.textContent = sourceNode.textContent;
        },
        checkAdditions(targetNode, sourceNode, tParent = this.settings.original) {
            if (sourceNode && targetNode === undefined) {
                isValidType(tParent) && tParent.appendChild(sourceNode.cloneNode(true));
            } else if (targetNode && sourceNode === undefined) targetNode.remove();
        }
    };
    Object.create(worker).replace(target, source, tag, init);
};

// const parseClassList = (value) => (!value) ? [] : value.split(/\s+/).filter(c => c);
//
//
// const accumulateProps = (attrs) =>
//     [...(attrs || [])].reduce((acc, attr) => (acc[attr.name] = attr.value, acc), {});
//
// export const listener = function (event) {
//     this.handlers[event.type](event)
// };
// const merge = (a, b, out) => {
//     out = {};
//     for (var k in a) out[k] = a[k];
//     for (var k in b) out[k] = b[k];
//     return out
// };

// console.log('derp')
// const patchProperty = (node, key, oldValue, newValue, isSvg) => {
//     if (key === "key") {
//     }
//     // else if (isFunc(newValue) && key.startsWith('on') && !(key in node)) {
//     //     let eventType = (key.toLowerCase() in node)
//     //         ? key.slice(2).toLowerCase()
//     //         : key[2].toLowerCase() + key.substring(3);
//     //     if (!((node.handlers || (node.handlers = {}))[(key = eventType)] = newValue)) {
//     //         node.removeEventListener(key, listener);
//     //     } else if (!oldValue) node.addEventListener(key, listener);
//     // }
//     // else if (key === 'ref' && isFunc(newValue)) newValue(node);
//     else if (['class', 'className'].includes(key)) {
//         // let classList = node.classList;
//         parseClassList(oldValue).forEach(cls => node.classList.remove(cls));
//         parseClassList(newValue).forEach(cls => node.classList.add(cls));
//         // console.log(newValue);
//     }
//     // else if (key === 'style' && isObj(newValue) && propsChanged(oldValue, newValue)) Object.assign(node.style, newValue);
//     else if (!isSvg && key !== "list" && key in node) {
//         node[key] = newValue == null ? "" : newValue;
//     } else if (newValue == null || newValue === false) node.removeAttribute(key);
//     else node.setAttribute(key, newValue
//             // !isCustomElement(node)
//             //     // if arr/obj and its a web component, then stringify the array or object (typeof [] === 'object')
//             //     ? newValue : (typeof newValue === "object" ? JSON.stringify(newValue) : newValue)
//         );
// };

// let oldProps = accumulateProps(targetNode.attributes),
//     newProps = accumulateProps(sourceNode.attributes);
//
// console.log(newProps[Object.keys(newProps)[0]]);
// for (var key in merge(oldProps, newProps)) {
//     let _old = oldProps[key], _new = newProps[key];
//
//     patchProperty(targetNode, key, _old, _new, sourceNode.nodeName === 'SVG')
// }

// parseClassList(oldValue).forEach(cls => targetNode.classList.remove(cls));
// parseClassList(newValue).forEach(cls => targetNode.classList.add(cls));
