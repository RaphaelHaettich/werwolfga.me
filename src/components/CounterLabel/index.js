/*
*   Required Props:
*   dbReference: string,
*   labelText: string
*   state: string
*/

import React, { Component, } from 'react';
import { base, } from '../../config/constants';
import SimpleState from 'react-simple-state';
const simpleState = new SimpleState();

export default class Counterlabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  componentWillReceiveProps(props) {
    this.ref = base.bindToState(props.dbReference, {
      context: this,
      state: 'count',
      asArray: true,
    });
  }
  componentWillUnmount() {
    if (this.ref) {
      base.removeBinding(this.ref);
    }
  }

  render() {
    let counter = this.state.count;
    simpleState.evoke(this.props.state, {
      count: counter,
    });
    if (counter !== undefined) {
      counter = counter.length;
    }

    return (
      <div>
        <h3>
          {this.props.labelText}
          <div >
            {counter}
          </div>
        </h3>
      </div>
    );
  }
}
