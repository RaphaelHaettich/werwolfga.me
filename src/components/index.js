import React, { Component } from 'react'
//import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Main from './protected/Main'
import Create from './protected/Create'
import Join from './protected/Join'
import { firebaseAuth } from '../config/constants'
import Navbar from './Navbar'

function PrivateRoute({
  component: Component,
  authed,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: '/login',
            state: {
              from: props.location
            }
          }} />} />
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
        ? <Component {...props} />
        : <Redirect to='/main' />} />
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true
  }
  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true, loading: false })
      } else {
        this.setState({ authed: false, loading: false })
      }
    })
  }
  componentWillUnmount() {
    this.removeListener()
  }
  render() {
    return this.state.loading === true
      ? <h1>Loading</h1>
      : (
        <BrowserRouter>
          <div>
            <Navbar authed={this.state.authed} />
            <div className="container">
              <div className="row">
                <Switch>
                  <PublicRoute path='/' exact component={Home} />
                  <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                  <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                  <PrivateRoute authed={this.state.authed} path='/main' component={Main} />
                  <PrivateRoute authed={this.state.authed} path='/create' component={Create} />
                  <PrivateRoute authed={this.state.authed} path='/join' component={Join} />
                  <Route render={() => <h3>No Match</h3>} />
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      );
  }
}
