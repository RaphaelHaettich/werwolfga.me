import React, {Component} from 'react'
import {login, resetPassword} from '../helpers/auth'
import {Link} from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'


function setErrorMsg(error) {
  return {loginMessage: error}
}

export default class Login extends Component {
  state = {
    loginMessage: null
  }
  handleSubmit = (e) => {
    e.preventDefault()
    login(this.email.value, this.pw.value).catch((error) => {
      this.setState(setErrorMsg('Invalid username/password.'))
    })
  }
  resetPassword = () => {
    resetPassword(this.email.value).then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`))).catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }
  render() {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1>
          Login
        </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="mui-textfield ">
            <input type="text" ref={(email) => this.email = email}/>
            <label>Email</label>
          </div>
          <div className="mui-textfield ">
            <input type="password" ref={(pw) => this.pw = pw}/>
            <label>Password</label>
          </div>
          {this.state.loginMessage && <div className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            <span className="sr-only">Error:</span>
            &nbsp;{this.state.loginMessage}
            <a href="#" onClick={this.resetPassword} className="alert-link">Forgot Password?</a>
          </div>
          }
          <RaisedButton type="submit" label="Login" primary={true} />
          <Link to="/register">
            <RaisedButton label="Register" />
          </Link>
        </form>
      </div>
    )
  }
}
