import {vc, VC} from "./vdomComponent";
import {todos} from "../demo/todos";
import {h, Fragment} from "./vdom";

import {globalStyles} from "../src";

globalStyles(`*, *::before,
                *::after {
                box-sizing: border-box;
                }`
)


vc('derp', class extends VC {

    state = {
        // ...todos,
        // count: 0
    }

    static get tag() {
        return "x-derp";
    }

    didMount() {
    }

    didRender() {

    }

    add = () => {
        console.log('boolio')
        // this.state.count++
        // // this.state.bool = !this.state.bool;
        // this.refs.input.value = ""
        // this.refs.search.value = ""
        // todos.addTodo();
    };


    render() {
        // language=HTML format=true
        console.log('rendered')
        return (
            <Fragment>


                <div>
                    {/*<h1>count: {this.state.count}</h1>*/}
                    heyooo
                </div>
                <slot/>
            </Fragment>
        )
    }


});


export const App = vc('app', class extends VC {

    state = todos;

    static get tag() {
        return "x-app";
    }

    didMount() {
    }

    didRender() {

    }

    add = () => {
        console.log('boolio')
        // this.state.count++
        // // this.state.bool = !this.state.bool;
        // this.refs.input.value = ""
        // this.refs.search.value = ""
        todos.addTodo();

        // this.input.value = ""
        // this.search.value = "" //className={{derp: !!(this.state.count % 2)}}
    };


    render() {

        console.log('rendered')

        return (
            <Fragment>

                     <style>
                 {// language=CSS
                         `
                         :host, *, *::before,
                         *::after {
                             box-sizing: border-box;
                         }

                         .derp {
                             background: red;
                         }
                     `}
                     </style>


                <h1 className={{derp: todos.todoName === ''}}> TODOS!!!!</h1>
        <h4> Num search results: {todos.displayList.length}</h4>

                <button onClick={todos.makeABunch}> make a bunch </button>

                <br/>

                 <input ref={this.input} placeholder="add todo" value={todos.todoName}
                        onInput={(e) => todos.todoName = e.target.value}/>

                          <button onClick={() => {
                              // todos.addTodo()
                              this.add();
                          }} style="color:blue">
                                  Add todo !!! :
                            </button>
                        <br/>
            <input placeholder="search" value={todos.searchValue}
                   onInput={(e) => todos.setSearchValue(e.target.value)}/>

                <div style="width:100%;display:flex">


                    <div style="width:50%">

                        <ul>

                            {todos.displayList.map((t, i) => (
                                <li key={t.id}>
                                    {t.name}
                                    <button onClick={() => {
                                        console.log('derp')
                                        todos.removeTodo(t)
                                    }}>X
                                    </button>
                                </li>
                            ))}

                        </ul>

                    </div>


                    <div style="width:50%">

                        {todos.displayList.map(t => (<div key={t.id}>{t.name}</div>))}


                    </div>


                </div>


            </Fragment>
        )
    }


});
