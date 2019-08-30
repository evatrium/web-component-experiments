import {x} from "../src/PureJS_NoFrameworks";

// language=CSS format=true
const styles = (theme) => theme.resets + jcss`
    :host, nav{
     display: flex;
     position: fixed;
     top:0;
     width: 100%;
     left:0;
     right:0;
     z-index: ${theme.zIndex.nav};
     flex-shrink: 0;
    }
    nav{
     border-bottom: 1px solid aliceblue;
     height: ${theme.navHeight}px;
     background: ${theme.color.surface[1]};
     box-shadow: ${theme.shadow[0]};
    }
`;

export const Nav = x('nav', ({context: {theme}}) => `
    <nav>
        <style>
         ${styles(theme)}
        </style>
        <slot></slot>
    </nav>
`);