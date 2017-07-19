import React, { Component } from "react";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import SimpleState from "react-simple-state";
const simpleState = new SimpleState();

export default class Home extends Component {
  componentDidMount() {
    simpleState.evoke("loader", false);
  }
  render() {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        Home. Not Protected. Anyone can see this.
        <br />
        <Link to="/login">
          <RaisedButton label="Login" primary={true} />
        </Link>
        <Link to="/register">
          <RaisedButton label="Registration" primary={true} />
        </Link>
      </div>
    );
  }
}
