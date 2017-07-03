import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import Styles from './Main.css.js'

export default class main extends Component {
  render () {
    return (
      <div style={Styles.centered}>
        <Link style={Styles.buttonPaddingRight} to="/create"><RaisedButton label="Create" primary={true} /></Link>
        <Link to="/join"><RaisedButton label="Join" primary={true} /></Link>
      </div>
    )
  }
}