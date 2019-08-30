import {vh, VH} from "../experiments/htmldiff_component";
import {todos} from "./todos";

import {globalStyles} from "../src";

globalStyles(`*, *::before,
                *::after {
                box-sizing: border-box;
                }`
)
import {vDiff} from "../experiments/htmlDiff";


export const App = vh('app', class extends VH {

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
        // this.state.bool = !this.state.bool;
        this.refs.input.value = ""
        this.refs.search.value = ""
        todos.addTodo();
    };


    render({on, ref}) {
        // language=HTML format=true
        console.log('rendered')
        return `
        <style>
            :host, *, *::before,
            *::after {
            box-sizing: border-box;
            }
            .derp{
                background: red;
            }
        </style>
        <h1> TODOS!!!!</h1>
        <h4> Num search results: ${todos.displayList.length}</h4>
        
        
        <button ${on('click', todos.makeABunch)}> make a bunch </button>
        <br>
        <input data-input="_0" onfocus="this.value = this.value;" value="${todos.todoName}" placeholder="add todo" ${ref('input')} ${on('input', (e) => todos.todoName = e.target.value)} />
            <br>
        <button ${on('click', () => {
            // todos.addTodo()
            this.add();
        })} style="color:blue" > 
              Add todo !!! : 
        </button>
            <br>
        <input data-input="_1" onfocus="this.value = this.value;" placeholder="search" ${ref('search')} value="${todos.searchValue}" ${on('input', (e) => todos.setSearchValue(e.target.value))} />
        
        
   
        
        <div style="width:100%;display:flex">'
            <div style="width:50%">
            
                <ul data-no-dif>       
                ${todos.displayList.map(t => (
                `<li>${t.name} <button ${on('click', () => todos.removeTodo(t))}>X</button></li>`
            )).join('')}
                </ul>
            </div>
            
            
            
        
        </div>
       
`;
    }


});


/*

   <div>
        $ {
    this
.
    state
.
    count
%
    2
?
    '<span>yo yo</span>': 'heyyooo <h1>derp</h1> <h2>derp</h2> <h3>derrrrppp</h3>'
}

        </div>


this.state.count % 2 ?
`

    <h1> helloo!!!!</h1>

    <span>yo yo</span>

    <button id="btn"> click me !!! : ${this.state.count}</button>

    `
 :
`
    <div>
    <h1> helloo!!!!</h1>

    <h1>yo yo yo!!!!!</h1>

    <button id="btn"> click me !!! : ${this.state.count}</button>
    </div>
    `

 */