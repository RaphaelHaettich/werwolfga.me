import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

export default class main extends Component {
  render () {
    return (
      <div>
        Main. This is a protected route. You can only see this if you're authed.
        <Link to="/create"><RaisedButton label="Create" primary={true} /></Link>
        <Link to="/join"><RaisedButton label="Join" primary={true} /></Link>
      </div>
    )
  }
}