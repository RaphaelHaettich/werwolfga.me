import React, {Component} from 'react'
import {auth} from '../../helpers/auth'
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router-dom'
import TextField from 'material-ui/TextField'
import SimpleState from 'react-simple-state'
import Warningwindow from '../../components/Warningwindow/Warningwindow'
const simpleState = new SimpleState()

function setErrorMsg(error) {
  return {registerError: error.message}
}

export default class Register extends Component {
  state = {
    registerError: null
  }
  handleSubmit = (e) => {
    e.preventDefault()
    if (this.displayName.input.value === "") {
      this.setState({registerError: "You forgot the Username"})
      this
        .dialog
        .handleOpen()
    } else {
      auth(this.email.input.value, this.pw.input.value, this.displayName.input.value).catch((e) => {
        this.setState(setErrorMsg(e));
        this
          .dialog
          .handleOpen()
      })
    }
  }
  componentDidMount() {
    simpleState.evoke("loader", false)
  }
  render() {
    return (
      <div >
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <TextField
            fullWidth={true}
            type="email"
            ref={(email) => this.email = email}
            floatingLabelText="Email"/>
          <TextField
            fullWidth={true}
            type="text"
            ref={(displayName) => this.displayName = displayName}
            floatingLabelText="Username"/>
          <TextField
            fullWidth={true}
            type="password"
            ref={(pw) => this.pw = pw}
            floatingLabelText="Password"/>
          <br/>
          <RaisedButton type="submit" label="Register" primary={true}/>
          <Link to="/login">
            <RaisedButton label="Login"/>
          </Link>
        </form>
        <Warningwindow
          message={this.state.registerError}
          ref={(dialog) => {
          this.dialog = dialog
        }}/>
      </div>
    )
  }
}
