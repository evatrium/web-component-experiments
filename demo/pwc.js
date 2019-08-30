import {x, h, Fragment, Component, addToGlobalStyles} from "../src";
import {toChildArray} from 'preact';
import {styleSheet} from "../src";
import {useCallback, useEffect, useRef, useState} from "preact/hooks";
import {Root} from "./Root";
import {JSS} from "../src/jss/jss";

addToGlobalStyles(
    `x-derp, x-app{
        display: block
    }`
)

// const Host = ({children, ref, hostRef, ...rest}) => {
//
//     return children
// };

// class Host extends Component {
//     componentDidMount() {
//         const {Ref} = this.props;
//         if (Ref) {
//             if (this.base.parentNode.host) Ref.current = this.base.parentNode.host;
//             else Ref.current = this.base;
//
//         }
//     }
//
//     render() {
//         return this.props.children;
//     }
// }

class style {
    constructor() {

    }

    sheet() {
        let d = document;
        let style = d.createElement('style');
        style.appendChild(d.createTextNode(""));
        (mount || d.head).appendChild(style);
        return (css, insertRule) => {
            insertRule ? style.sheet.insertRule(css, style.sheet.cssRules.length) :
                style.appendChild(d.createTextNode(css));
            return style;
        }
    }

}

let id = 0;

let _id = 0;
let getId = () => _id++;


class Host extends Component {

    constructor() {
        super();
        // console.log(this.constructor)
    }

    static _id = getId();

    static get id() {

        return 'derp'
    }

    render() {
        const {props} = this;
        const {host, noHost, children, css, ...others} = props;

        // console.log(this.constructor._id, this.id);

        id++;

        if (host) {

            Object.keys(others).forEach(key => {
                if (key === 'style') Object.assign(host.style, others[key]);
                else host.setAttribute(key, others[key])
            });

            return (
                <Fragment>
                    {css && <style>{css}</style>}
                    {children}
                </Fragment>
            );

        } else {

            let Elem = noHost || Fragment;


            return (
                <Fragment>

                    <Elem {...others} data-host={id}>
                        {css && <style>{css.replace(/:host/g, `[data-host="${id}"]`)}</style>}
                        {children}
                    </Elem>

                </Fragment>
            )
        }

    }
}


let nav = {
    '.root': {
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        background: 'blue',
        flexShrink: 0,
        zIndex: 100,
        height: 56
    }
};


const CreateStyle = () => {
    let jss_ = JSS();
    let cache;
    let oldProps;

    return function ({styles, theme, props}) {

        let getStyles = (s) => isFunc(s) ? s(theme) : s;

        if (!cache) cache = jss_(getStyles(styles));

        if (!oldProps) oldProps = props;
        else if (propsChanged(oldProps, props || {})) {
            oldProps = props;
            cache = jss_(getStyles(styles))
        }
        return (
            <style>
                {cache}
            </style>
        )
    };
};


// let Style = CreateStyle();


// let jss = JSS();
//
// jss(nav)


const Derp = ({host, children}) => {

    let [bg, setBg] = useState('black');

    useEffect(() => {
        // console.log(host);
    }, []);

    // language=CSS
    let css = jcss`
        :host {
            display: block;
            height: 100%;
            width: 100%;
            color: ${bg};
            border: 1px solid blue
        }

        /*p[slot="poopie"] {*/
        /*display: none;*/
        /*}*/

    `;
    // console.log(children)


    return (
        <Host host={host}

              noHost={'div'}

              style={{
                  // background: bg,
                  height: '200px',
                  width: '200px'
              }}
              css={css}>

            <h1>heyyoo</h1>

            <button onClick={() => setBg(bg => bg === 'black' ? 'grey' : 'black')}>
                change color
            </button>

            {children}

        </Host>
    )
};


const XDerp = x('derp', Derp,
    // {}, {type: 'replicate', observe: 'all'}
);

const Application = ({host}) => {

    let [count, setCount] = useState(0);
    let [bool, setBool] = useState(true);

    let inc = () => setCount(c => c + 1);

    return (

        <Host host={host}>

            <h1>count:{count}</h1>


            <XDerp>

                Heyyo
                <p style={{background: bool ? 'grey' : 'blue'}}>
                    oh sharty shart shart{count}
                </p>
                <button onClick={inc}>inc</button>
                <button onClick={() => setBool(!bool)}>bool</button>
                {bool && <span style={{color: 'black'}}>bool</span>}


            </XDerp>

            {/*<XDerp>*/}
            {/*am i in a slot?*/}
            {/*<div>*/}
            {/*oh haiii {count}*/}
            {/*</div>*/}
            {/*</XDerp>*/}


            {/*<XDerp>*/}
            {/*am i in a slot?*/}

            {/*</XDerp>*/}


            <Derp>

                Heyyo
                <p>
                    oh sharty shart shart {count}
                </p>
                <button onClick={inc}>inc</button>
                <button onClick={() => setBool(!bool)}>bool</button>
                {bool && <span style={{color: 'black'}}>bool</span>}

            </Derp>

        </Host>

    )
};


export const App = x('app', Application);

