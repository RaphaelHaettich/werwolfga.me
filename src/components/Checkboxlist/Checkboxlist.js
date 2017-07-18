import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Styles from './Checkboxlist.css.js'

class CheckboxList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      votedkey: "",
      checkboxChecked: false
    };
  }
  handleChange(event) {
    this.setState({votedkey: event.target.value});
    this.setState({checkboxChecked: true});
    console.log(event.target);
  }

  render() {
    let checkboxListItem = 
        this.props.votesData.map((item, index) => {
            console.log(item);
        return (
            <RadioButton key={index} value={item.key +"|"+item.displayName} label={item.displayName} style={Styles.radioButton}/>
        )
    });
      console.log(checkboxListItem)
    return ( 
      <Paper zDepth={2}>
        <RadioButtonGroup name="notRight" labelPosition="left" onChange={(e) => this.handleChange(e)}>
          {checkboxListItem}
        </RadioButtonGroup> 
      </Paper>
    )
  }
}

export default CheckboxList