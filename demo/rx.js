import React from "react"
import { AssignRxComponent } from '../src'

export default class Rxc extends AssignRxComponent  {
    constructor() {
        super(...arguments)
        
        this.state = {
            name: 'rx',
            age: 19
        }
        this.createStore(actions, reducer)
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
                    <div onClick={this.changeByAction}>actions改变name-age</div>
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


function reducer(action, assign) {
    console.log('--start---')
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
    console.log('--end---')
}