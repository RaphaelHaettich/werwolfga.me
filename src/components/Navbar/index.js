/*
*   Required Props:
*   title: string,
*   routeTitle: string,
*   routeRight: string,
*   labelRightAuthed: string,
*   labelRightNotAuthed: string
*   authed: boolean
*/

import React, { Component, } from 'react';
import { withRouter, } from 'react-router-dom';
import { logout, } from '../../helpers/auth';
import AppBar from 'material-ui/AppBar';
import Styles from './style.css.js';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import SimpleState from 'react-simple-state';
const simpleState = new SimpleState();

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
      loading: true,
      lang1Checked: false,
      lang2Checked: false,
    };
  }

  componentWillMount() {
    // check language and set the language as selected
    if (simpleState.getState('lang') === 'en') {
      this.setState({ lang1Checked: true, });
      this.setState({ lang2Checked: false, });
    } else if (simpleState.getState('lang') === 'de') {
      this.setState({ lang2Checked: true, });
      this.setState({ lang1Checked: false, });
    }
  }

  titleAction = () => {
    this.props.history.push(this.props.routeTitle);
  }
  rightLabelAction = () => {
    logout();
    this.props.history.push(this.props.routeRight);
  };

  rightLabelAbout = () => {
    this.props.history.push('/about');
  };
  rightLabelRules = () => {
    this.props.history.push('/rules');
  };

  // set language to lang 1
  lang1 = () => {
    simpleState.evoke('lang', 'en');
    localStorage.setItem('lang', 'en');
    this.setState({ lang1Checked: true, });
    this.setState({ lang2Checked: false, });
  };

  // set language to lang 1
  lang2 = () => {
    simpleState.evoke('lang', 'de');
    localStorage.setItem('lang', 'de');
    this.setState({ lang2Checked: true, });
    this.setState({ lang1Checked: false, });
  };

  render() {
    const Logged = () => (
      // dropdown menu to show when logged in
      <IconMenu
        iconButtonElement={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        anchorOrigin={{ horizontal: 'right', vertical: 'top', }}
        targetOrigin={{ horizontal: 'right', vertical: 'top', }}
      >
        <MenuItem
          primaryText="English"
          insetChildren
          checked={this.state.lang1Checked}
          onTouchTap={this.lang1}
        />
        <MenuItem
          primaryText="Deutsch"
          insetChildren
          checked={this.state.lang2Checked}
          onTouchTap={this.lang2}
        />
        <Divider />
        <MenuItem
          primaryText="Rules"
          insetChildren
          onTouchTap={this.rightLabelRules}
        />
        <MenuItem
          primaryText="About"
          insetChildren
          onTouchTap={this.rightLabelAbout}
        />
        <Divider />
        <MenuItem
          primaryText="Sign out"
          insetChildren
          onTouchTap={this.rightLabelAction}
        />
      </IconMenu>
    );
    return (
      <div>
        <AppBar
          style={Styles.navbar}
          title={
            <span>
              {this.props.title}
            </span>
          }
          iconElementRight={
            // show login instead of dropdown menu
            this.props.authed
              ? <Logged />
              : <FlatButton label={this.props.labelRightNotAuthed} />
          }
          onTitleTouchTap={this.titleAction}
          showMenuIconButton={false}
        />
        <div style={{ paddingTop: '64px', }} />
      </div>
    );
  }
}

export default withRouter(Navbar);
