/*
*   Required Props:
*   dbReference: string,
*   labelText: string,
*   route: string
*
*   Optional Props:
*   primary: boolean
*/

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { base } from "../../config/constants";
import RaisedButton from "material-ui/RaisedButton";

class deleteAndRouteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      primary: this.props.primary || false
    };
  }

  delete() {
    base
      .remove(this.props.dbReference)
      .then(() => {
        this.props.history.push(this.props.route);
        sessionStorage.clear();
      })
      .catch(error => {
        //handle error
      });
  }

  render() {
    return (
      <RaisedButton
        onClick={this.delete.bind(this)}
        label={this.props.labelText}
        primary={this.state.primary}
      />
    );
  }
}

export default withRouter(deleteAndRouteButton);
