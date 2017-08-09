import React, { Component, } from 'react';
import { auth, } from '../../helpers/auth';
import RaisedButton from 'material-ui/RaisedButton';
import { Link, } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import SimpleState from 'react-simple-state';
import WarningWindow from '../../components/WarningWindow';
const simpleState = new SimpleState();

const setErrorMsg = function setErrorMsg(error) {
  return { registerError: error.message, };
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerError: null,
    };
  }

  componentDidMount() {
    simpleState.evoke('loader', false);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.displayName.input.value === '') {
      this.setState({ registerError: 'You forgot the Username', });
      this.dialog.handleOpen();
    } else {
      auth(
        this.email.input.value,
        this.password.input.value,
        this.displayName.input.value
      ).catch((event) => {
        this.setState(setErrorMsg(event));
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
            ref={password => (this.password = password)}
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
          ref={(dialog) => {
            this.dialog = dialog;
          }}
        />
      </div>
    );
  }
}
