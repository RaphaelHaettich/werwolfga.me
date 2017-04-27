import React, {Component} from 'react'
import {login, resetPassword} from '../../helpers/auth'
import {Link} from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'


function setErrorMsg(error) {
  return {loginMessage: error}
}

export default class Login extends Component {
  state = {
    loginMessage: null
  }
  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.pw.input.value)
    login(this.email.input.value, this.pw.input.value).catch((error) => {
      this.setState(setErrorMsg('Invalid username/password.'))
    })
  }
  resetPassword = () => {
    resetPassword(this.email.value).then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`))).catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }
  render() {
    return (
      <div>
        <h1>
          Login
        </h1>
        <form onSubmit={this.handleSubmit}>
          <TextField
            type="email"
            ref={(email) => this.email = email}
            floatingLabelText="Email"
          />
          <TextField
            name="Password"
            type="password"
            ref={(pw) => this.pw = pw}
            floatingLabelText="Password"
          />
          {this.state.loginMessage && <div className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            <span className="sr-only">Error:</span>
            &nbsp;{this.state.loginMessage}
            <a href="#" onClick={this.resetPassword} className="alert-link">Forgot Password?</a>
          </div>
          }
          <br />
          <RaisedButton type="submit" label="Login" primary={true} />
          <Link to="/register">
            <RaisedButton label="Register" />
          </Link>
        </form>
      </div>
    )
  }
}
