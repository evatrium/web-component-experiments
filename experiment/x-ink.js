import {eventListener, extend} from "@iosio/util";
import {x, X} from "../src/PureJS_NoFrameworks";


const styles = (theme, props) =>// language=CSS format=true
    theme.resets + jcss`
  :host {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    border-radius: ${props.borderRadius || 0}px;
  }
  :host::before {
    position: absolute;
    display: block;
    content: '';
    border-radius: 50%;
    background: ${props.color || theme.inkColor};
    z-index: 0;
    opacity: 0;
    transform: scale(0);
  }
  :host([animatable])::before {
    transition: opacity .1s linear, transform .3s linear;
  }
  :host([mouseup][animatable])::before {
    transition: opacity .4s linear, transform .2s linear;
  }
  :host([mousedown])::before {
    opacity: ${props.opacity || theme.inkOpacity};
    transform: scale(1);
  }
  :host([mouseup]:not([mousedown]))::before {
    opacity: 0;
    transform: scale(1);
  }
`;

let transEnd = 'transitionend',
    booleanProps = ['animatable', 'mouseup', 'mousedown', 'disabled'],
    propTypes = extend({
        color: String, opacity: Number,
        borderRadius: Number
    }, booleanProps.reduce((acc, curr) => (acc[curr] = {type: Boolean, reflect: true, value: null}, acc), {}));

export const Ink = x('ink', class extends X {

    static propTypes = propTypes;

    shouldRerender = () => false;

    lifeCycle = () => {
        var transitionInOver = false,
            transitionOutOver = false,
            cssAdded = false,
            hostStyles = this.shadowRoot.getElementById('styles'),
            handleMouseDown = e => {
                if (this.disabled) return;
                reset();
                positionPseduoElement(e.offsetX, e.offsetY);
                requestAnimationFrame(() => {
                    removeTransitionInEnd = eventListener(this, transEnd, transitionInEnd);
                    this.animatable = true;
                    this.mousedown = true;
                });
            },
            handleMouseUp = e => {
                if (this.disabled || transitionOutOver || !this.mousedown) return;
                this.mouseup = true;
                transitionInOver && fadeOut()
            },
            removeFadeOutEnd = () => 0,
            removeTransitionInEnd = () => 0,
            fadeOut = () => {
                this.mousedown = false;
                requestAnimationFrame(() => {
                    removeFadeOutEnd = eventListener(this, transEnd, transitionOutEnd)
                });
            },
            removeCSS = () => {
                hostStyles.sheet.deleteRule(0);
                cssAdded = false;
            },
            reset = () => {
                this.animatable = false;
                this.mousedown = false;
                this.mouseup = false;
                removeFadeOutEnd();
                removeTransitionInEnd();
                cssAdded && removeCSS();
                transitionInOver = false;
                transitionOutOver = false;
            },
            positionPseduoElement = (x, y) => {
                let {width, height} = this.getBoundingClientRect(),
                    largest = Math.max(height, width);
                width = largest * 2 + (largest / 2);
                height = largest * 2 + (largest / 2);
                let xPos = x - (width / 2),
                    yPos = y - (height / 2);
                hostStyles.sheet.insertRule(`:host:before{left: ${xPos}px; top: ${yPos}px;width: ${width}px; height: ${height}px;}`, 0);
                cssAdded = true;
            },
            transitionInEnd = (evt) => {
                if (evt.pseudoElement && evt.propertyName === 'transform' && !transitionInOver) {
                    removeTransitionInEnd();
                    transitionInOver = true;
                    this.mouseup && fadeOut();
                }
            },
            transitionOutEnd = (evt) => {
                if (evt.pseudoElement && evt.propertyName === 'opacity') {
                    transitionOutOver = true;
                    reset();
                }
            };

        return eventListener([
            [this, 'mousedown', handleMouseDown],
            [document.documentElement, 'mouseup', handleMouseUp]
        ])
    };

    render(props) {
        console.log('rendered')
        return `<style id="styles">${styles(props.context.theme, props)}</style>`
    }
});