# AssignComponent
## Install
```
npm install react-assign-component
```
Depends on React and rxjs

## Howto

### AssignComponent

```
import React from "react"
import { AssignComponent } from 'react-assign-component'

class TestA extends AssignComponent {
    constructor(props) {
        super(props)
        this.state ={
            name: 'cxh2',
            age: 17,
            height: 180,
        }
        this.createStore(Assigner, actions)
    }

    change = async () => {
        this.a({type:'C'})
    }
    changeAge = async () => {
        this.a({type:'D'})
    }
    render() {
        return  <div>
                    <div onClick={this.change}>{this.state.name}</div>
                    <div onClick={this.changeAge}>{this.state.age}---{this.state.height}</div>
                </div>
    }
}

const actions = {
  a: function(dispatch) {
    return async (action) => {
        let res = await axios.post('...', action)
        dispatch({
            type: 'A',
            data: res.data
        })
    }
  }
}

function Assigner(action, assign) {
   switch(action.type) {
        case 'A': 
            return  assign({
                name: 'jk'
            })
        case 'B':
            return  assign({
                age: 19
            })
    } 
}
```

### AssignRxComponent

```
import React from "react"
import { AssignRxComponent } from 'react-assign-component'

export default class Rxc extends AssignRxComponent  {
    constructor() {
        super(...arguments)
        
        this.state = {
            name: 'rx',
            age: 19
        }
        this.createStore(actions, Assigner)
    }
    change = () =>{
        this.changName({
            type: 'RXJS',
            name: 'rxjs'
        })

        this.changeAge({
            age: 20
        })
    }

    changeByAction = () => {
        this.changeNameByAction({
            type: 'RXJS',
            name: 'RXJS'
        })
    }

    render() {
        return  <div>
                    <div onClick={this.change}>{ this.state.name } -- {this.state.age}</div>
                    <div onClick={this.changeByAction}>actions change name-age</div>
                </div>
    }
    
}

const actions = {
    changName: function(observable, dispatch) {
        observable
        .map( (data) => { 
            console.log('A', data); 
            return {type: data.type, name: 'nihao'}})
        .subscribe( (d) => {
           console.log('B', d)
           dispatch(d)
        })
    },
    changeAge: function(observable, dispatch) {
        observable.subscribe( (data) => {
            this.setState(data)
        })
    },
    changeNameByAction: function(observable, dispatch) {
        observable.map(action => {
            console.log('C', action)
            return {
                type: action.type,
                name: 'RXJS-ACTION'
            } 
        })
        .subscribe( (data) => {
            console.log('D', data)
            dispatch(data)
        })
    },
}


function Assigner(action, assign) {
    switch(action.type) {
        case 'RXJS': 
            return  assign( {
                name: action.name
            })
        case 'RX':
            return  assign({
                name: action.name
            })
    } 
}
```
## Keywords

react state  rxjs
