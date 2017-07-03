/*
*   Required Props:
*   none
*/

import React, {Component} from 'react'
import FlatButton from 'material-ui/FlatButton'
import Styles from './Inputcounter.css.js'

export default class countbutton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  up(e) {
    this.setState({
      count: this.state.count + 1
    });
  }
  down(e) {
    if (this.state.count > 0) {
      this.setState({
        count: this.state.count - 1
      });
    }
  }
  render() {
    return (
      <div>
        <FlatButton
          style={Styles.buttonStyle}
          labelStyle={Styles.buttonLabelStyle}
          onClick={this
          .down
          .bind(this)}
          label="−"
          primary={true} />
        <label style={Styles.counter}>{this.state.count}</label>
        <FlatButton
          style={Styles.buttonStyle}
          labelStyle={Styles.buttonLabelStyle}
          onClick={this
          .up
          .bind(this)}
          label="+"
          primary={true} />
      </div>
    )
  }
}