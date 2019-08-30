// import {h} from "../../core/vdom";
import {x} from "../src/PureJS_NoFrameworks";

const styles = (theme) =>// language=CSS format=true
    theme.resets + jcss`
    :host{
      display: block;
      height: 100%;
      width: 100%;
      padding-right: ${theme.spacing}px;
      padding-left: ${theme.spacing}px;
      margin-right: auto;
      margin-left: auto;
      max-width: ${theme.containerWidth}px;
      transition: padding 0.3s cubic-bezier(0.05, 0.69, 0.14, 1);
    }
    :host([nav-top]){
      padding-top: ${theme.navHeight + theme.spacing}px;
    }
    :host([pad-b]){
      padding-bottom: ${theme.spacing}px;
    }
    :host([no-pad-h]){
      padding-right:0;
      padding-left:0;
    }
    :host *, * {
      -webkit-transform: translateZ(0px);
    }
    ::slotted(*){
      -webkit-transform: translateZ(0px);
}
`;

export const Page = x('page', ({context: {theme}}) => `<style>${styles(theme)}</style><slot></slot>`,
    {noPad: Boolean, navTop: Boolean, padB: Boolean}
);
