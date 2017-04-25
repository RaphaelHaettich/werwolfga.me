import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from 'muicss/lib/react/button';

export default class main extends Component {
  render () {
    return (
      <div>
        Main. This is a protected route. You can only see this if you're authed.
        <Link to="/create"><Button variant="raised" color="primary">Create</Button></Link>
        <Link to="/join"><Button variant="raised" color="primary">Join</Button></Link>
      </div>
    )
  }
}