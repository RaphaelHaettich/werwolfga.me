import React, {Component} from 'react'
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import wolvestheme from './themes/wolvestheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
import Main from './pages/Main/Main'
import Create from './pages/Create/Create'
import Join from './pages/Join/Join'
import Gameadmin from './pages/Gameadmin/Gameadmin'
import Game from './pages/Game/Game'
import {firebaseAuth} from './config/constants'
import Navbar from './components/Navbar/Navbar'
import Paper from 'material-ui/Paper';
import Styles from './App.css.js'
import CircularProgress from 'material-ui/CircularProgress';
import SimpleState from 'react-simple-state'
const simpleState = new SimpleState()

function PrivateRoute({
  component: Component,
  authed,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
      ? <Component {...props}/>
      : <Redirect
        to={{
        pathname: '/login',
        state: {
          from: props.location
        }
      }}/>}/>
  )
}

function PublicRoute({
  component: Component,
  authed,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
      ? <Component {...props}/>
      : <Redirect to='/main'/>}/>
  )
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authed: false,
      loading: true,
      loader: true
    }
  }
  componentWillMount() {
    simpleState.addListener('count', {count: 0});
    simpleState.addListener('cards', {list: []});
    simpleState.addListener('state', {state: "draft"});
    simpleState.addListener('gameId', {id: ""});
    simpleState.addListener('loader', true);

    simpleState.subscribe('loader', this, (nextState) => {
      console.log("cahngedstate")
        this.setState({
            loader: nextState
        });
    });
  }
      
  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({authed: true, loading: false})
      } else {
        this.setState({authed: false, loading: false})
      }
    })
  }
  componentWillUnmount() {
    this.removeListener()
    simpleState.removeListener("count");
    simpleState.removeListener("cards");
    simpleState.removeListener("state");
    simpleState.removeListener("gameId");
    simpleState.removeListener('loader');
  }
  render() {
    let loader = null;
    if(this.state.loader === true){
      loader = <div id="swag" style={Styles.hidePage}><CircularProgress style={Styles.centered}/></div>
    }
    return this.state.loading === true
      ? <h1>Loading</h1>
      : (
        <MuiThemeProvider style={{height:"100%"}} muiTheme={getMuiTheme(wolvestheme)}>
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
                      <PublicRoute path='/' exact component={Home}/>
                      <PublicRoute authed={this.state.authed} path='/login' component={Login}/>
                      <PublicRoute authed={this.state.authed} path='/register' component={Register}/>
                      <PrivateRoute authed={this.state.authed} path='/main' component={Main}/>
                      <PrivateRoute authed={this.state.authed} path='/create' component={Create}/>
                      <PrivateRoute authed={this.state.authed} path='/join' component={Join}/>
                      <PrivateRoute authed={this.state.authed} path='/gameadmin' component={Gameadmin}/>
                      <PrivateRoute authed={this.state.authed} path='/game' component={Game}/>
                      <Route render={() => <h3>No Match</h3>}/>
                    </Switch>
                  </div>
                </div>
              </div>
            </BrowserRouter>
          </Paper>
        </MuiThemeProvider>
      );
  }
}
