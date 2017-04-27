/*
*   Required Props:
*   dbReference: string,
*   labelText: String
*/
import React, {Component} from 'react'
import {base} from '../../config/constants'

export default class counterlabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
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

