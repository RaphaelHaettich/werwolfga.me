import React, { Component } from 'react'
import { auth } from '../../helpers/auth'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField'

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class Register extends Component {
  state = { registerError: null }
  handleSubmit = (e) => {
    e.preventDefault()
    auth(this.email.value, this.pw.input.value.value)
      .catch(e => this.setState(setErrorMsg(e)))
  }
  render () {
    return (
      <div >
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <TextField
            type="email"
            ref={(email) => this.email = email}
            floatingLabelText="Email"
          />
          <TextField
            type="password"
            ref={(pw) => this.pw = pw}
            floatingLabelText="Password"
          />
          {
            this.state.registerError &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.registerError}
            </div>
          }
          <br />
          <RaisedButton type="submit" label="Register" primary={true} />
          <Link to="/login">
            <RaisedButton label="Login" />
          </Link>
        </form>
      </div>
    )
  }
}
