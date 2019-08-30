import {obi} from "@iosio/obi";
import {provide} from "../src/provide";

export let baseTheme = {
    color: {
        primary: [
            '#485be4',
            '#4cd0e1',
            '#673AB7'
        ],
        shade: [
            '#fbfdfe',
            '#fbfdfe',
            '#f8fafb',
            '#f2f6fa',
            '#e9f1f7',
            '#e0ebf3',
            '#dae6f1',
            '#d3e2ee',
            '#cedfec',
            '#c8dae9',
        ],
        error: '#ff3058',
        warning: '#ffb231',
        success: '#13caab',
        surface: [
            '#fff',
            '#fff'
        ]
    },
    zIndex: {
        dropdown: 9900,
        nav: 7000,
        drawer: 6000,
        overlay: 4000,
    },
    shadow: [
        '0px 4px 19px 1px rgba(150, 160, 229, 0.18)',
        "0px 6px 19px 2px rgba(150, 160, 229, 0.28)",
        "1px 7px 12px 1px rgba(142, 151, 219, 0.54)"
    ],

    typo: {
        fontFamily: '"Montserrat", "Helvetica Neue", -apple-system, "Segoe UI", "Roboto", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontSize: 16,
        fontWeight: 500,
        color: '#070737',
        lighter: '#4a5767',
        lineHeight: '120%',
        textFieldLineHeight: 22,
        spacey: 1.5,
        letterSpacing: 0.5,
        contrast: 'white',
        fontWeightBold: 700
    },
    //misc
    spacing: 20,
    navHeight: 56,
    containerWidth: 1280,
    border_radius: 10,
    duration_1: '300ms',
    transition: ['all 300ms cubic-bezier(0.19, 1, 0.22, 1)'],
    gridGutter: 10,
    resets: jcss`:host, *, *::before, *::after { box-sizing: border-box; }`,
    inkOpacity: 0.3
};
baseTheme.iconColor = baseTheme.typo.color;
baseTheme.inkColor = baseTheme.color.shade[9];


export let theme = obi(baseTheme);

provide('theme', theme);

// language=CSS format=true
export const resets = jcss`
  :host, *, *::before,
  *::after {
    box-sizing: border-box;
  }
`;

// language=CSS format=true
export const anchorTagResets = jcss`
  a, a:hover, a:focus, a:active, a:link, a:visited {
    color: inherit;
    text-decoration: none;
    background-color: transparent;
    outline: 0;
    -webkit-tap-highlight-color: transparent;
  }
`;