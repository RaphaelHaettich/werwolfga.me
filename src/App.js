import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import wolvestheme from './themes/wolvestheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Main from './pages/Main';
import Create from './pages/Create';
import Join from './pages/Join';
import Gameadmin from './pages/Gameadmin';
import Game from './pages/Game';
import { firebaseAuth } from './config/constants';
import Navbar from './components/Navbar';
import Paper from 'material-ui/Paper';
import Styles from './style.css.js';
import CircularProgress from 'material-ui/CircularProgress';
import SimpleState from 'react-simple-state';
const simpleState = new SimpleState();

const PrivateRoute = function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        (
          authed === true
            ? <Component {...props} />
            : <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location
                }
              }}
            />)}
    />
  );
};

const PublicRoute = function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? <Component {...props} /> : <Redirect to="/main" />}
    />
  );
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
      loading: true,
      loader: true
    };
  }
  componentWillMount() {
    const navlang = navigator.language.split('-')[0];
    let language = undefined;
    if (navlang === 'en' || navlang === 'de') {
      language = navlang;
    }
    simpleState.addListener(
      'lang',
      localStorage.getItem('lang') || language || 'en'
    );
    simpleState.addListener('count', { count: 0 });
    simpleState.addListener('cards', { list: [] });
    simpleState.addListener('state', { state: 'draft' });
    simpleState.addListener('gameId', { id: '' });
    simpleState.addListener('loader', true);

    simpleState.subscribe('loader', this, (nextState) => {
      this.setState({
        loader: nextState
      });
    });
  }

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true, loading: false });
      } else {
        this.setState({ authed: false, loading: false });
      }
    });
  }
  componentWillUnmount() {
    this.removeListener();
    simpleState.removeListener('count');
    simpleState.removeListener('cards');
    simpleState.removeListener('state');
    simpleState.removeListener('gameId');
    simpleState.removeListener('loader');
    simpleState.removeListener('lang');
  }
  render() {
    let loader = null;
    if (this.state.loader === true) {
      loader = (
        <div id="swag" style={Styles.hidePage}>
          <CircularProgress style={Styles.centered} />
        </div>
      );
    }
    return this.state.loading === true
      ? <h1>Loading</h1>
      : <MuiThemeProvider
        style={{ height: '100%' }}
        muiTheme={getMuiTheme(wolvestheme)}
      >
        <Paper>
          <BrowserRouter>
            <div>
              <Navbar
                title="Werwolf"
                routeTitle="/"
                routeRight="/login"
                labelRightAuthed="Logout"
                labelRightNotAuthed="Login"
                authed={this.state.authed}
              />
              <div className="container">
                <div className="row">
                  {loader}
                  <Switch>
                    <PublicRoute path="/" exact component={Home} />
                    <PublicRoute
                      authed={this.state.authed}
                      path="/login"
                      component={Login}
                    />
                    <PublicRoute
                      authed={this.state.authed}
                      path="/register"
                      component={Register}
                    />
                    <PrivateRoute
                      authed={this.state.authed}
                      path="/main"
                      component={Main}
                    />
                    <PrivateRoute
                      authed={this.state.authed}
                      path="/create"
                      component={Create}
                    />
                    <PrivateRoute
                      authed={this.state.authed}
                      path="/join"
                      component={Join}
                    />
                    <PrivateRoute
                      authed={this.state.authed}
                      path="/gameadmin"
                      component={Gameadmin}
                    />
                    <PrivateRoute
                      authed={this.state.authed}
                      path="/game"
                      component={Game}
                    />
                    <Route render={() => <h3>No Match</h3>} />
                  </Switch>
                </div>
              </div>
            </div>
          </BrowserRouter>
        </Paper>
      </MuiThemeProvider>;
  }
}
