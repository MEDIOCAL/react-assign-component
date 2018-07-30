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
        if(rest.length === 1) {
            if(typeof rest[0] === 'function') {
                let reducer = rest[0]
                AssignComponent.reducer.push(async (action) => {
                    await reducer(action, this.syncSetState)
                })
            } else {
                let dispatchs = rest[0]
               
                for(let key in dispatchs) {
                    this[key] =  dispatchs[key](this.dispatch)
                }
            }
        } else if(rest.length === 2) {
            let reducer = rest[0]
            let dispatchs = rest[1]
            AssignComponent.reducer.push(async (action) => {
                await reducer(action, this.syncSetState)
            })
            for(let key in dispatchs) {
                this[key] =  dispatchs[key](this.dispatch)
            }
        }
        return AssignComponent.reducer
    }
}

AssignComponent.reducer = []







