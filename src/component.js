import React from "react"
import { Observable, Subject} from "rxjs"

export default class Component extends React.Component {
    
    syncSetState = (state) => {
        const me = this
        return new Promise(function(reslove) {
            me.setState(state, () => {
                reslove(me.state)
            })
        })
    }
    
    dispatch = async (action) => {
        for(let re of Component.reducer) {
            await re(action)
        }
    }

    createStore = async (...rest) => {
        if(rest.length === 1) {
            if(typeof rest[0] === 'function') {
                let reducer = rest[0]
                Component.reducer.push(async (action) => {
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
            Component.reducer.push(async (action) => {
                await reducer(action, this.syncSetState)
            })
            for(let key in dispatchs) {
                this[key] =  dispatchs[key](this.dispatch)
            }
        }
        return Component.reducer
    }
}

Component.reducer = []


export class RxComponent extends React.Component {
   
    constructor(props) {
        super(props);
    }

    createStore(actions) {
        const subject = new Subject()
        Object.keys(actions).map((key) => {
            this[key] = function() {
                subject.next(arguments[0])
            }
            actions[key].call(this, subject)
        })
    }
}

