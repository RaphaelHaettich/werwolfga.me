import React, { Component, } from 'react';
import { login, resetPassword, } from '../../helpers/auth';
import { Link, } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SimpleState from 'react-simple-state';
import WarningWindow from '../../components/WarningWindow';
const simpleState = new SimpleState();

const setErrorMsg = function setErrorMsg(error) {
  return { loginMessage: error, };
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginMessage: null,
      secondActionLabel: null,
      secondActionShow: false,
    };
  }

  componentDidMount() {
    simpleState.evoke('loader', false);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    login(this.email.input.value, this.password.input.value).catch((event) => {
      if (event.code === 'auth/wrong-password') {
        this.setState({ secondActionLabel: 'Forgot Password', });
        this.setState({ secondActionShow: true, });
      }
      this.setState(setErrorMsg(event.message));
      this.dialog.handleOpen();
    });
  };
  
  resetPassword = () => {
    this.dialog.handleClose();
    this.setState({ secondActionShow: false, });
    resetPassword(this.email.input.value)
      .then(() =>
        this.setState(
          setErrorMsg(`Password reset email sent to ${this.email.input.value}.`)
        )
      )
      .catch(
        error => this.setState(setErrorMsg(`Email address not found. Error: ${error}`)),
        this.dialog.handleOpen()
      );
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <TextField
            type="email"
            fullWidth
            ref={email => (this.email = email)}
            floatingLabelText="Email"
          />
          <TextField
            fullWidth
            type="password"
            ref={password => (this.password = password)}
            floatingLabelText="Password"
          />
          <br />
          <RaisedButton type="submit" label="Login" primary />
          <Link to="/register">
            <RaisedButton label="Register" />
          </Link>
          <br />
        </form>
        <WarningWindow
          message={this.state.loginMessage}
          secondAction={this.resetPassword}
          secondActionShow={this.state.secondActionShow}
          secondActionLabel={this.state.secondActionLabel}
          ref={(dialog) => {
            this.dialog = dialog;
          }}
        />
      </div>
    );
  }
}
