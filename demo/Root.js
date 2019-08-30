import {x, addToGlobalStyles} from "../src";
import { h, Fragment} from "preact";

addToGlobalStyles(// language=CSS format=true
    jcss`
        html {
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
            font-family: "Helvetica Neue", -apple-system, "Segoe UI", "Roboto", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        }
        html, body {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            flex: 1 0 auto;
        }
        main {
            display: block;
        }
        *, *::before,
        *::after {
            box-sizing: border-box;
        }
    `);

export const Root = x('root', ({children}) => (
    <Fragment>
        <style>
            {// language=CSS format=true
                jcss`
                :host {
                  display: flex;
                  flex-direction: column;
                  width: 100%;
                  min-height: 100%;
                  -webkit-overflow-scrolling: touch;
                  flex: 1 0 auto;
                }
            `
            }
        </style>
        {children}
    </Fragment>
));