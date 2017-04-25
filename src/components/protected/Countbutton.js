import React, {Component} from 'react'
import Button from 'muicss/lib/react/button';

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
      button: {
        fontSize: 25
      }
    };
    return (
      <div>
        <Button
          onClick={this
          .up
          .bind(this)}
          style={styles.button}
          color="primary">+</Button>
        <label style={styles.counter}>{this.state.count}</label>
        <Button
          onClick={this
          .down
          .bind(this)}
          style={styles.button}
          color="primary">-</Button>
      </div>
    )
  }
}