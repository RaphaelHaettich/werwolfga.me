/*
*   Required Props:
*   dbReference: string,
*   labelText: string
*   state: string
*/

import React, {Component} from 'react'
import {base} from '../../config/constants'
import SimpleState from 'react-simple-state'
const simpleState = new SimpleState()


export default class counterlabel extends Component {
  constructor(props) {
    super(props);
    const count = simpleState.getState(this.props.state);

    this.state = {
      count: count
    }
    
  }
  componentDidMount() {
    base.bindToState(this.props.dbReference, {
      context: this,
      state: 'count',
      asArray: true
    });
  }
  
  render() {
    var counter = this.state.count;
    if (counter !== undefined) {
      counter = counter.length
    }
    simpleState.evoke(this.props.state, {
      count: counter
    });
    return (
      <div>
        <h3>
          {this.props.labelText}
          <label>{counter}</label>
        </h3>
      </div>
    )
  }
}

