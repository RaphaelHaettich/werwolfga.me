import React, { Component } from 'react'
import { auth } from '../../helpers/auth'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class Register extends Component {
  state = { registerError: null }
  handleSubmit = (e) => {
    e.preventDefault()
    auth(this.email.value, this.pw.value)
      .catch(e => this.setState(setErrorMsg(e)))
  }
  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="mui-textfield ">
            <input type="text" ref={(email) => this.email = email} />
            <label>Email</label>
          </div>
          <div className="mui-textfield ">
            <input type="password"  ref={(pw) => this.pw = pw} />
            <label>Password</label>
          </div>
          {
            this.state.registerError &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.registerError}
            </div>
          }
          <RaisedButton type="submit" label="Register" primary={true} />
          <Link to="/login">
            <RaisedButton label="Login" />
          </Link>
        </form>
      </div>
    )
  }
}