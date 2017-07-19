import React, { Component } from "react";
import Paper from "material-ui/Paper";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import Styles from "./Checkboxlist.css.js";

class CheckboxList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votedkey: ""
    };
  }
  handleChange(event) {
    this.setState({ votedkey: event.target.value });
    this.props.checkListChanged();
  }

  render() {
    let checkboxListItem = this.props.votesData.map((item, index) => {
      return (
        <RadioButton
          key={index}
          value={item.key + "|" + item.displayName}
          label={item.displayName}
          style={Styles.radioButton}
        />
      );
    });
    return (
      <Paper zDepth={2}>
        <RadioButtonGroup
          name="notRight"
          labelPosition="left"
          onChange={e => this.handleChange(e)}
        >
          {checkboxListItem}
        </RadioButtonGroup>
      </Paper>
    );
  }
}

export default CheckboxList;
