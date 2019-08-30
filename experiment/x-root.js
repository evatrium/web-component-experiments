import {addToGlobalStyles} from "../src/utils";
import {x} from "../src/PureJS_NoFrameworks";

addToGlobalStyles(
    // language=CSS format=true
    jcss`
        html {
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
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

        svg:not(:root) {
            overflow: hidden;
        }

        .fadeIn {
            will-change: opacity;
            animation: fadein 300ms ease-in-out;
        }

        @keyframes fadein {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    `);

let rootStyles = (theme)=> // language=CSS format=true
    jcss`:host {
          display: flex;
          flex-direction: column;
          width: 100%;
          min-height: 100%;
          -webkit-overflow-scrolling: touch;
          flex: 1 0 auto;
          font-family: ${theme.typo.fontFamily};
        }`;

export const Root = x('root', ({context: {theme}}) => `
    <style>
     ${theme.resets + rootStyles(theme)}
    </style>
    <slot></slot>
`);