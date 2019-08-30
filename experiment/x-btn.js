import {Ink} from "./x-ink";
import {x, X, defaultBoolean} from "../src/PureJS_NoFrameworks";
import {Typo} from "./x-typo";

let css = ({primary, disabled, spaceH, contrast, raised, bgColor, sm, rounded, ink, ref, host: {context: {theme}}}) =>
    theme.resets + // language=CSS format=true
    jcss`
              :host {
                display: flex;
                text-align: center;
                align-items: center;
                user-select: none;
                position: relative;
                transition: all 300ms ease-in-out;
                margin: ${spaceH ? '0 10px 0 10px' : 0};
                cursor: ${disabled ? 'not-allowed' : 'pointer'};
                pointer-events: ${disabled ? 'none' : 'auto'};
                opacity: ${disabled ? 0.6 : 'inherit'};
                padding: ${sm ? '5px' : '12px 18px'};
                background: ${primary ? theme.color.primary[0] : (bgColor || theme.color.shade[3])};
                box-shadow: ${disabled ? 'none' : (raised ? theme.shadow[1] : 'none')};
                border-radius: ${rounded ? '20px' : 0};
                overflow: hidden;
                z-index:1
              }
              :host > .typo {
                 display: flex;
              }
              :host(:hover){
                background: ${primary ? theme.color.primary[0] : theme.color.shade[4]};
              }
            ` + (!disabled && raised ? // language=CSS format=true
    jcss`
              :host(:hover){
                transition: all 300ms ease-in-out;
                box-shadow:  ${theme.shadow[2]};
              }` : ``);


export const Btn = x('btn', class extends X {
    static propTypes = {
        rounded: defaultBoolean,
        primary: defaultBoolean,
        raised: defaultBoolean,
        spaceH: defaultBoolean,
        ink: Boolean,
        bgColor: String,
        sm: defaultBoolean,
        disabled: defaultBoolean
    };

    didUpdate() {
        console.log('btn did update')
    }

    // rerender = false;

    didRender(next) {
        this.refs.styles.innerText = css(next);
    }


    render({primary, disabled, spaceH, contrast, raised, bgColor, sm, rounded, ink, ref, host: {context: {theme}}}) {

        console.log('btn rendered', primary, disabled, spaceH, contrast, raised, bgColor, sm, rounded, ink)

        return `
        <style ${ref('styles')}></style>
        <x-typo class="typo" button ${contrast ? 'contrast' : ''}>
            <slot></slot>
        </x-typo>
        
        ${ink ? `<x-ink border-radius="${rounded ? 20 : 0}"
                        color="${theme.color.shade[9]}"
                        style="cursor:${disabled ? 'not-allowed' : 'pointer'};border-radius: ${rounded ? '20px' : 0}">
                </x-ink>` : ''
            }
        `;
    }

});
