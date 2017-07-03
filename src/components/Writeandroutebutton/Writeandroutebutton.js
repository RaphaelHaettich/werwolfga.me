/*
*   Required Props:
*   dbReference: string,
*   labelText: string,
*   route: string
*
*   Optional Props:
*   removeState: string
*/

import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import {base} from '../../config/constants'
import RaisedButton from 'material-ui/RaisedButton'
import SimpleState from 'react-simple-state'



class writeAndRouteButton extends Component {

  delete() {
    base
      .remove(this.props.dbReference)
      .then(() => {
        if(this.props.removeState){
          const simpleState = new SimpleState()
          simpleState.removeListener(this.props.removeState);
        }
        this.props.history.push(this.props.route)
      })
      .catch(error => {
        //handle error
      });
  }
  
  render() {
    return (
      <RaisedButton 
        primary={true}
        onClick={this
        .delete
        .bind(this)}
        label={this.props.labelText}
      />    
    )
  }
}

export default withRouter(writeAndRouteButton)