
    
# @iosio/pwc

*** still in the works ***

*** not tested, still splitting up code into individual repos n stuff ***

> create web components using preact

## Installation 
```sh
npm install @iosio/pwc --save
```

**Quick example for now**
```js
import {h, Fragment} from 'preact';
import {useState} from 'preact/hooks';
import {pwc} from '@iosio/pwc';

const Tester = pwc('tester-component', ({foo, host, initialVal}) => {

  const [color, setColor] = useState('red')
  
  const changeColor = () => {
      setColor(color === 'red' ? 'blue' : 'red');
  }
  
  return (
    <Fragment>
    
      <style>
        :host{
          background: aliceblue;
        }
      
      </style>
    
    
      <h1 style={{color}}>hello i am a {initialVal}</h1>
      
      <button onClick={changeColor}>hello - {foo}</button>
      
      <slot/>
    </Fragment>
  )
  
}, {foo: Number, initialVal: String});

const App = ()=>{
    <Fragment>

        <Tester initial-val={'preact web component'}/>   
        
        <tester-component>
            <h1>heeeyooo</h1>
        </tester-component>
        
    </Fragment>
}

```


### License


[MIT]

[MIT]: https://choosealicense.com/licenses/mit/


