import React, {Component} from 'react'
import {base} from '../config/constants'

export default class countbutton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }
  componentDidMount() {
    base.bindToState('activegame/'+this.props.lobbyKey+'/memberarray/', {
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
          Joined People:
          <label>{counter}</label>
        </h3>
      </div>
    )
  }
}

