import React, {Component} from 'react'
import {login, resetPassword} from '../../helpers/auth'
import {Link} from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import SimpleState from 'react-simple-state'
import Warningwindow from '../../components/Warningwindow/Warningwindow'
const simpleState = new SimpleState()

function setErrorMsg(error) {
  return {loginMessage: error}
}

export default class Login extends Component {
  state = {
    loginMessage: null
  }
  handleSubmit = (e) => {
    e.preventDefault()
    login(this.email.input.value, this.pw.input.value).catch((e) => {
      console.log(e)
      this.setState(setErrorMsg(e.message));
      this
        .dialog
        .handleOpen()
    })
  }

  resetPassword = () => {
    resetPassword(this.email.value).then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`))).catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }
  componentDidMount() {
    simpleState.evoke("loader", false)
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
            fullWidth={true}
            ref={(email) => this.email = email}
            floatingLabelText="Email"/>
          <TextField
            fullWidth={true}
            type="password"
            ref={(pw) => this.pw = pw}
            floatingLabelText="Password"/>
          <br/>
          <RaisedButton type="submit" label="Login" primary={true}/>
          <Link to="/register">
            <RaisedButton label="Register"/>
          </Link>
          <br />
          <br/>
          <RaisedButton onClick={this.resetPassword} label="Forgot password" backgroundColor="#E53935"/>
        </form>
        <Warningwindow
          message={this.state.loginMessage}
          ref={(dialog) => {
          this.dialog = dialog
        }}/>
      </div>
    )
  }
}
