import React, {Component} from 'react'
import SimpleState from 'react-simple-state'
const simpleState = new SimpleState()

export default class Gameadmin extends Component {
  componentDidMount(){
    simpleState.evoke("loader", false)
  }
  render() {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        Game
      </div>
    )
  }
}