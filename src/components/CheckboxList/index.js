/*
*   Required Props:
*   checkListChanged: function,
*   votesData: array
* 
*/

import React, { Component, } from 'react';
import Paper from 'material-ui/Paper';
import { RadioButton, RadioButtonGroup, } from 'material-ui/RadioButton';
import Styles from './style.css.js';

class CheckboxList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votedkey: '',
    };
  }
  handleChange(event) {
    // set state to if voted or not
    this.setState({ votedkey: event.target.value, });
    // call function in parent when changed
    this.props.checkListChanged();
  }

  render() {
    const checkboxListItem = this.props.votesData.map((item, id) => (
      <RadioButton
        key={id}
        value={`${item.key}|${item.displayName}`}
        label={item.displayName}
        style={Styles.radioButton}
      />
    ));
    return (
      <Paper zDepth={2}>
        <RadioButtonGroup
          name="notRight"
          labelPosition="left"
          onChange={event => this.handleChange(event)}
        >
          {checkboxListItem}
        </RadioButtonGroup>
      </Paper>
    );
  }
}

export default CheckboxList;
