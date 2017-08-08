/*
*   Required Props:
*   title: string,
*   routeTitle: string,
*   routeRight: string,
*   labelRightAuthed: string,
*   labelRightNotAuthed: string
*   authed: boolean
*/

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { logout } from '../../helpers/auth';
import AppBar from 'material-ui/AppBar';
import Styles from './Navbar.css.js';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import SimpleState from 'react-simple-state';
const simpleState = new SimpleState();

class navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
      loading: true,
      lang1Checked: false,
      lang2Checked: false
    };
  }
  titleAction() {
    this.props.history.push(this.props.routeTitle);
  }
  rightLabelAction = () => {
    logout();
    this.props.history.push(this.props.routeRight);
  };

  componentWillMount() {
    if (simpleState.getState('lang') === 'en') {
      this.setState({ lang1Checked: true });
      this.setState({ lang2Checked: false });
    } else if (simpleState.getState('lang') === 'de') {
      this.setState({ lang2Checked: true });
      this.setState({ lang1Checked: false });
    }
  }

  lang1 = () => {
    simpleState.evoke('lang', 'en');
    localStorage.setItem('lang', 'en');
    this.setState({ lang1Checked: true });
    this.setState({ lang2Checked: false });
  };

  lang2 = () => {
    simpleState.evoke('lang', 'de');
    localStorage.setItem('lang', 'de');
    this.setState({ lang2Checked: true });
    this.setState({ lang1Checked: false });
  };

  render() {
    const Logged = () =>
      <IconMenu
        iconButtonElement={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem
          primaryText='English'
          insetChildren={true}
          checked={this.state.lang1Checked}
          onTouchTap={this.lang1}
        />
        <MenuItem
          primaryText='Deutsch'
          insetChildren={true}
          checked={this.state.lang2Checked}
          onTouchTap={this.lang2}
        />
        <Divider />
        <MenuItem
          primaryText='Sign out'
          insetChildren={true}
          onTouchTap={this.rightLabelAction}
        />
      </IconMenu>;
    return (
      <AppBar
        style={Styles.notSelectable}
        title={
          <span>
            {this.props.title}
          </span>
        }
        iconElementRight={
          this.props.authed
            ? <Logged />
            : <FlatButton label={this.props.labelRightNotAuthed} />
        }
        onTitleTouchTap={this.titleAction.bind(this)}
        showMenuIconButton={false}
      />
    );
  }
}

export default withRouter(navbar);
