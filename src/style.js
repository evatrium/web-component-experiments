import {h, Component} from "preact";
import {isObj, isFunc} from "@iosio/util";
import {context} from "./pwc";

export class Style extends Component {

    shouldComponentUpdate(nextProps) {
        let now = this.props.updatable, next = nextProps.updatable;
        return isObj(next) ? propsChanged(next, now) : false;
    }

    render({children}) {
        return (
            <style>
                {isFunc(children) ? children(context) : children}
            </style>
        )
    }
}