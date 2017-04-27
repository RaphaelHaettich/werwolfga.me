import React, {Component} from 'react'
import FlatButton from 'material-ui/FlatButton'

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
    var styles = {
      counter: {
        marginRight: "5px",
        marginLeft: "5px"
      },
      buttonLabelStyle: {
        fontSize: 25,
        fontWeight: "bold"
      },
      buttonStyle: {
        minWidth: "25px"
      }
    };
    return (
      <div>
        <FlatButton
          style={styles.buttonStyle}
          labelStyle={styles.buttonLabelStyle}
          onClick={this
          .down
          .bind(this)}
          label="−"
          primary={true} />
        <label style={styles.counter}>{this.state.count}</label>
        <FlatButton
          style={styles.buttonStyle}
          labelStyle={styles.buttonLabelStyle}
          onClick={this
          .up
          .bind(this)}
          label="+"
          primary={true} />
      </div>
    )
  }
}