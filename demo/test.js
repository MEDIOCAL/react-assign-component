import React from "react"
import Component from '../src/component'
import TestA from './testA'
import TestB from './testB'
import Rxc from './rx'

export default class Test extends Component {
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
