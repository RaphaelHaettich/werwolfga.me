import React, { Component } from 'react';
import { auth } from '../../helpers/auth';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import SimpleState from 'react-simple-state';
import WarningWindow from '../../components/WarningWindow';
const simpleState = new SimpleState();

function setErrorMsg(error) {
  return { registerError: error.message };
}

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerError: null
    };
  }

  componentDidMount() {
    simpleState.evoke('loader', false);
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.displayName.input.value === '') {
      this.setState({ registerError: 'You forgot the Username' });
      this.dialog.handleOpen();
    } else {
      auth(
        this.email.input.value,
        this.pw.input.value,
        this.displayName.input.value
      ).catch(e => {
        this.setState(setErrorMsg(e));
        this.dialog.handleOpen();
      });
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <TextField
            fullWidth
            type="email"
            ref={email => (this.email = email)}
            floatingLabelText="Email"
          />
          <TextField
            fullWidth
            type="text"
            ref={displayName => (this.displayName = displayName)}
            floatingLabelText="Username"
          />
          <TextField
            fullWidth
            type="password"
            ref={pw => (this.pw = pw)}
            floatingLabelText="Password"
          />
          <br />
          <RaisedButton type="submit" label="Register" primary />
          <Link to="/login">
            <RaisedButton label="Login" />
          </Link>
        </form>
        <WarningWindow
          message={this.state.registerError}
          ref={dialog => {
            this.dialog = dialog;
          }}
        />
      </div>
    );
  }
}
