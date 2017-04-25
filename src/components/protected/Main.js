import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from 'muicss/lib/react/button';

export default class main extends Component {
  render () {
    return (
      <div>
        Main. This is a protected route. You can only see this if you're authed.
        <Button variant="raised" color="primary"><Link to="/create" style={{color: "white"}}>Create</Link></Button>
        <Button variant="raised" color="primary"><Link to="/join" style={{color: "white"}}>Join</Link></Button>
      </div>
    )
  }
}