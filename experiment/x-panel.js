import {x, X, defaultBoolean} from "../src/PureJS_NoFrameworks";

export const Panel = x('panel', class extends X {
    static propTypes = {withHover: defaultBoolean, pad: defaultBoolean};
    shouldRerender = () => false;
    didUpdate(){
        console.log('did update')
    }
    render({ context:{theme}}) {
        let styles =     // language=CSS format=true
            theme.resets + jcss`
            :host {
                display: block;
                position: relative;
                background: ${theme.color.surface[0]};
                transition: box-shadow 300ms ease-in-out;
                border-radius: 10px;
                box-shadow: ${theme.shadow[0]};
            }
            :host([pad]){
                padding: ${theme.spacing}px;
            }
            :host([with-hover]:hover){
                cursor: pointer;
                box-shadow: ${theme.shadow[1]};
            }
        `;
        return `<style>${styles}</style><slot></slot>`;
    }
});