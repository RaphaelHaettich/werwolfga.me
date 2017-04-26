import React, {Component} from 'react'
import Button from 'muicss/lib/react/button'
import {base} from '../../config/constants'

export default class countbutton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }
  componentDidMount() {
    console.log(this.props.lobbyKey)
    base.bindToState('activegame/'+this.props.lobbyKey+'/memberarray/', {
      context: this,
      state: 'count',
      asArray: true
    });
  }
  
  render() {
    var counter = this.state.count;
    console.log(counter)
    if (counter !== undefined) {
      counter = counter.length
    }
    return (
      <div>
        <h3>
          Joined People:
          <label>{counter}</label>
        </h3>
        <Button color="primary">Start</Button>
      </div>
    )
  }
}

