import React, {Component} from 'react'
import Button from 'muicss/lib/react/button'
import {base} from '../../config/constants'
import { withRouter } from 'react-router-dom'

class cancelbutton extends Component {

  delete() {
    base
      .remove('activegame/' + this.props.lobbyKey)
      .then(() => {
        this.props.history.push('/main')
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
        Cancel
      </Button>
    )
  }
}

export default withRouter(cancelbutton)