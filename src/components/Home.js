import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from 'muicss/lib/react/button';

export default class Home extends Component {
  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        Home. Not Protected. Anyone can see this.
        <br />
        <Button variant="raised" color="primary"><Link to="/login" style={{color: "white"}} >Login</Link></Button>
        <Button variant="raised" color="primary"><Link to="/register" style={{color: "white"}} >Register</Link></Button>
      </div>
    )
  }
}