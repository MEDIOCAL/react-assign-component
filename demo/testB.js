import React from "react"
import Component from '../src/component'

export default class TestB extends Component {
    constructor(props) {
        super(props)
        this.state ={
            name: 'cxh',
            age: 12
        }
        this.createStore(Reduce, dispatchs)
    }

    change = async () => {
        this.c({type:'A'})
        this.c({type:'B'})
    }

    render() {
        return <div onClick={this.change}>{this.state.name} + {this.state.age}</div>
    }
}

const dispatchs = {
    c: function(dispatch) {
        return function(actions) {
            dispatch(actions)
        }
    }
}

function Reduce( action, assign) {
    switch(action.type) {
        case 'C': 
            return assign( {
                name: 'chenxuehui2'
            })
        case 'D': 
            return assign({
                age: 20
            })
    } 
}