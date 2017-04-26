import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import {logout} from '../helpers/auth'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';




class navbar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      authed: false,
      loading: true
    };
  }
  goHome() {
    this.props.history.push('/main')
  }
  goLogin() {
    logout()
    this.props.history.push('/login')
  }
  render() {
    return (
      <AppBar
        title={ <span> Werwolves </span>}

        iconElementRight={this.props.authed
        ? 
        <FlatButton label="Logout"/>
        : 
        <FlatButton label="Login"/>
        }
        onTitleTouchTap={this
        .goHome
        .bind(this)}
        onRightIconButtonTouchTap={this
        .goLogin
        .bind(this)}
        showMenuIconButton={false}/>
    )
  }
}

export default withRouter(navbar)
