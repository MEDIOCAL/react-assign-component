import React from "react"
import { AssignComponent } from '../src'
import actions from './actions'

export default class TestA extends AssignComponent {
    constructor(props) {
        super(props)
        this.state ={
            name: 'cxh2',
            age: 17,
            height: 180,
        }
        this.createStore(Reduce, actions)
    }

    change = async () => {
        this.a({type:'C'})
    }
    changeAge = async () => {
        this.a({type:'D'})
    }
    render() {
        console.log(this)
        return  <div>
                    <div onClick={this.change}>{this.state.name}</div>
                    <div onClick={this.changeAge}>{this.state.age}---{this.state.height}</div>
                </div>
    }
}


function Reduce( action, assign) {
    switch(action.type) {
        case 'A': 
            return  assign({
                name: 'chenxuehui'
            })
        case 'B':
            return  assign({
                age: 19
            })
    } 
}