/*
*   Required Props:
*   title: string,
*   routeTitle: string,
*   routeRight: string,
*   labelRightAuthed: string,
*   labelRightNotAuthed: string
*   authed: boolean
*/

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { logout } from "../../helpers/auth";
import AppBar from "material-ui/AppBar";
import Styles from "./Navbar.css.js";
import FlatButton from "material-ui/FlatButton";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import MenuItem from "material-ui/MenuItem";
import Divider from "material-ui/Divider";
import SimpleState from "react-simple-state";
const simpleState = new SimpleState();

class navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
      loading: true
    };
  }
  titleAction() {
    this.props.history.push(this.props.routeTitle);
  }
  rightLabelAction = () => {
    logout();
    this.props.history.push(this.props.routeRight);
  };

  lang1 = () => {
    console.log("lang1");
    simpleState.evoke("lang", "en");
    localStorage.setItem("lang", "en");
  };

  lang2 = () => {
    console.log("lang2");
    simpleState.evoke("lang", "de");
    localStorage.setItem("lang", "de");
  };

  render() {
    const Logged = props =>
      <IconMenu
        iconButtonElement={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        targetOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem primaryText="English" onTouchTap={this.lang1} />
        <MenuItem primaryText="Deutsch" onTouchTap={this.lang2} />
        <Divider />
        <MenuItem primaryText="Sign out" onTouchTap={this.rightLabelAction} />
      </IconMenu>;
    return (
      <AppBar
        style={Styles.notSelectable}
        title={
          <span>
            {" "}{this.props.title}{" "}
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
