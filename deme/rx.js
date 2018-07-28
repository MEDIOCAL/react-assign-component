import React from "react"
import { RxComponent } from '../component'

export default class Rxc extends RxComponent  {
    constructor() {
        super(...arguments)
        
        this.state = {
            name: 'rx',
            age: 19
        }
        this.createStore(actions)
    }
    change = () =>{
        this.changName({
            name: 'rxjs'
        })

        this.changeAge({
            age: 20
        })
    }

    render() {
        return  <div onClick={this.change}>
                    { this.state.name } -- {this.state.age}
                </div>
    }
    
}

const actions = {
    changName: function(observable) {
        observable
        .map( (data) => { console.log(data); return {name: 'nihao'}})
        .subscribe( (d) => {
           this.setState(d)
        })
    },
    changeAge: function(observable) {
        observable.subscribe( (data) => {
            this.setState(data)
        })
    }
}
