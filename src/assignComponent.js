import React from "react"

React.Component.store = []

export class AssignComponent extends React.Component {
    syncSetState = (state) => {
        const me = this
        return new Promise(function(reslove) {
            me.setState(state, () => {
                reslove(me.state)
            })
        })
    }
    
    dispatch = async (action) => {
        for(let re of AssignComponent.store) {
            await re(action)
        }
    }
    createStore = async (...rest) => {
        let l = 2
        while(l > 0 && rest.length > 0) {
            let arg = rest.shift()
            
            if(typeof arg === 'function') {
                this.storeIndex = AssignComponent.store.push(async (action) => {
                    await arg(action, this.syncSetState)
                }) - 1
            } else if(typeof arg === 'object') {
                for(let key in arg) {
                    this[key] =  arg[key](this.dispatch)
                }
            } else {
                throw new Error('1')
            }

            l--
        }
        return AssignComponent.store
    }

    componentWillUnmount = () => {
        AssignComponent.store.splice(this.storeIndex, 1)
    }
    
}








