import React from "react"
import { Subject } from "rxjs"

export class AssignRxComponent extends React.Component {  

    syncSetState = (state) => {
        const me = this
        return new Promise(function(reslove) {
            me.setState(state, () => {
                reslove(me.state)
            })
        })
    }
    
    dispatch = async (action) => {
        for(let re of AssignRxComponent.reducer) {
            await re(action)
        }
    }

    createStore(actions, fn) {
        Object.keys(actions).map((key) => {
            const subject = new Subject()
            this[key] = function() {
                subject.next(arguments[0])
                return subject
            }
            actions[key].call(this, subject, this.dispatch)
        })

        if(fn) {
            AssignRxComponent.reducer.push( async (action) => {
                await fn.call(this, action, this.syncSetState)
            } )
        }
    }
} 

AssignRxComponent.reducer = []
