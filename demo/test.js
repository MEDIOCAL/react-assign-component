import React from "react"
import { AssignComponent } from '../src'
import TestA from './testA'
import TestB from './testB'
import Rxc from './rx'

export default class Test extends AssignComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return  <div>
                    <TestA />
                    <TestB />
                    <div style={{margin: "20px auto"}}>--------------------------------</div>
                    <p>Rxjs</p>
                    <Rxc />
                </div>
    }
}
