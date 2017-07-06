/*
*   Required Props:
*   dbReference: string,
*   labelText: string,
*   route: string
*/

import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import {base} from '../../config/constants'
import RaisedButton from 'material-ui/RaisedButton'



class deleteAndRouteButton extends Component {

  delete() {
    base
      .remove(this.props.dbReference)
      .then(() => {
        this.props.history.push(this.props.route)
      })
      .catch(error => {
        //handle error
      });
  }
  
  render() {
    return (
      <RaisedButton 
        onClick={this
        .delete
        .bind(this)}
        label={this.props.labelText}
      />    
    )
  }
}

export default withRouter(deleteAndRouteButton)