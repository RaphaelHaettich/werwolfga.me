/*
*   Required Props:
*   title: string,
*   routeTitle: string,
*   routeRight: string,
*   labelRightAuthed: string,
*   labelRightNotAuthed: string
*   authed: boolean
*/

import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {logout} from '../../helpers/auth'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

class navbar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      authed: false,
      loading: true
    };
  }
  titleAction() {
    this
      .props
      .history
      .push(this.props.routeTitle)
  }
  rightLabelAction() {
    logout()
    this
      .props
      .history
      .push(this.props.routeRight)
  }
  render() {
    return (
      <AppBar
        title={< span > {this.props.title} </span>}
        iconElementRight={this.props.authed
        ? <FlatButton label={this.props.labelRightAuthed}/>
        : <FlatButton label={this.props.labelRightNotAuthed} />}
        onTitleTouchTap={this
        .titleAction
        .bind(this)}
        onRightIconButtonTouchTap={this
        .rightLabelAction
        .bind(this)}
        showMenuIconButton={false}/>
    )
  }
}

export default withRouter(navbar)
