/*
*   Required Props:
*   dbReference: string,
*   labelText: string,
*   route: string
*/

import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import Button from 'muicss/lib/react/button'
import {base} from '../../config/constants'

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
      <Button onClick={this
        .delete
        .bind(this)} variant="raised">
        {this.props.labelText}
      </Button>
    )
  }
}

export default withRouter(deleteAndRouteButton)