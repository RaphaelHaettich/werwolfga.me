import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import Styles from './Main.css.js'
import SimpleState from 'react-simple-state'
import {base} from '../../config/constants'
import {fetch} from '../../helpers/dbcalls'
const simpleState = new SimpleState()

export default class main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: null
    };
  }
  componentDidMount(){
    const userId = base
      .app()
      .INTERNAL
      .getUid()

    let name = new Promise((resolve, reject) => {
      const collection = 'users/' + userId 
      fetch(resolve, reject, collection);
    });

    name.then((data) => {
      this.setState({displayName: data[0].displayName})
    });
    simpleState.evoke("loader", false)
  }
  componentWillUnmount(){
    simpleState.evoke("loader", true)
  }
  render () {
    return (
      <div>
      <h2>Hi {this.state.displayName}</h2>
      <div style={Styles.centered}>
        <Link style={Styles.buttonPaddingRight} to="/create"><RaisedButton label="Create" primary={true} /></Link>
        <Link to="/join"><RaisedButton label="Join" primary={true} /></Link>
      </div>
      </div>
    )
  }
}