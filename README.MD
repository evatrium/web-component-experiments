
    
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
import {obi} from '@iosio/obi/preact';
import {pwc} from '@iosio/pwc';


let state = obi({color: 'red'});

const Tester = pwc('tester-component', ({foo, host}) => {

  const [color, setColor] = useState('red')
  
  const changeColor = () =>{
      setColor(color === 'red' ? 'blue' : 'red');
  }
  
  return (
    <Fragment>
    
      <style>
        :host{
          background: aliceblue;
        }
      
      </style>
    
    
      <h1 style={{color}}>hello i am {color}</h1>
      
      <button onClick={changeColor}>hello - {foo}</button>
      
    </Fragment>
  )
  
}, {foo: Number});


//---------

//only enumerable properties are iterated through 
Object.keys(state).forEach((key)=>{
    console.log(key)
})
//logs: color 

```


### License


[MIT]

[MIT]: https://choosealicense.com/licenses/mit/


