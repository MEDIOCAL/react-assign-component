import React from "react"

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
        for(let re of AssignComponent.reducer) {
            await re(action)
        }
    }
    createStore = async (...rest) => {
        let l = 2
        while(l > 0 && rest.length > 0) {
            let arg = rest.shift()
            
            if(typeof arg === 'function') {
                AssignComponent.reducer.push(async (action) => {
                    await arg(action, this.syncSetState)
                })
            } else if(typeof arg === 'object') {
                for(let key in arg) {
                    this[key] =  arg[key](this.dispatch)
                }
            } else {
                throw new Error('1')
            }

            l--
        }
        return AssignComponent.reducer
    }
}

AssignComponent.reducer = []







