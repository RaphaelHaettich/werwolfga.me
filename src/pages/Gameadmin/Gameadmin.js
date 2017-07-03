import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

export default class Home extends Component {
  render() {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        Home. Not Protected. Anyone can see this.
        <br/>
        <Link to="/login">
          <RaisedButton label="Login" primary={true}/>
        </Link>
        <Link to="/register">
          <RaisedButton label="Registration" primary={true} />
        </Link>
      </div>
    )
  }
}