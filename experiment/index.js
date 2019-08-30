import {theme} from "./theme";
import {x, X} from "./PureJS_NoFrameworks";
import {Root} from "./x-root";
import {Nav} from "./x-nav";
import {Page} from "./x-page";
import {Ink} from "./x-ink";
import {Panel} from "./x-panel";
import {Btn} from "./x-btn";

x('app', class extends X {
    state = {
        derp: 0,
        bool: false,
    };


    btnClick = () => {
        let {state} = this;
        state.derp = state.derp + 1;
    };

    lifeCycle() {

    }

    render({on, ref}) {
        console.log('rendered app')
        return `
        <x-root>
            <x-nav>
    
            </x-nav>
        
            <x-page nav-top pad-b>
    
          
    
                <x-btn ink ${on('click', this.btnClick)}> click me!!! </x-btn>
                
                <x-btn data-bind="$primary:bool"  ${on('click', () => this.state.bool = !this.state.bool)}> BOOL!!! </x-btn>
    
                <x-panel ${ref('panel')} style="height:200px;width:200px;position:relative">
                    <h1 data-bind="derp"></h1>
                    <x-ink></x-ink>
                </x-panel>
    
                 <x-panel style="height:200px;width:200px;position:relative">
                    <h1 data-bind="derp"></h1>
                    <x-ink></x-ink>
                </x-panel>
                
            </x-page>
    
        </x-root>
      `;
    }
});
