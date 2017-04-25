import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Button from 'muicss/lib/react/button';

export default class Home extends Component {
  render() {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        Home. Not Protected. Anyone can see this.
        <br/>
        <Link to="/login">
          <Button variant="raised" color="primary">Login</Button>
        </Link>
        <Link to="/register">
          <Button variant="raised" color="primary">Register</Button>
        </Link>
      </div>
    )
  }
}